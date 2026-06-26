// Persistência local do Quarteto: corrida diária com pontos + total acumulado.
import { dayNumber } from './daily'

export type ConToday = {
  day: number
  points: number
  won: boolean
  mistakes: number
  rows: string[][] // cores de cada palpite, para o compartilhamento
}

export type ConCareer = {
  total: number
  best: number // melhor pontuação num dia
  days: number
  streak: number // ofensiva (dias seguidos com vitória)
  maxStreak: number
  lastDayWon: number | null
}

const TODAY_KEY = 'encyclobol:quarteto:today'
const CAREER_KEY = 'encyclobol:quarteto:career'

const emptyCareer: ConCareer = {
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

export function loadConToday(): ConToday | null {
  const t = read<ConToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadConCareer(): ConCareer {
  return read<ConCareer>(CAREER_KEY) ?? { ...emptyCareer }
}

export function recordConCareer(today: Omit<ConToday, 'day'>): ConCareer {
  const c = loadConCareer()
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
