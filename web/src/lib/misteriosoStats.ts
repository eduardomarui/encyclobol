// Persistência local do Craque Misterioso: corrida diária + total acumulado.
import { dayNumber } from './daily'

export type MystToday = {
  day: number
  won: boolean
  guesses: number
  points: number
  rows: string[][] // feedback (emojis) por palpite, para o compartilhamento
}

export type MystCareer = {
  total: number
  best: number // recorde de pontos num dia
  days: number
  streak: number // dias seguidos desvendando
  maxStreak: number
  lastDayWon: number | null
}

const TODAY_KEY = 'encyclobol:misterioso:today'
const CAREER_KEY = 'encyclobol:misterioso:career'

const emptyCareer: MystCareer = {
  total: 0,
  best: 0,
  days: 0,
  streak: 0,
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

export function loadMystToday(): MystToday | null {
  const t = read<MystToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadMystCareer(): MystCareer {
  return { ...emptyCareer, ...(read<MystCareer>(CAREER_KEY) ?? {}) }
}

export function recordMystCareer(today: Omit<MystToday, 'day'>): MystCareer {
  const c = loadMystCareer()
  const day = dayNumber()
  c.total += today.points
  c.best = Math.max(c.best, today.points)
  c.days += 1
  if (today.won) {
    c.streak = c.lastDayWon === day - 1 ? c.streak + 1 : 1
    c.lastDayWon = day
    c.maxStreak = Math.max(c.maxStreak, c.streak)
  } else {
    c.streak = 0
  }
  write(CAREER_KEY, c)
  write(TODAY_KEY, { day, ...today })
  return c
}
