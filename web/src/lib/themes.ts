// Temas (campeonatos) das perguntas — usados na Copa de Pênaltis e no Duelo.
// Um tema é um conjunto de categorias do quiz. Só aparece na interface quando
// tem perguntas suficientes pra uma disputa inteira sem repetir.
import { quiz } from '../data/quiz'
import { seededShuffle } from './daily'

export type Theme = { id: string; label: string; cats: string[] | null }

export const THEMES: Theme[] = [
  { id: 'geral', label: 'Geral', cats: null },
  { id: 'copas', label: 'Copas do Mundo', cats: ['Copas', 'Copa 2026'] },
  { id: 'brasileirao', label: 'Brasileirão', cats: ['Brasileirão', 'Copa do Brasil'] },
  { id: 'libertadores', label: 'Libertadores', cats: ['Libertadores'] },
  { id: 'champions', label: 'Champions League', cats: ['Champions'] },
  { id: 'premier', label: 'Campeonato Inglês', cats: ['Premier League'] },
  { id: 'laliga', label: 'Campeonato Espanhol', cats: ['La Liga'] },
  { id: 'seriea', label: 'Campeonato Italiano', cats: ['Serie A'] },
  { id: 'bundesliga', label: 'Campeonato Alemão', cats: ['Bundesliga'] },
  { id: 'selecoes', label: 'Seleções, Euro e Copa América', cats: ['Brasil', 'Seleções', 'Euro', 'Copa América'] },
  {
    id: 'lendas',
    label: 'Lendas, clubes e recordes',
    cats: ['Lendas', 'Craques', 'Apelidos', 'Recordes', 'Bola de Ouro', 'Técnicos', 'Clubes', 'Estádios', 'Regras'],
  },
]

// Mínimo por dificuldade pra um tema entrar na lista. Uma Copa inteira usa 20
// por dificuldade; abaixo disso o pool dá a volta e pode repetir uma ou outra
// pergunta nas fases finais — aceitável enquanto o tema engorda.
const MIN_PER_DIF = 12

export type Pools = { easy: number[]; hard: number[] }

const ALL: Pools = {
  easy: quiz.flatMap((q, i) => (q.dif === 'facil' ? [i] : [])),
  hard: quiz.flatMap((q, i) => (q.dif === 'dificil' ? [i] : [])),
}

const cache = new Map<string, Pools>()

export function poolsFor(themeId: string): Pools {
  const hit = cache.get(themeId)
  if (hit) return hit
  const t = THEMES.find((x) => x.id === themeId)
  let pools: Pools
  if (!t || !t.cats) pools = ALL
  else {
    const set = new Set(t.cats)
    pools = {
      easy: quiz.flatMap((q, i) => (q.dif === 'facil' && set.has(q.cat) ? [i] : [])),
      hard: quiz.flatMap((q, i) => (q.dif === 'dificil' && set.has(q.cat) ? [i] : [])),
    }
  }
  cache.set(themeId, pools)
  return pools
}

// Quantas perguntas o tema tem (pra mostrar na interface).
export function themeSize(themeId: string): number {
  const p = poolsFor(themeId)
  return p.easy.length + p.hard.length
}

// Temas com conteúdo suficiente pra jogar. "Geral" sempre entra.
export function availableThemes(): Theme[] {
  return THEMES.filter((t) => {
    const p = poolsFor(t.id)
    return t.id === 'geral' || (p.easy.length >= MIN_PER_DIF && p.hard.length >= MIN_PER_DIF)
  })
}

export function themeLabel(themeId: string): string {
  return THEMES.find((t) => t.id === themeId)?.label ?? 'Geral'
}

export function isTheme(id: string | null | undefined): id is string {
  return !!id && THEMES.some((t) => t.id === id)
}

// Hash estável do tema pra entrar na semente diária (cada tema tem sua sequência).
export function themeSeed(themeId: string): number {
  let h = 7
  for (const ch of themeId) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h % 100000
}

// Seleção determinística de n índices de um pool (sem repetir dentro da chamada).
export function pickFrom(pool: number[], n: number, seed: number): number[] {
  return seededShuffle(pool, seed).slice(0, n)
}

const THEME_KEY = 'encyclobol:theme'
export function loadTheme(): string {
  try {
    const v = localStorage.getItem(THEME_KEY)
    return isTheme(v) ? v : 'geral'
  } catch {
    return 'geral'
  }
}
export function saveTheme(id: string) {
  try {
    localStorage.setItem(THEME_KEY, id)
  } catch {
    /* ignore */
  }
}
