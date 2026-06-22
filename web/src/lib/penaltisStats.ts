// Persistência local da Disputa de Pênaltis: resultado do dia + estatísticas.
import { dayNumber } from './daily'

export type PenDaily = {
  day: number
  myGoals: number
  oppGoals: number
  won: boolean
}

export type PenStats = {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  lastDay: number | null
}

const STATE_KEY = 'encyclobol:penaltis:state'
const STATS_KEY = 'encyclobol:penaltis:stats'

const emptyStats: PenStats = {
  played: 0,
  wins: 0,
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

export function loadPenDaily(): PenDaily | null {
  const s = read<PenDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function savePenDaily(s: PenDaily) {
  write(STATE_KEY, s)
}

export function loadPenStats(): PenStats {
  return read<PenStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordPen(won: boolean): PenStats {
  const stats = loadPenStats()
  const today = dayNumber()
  stats.played += 1
  if (won) {
    stats.wins += 1
    stats.currentStreak = stats.lastDay === today - 1 ? stats.currentStreak + 1 : 1
    stats.lastDay = today
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  } else {
    stats.currentStreak = 0
  }
  write(STATS_KEY, stats)
  return stats
}
