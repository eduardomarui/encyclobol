// Persistência local da Linha do Tempo: resultado do dia + estatísticas.
// Pontuação com multiplicador de sequência (não só nº de cartas).
import { dayNumber } from './daily'

export type TLDaily = { day: number; score: number; points: number }

export type TLStats = {
  played: number
  best: number // melhor pontuação
  currentStreak: number
  maxStreak: number
  lastDay: number | null
}

const STATE_KEY = 'encyclobol:timeline:state'
const STATS_KEY = 'encyclobol:timeline:stats'

const emptyStats: TLStats = {
  played: 0,
  best: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastDay: null,
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* sem persistência */
  }
}

export function loadTLDaily(): TLDaily | null {
  const s = read<TLDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveTLDaily(s: TLDaily) {
  write(STATE_KEY, s)
}

export function loadTLStats(): TLStats {
  return read<TLStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordTL(points: number): TLStats {
  const stats = loadTLStats()
  const today = dayNumber()
  stats.played += 1
  stats.best = Math.max(stats.best, points)
  stats.currentStreak = stats.lastDay === today - 1 ? stats.currentStreak + 1 : 1
  stats.lastDay = today
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  write(STATS_KEY, stats)
  return stats
}
