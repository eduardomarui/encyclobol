// Time do coração: escolhido uma vez, guardado no aparelho e (quando há
// sessão e apelido) no servidor, que recusa troca.
import { supabase } from './supabase'
import { dayNumber } from './daily'
import { clubeById, type Clube } from '../data/clubes'

const KEY = 'encyclobol:team'
const listeners = new Set<() => void>()

export function myTeamId(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}
export const myTeam = (): Clube | null => clubeById(myTeamId())
export function subscribeTeam(f: () => void) {
  listeners.add(f)
  return () => listeners.delete(f)
}

// Escolha definitiva. Grava local na hora; no servidor quando der.
export async function chooseTeam(id: string): Promise<void> {
  if (myTeamId()) throw new Error('Você já escolheu seu time.')
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* ignore */
  }
  listeners.forEach((f) => f())
  await pushTeam()
}

// Sobe o time pro servidor (idempotente). Se o servidor já tinha outro
// time (outro aparelho), vale o do servidor.
export async function pushTeam(): Promise<void> {
  const id = myTeamId()
  if (!supabase || !id) return
  const { data: sess } = await supabase.auth.getSession()
  if (!sess.session) return
  const { error } = await supabase.rpc('set_team', { p_team: id })
  if (error && /ja escolhido/.test(error.message)) {
    const { data } = await supabase.from('profiles').select('team').eq('id', sess.session.user.id).maybeSingle()
    const t = (data as { team?: string } | null)?.team
    if (t) {
      try {
        localStorage.setItem(KEY, t)
      } catch {
        /* ignore */
      }
      listeners.forEach((f) => f())
    }
  }
}

// Semana começa na segunda-feira (dayNumber do primeiro dia).
export function weekStartDay(d = new Date()): number {
  const back = (d.getDay() + 6) % 7
  return dayNumber(d) - back
}

export type TorcidaRow = { team: string; fans: number; avg_points: number; my_team: boolean }
export async function torcidaBoard(min = 3): Promise<TorcidaRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase.rpc('torcida_board', { p_from_day: weekStartDay(), p_min: min })
  if (error) throw new Error(error.message)
  return (data as TorcidaRow[]) ?? []
}
