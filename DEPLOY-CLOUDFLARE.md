# Encyclobol no Cloudflare Pages + encyclobol.com.br

O Cloudflare Pages está ligado direto no GitHub (sem token): todo push em
`master` gera um build lá e publica em `https://encyclobol.pages.dev` e no domínio.

## Configuração do projeto `encyclobol` (Workers & Pages)
- Production branch: `master`
- Root directory: `web`
- Build command: `npm run build && rm -f dist/404.html`
  (o `404.html` é o truque de rotas do GitHub Pages; sem ele o Cloudflare serve o
  `index.html` em qualquer rota)
- Build output directory: `dist`
- Variáveis: `VITE_BASE=/`, `VITE_SITE_URL=https://encyclobol.com.br`,
  `NODE_VERSION=22`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

O build usa `npm ci`: o `web/package-lock.json` precisa estar em dia com o
`package.json` (rode `npm install` em `web/` ao mexer em dependências).

## Domínio
- Registro na GoDaddy, nameservers apontados pro Cloudflare
  (`nadia.ns.cloudflare.com`, `weston.ns.cloudflare.com`).
- Projeto → **Custom domains**: `encyclobol.com.br` e `www.encyclobol.com.br`.
