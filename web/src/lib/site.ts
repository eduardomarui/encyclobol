// Endereço público do Encyclobol. Vem do build (VITE_SITE_URL): GitHub Pages,
// Cloudflare Pages ou o domínio próprio. Sem ela, cai no GitHub Pages.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://encyclobol.com.br').replace(/\/$/, '')
export const SITE_LABEL = SITE_URL.replace(/^https?:\/\//, '')

// Link direto de uma página (ex.: '/jogos/conexoes').
// Rotas de página levam a barra final (é o endereço que o servidor serve sem redirecionar).
const slash = (path: string) => (/^\/[^?#.]*[^/?#.]$/.test(path.split(/[?#]/)[0]) ? path.replace(/^([^?#]*)/, '$1/') : path)
export const siteLink = (path = '') => `${SITE_URL}${slash(path)}`
