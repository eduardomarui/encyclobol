// Pós-build: cria dist/<rota>/index.html pra cada jogo com título, descrição
// e imagem de prévia próprios. Sem isso, o link de um jogo colado no WhatsApp
// caía no 404.html do GitHub Pages e a prévia saía em branco.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
// Endereço público: o domínio, ou VITE_SITE_URL num build pra outro endereço.
const DOMAIN = 'https://encyclobol.com.br'
const SITE = (process.env.VITE_SITE_URL || DOMAIN).replace(/\/$/, '')

const PAGES = [
  ['', 'default', 'Encyclobol — o almanaque jogável do futebol', 'Seis desafios diários de futebol. Sem chute, sem Google. Dispute com os amigos e com a sua torcida.'],
  ['jogos', 'jogos', 'Os jogos de hoje · Encyclobol', 'Seis desafios novos todo dia: Tira-Teima, Copa de Pênaltis, Quarteto, Linha do Tempo, O Intruso e Craque Misterioso.'],
  ['jogos/quem-sou-ele', 'quem-sou-ele', 'Tira-Teima · Encyclobol', 'Adivinhe o craque letra por letra, contra o relógio. Até onde vai a sua carreira hoje?'],
  ['jogos/penaltis', 'penaltis', 'Copa de Pênaltis · Encyclobol', 'Acertou a pergunta, é gol. Mata-mata em quatro fases: levante a taça.'],
  ['jogos/penaltis/online', 'penaltis-online', 'Duelo de Pênaltis · Encyclobol', 'Te desafiei: um bate, o outro defende, ao vivo. Entra na sala.'],
  ['jogos/penaltis/ranqueada', 'penaltis-ranqueada', 'Ranqueada · Encyclobol', 'Da Série D à Elite: suba de divisão na temporada do mês.'],
  ['jogos/conexoes', 'conexoes', 'Quarteto · Encyclobol', '16 craques, 4 grupos. Sempre tem uma isca.'],
  ['jogos/linha-do-tempo', 'linha-do-tempo', 'Linha do Tempo · Encyclobol', 'Coloque os craques na ordem da história, pelo ano de estreia.'],
  ['jogos/o-intruso', 'o-intruso', 'O Intruso · Encyclobol', 'Três craques têm algo em comum. Um é o infiltrado. Ache e diga o porquê.'],
  ['jogos/craque-misterioso', 'craque-misterioso', 'Craque Misterioso · Encyclobol', 'Seleção, posição, época: descubra o craque do dia em 8 chutes.'],
  ['jogos/escalacao', 'escalacao', 'Escalação · Encyclobol', 'Quem sabe todos é mago: escale de memória os 11 titulares de jogos marcantes.'],
  ['ranking', 'ranking', 'Ranking · Encyclobol', 'Ranking global, dos amigos e torcida contra torcida, toda semana.'],
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const html = readFileSync(join(DIST, 'index.html'), 'utf8')

function withMeta(src, route, slug, title, desc) {
  // Barra no fim: é o endereço final (sem ela o Cloudflare responde 308).
  const url = `${SITE}/${route}${route ? '/' : ''}`
  // ?v=: o WhatsApp guarda a prévia em cache; mudou a imagem, sobe a versão.
  const img = `${SITE}/og/${slug}.png?v=2`
  const set = (re, tag) => (re.test(src) ? (src = src.replace(re, tag)) : (src = src.replace('</head>', `    ${tag}\n  </head>`)))
  set(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
  set(/<meta\s+name="description"[^>]*>/s, `<meta name="description" content="${esc(desc)}" />`)
  set(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  set(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
  set(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(desc)}" />`)
  set(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${img}" />`)
  set(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  set(/<meta name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="summary_large_image" />`)
  set(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`)
  set(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(desc)}" />`)
  set(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${img}" />`)
  set(/<meta property="og:image:width"[^>]*>/, `<meta property="og:image:width" content="1200" />`)
  set(/<meta property="og:image:height"[^>]*>/, `<meta property="og:image:height" content="630" />`)
  return src
}

for (const [route, slug, title, desc] of PAGES) {
  const out = route ? join(DIST, route, 'index.html') : join(DIST, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, withMeta(html, route, slug, title, desc))
}
// robots.txt e sitemap.xml também apontam pro endereço do build.
for (const f of ['robots.txt', 'sitemap.xml']) {
  try {
    const path = join(DIST, f)
    writeFileSync(path, readFileSync(path, 'utf8').split(DOMAIN).join(SITE))
  } catch {
    /* arquivo ausente: segue */
  }
}
console.log(`og-pages: ${PAGES.length} páginas com prévia (${SITE})`)
