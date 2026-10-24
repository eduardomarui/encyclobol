-- Calço mínimo pra rodar o schema do Supabase num Postgres comum (local).
-- Imita só o que o projeto usa: auth.users, auth.uid() e os papéis anon /
-- authenticated. auth.uid() lê o usuário da variável de sessão
-- `request.jwt.claim.sub` — pra testar como um usuário:
--   select set_config('request.jwt.claim.sub', '<uuid>', false);
create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now()
);

create or replace function auth.uid() returns uuid
language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

do $$ begin
  create role anon nologin;
exception when duplicate_object then null; end $$;
do $$ begin
  create role authenticated nologin;
exception when duplicate_object then null; end $$;

-- O schema tenta adicionar tabelas à publicação do Realtime; aqui ela só existe vazia.
do $$ begin
  create publication supabase_realtime;
exception when duplicate_object then null; end $$;
