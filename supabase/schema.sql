-- ============================================================
-- Encyclobol · Ranking (Supabase / Postgres)
-- Rode este script no SQL Editor do seu projeto Supabase.
-- Depois, em Authentication > Providers, habilite "Anonymous".
-- ============================================================

-- Perfis: 1 por usuário (apelido + código de amigo)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nick text not null check (char_length(nick) between 2 and 20),
  friend_code text unique not null,
  created_at timestamptz default now()
);

-- Placares: 1 por (usuário, jogo, dia)
create table if not exists public.scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  game text not null,
  day int not null,
  points int not null default 0 check (points >= 0 and points <= 100000),
  updated_at timestamptz default now(),
  primary key (user_id, game, day)
);

-- Amizades (direcional: "eu sigo fulano")
create table if not exists public.friends (
  user_id uuid not null references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.scores   enable row level security;
alter table public.friends  enable row level security;

drop policy if exists profiles_read   on public.profiles;
drop policy if exists profiles_write  on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_read   on public.profiles for select using (true);
create policy profiles_write  on public.profiles for insert with check (auth.uid() = id);
create policy profiles_update on public.profiles for update using (auth.uid() = id);

drop policy if exists scores_read   on public.scores;
drop policy if exists scores_write  on public.scores;
drop policy if exists scores_update on public.scores;
create policy scores_read   on public.scores for select using (true);
create policy scores_write  on public.scores for insert with check (auth.uid() = user_id);
create policy scores_update on public.scores for update using (auth.uid() = user_id);

drop policy if exists friends_read   on public.friends;
drop policy if exists friends_write  on public.friends;
drop policy if exists friends_delete on public.friends;
create policy friends_read   on public.friends for select using (auth.uid() = user_id);
create policy friends_write  on public.friends for insert with check (auth.uid() = user_id);
create policy friends_delete on public.friends for delete using (auth.uid() = user_id);

-- ---------- Funções ----------
create or replace function public.gen_friend_code()
returns text language sql as $$
  select string_agg(
    substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', (floor(random()*32)+1)::int, 1), ''
  )
  from generate_series(1, 6);
$$;

-- Cria/atualiza o perfil do usuário logado e garante um código de amigo
create or replace function public.set_nick(p_nick text)
returns public.profiles
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  code text;
  prof public.profiles;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select * into prof from public.profiles where id = uid;
  if prof.id is null then
    loop
      code := public.gen_friend_code();
      exit when not exists (select 1 from public.profiles where friend_code = code);
    end loop;
    insert into public.profiles(id, nick, friend_code)
    values (uid, trim(p_nick), code)
    returning * into prof;
  else
    update public.profiles set nick = trim(p_nick) where id = uid returning * into prof;
  end if;
  return prof;
end; $$;

-- Adiciona amigo pelo código
create or replace function public.add_friend(p_code text)
returns public.profiles
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  fr public.profiles;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select * into fr from public.profiles where friend_code = upper(trim(p_code));
  if fr.id is null then raise exception 'codigo nao encontrado'; end if;
  if fr.id = uid then raise exception 'nao da pra adicionar voce mesmo'; end if;
  insert into public.friends(user_id, friend_id) values (uid, fr.id) on conflict do nothing;
  return fr;
end; $$;

-- Trava de sanidade: limita pontos por jogo/dia (anti-trapaça básico).
-- Não recalcula o jogo (isso seria server-side completo no futuro),
-- mas impede placares absurdos tipo 999999.
create or replace function public.clamp_score()
returns trigger language plpgsql as $$
declare cap int;
begin
  cap := case new.game
    when 'Linha do Tempo'      then 30000
    when 'O Intruso'           then 15000
    when 'Tira-Teima'          then 15000
    when 'Copa de Pênaltis'    then 4000
    when 'Quarteto'            then 2000
    when 'Craque Misterioso'   then 1500
    else 5000
  end;
  if new.points < 0 then new.points := 0; end if;
  if new.points > cap then new.points := cap; end if;
  return new;
end; $$;

drop trigger if exists trg_clamp_score on public.scores;
create trigger trg_clamp_score before insert or update on public.scores
for each row execute function public.clamp_score();

-- Ranking global. Filtros opcionais: p_game (null = todos), p_since (dia mínimo).
drop function if exists public.global_leaderboard(int);
drop function if exists public.global_leaderboard(int, text, int);
create function public.global_leaderboard(
  p_limit int default 50,
  p_game text default null,
  p_since int default 0
)
returns table(nick text, friend_code text, total bigint, rank bigint)
language sql security definer set search_path = public as $$
  select p.nick,
         p.friend_code,
         coalesce(sum(s.points), 0)::bigint as total,
         rank() over (order by coalesce(sum(s.points), 0) desc)::bigint as rank
  from public.profiles p
  left join public.scores s
    on s.user_id = p.id
   and (p_game is null or s.game = p_game)
   and s.day >= p_since
  group by p.id, p.nick, p.friend_code
  order by total desc
  limit p_limit;
$$;

-- Ranking de amigos (eu + quem eu sigo), com os mesmos filtros.
drop function if exists public.friends_leaderboard();
drop function if exists public.friends_leaderboard(text, int);
create function public.friends_leaderboard(
  p_game text default null,
  p_since int default 0
)
returns table(nick text, total bigint, is_me boolean, rank bigint)
language sql security definer set search_path = public as $$
  with ids as (
    select auth.uid() as id
    union
    select friend_id from public.friends where user_id = auth.uid()
  )
  select p.nick,
         coalesce(sum(s.points), 0)::bigint as total,
         (p.id = auth.uid()) as is_me,
         rank() over (order by coalesce(sum(s.points), 0) desc)::bigint as rank
  from ids
  join public.profiles p on p.id = ids.id
  left join public.scores s
    on s.user_id = p.id
   and (p_game is null or s.game = p_game)
   and s.day >= p_since
  group by p.id, p.nick
  order by total desc;
$$;

-- ============================================================
-- Duelo de Pênaltis em tempo real
-- ============================================================
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  host_id uuid not null references auth.users(id) on delete cascade,
  guest_id uuid references auth.users(id) on delete cascade,
  host_nick text not null,
  guest_nick text,
  seed int not null,
  rounds int not null default 5,
  status text not null default 'waiting', -- waiting | playing | done
  created_at timestamptz default now()
);

