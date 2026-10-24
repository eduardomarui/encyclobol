// Endereço público do Encyclobol. Vem do build (VITE_SITE_URL): GitHub Pages,
// Cloudflare Pages ou o domínio próprio. Sem ela, cai no GitHub Pages.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://encyclobol.com.br').replace(/\/$/, '')
export const SITE_LABEL = SITE_URL.replace(/^https?:\/\//, '')

// Link direto de uma página (ex.: '/jogos/conexoes').
export const siteLink = (path = '') => `${SITE_URL}${path}`
