// Persistência local de "O Intruso": resultado do dia + estatísticas.
import { dayNumber } from './daily'

export type IntrusoDaily = {
  day: number
  picks: number[]
  answers: number[] // índice escolhido por rodada (-1 = não respondeu)
  score: number
}

export type IntrusoStats = {
  played: number
  best: number
  totalScore: number
  totalRounds: number
  currentStreak: number
  maxStreak: number
  lastDay: number | null
}

const STATE_KEY = 'encyclobol:intruso:state'
const STATS_KEY = 'encyclobol:intruso:stats'

const emptyStats: IntrusoStats = {
  played: 0,
  best: 0,
  totalScore: 0,
  totalRounds: 0,
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

export function loadIntrusoDaily(): IntrusoDaily | null {
  const s = read<IntrusoDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveIntrusoDaily(s: IntrusoDaily) {
  write(STATE_KEY, s)
}

export function loadIntrusoStats(): IntrusoStats {
  return read<IntrusoStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordIntruso(score: number, rounds: number): IntrusoStats {
  const stats = loadIntrusoStats()
  const today = dayNumber()
  stats.played += 1
  stats.best = Math.max(stats.best, score)
  stats.totalScore += score
  stats.totalRounds += rounds
  stats.currentStreak = stats.lastDay === today - 1 ? stats.currentStreak + 1 : 1
  stats.lastDay = today
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  write(STATS_KEY, stats)
  return stats
}
