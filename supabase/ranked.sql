-- =====================================================================
-- Encyclobol · Duelo ranqueado (assíncrono, com temporadas)
-- Rodar uma vez no SQL Editor do Supabase. Pode rodar de novo sem estragar.
--
-- Como funciona: cada partida ranqueada fica gravada (as respostas do
-- jogador, rodada a rodada). O próximo jogador de nível parecido enfrenta
-- esse "fantasma": mesmas perguntas, papéis invertidos (quem bateu agora
-- defende). O ELO é calculado aqui no servidor.
-- Temporada = mês ("2026-10"). Na virada, a nota encolhe pela metade em
-- direção à base (acesso e rebaixamento acontecem pela nota).
-- =====================================================================

create table if not exists public.ranked_profiles (
  user_id uuid not null references auth.users(id) on delete cascade,
  season text not null,
  rating int not null default 900,
  peak int not null default 900,
  wins int not null default 0,
  draws int not null default 0,
  losses int not null default 0,
  updated_at timestamptz default now(),
  primary key (user_id, season)
);

create table if not exists public.ranked_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  season text not null,
  seed int not null,
  kicks_even boolean not null,       -- true: bateu nas rodadas pares (0,2,4…)
  answers jsonb not null,            -- [{ "r":0, "c":true, "ms":4200 }, …] 6 rodadas (3 cobranças cada)
  rating_at int not null,            -- nota de quem jogou, no momento
  created_at timestamptz default now()
);
create index if not exists ranked_runs_season_rating on public.ranked_runs (season, rating_at);

alter table public.ranked_profiles enable row level security;
alter table public.ranked_runs enable row level security;
drop policy if exists ranked_profiles_read on public.ranked_profiles;
drop policy if exists ranked_runs_read on public.ranked_runs;
create policy ranked_profiles_read on public.ranked_profiles for select using (true);
create policy ranked_runs_read on public.ranked_runs for select using (true);
-- Escrita só pelas funções abaixo (security definer).

-- Perfil da temporada (cria com reset suave a partir da temporada anterior).
create or replace function public.ranked_me(p_season text)
returns public.ranked_profiles
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); r public.ranked_profiles; prev int;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select * into r from public.ranked_profiles where user_id = uid and season = p_season;
  if r.user_id is not null then return r; end if;
  select rating into prev from public.ranked_profiles
   where user_id = uid and season < p_season order by season desc limit 1;
  insert into public.ranked_profiles(user_id, season, rating, peak)
  values (uid, p_season, coalesce(900 + (prev - 900) / 2, 900), coalesce(900 + (prev - 900) / 2, 900))
  returning * into r;
  return r;
end; $$;

-- Adversário fantasma: uma partida recente de outro jogador com nota parecida.
create or replace function public.ranked_ghost(p_season text)
returns table (id uuid, seed int, kicks_even boolean, answers jsonb, rating_at int, nick text)
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); my int;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select rating into my from public.ranked_me(p_season);
  return query
    select g.id, g.seed, g.kicks_even, g.answers, g.rating_at, coalesce(p.nick, 'Jogador')
      from (
        select rr.* from public.ranked_runs rr
         where rr.user_id <> uid and rr.created_at > now() - interval '45 days'
         order by abs(rr.rating_at - my), rr.created_at desc
         limit 25
      ) g
      left join public.profiles p on p.id = g.user_id
     order by random()
     limit 1;
end; $$;

-- Fecha a partida: grava as respostas (viram fantasma pros próximos) e
-- aplica o ELO. p_result: 1 vitória, 0.5 empate, 0 derrota.
-- Contra robô (sem p_opp_run): K menor.
create or replace function public.ranked_submit(
  p_season text, p_seed int, p_kicks_even boolean, p_answers jsonb,
  p_result numeric, p_opp_run uuid default null, p_bot_rating int default null
)
returns table (rating int, delta int, peak int, wins int, draws int, losses int)
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); me public.ranked_profiles; opp int; k int; exp numeric; d int;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  if p_result not in (0, 0.5, 1) then raise exception 'resultado invalido'; end if;
  if jsonb_array_length(p_answers) <> 6 then raise exception 'partida incompleta'; end if;
  select * into me from public.ranked_me(p_season);
  if p_opp_run is not null then
    select rating_at into opp from public.ranked_runs where ranked_runs.id = p_opp_run;
    k := 32;
  end if;
  if opp is null then
    opp := coalesce(p_bot_rating, me.rating);
    k := 16;
  end if;
  exp := 1 / (1 + power(10, (opp - me.rating)::numeric / 400));
  d := round(k * (p_result - exp));
  update public.ranked_profiles rp
     set rating = greatest(500, rp.rating + d),
         peak = greatest(rp.peak, rp.rating + d),
         wins = rp.wins + (p_result = 1)::int,
         draws = rp.draws + (p_result = 0.5)::int,
         losses = rp.losses + (p_result = 0)::int,
         updated_at = now()
   where rp.user_id = uid and rp.season = p_season
   returning * into me;
  insert into public.ranked_runs(user_id, season, seed, kicks_even, answers, rating_at)
  values (uid, p_season, p_seed, p_kicks_even, p_answers, me.rating - d);
  return query select me.rating, d, me.peak, me.wins, me.draws, me.losses;
