-- =====================================================================
-- Encyclobol · Time do coração e torcida contra torcida
-- Rodar no SQL Editor do Supabase (pode rodar de novo sem estragar).
-- O time é escolhido UMA vez e não muda (o servidor recusa a troca).
-- Tabela semanal: média, por torcedor, da soma das notas do dia (0–1000
-- por jogo) na semana. Média, não soma: torcida menor também pode ganhar.
-- =====================================================================
alter table public.profiles add column if not exists team text;
alter table public.profiles add column if not exists team_at timestamptz;

create or replace function public.set_team(p_team text)
returns text
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); cur text;
begin
  if uid is null then raise exception 'nao autenticado'; end if;
  if p_team is null or length(p_team) < 2 or length(p_team) > 24 or p_team !~ '^[a-z]+$' then
    raise exception 'time invalido';
  end if;
  select team into cur from public.profiles where id = uid;
  if not found then raise exception 'defina um apelido primeiro'; end if;
  if cur is not null then
    if cur = p_team then return cur; end if;
    raise exception 'time ja escolhido';
  end if;
  update public.profiles set team = p_team, team_at = now() where id = uid;
  return p_team;
end; $$;

-- p_from_day: primeiro dia (dayNumber do app) da semana; p_min: mínimo de
-- torcedores pra entrar na tabela.
create or replace function public.torcida_board(p_from_day int, p_min int default 3)
returns table (team text, fans int, avg_points int, my_team boolean)
language sql security definer set search_path = public as $$
  with per_fan as (
    select p.team, s.user_id, sum(s.points) as pts
      from public.scores s
      join public.profiles p on p.id = s.user_id
     where p.team is not null and s.day >= p_from_day
     group by p.team, s.user_id
  )
  select f.team, count(*)::int, round(avg(f.pts))::int,
         f.team = (select team from public.profiles where id = auth.uid())
    from per_fan f
   group by f.team
  having count(*) >= p_min
   order by avg(f.pts) desc;
$$;
