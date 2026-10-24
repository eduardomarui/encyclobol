# Postgres local

Sobe junto com o app de desenvolvimento:

    docker compose up -d db

Conexão: `postgres://encyclobol:encyclobol@localhost:5432/encyclobol`

Na primeira vez (volume vazio) o Postgres roda, em ordem:
1. `00-supabase-shim.sql` — imita `auth.users`, `auth.uid()` e os papéis do Supabase;
2. `../schema.sql` — ranking, amigos e Duelo;
3. `../ranked.sql` — ranqueada.

Pra recriar do zero: `docker compose down -v` e subir de novo.
