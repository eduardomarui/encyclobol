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
  answers jsonb not null,            -- [{ "r":0, "c":true, "ms":4200 }, …] 10 rodadas
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
  if jsonb_array_length(p_answers) <> 10 then raise exception 'partida incompleta'; end if;
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
