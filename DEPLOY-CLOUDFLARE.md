# Encyclobol no Cloudflare Pages + encyclobol.com.br

O código e a esteira já estão prontos (`.github/workflows/deploy-cloudflare.yml`).
Faltam só os passos de conta, que precisam do seu login. Leva uns 10 minutos.

## 1. Cloudflare: conta e domínio
1. Entre em https://dash.cloudflare.com (crie a conta se não tiver; plano Free).
2. **Add a domain** → `encyclobol.com.br` → plano **Free** → continue.
3. O Cloudflare mostra **dois nameservers** (algo como `xxx.ns.cloudflare.com`). Deixe essa tela aberta.

## 2. GoDaddy: apontar o domínio pro Cloudflare
1. GoDaddy → **Meus produtos** → `encyclobol.com.br` → **DNS** → **Servidores de nomes** → **Alterar**.
2. Escolha **"Vou usar meus próprios servidores de nomes"** e cole os dois do Cloudflare. Salve.
3. Volte ao Cloudflare e clique **Check nameservers**. Pode levar de minutos a algumas horas (.com.br costuma ser rápido).

## 3. Chave pra esteira publicar sozinha
1. Cloudflare → ícone do perfil → **My Profile** → **API Tokens** → **Create Token** → **Create Custom Token**.
   - Nome: `encyclobol-deploy`
   - Permissão: **Account** · **Cloudflare Pages** · **Edit**
   - Account Resources: a sua conta
   - Crie e **copie o token** (só aparece uma vez).
2. Copie também o **Account ID** (fica na lateral direita da página inicial da conta, ou em Workers & Pages).
3. GitHub → repositório `encyclobol` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - `CLOUDFLARE_API_TOKEN` = o token
   - `CLOUDFLARE_ACCOUNT_ID` = o Account ID
4. Em **Actions**, rode de novo o workflow **Deploy para Cloudflare Pages** (ou faça qualquer push). Ele cria o projeto `encyclobol` e publica em `https://encyclobol.pages.dev`.

## 4. Ligar o domínio ao site
1. Cloudflare → **Workers & Pages** → projeto **encyclobol** → **Custom domains** → **Set up a custom domain**:
   - `encyclobol.com.br` (o Cloudflare cria o DNS sozinho)
   - repita com `www.encyclobol.com.br`
2. Pronto: `https://encyclobol.com.br` com HTTPS grátis. Me avise que eu:
   - passo os links do GitHub Pages pra redirecionar pro domínio;
   - atualizo canonical/sitemap e confiro a prévia no WhatsApp no endereço novo.

As chaves do Supabase (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) já estão nos segredos do GitHub e a esteira do Cloudflare usa as mesmas — não precisa colocar nada no Cloudflare.