end; $$;

-- Tabela da temporada.
create or replace function public.ranked_board(p_season text, p_limit int default 50)
returns table (nick text, rating int, wins int, draws int, losses int, is_me boolean)
language sql security definer set search_path = public as $$
  select coalesce(p.nick, 'Jogador'), rp.rating, rp.wins, rp.draws, rp.losses, rp.user_id = auth.uid()
    from public.ranked_profiles rp
    left join public.profiles p on p.id = rp.user_id
   where rp.season = p_season and (rp.wins + rp.draws + rp.losses) > 0
   order by rp.rating desc
   limit p_limit;
$$;

-- =====================================================================
-- Ranqueada AO VIVO (fila de pareamento) — usa a mesma sala do Duelo 1x1.
-- Fluxo: ranked_queue_join → (ninguém?) ranked_queue_poll a cada 1,5 s →
-- depois de ~12 s, ranked_queue_leave e o app cai no fantasma.
-- No fim, ranked_live_result conta os gols pelas jogadas DOS DOIS no
-- servidor e aplica o ELO aos dois (uma vez só).
-- =====================================================================
alter table public.matches add column if not exists theme text not null default 'geral';
alter table public.matches add column if not exists ranked boolean not null default false;
alter table public.matches add column if not exists ranked_done boolean not null default false;
alter table public.matches add column if not exists host_delta int;
alter table public.matches add column if not exists guest_delta int;

create table if not exists public.ranked_queue (
  user_id uuid primary key references auth.users(id) on delete cascade,
  season text not null,
  rating int not null,
  match_id uuid,
  created_at timestamptz default now()
);
alter table public.ranked_queue enable row level security;
drop policy if exists ranked_queue_read on public.ranked_queue;
create policy ranked_queue_read on public.ranked_queue for select using (auth.uid() = user_id);

-- Perfil da temporada de QUALQUER jogador (uso interno das funções abaixo).
create or replace function public.ranked_profile_for(p_user uuid, p_season text)
returns public.ranked_profiles
language plpgsql security definer set search_path = public as $$
declare r public.ranked_profiles; prev int;
begin
  select * into r from public.ranked_profiles where user_id = p_user and season = p_season;
  if r.user_id is not null then return r; end if;
  select rating into prev from public.ranked_profiles
   where user_id = p_user and season < p_season order by season desc limit 1;
  insert into public.ranked_profiles(user_id, season, rating, peak)
  values (p_user, p_season, coalesce(900 + (prev - 900) / 2, 900), coalesce(900 + (prev - 900) / 2, 900))
  on conflict (user_id, season) do nothing;
  select * into r from public.ranked_profiles where user_id = p_user and season = p_season;
  return r;
end; $$;
revoke execute on function public.ranked_profile_for(uuid, text) from public;
do $$ begin
  revoke execute on function public.ranked_profile_for(uuid, text) from anon, authenticated;
exception when undefined_object then null; end $$;

