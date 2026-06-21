// Persistência local do Conexões: resultado do dia + estatísticas.
import { dayNumber } from './daily'

export type ConDaily = {
  day: number
  won: boolean
  mistakes: number
  rows: string[][] // cores de cada palpite, para o compartilhamento
}

export type ConStats = {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  lastDayWon: number | null
}

const STATE_KEY = 'encyclobol:conexoes:state'
const STATS_KEY = 'encyclobol:conexoes:stats'

const emptyStats: ConStats = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastDayWon: null,
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

export function loadConDaily(): ConDaily | null {
  const s = read<ConDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveConDaily(s: ConDaily) {
  write(STATE_KEY, s)
}

export function loadConStats(): ConStats {
  return read<ConStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordCon(won: boolean): ConStats {
  const stats = loadConStats()
  const today = dayNumber()
  stats.played += 1
  if (won) {
    stats.wins += 1
    stats.currentStreak = stats.lastDayWon === today - 1 ? stats.currentStreak + 1 : 1
    stats.lastDayWon = today
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  } else {
    stats.currentStreak = 0
  }
  write(STATS_KEY, stats)
  return stats
}