create table if not exists public.match_moves (
  match_id uuid not null references public.matches(id) on delete cascade,
  round int not null,
  player_id uuid not null references auth.users(id) on delete cascade,
  choice int not null,      -- índice escolhido; -1 = tempo esgotado
  correct boolean not null,
  created_at timestamptz default now(),
  primary key (match_id, round, player_id)
);

alter table public.matches     enable row level security;
alter table public.match_moves enable row level security;

drop policy if exists matches_read   on public.matches;
drop policy if exists matches_insert on public.matches;
drop policy if exists matches_update on public.matches;
create policy matches_read   on public.matches for select using (true);
create policy matches_insert on public.matches for insert with check (auth.uid() = host_id);
create policy matches_update on public.matches for update using (auth.uid() = host_id or auth.uid() = guest_id);

drop policy if exists moves_read   on public.match_moves;
drop policy if exists moves_insert on public.match_moves;
create policy moves_read   on public.match_moves for select using (true);
create policy moves_insert on public.match_moves for insert with check (auth.uid() = player_id);

-- Habilita Realtime nas duas tabelas (ignora se já estiverem habilitadas)
do $$ begin
  alter publication supabase_realtime add table public.matches;
exception when others then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.match_moves;
exception when others then null; end $$;

-- Cria uma sala (host = quem chama); gera código e seed
create or replace function public.create_match(p_rounds int default 5)
returns public.matches
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); n text; v_code text; m public.matches;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select nick into n from public.profiles where id = uid;
  if n is null then raise exception 'defina um apelido primeiro'; end if;
  loop
    v_code := public.gen_friend_code();
    exit when not exists (select 1 from public.matches where code = v_code and status <> 'done');
  end loop;
  insert into public.matches(code, host_id, host_nick, seed, rounds)
  values (v_code, uid, n, (floor(random() * 1000000000))::int, p_rounds)
  returning * into m;
  return m;
end; $$;

-- Entra numa sala pelo código
create or replace function public.join_match(p_code text)
returns public.matches
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); n text; m public.matches;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  select nick into n from public.profiles where id = uid;
  if n is null then raise exception 'defina um apelido primeiro'; end if;
  select * into m from public.matches where code = upper(trim(p_code)) and status = 'waiting';
  if m.id is null then raise exception 'partida nao encontrada'; end if;
  if m.host_id = uid then raise exception 'voce criou essa partida'; end if;
  update public.matches set guest_id = uid, guest_nick = n, status = 'playing'
   where id = m.id returning * into m;
  return m;
end; $$;
