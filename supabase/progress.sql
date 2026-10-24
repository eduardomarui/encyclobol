-- =====================================================================
-- Encyclobol · Progresso do aparelho guardado na conta
-- Rodar no SQL Editor do Supabase (pode rodar de novo sem estragar).
-- Cópia do que o jogo guarda no navegador (ofensiva, recordes, conquistas,
-- partida do dia). Quem salvou a conta por e-mail recupera em outro aparelho.
-- =====================================================================
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint progress_tamanho check (pg_column_size(data) < 200000)
);

alter table public.progress enable row level security;

drop policy if exists progress_select on public.progress;
create policy progress_select on public.progress for select using (user_id = auth.uid());
drop policy if exists progress_insert on public.progress;
create policy progress_insert on public.progress for insert with check (user_id = auth.uid());
drop policy if exists progress_update on public.progress;
create policy progress_update on public.progress for update using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on public.progress to authenticated;
