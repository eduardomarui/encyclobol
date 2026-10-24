// Clubes do "time do coração" (Brasil). Só nome e cores — nada de escudo,
// patrocínio ou desenho oficial de camisa: a camisa é estilizada, com um
// padrão genérico (listras, faixa, lisa) nas cores do clube.
// Série A 2026 conferida (Band, DCI, Soccerway): Athletico-PR, Atlético-MG,
// Bahia, Botafogo, Bragantino, Chapecoense, Corinthians, Coritiba, Cruzeiro,
// Flamengo, Fluminense, Grêmio, Internacional, Mirassol, Palmeiras, Remo,
// Santos, São Paulo, Vasco e Vitória. Os outros 20 são clubes de torcida
// grande fora da elite em 2026.

export type Padrao = 'lisa' | 'listras' | 'aros' | 'faixa' | 'banda' | 'metades'
export type Clube = {
  id: string
  nome: string
  uf: string
  serieA2026: boolean
  padrao: Padrao
  cores: string[] // [base, detalhe, (terceira)]
  gola: string
}

export const CLUBES: Clube[] = [
  { id: 'flamengo', nome: 'Flamengo', uf: 'RJ', serieA2026: true, padrao: 'aros', cores: ['#c4161c', '#111111'], gola: '#111111' },
  { id: 'vasco', nome: 'Vasco', uf: 'RJ', serieA2026: true, padrao: 'faixa', cores: ['#111111', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'fluminense', nome: 'Fluminense', uf: 'RJ', serieA2026: true, padrao: 'listras', cores: ['#7a1630', '#0b6b3a', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'botafogo', nome: 'Botafogo', uf: 'RJ', serieA2026: true, padrao: 'listras', cores: ['#111111', '#f5f5f5'], gola: '#111111' },
  { id: 'corinthians', nome: 'Corinthians', uf: 'SP', serieA2026: true, padrao: 'lisa', cores: ['#f5f5f5', '#111111'], gola: '#111111' },
  { id: 'palmeiras', nome: 'Palmeiras', uf: 'SP', serieA2026: true, padrao: 'lisa', cores: ['#0a6b3d', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'saopaulo', nome: 'São Paulo', uf: 'SP', serieA2026: true, padrao: 'banda', cores: ['#f5f5f5', '#c4161c', '#111111'], gola: '#c4161c' },
  { id: 'santos', nome: 'Santos', uf: 'SP', serieA2026: true, padrao: 'lisa', cores: ['#f5f5f5', '#111111'], gola: '#111111' },
  { id: 'bragantino', nome: 'Bragantino', uf: 'SP', serieA2026: true, padrao: 'lisa', cores: ['#f5f5f5', '#c4161c'], gola: '#c4161c' },
  { id: 'mirassol', nome: 'Mirassol', uf: 'SP', serieA2026: true, padrao: 'lisa', cores: ['#f2c500', '#0a6b3d'], gola: '#0a6b3d' },
  { id: 'atleticomg', nome: 'Atlético-MG', uf: 'MG', serieA2026: true, padrao: 'listras', cores: ['#111111', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'cruzeiro', nome: 'Cruzeiro', uf: 'MG', serieA2026: true, padrao: 'lisa', cores: ['#1a3fa0', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'gremio', nome: 'Grêmio', uf: 'RS', serieA2026: true, padrao: 'listras', cores: ['#3a9ad9', '#111111', '#f5f5f5'], gola: '#111111' },
  { id: 'internacional', nome: 'Internacional', uf: 'RS', serieA2026: true, padrao: 'lisa', cores: ['#d0111b', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'athletico', nome: 'Athletico-PR', uf: 'PR', serieA2026: true, padrao: 'aros', cores: ['#d0111b', '#111111'], gola: '#111111' },
  { id: 'coritiba', nome: 'Coritiba', uf: 'PR', serieA2026: true, padrao: 'aros', cores: ['#f5f5f5', '#0a6b3d'], gola: '#0a6b3d' },
  { id: 'bahia', nome: 'Bahia', uf: 'BA', serieA2026: true, padrao: 'banda', cores: ['#f5f5f5', '#1a3fa0', '#d0111b'], gola: '#1a3fa0' },
  { id: 'vitoria', nome: 'Vitória', uf: 'BA', serieA2026: true, padrao: 'aros', cores: ['#d0111b', '#111111'], gola: '#111111' },
  { id: 'chapecoense', nome: 'Chapecoense', uf: 'SC', serieA2026: true, padrao: 'lisa', cores: ['#0a7a3e', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'remo', nome: 'Remo', uf: 'PA', serieA2026: true, padrao: 'lisa', cores: ['#1b2a5c', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'sport', nome: 'Sport', uf: 'PE', serieA2026: false, padrao: 'aros', cores: ['#d0111b', '#111111'], gola: '#111111' },
  { id: 'santacruz', nome: 'Santa Cruz', uf: 'PE', serieA2026: false, padrao: 'aros', cores: ['#111111', '#f5f5f5', '#d0111b'], gola: '#d0111b' },
  { id: 'nautico', nome: 'Náutico', uf: 'PE', serieA2026: false, padrao: 'listras', cores: ['#d0111b', '#f5f5f5'], gola: '#d0111b' },
  { id: 'ceara', nome: 'Ceará', uf: 'CE', serieA2026: false, padrao: 'listras', cores: ['#111111', '#f5f5f5'], gola: '#111111' },
  { id: 'fortaleza', nome: 'Fortaleza', uf: 'CE', serieA2026: false, padrao: 'aros', cores: ['#1a3fa0', '#d0111b', '#f5f5f5'], gola: '#1a3fa0' },
  { id: 'paysandu', nome: 'Paysandu', uf: 'PA', serieA2026: false, padrao: 'listras', cores: ['#3a9ad9', '#f5f5f5'], gola: '#3a9ad9' },
  { id: 'juventude', nome: 'Juventude', uf: 'RS', serieA2026: false, padrao: 'listras', cores: ['#0a6b3d', '#f5f5f5'], gola: '#0a6b3d' },
  { id: 'goias', nome: 'Goiás', uf: 'GO', serieA2026: false, padrao: 'lisa', cores: ['#0a6b3d', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'atleticogo', nome: 'Atlético-GO', uf: 'GO', serieA2026: false, padrao: 'aros', cores: ['#d0111b', '#111111'], gola: '#111111' },
  { id: 'vilanova', nome: 'Vila Nova', uf: 'GO', serieA2026: false, padrao: 'lisa', cores: ['#d0111b', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'americamg', nome: 'América-MG', uf: 'MG', serieA2026: false, padrao: 'aros', cores: ['#0a6b3d', '#111111'], gola: '#111111' },
  { id: 'pontepreta', nome: 'Ponte Preta', uf: 'SP', serieA2026: false, padrao: 'faixa', cores: ['#f5f5f5', '#111111'], gola: '#111111' },
  { id: 'guarani', nome: 'Guarani', uf: 'SP', serieA2026: false, padrao: 'lisa', cores: ['#0a6b3d', '#f5f5f5'], gola: '#f5f5f5' },
  { id: 'portuguesa', nome: 'Portuguesa', uf: 'SP', serieA2026: false, padrao: 'banda', cores: ['#d0111b', '#0a6b3d', '#f5f5f5'], gola: '#0a6b3d' },
  { id: 'avai', nome: 'Avaí', uf: 'SC', serieA2026: false, padrao: 'listras', cores: ['#1a3fa0', '#f5f5f5'], gola: '#1a3fa0' },
  { id: 'figueirense', nome: 'Figueirense', uf: 'SC', serieA2026: false, padrao: 'listras', cores: ['#111111', '#f5f5f5'], gola: '#111111' },
  { id: 'criciuma', nome: 'Criciúma', uf: 'SC', serieA2026: false, padrao: 'listras', cores: ['#f2c500', '#111111', '#f5f5f5'], gola: '#111111' },
  { id: 'crb', nome: 'CRB', uf: 'AL', serieA2026: false, padrao: 'aros', cores: ['#d0111b', '#f5f5f5'], gola: '#d0111b' },
  { id: 'csa', nome: 'CSA', uf: 'AL', serieA2026: false, padrao: 'aros', cores: ['#1a3fa0', '#f5f5f5'], gola: '#1a3fa0' },
  { id: 'cuiaba', nome: 'Cuiabá', uf: 'MT', serieA2026: false, padrao: 'metades', cores: ['#0a6b3d', '#f2c500'], gola: '#f2c500' },
]

export const OUTRO: Clube = { id: 'outro', nome: 'Outro time', uf: '—', serieA2026: false, padrao: 'lisa', cores: ['#2f7549', '#e6b73e'], gola: '#e6b73e' }

export const clubeById = (id: string | null | undefined): Clube | null =>
  !id ? null : id === OUTRO.id ? OUTRO : CLUBES.find((c) => c.id === id) ?? null

// "do Flamengo", "da Portuguesa", "do São Paulo" — pra frases como "Torcedor do X".
const FEM = new Set(['portuguesa', 'chapecoense', 'ponte preta'])
export function doClube(c: Clube): string {
  if (c.id === OUTRO.id) return 'de outro time'
  return `${FEM.has(c.nome.toLowerCase()) ? 'da' : 'do'} ${c.nome}`
}
