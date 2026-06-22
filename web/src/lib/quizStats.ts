// Persistência local do Quiz Relâmpago: resultado do dia + estatísticas.
// Pontuação por velocidade + combo (não só acertos).
import { dayNumber } from './daily'

export type QuizDaily = {
  day: number
  picks: number[]
  answers: number[] // índice escolhido por pergunta (-1 = estourou o tempo)
  score: number // acertos
  points: number // pontuação (velocidade + combo)
}

export type QuizStats = {
  played: number
  best: number // melhor pontuação
  currentStreak: number
  maxStreak: number
  lastDay: number | null
}

const STATE_KEY = 'encyclobol:quiz:state'
const STATS_KEY = 'encyclobol:quiz:stats'

const emptyStats: QuizStats = {
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

export function loadQuizDaily(): QuizDaily | null {
  const s = read<QuizDaily>(STATE_KEY)
  return s && s.day === dayNumber() ? s : null
}

export function saveQuizDaily(s: QuizDaily) {
  write(STATE_KEY, s)
}

export function loadQuizStats(): QuizStats {
  return read<QuizStats>(STATS_KEY) ?? { ...emptyStats }
}

export function recordQuiz(points: number): QuizStats {
  const stats = loadQuizStats()
  const today = dayNumber()
  stats.played += 1
  stats.best = Math.max(stats.best, points)
  stats.currentStreak = stats.lastDay === today - 1 ? stats.currentStreak + 1 : 1
  stats.lastDay = today
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
  write(STATS_KEY, stats)
  return stats
}