create or replace function public.ranked_queue_join(p_season text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); my int; myn text; opp public.ranked_queue; oppn text; v_code text; mid uuid;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select nick into myn from public.profiles where id = uid;
  if myn is null then raise exception 'defina um apelido primeiro'; end if;
  select rating into my from public.ranked_profile_for(uid, p_season);
  -- Fila velha (gente que fechou o app) não conta.
  delete from public.ranked_queue where match_id is null and created_at < now() - interval '30 seconds';
  select * into opp from public.ranked_queue q
   where q.user_id <> uid and q.season = p_season and q.match_id is null and abs(q.rating - my) <= 250
   order by q.created_at
   limit 1
   for update skip locked;
  if opp.user_id is not null then
    select nick into oppn from public.profiles where id = opp.user_id;
    loop
      v_code := public.gen_friend_code();
      exit when not exists (select 1 from public.matches where code = v_code);
    end loop;
    insert into public.matches(code, host_id, guest_id, host_nick, guest_nick, seed, rounds, status, ranked)
    values (v_code, opp.user_id, uid, coalesce(oppn, 'Jogador'), myn, (floor(random() * 1000000000))::int, 3, 'playing', true)
    returning id into mid;
    update public.ranked_queue set match_id = mid where user_id = opp.user_id;
    delete from public.ranked_queue where user_id = uid;
    return mid;
  end if;
  insert into public.ranked_queue(user_id, season, rating) values (uid, p_season, my)
  on conflict (user_id) do update set season = excluded.season, rating = excluded.rating, match_id = null, created_at = now();
  return null;
end; $$;

-- Alguém me pegou na fila? Devolve a sala (e me tira da fila).
create or replace function public.ranked_queue_poll()
returns uuid
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); mid uuid;
begin
  select match_id into mid from public.ranked_queue where user_id = uid;
  if mid is not null then delete from public.ranked_queue where user_id = uid; end if;
  return mid;
end; $$;

-- Desisto de esperar. Se fui pareado no último instante, devolve a sala.
create or replace function public.ranked_queue_leave()
returns uuid
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); mid uuid;
begin
  delete from public.ranked_queue where user_id = uid returning match_id into mid;
  return mid;
end; $$;

-- Fecha a ranqueada ao vivo: placar contado pelas jogadas dos dois.
create or replace function public.ranked_live_result(p_match uuid)
returns table (rating int, delta int, opp_rating int)
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); m public.matches; v_season text := to_char(now(), 'YYYY-MM');
  hg int := 0; gg int := 0; n int := 0; r int; kick uuid; keep uuid; sc boolean; kc boolean;
  hp public.ranked_profiles; gp public.ranked_profiles; res numeric; exp numeric; dh int; dg int;
begin
  select * into m from public.matches where id = p_match for update;
  if m.id is null or not m.ranked then raise exception 'partida nao ranqueada'; end if;
  if uid <> m.host_id and uid <> m.guest_id then raise exception 'nao participa dessa partida'; end if;
  if not m.ranked_done then
    for r in 0..40 loop
      kick := case when r % 2 = 0 then m.host_id else m.guest_id end;
      keep := case when r % 2 = 0 then m.guest_id else m.host_id end;
      select correct into sc from public.match_moves where match_id = m.id and round = r and player_id = kick;
      select correct into kc from public.match_moves where match_id = m.id and round = r and player_id = keep;
      exit when sc is null or kc is null;
      n := n + 1;
      if sc and not kc then
        if kick = m.host_id then hg := hg + 1; else gg := gg + 1; end if;
      end if;
      sc := null; kc := null;
    end loop;
    if n < m.rounds * 2 or n % 2 = 1 or hg = gg then raise exception 'partida em andamento'; end if;
    hp := public.ranked_profile_for(m.host_id, v_season);
    gp := public.ranked_profile_for(m.guest_id, v_season);
    res := case when hg > gg then 1 else 0 end;
    exp := 1 / (1 + power(10, (gp.rating - hp.rating)::numeric / 400));
    dh := round(32 * (res - exp));
    dg := -dh;
    update public.ranked_profiles x set rating = greatest(500, x.rating + dh), peak = greatest(x.peak, x.rating + dh),
           wins = x.wins + (res = 1)::int, losses = x.losses + (res = 0)::int, updated_at = now()
     where x.user_id = m.host_id and x.season = v_season;
    update public.ranked_profiles x set rating = greatest(500, x.rating + dg), peak = greatest(x.peak, x.rating + dg),
           wins = x.wins + (res = 0)::int, losses = x.losses + (res = 1)::int, updated_at = now()
     where x.user_id = m.guest_id and x.season = v_season;
    update public.matches set ranked_done = true, status = 'done', host_delta = dh, guest_delta = dg where id = m.id;
    select * into m from public.matches where id = p_match;
  end if;
  return query
    select x.rating,
           case when uid = m.host_id then m.host_delta else m.guest_delta end,
           (select y.rating from public.ranked_profiles y
             where y.season = to_char(now(), 'YYYY-MM') and y.user_id = case when uid = m.host_id then m.guest_id else m.host_id end)
      from public.ranked_profiles x
     where x.user_id = uid and x.season = to_char(now(), 'YYYY-MM');
end; $$;
