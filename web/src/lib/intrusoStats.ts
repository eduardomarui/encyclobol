// Persistência local de "O Intruso": corrida de sobrevivência + total acumulado.
import { dayNumber } from './daily'

export type IntrusoToday = { day: number; points: number; run: number }

export type IntrusoCareer = {
  total: number
  best: number // recorde de pontos num dia
  bestRun: number // recorde de intrusos caçados numa corrida
  days: number
  streak: number // dias seguidos jogando
  maxStreak: number
  lastDay: number | null
}

const TODAY_KEY = 'encyclobol:intruso:today'
const CAREER_KEY = 'encyclobol:intruso:career'

const emptyCareer: IntrusoCareer = {
  total: 0,
  best: 0,
  bestRun: 0,
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

export function loadIntrusoToday(): IntrusoToday | null {
  const t = read<IntrusoToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadIntrusoCareer(): IntrusoCareer {
  return { ...emptyCareer, ...(read<IntrusoCareer>(CAREER_KEY) ?? {}) }
}

export function recordIntrusoCareer(points: number, run: number): IntrusoCareer {
  const c = loadIntrusoCareer()
  const today = dayNumber()
  c.total += points
  c.best = Math.max(c.best, points)
  c.bestRun = Math.max(c.bestRun, run)
  c.days += 1
  c.streak = c.lastDay === today - 1 ? c.streak + 1 : 1
  c.lastDay = today
  c.maxStreak = Math.max(c.maxStreak, c.streak)
  write(CAREER_KEY, c)
  write(TODAY_KEY, { day: today, points, run })
  return c
}
