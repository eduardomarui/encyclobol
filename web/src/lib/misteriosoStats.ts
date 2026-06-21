// Persistência local do Craque Misterioso: resultado do dia + estatísticas.
import { dayNumber } from './daily'

export type MystDaily = {
  day: number
  won: boolean
  guesses: number
  rows: string[][] // feedback (emojis) por palpite, para o compartilhamento
}

export type MystStats = {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  lastDayWon: number | null
}

const STATE_KEY = 'encyclobol:misterioso:state'
const STATS_KEY = 'encyclobol:misterioso:stats'

const emptyStats: MystStats = {
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

export function loadMystDaily(): MystDaily | null {
  const s = read<MystDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveMystDaily(s: MystDaily) {
  write(STATE_KEY, s)
}

export function loadMystStats(): MystStats {
  return read<MystStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordMyst(won: boolean): MystStats {
  const stats = loadMystStats()
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
