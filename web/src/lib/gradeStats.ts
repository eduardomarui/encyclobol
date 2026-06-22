// Persistência local de "A Grade" (modo solo diário).
import { dayNumber } from './daily'

export type GradeDaily = {
  day: number
  filled: number
  points: number
}

export type GradeStats = {
  played: number
  best: number // melhor pontuação de raridade
  bestFilled: number // mais células preenchidas
  currentStreak: number
  maxStreak: number
  lastDay: number | null
}

const STATE_KEY = 'encyclobol:grade:state'
const STATS_KEY = 'encyclobol:grade:stats'

const emptyStats: GradeStats = {
  played: 0,
  best: 0,
  bestFilled: 0,
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

export function loadGradeDaily(): GradeDaily | null {
  const s = read<GradeDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveGradeDaily(s: GradeDaily) {
  write(STATE_KEY, s)
}

export function loadGradeStats(): GradeStats {
  return read<GradeStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordGrade(filled: number, points: number): GradeStats {
  const stats = loadGradeStats()
  const today = dayNumber()
  stats.played += 1
  stats.best = Math.max(stats.best, points)
  stats.bestFilled = Math.max(stats.bestFilled, filled)
  stats.currentStreak = stats.lastDay === today - 1 ? stats.currentStreak + 1 : 1
  stats.lastDay = today
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  write(STATS_KEY, stats)
  return stats
}
