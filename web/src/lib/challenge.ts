// Link de desafio: o resultado compartilhado leva quem recebe pro MESMO jogo
// do dia, com a meta de quem mandou ("Edu fez 820 — bate ele").
import { dayNumber } from './daily'
import { siteLink } from './site'

const NICK_KEY = 'encyclobol:nick'
export function rememberNick(nick: string | null | undefined) {
  try {
    if (nick) localStorage.setItem(NICK_KEY, nick)
  } catch {
    /* ignore */
  }
}
export function knownNick(): string | null {
  try {
    return localStorage.getItem(NICK_KEY)
  } catch {
    return null
  }
}

// Link pro jogo com a meta (pontos), quem mandou e a edição do dia.
export function challengeLink(path: string, points: number): string {
  const q = new URLSearchParams({ vs: String(Math.max(0, Math.round(points))), ed: String(dayNumber()) })
  const nick = knownNick()
  if (nick) q.set('de', nick)
  return `${siteLink(path)}?${q.toString()}`
}

export type Challenge = { pts: number; from: string }
// Desafio só vale na mesma edição (um desafio de ontem não aparece hoje).
export function readChallenge(): Challenge | null {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search)
  const pts = Number(q.get('vs'))
  const ed = Number(q.get('ed'))
  if (!Number.isFinite(pts) || !q.has('vs') || ed !== dayNumber()) return null
  const from = (q.get('de') ?? 'Um amigo').slice(0, 20)
  return { pts, from }
}
