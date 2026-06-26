// Persistência da Copa de Pênaltis: corrida diária + total acumulado.
import { dayNumber } from './daily'

export type CopaToday = {
  day: number
  points: number
  round: number // fase alcançada (1..4)
  champion: boolean
}

export type CopaStats = {
  total: number
  best: number // melhor pontuação num dia
  cups: number // copas conquistadas
  days: number
  lastDay: number | null
}

const STATS_KEY = 'encyclobol:copa:stats'
const TODAY_KEY = 'encyclobol:copa:today'

const empty: CopaStats = { total: 0, best: 0, cups: 0, days: 0, lastDay: null }

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

export function loadCopaToday(): CopaToday | null {
  const t = read<CopaToday>(TODAY_KEY)
  return t && t.day === dayNumber() ? t : null
}

export function loadCopaStats(): CopaStats {
  return read<CopaStats>(STATS_KEY) ?? { ...empty }
}

export function recordCopa(points: number, round: number, champion: boolean): CopaStats {
  const s = loadCopaStats()
  s.total += points
  s.best = Math.max(s.best, points)
  if (champion) s.cups += 1
  s.days += 1
  s.lastDay = dayNumber()
  write(STATS_KEY, s)
  write(TODAY_KEY, { day: dayNumber(), points, round, champion })
  return s
}
