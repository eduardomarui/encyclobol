// Persistência local da Linha do Tempo: corrida diária + total acumulado.
// Modo infinito: empilhe até perder as vidas; pontos com combo somam no total.
import { dayNumber } from './daily'

export type TLToday = { day: number; points: number; score: number }

export type TLCareer = {
  total: number
  best: number // recorde de pontos num dia
  bestScore: number // recorde de cartas empilhadas
  days: number
  streak: number // dias seguidos jogando
  maxStreak: number
  lastDay: number | null
}

const TODAY_KEY = 'encyclobol:timeline:today'
const CAREER_KEY = 'encyclobol:timeline:career'

const emptyCareer: TLCareer = {
  total: 0,
  best: 0,
  bestScore: 0,
  days: 0,
  streak: 0,
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

export function loadTLToday(): TLToday | null {
  const t = read<TLToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadTLCareer(): TLCareer {
  return { ...emptyCareer, ...(read<TLCareer>(CAREER_KEY) ?? {}) }
}

export function recordTLCareer(points: number, score: number): TLCareer {
  const c = loadTLCareer()
  const today = dayNumber()
  c.total += points
  c.best = Math.max(c.best, points)
  c.bestScore = Math.max(c.bestScore, score)
  c.days += 1
  c.streak = c.lastDay === today - 1 ? c.streak + 1 : 1
  c.lastDay = today
  c.maxStreak = Math.max(c.maxStreak, c.streak)
  write(CAREER_KEY, c)
  write(TODAY_KEY, { day: today, points, score })
  return c
}
