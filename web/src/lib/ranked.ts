// Duelo ranqueado assíncrono: você enfrenta o "fantasma" de outro jogador de
// nível parecido (as respostas gravadas dele, nas mesmas perguntas, com os
// papéis invertidos). Divisões de campeonato e temporada mensal.
import { supabase } from './supabase'

export const ROUNDS = 6 // 3 cobranças pra cada lado (igual à Copa)

// Temporada = mês corrente ("2026-10").
export function currentSeason(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
export function seasonLabel(season: string): string {
  const [y, m] = season.split('-').map(Number)
  return `Temporada de ${MESES[m - 1]} ${y}`
}
export function daysLeftInSeason(d = new Date()): number {
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  return Math.max(1, Math.ceil((end.getTime() - d.getTime()) / 86_400_000))
}

// Divisões pela nota. Começa na Série D (900).
export type Division = { id: string; name: string; min: number; next: number | null }
export const DIVISIONS: Division[] = [
  { id: 'd', name: 'Série D', min: 0, next: 1000 },
  { id: 'c', name: 'Série C', min: 1000, next: 1150 },
  { id: 'b', name: 'Série B', min: 1150, next: 1300 },
  { id: 'a', name: 'Série A', min: 1300, next: 1450 },
  { id: 'elite', name: 'Elite', min: 1450, next: null },
]
export function divisionOf(rating: number): Division {
  return [...DIVISIONS].reverse().find((d) => rating >= d.min) ?? DIVISIONS[0]
}
// Progresso (0–1) dentro da divisão, pra barra de acesso.
export function divisionProgress(rating: number): number {
  const d = divisionOf(rating)
  if (!d.next) return 1
  return Math.max(0, Math.min(1, (rating - d.min) / (d.next - d.min)))
}

export type Answer = { r: number; c: boolean; ms: number }
export type RankedProfile = { rating: number; peak: number; wins: number; draws: number; losses: number }
export type Ghost = { id: string | null; seed: number; kicksEven: boolean; answers: Answer[]; rating: number; nick: string; bot: boolean }
export type BoardRow = { nick: string; rating: number; wins: number; draws: number; losses: number; is_me: boolean }

// O SQL da ranqueada ainda não foi rodado no Supabase?
let missing = false
export const rankedMissing = () => missing
function check(error: { message?: string } | null) {
  if (error && /ranked_|function|does not exist|schema cache/i.test(error.message ?? '')) missing = true
  if (error) throw new Error(error.message || 'falha na ranqueada')
}

export async function rankedMe(season = currentSeason()): Promise<RankedProfile> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('ranked_me', { p_season: season })
  check(error)
  return data as RankedProfile
}

// Robôs de reserva (sempre identificados como robô, fora da tabela): um por
// divisão, cada um com um jeito. `atk`/`def`: chance de acertar cobrando/defendendo.
const BOTS: Record<string, { nick: string; atk: number; def: number }> = {
  d: { nick: 'Robô Peladeiro', atk: 0.55, def: 0.3 },
  c: { nick: 'Robô Volante', atk: 0.55, def: 0.5 },
  b: { nick: 'Robô Camisa 10', atk: 0.75, def: 0.45 },
  a: { nick: 'Robô Professor', atk: 0.75, def: 0.65 },
  elite: { nick: 'Robô Lenda', atk: 0.88, def: 0.75 },
}
export function botGhost(rating: number, kicksEven: boolean): Ghost {
  const seed = Math.floor(Math.random() * 1e9)
  let s = seed || 1
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32)
  const bot = BOTS[divisionOf(rating).id]
  const answers: Answer[] = Array.from({ length: ROUNDS }, (_, r) => {
    const kicking = (r % 2 === 0) === kicksEven
    return { r, c: rnd() < (kicking ? bot.atk : bot.def), ms: 2500 + Math.floor(rnd() * 4000) }
  })
  return { id: null, seed, kicksEven, answers, rating, nick: bot.nick, bot: true }
}

// ---------- Fila ao vivo ----------
export async function queueJoin(season = currentSeason()): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('ranked_queue_join', { p_season: season })
  check(error)
  return (data as string | null) ?? null
}
export async function queuePoll(): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('ranked_queue_poll')
  check(error)
  return (data as string | null) ?? null
}
export async function queueLeave(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.rpc('ranked_queue_leave')
  return (data as string | null) ?? null
}
// Fecha a ranqueada ao vivo (placar contado no servidor pelas jogadas dos dois).
export async function liveResult(matchId: string): Promise<{ rating: number; delta: number; opp_rating: number } | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('ranked_live_result', { p_match: matchId })
  if (error) throw new Error(error.message)
  return ((data as { rating: number; delta: number; opp_rating: number }[]) ?? [])[0] ?? null
}

export async function findGhost(myRating: number, season = currentSeason()): Promise<Ghost> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('ranked_ghost', { p_season: season })
  check(error)
  const g = (data as { id: string; seed: number; kicks_even: boolean; answers: Answer[]; rating_at: number; nick: string }[] | null)?.[0]
  // Sem ninguém por perto ainda (começo do jogo): robô com nota parecida.
  if (!g) return botGhost(myRating + Math.round((Math.random() - 0.5) * 80), Math.random() < 0.5)
  return { id: g.id, seed: g.seed, kicksEven: g.kicks_even, answers: g.answers, rating: g.rating_at, nick: g.nick, bot: false }
}

export async function submitRanked(opts: {
  ghost: Ghost
  answers: Answer[]
  result: 0 | 0.5 | 1
  season?: string
}): Promise<RankedProfile & { delta: number }> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('ranked_submit', {
    p_season: opts.season ?? currentSeason(),
    p_seed: opts.ghost.seed,
    // Eu jogo o papel oposto ao do fantasma.
    p_kicks_even: !opts.ghost.kicksEven,
    p_answers: opts.answers,
    p_result: opts.result,
    p_opp_run: opts.ghost.id,
    p_bot_rating: opts.ghost.bot ? opts.ghost.rating : null,
  })
  check(error)
  return (data as (RankedProfile & { delta: number })[])[0]
}

export async function rankedBoard(season = currentSeason()): Promise<BoardRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase.rpc('ranked_board', { p_season: season, p_limit: 30 })
  check(error)
  return (data as BoardRow[]) ?? []
}
