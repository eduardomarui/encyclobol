// Persistência local do Escalação: elenco do dia + total acumulado.
import { dayNumber } from './daily'

export type EscToday = { day: number; id: string; points: number; found: number; marks: boolean[] }

export type EscCareer = {
  total: number
  best: number // recorde de pontos num dia
  magos: number // dias com os 11
  days: number
  streak: number // dias seguidos jogando
  maxStreak: number
  lastDay: number | null
}

const TODAY_KEY = 'encyclobol:escalacao:today'
const CAREER_KEY = 'encyclobol:escalacao:career'

const emptyCareer: EscCareer = { total: 0, best: 0, magos: 0, days: 0, streak: 0, maxStreak: 0, lastDay: null }

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

export function loadEscToday(): EscToday | null {
  const t = read<EscToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadEscCareer(): EscCareer {
  const c: EscCareer = { ...emptyCareer, ...(read<EscCareer>(CAREER_KEY) ?? {}) }
  if (c.lastDay === null || c.lastDay < dayNumber() - 1) c.streak = 0
  return c
}

export function recordEscalacao(id: string, points: number, marks: boolean[]): EscCareer {
  const c = loadEscCareer()
  const today = dayNumber()
  const found = marks.filter(Boolean).length
  c.total += points
  c.best = Math.max(c.best, points)
  if (found === marks.length) c.magos += 1
  c.days += 1
  c.streak = c.lastDay === today - 1 ? c.streak + 1 : 1
  c.lastDay = today
  c.maxStreak = Math.max(c.maxStreak, c.streak)
  write(CAREER_KEY, c)
  write(TODAY_KEY, { day: today, id, points, found, marks })
  return c
}
