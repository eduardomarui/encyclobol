// Persistência local (sem servidor): estado do jogo do dia + estatísticas.
import { dayNumber } from './daily'

export type DailyState = {
  day: number
  pick: number
  guesses: string[]
  status: 'won' | 'lost'
}

export type Stats = {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  lastDayWon: number | null
  dist: number[] // distribuição de tentativas (índice = tentativas - 1)
}

const STATE_KEY = 'encyclobol:qse:state'
const STATS_KEY = 'encyclobol:qse:stats'

const emptyStats: Stats = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastDayWon: null,
  dist: [0, 0, 0, 0, 0, 0],
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
    /* localStorage indisponível — segue sem persistir */
  }
}

// Só devolve o estado se for do dia de hoje.
export function loadDailyState(): DailyState | null {
  const s = read<DailyState>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveDailyState(s: DailyState) {
  write(STATE_KEY, s)
}

export function loadStats(): Stats {
  return read<Stats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordResult(won: boolean, attempts: number): Stats {
  const stats = loadStats()
  const today = dayNumber()
  stats.played += 1
  if (won) {
    stats.wins += 1
    stats.dist[Math.min(attempts, 6) - 1] += 1
    stats.currentStreak = stats.lastDayWon === today - 1 ? stats.currentStreak + 1 : 1
    stats.lastDayWon = today
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  } else {
    stats.currentStreak = 0
  }
  write(STATS_KEY, stats)
  return stats
}

// Recorde do Modo Carreira (escada).
const CAREER_KEY = 'encyclobol:qse:career'

export function loadCareerBest(): number {
  return read<number>(CAREER_KEY) ?? 0
}

export function saveCareerBest(n: number) {
  write(CAREER_KEY, n)
}
