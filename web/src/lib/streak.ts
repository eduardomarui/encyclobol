// Ofensiva global (estilo Duolingo): dias seguidos jogando qualquer edição.
// Regras: perdeu um dia? Um "congelamento" salva a sequência automaticamente.
// Você ganha 1 congelamento a cada marco de 7 dias (guarda até 2).
import { dayNumber } from './daily'

const KEY = 'encyclobol:streak'
const MAX_FREEZES = 2

// Onde cada jogo guarda o resultado do dia (mesma lista usada no ranking).
const TODAY_KEYS = [
  'encyclobol:qse:career-today',
  'encyclobol:copa:today',
  'encyclobol:quarteto:today',
  'encyclobol:timeline:today',
  'encyclobol:intruso:today',
  'encyclobol:misterioso:today',
]

type State = {
  played: number[] // dias (dayNumber) em que jogou algo
  frozen: number[] // dias salvos por congelamento
  freezes: number // congelamentos disponíveis
  granted: number[] // marcos (7, 14, ...) que já deram congelamento
  best: number
}

export type DayState = 'played' | 'frozen' | 'missed' | 'today-pending'
export type Streak = {
  current: number
  best: number
  playedToday: boolean
  freezes: number
  hoursLeft: number // horas até a meia-noite local
  atRisk: boolean // tem ofensiva e ainda não jogou hoje
  days: { day: number; state: DayState }[] // últimos 14 dias, do mais antigo ao hoje
}

const empty: State = { played: [], frozen: [], freezes: 0, granted: [], best: 0 }

function read(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...empty, ...(JSON.parse(raw) as State) } : { ...empty }
  } catch {
    return { ...empty }
  }
}
function write(s: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* sem persistência */
  }
}

function playedTodayFromGames(today: number): boolean {
  return TODAY_KEYS.some((k) => {
    try {
      const raw = localStorage.getItem(k)
      return !!raw && (JSON.parse(raw) as { day?: number }).day === today
    } catch {
      return false
    }
  })
}

export function hoursUntilMidnight(): number {
  const now = new Date()
  const end = new Date(now)
  end.setHours(24, 0, 0, 0)
  return Math.max(1, Math.ceil((end.getTime() - now.getTime()) / 3.6e6))
}

// Lê, atualiza (registra o dia de hoje, aplica congelamento, concede marcos) e devolve a ofensiva.
export function getStreak(): Streak {
  const s = read()
  const today = dayNumber()
  let dirty = false

  const playedToday = playedTodayFromGames(today)
  if (playedToday && !s.played.includes(today)) {
    s.played.push(today)
    dirty = true
  }

  const has = (d: number) => s.played.includes(d) || s.frozen.includes(d)

  // Faltou ontem, mas a sequência vinha de antes? Congela ontem automaticamente.
  if (!has(today - 1) && has(today - 2) && s.freezes > 0) {
    s.frozen.push(today - 1)
    s.freezes -= 1
    dirty = true
  }

  // Conta a sequência a partir de hoje (se jogou) ou de ontem (ainda dá tempo hoje).
  const anchor = has(today) ? today : today - 1
  let current = 0
  for (let d = anchor; has(d); d--) current++

  // Marcos de 7 em 7 dias rendem um congelamento (até 2 guardados).
  if (current > 0 && current % 7 === 0 && !s.granted.includes(current)) {
    s.granted.push(current)
    s.freezes = Math.min(MAX_FREEZES, s.freezes + 1)
    dirty = true
  }

  if (current > s.best) {
    s.best = current
    dirty = true
  }
  if (dirty) write(s)

  const days: Streak['days'] = []
  for (let d = today - 13; d <= today; d++) {
    const state: DayState = s.played.includes(d)
      ? 'played'
      : s.frozen.includes(d)
        ? 'frozen'
        : d === today
          ? 'today-pending'
          : 'missed'
    days.push({ day: d, state })
  }

  return {
    current,
    best: s.best,
    playedToday,
    freezes: s.freezes,
    hoursLeft: hoursUntilMidnight(),
    atRisk: !playedToday && current > 0,
    days,
  }
}
