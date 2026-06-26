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

-- Ranking global (soma de pontos de todos os jogos)
create or replace function public.global_leaderboard(p_limit int default 50)
returns table(nick text, friend_code text, total bigint, rank bigint)
language sql security definer set search_path = public as $$
  select p.nick,
         p.friend_code,
         coalesce(sum(s.points), 0)::bigint as total,
         rank() over (order by coalesce(sum(s.points), 0) desc)::bigint as rank
  from public.profiles p
  left join public.scores s on s.user_id = p.id
  group by p.id, p.nick, p.friend_code
  order by total desc
  limit p_limit;
$$;

-- Ranking de amigos (eu + quem eu sigo)
create or replace function public.friends_leaderboard()
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
  left join public.scores s on s.user_id = p.id
  group by p.id, p.nick
  order by total desc;
$$;
