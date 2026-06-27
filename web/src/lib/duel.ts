// Duelo de Pênaltis em tempo real (Supabase Realtime).
import { supabase } from './supabase'
import { quiz } from '../data/quiz'
import { seededShuffle } from './daily'

export type Match = {
  id: string
  code: string
  host_id: string
  guest_id: string | null
  host_nick: string
  guest_nick: string | null
  seed: number
  rounds: number
  status: 'waiting' | 'playing' | 'done'
}

export type Move = {
  match_id: string
  round: number
  player_id: string
  choice: number
  correct: boolean
}

export type PQ = { q: string; cat: string; options: string[]; correct: number }

const EASY = quiz.flatMap((q, i) => (q.dif === 'facil' ? [i] : []))
const HARD = quiz.flatMap((q, i) => (q.dif === 'dificil' ? [i] : []))

function prep(bi: number, seed: number): PQ {
  const base = quiz[bi]
  const order = seededShuffle(base.options.map((_, i) => i), seed)
  return {
    q: base.q,
    cat: base.cat,
    options: order.map((i) => base.options[i]),
    correct: order.indexOf(base.correct),
  }
}

// Pergunta do CHUTE (fácil) — determinística por (seed, round), igual pros dois.
export function duelShot(seed: number, round: number): PQ {
  const pool = seededShuffle(EASY, seed)
  return prep(pool[round % pool.length], seed + round * 13 + 1)
}

// Pergunta da DEFESA (difícil) — determinística por (seed, round).
export function duelDefense(seed: number, round: number): PQ {
  const pool = seededShuffle(HARD, seed + 999)
  return prep(pool[round % pool.length], seed + round * 17 + 5)
}

export async function myId(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
}

export async function createMatch(rounds = 5): Promise<Match> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('create_match', { p_rounds: rounds })
  if (error) throw new Error(error.message || 'falha ao criar a partida')
  if (!data) throw new Error('falha ao criar a partida')
  return data as Match
}

export async function joinMatch(code: string): Promise<Match> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('join_match', { p_code: code.trim().toUpperCase() })
  if (error) throw new Error(error.message || 'falha ao entrar na partida')
  if (!data) throw new Error('partida nao encontrada')
  return data as Match
}

export async function rematch(matchId: string): Promise<Match> {
  if (!supabase) throw new Error('online indisponível')
  const { data, error } = await supabase.rpc('rematch', { p_match_id: matchId })
  if (error) throw new Error(error.message)
  return data as Match
}

export async function getMatch(id: string): Promise<Match | null> {
  if (!supabase) return null
  const { data } = await supabase.from('matches').select('*').eq('id', id).maybeSingle()
  return (data as Match) ?? null
}

export async function getMoves(id: string): Promise<Move[]> {
  if (!supabase) return []
  const { data } = await supabase.from('match_moves').select('*').eq('match_id', id)
  return (data as Move[]) ?? []
}

export async function submitMove(matchId: string, round: number, choice: number, correct: boolean) {
  if (!supabase) return
  const uid = await myId()
  if (!uid) return
  await supabase
    .from('match_moves')
    .upsert(
      { match_id: matchId, round, player_id: uid, choice, correct },
      { onConflict: 'match_id,round,player_id' },
    )
}

export async function finishMatch(id: string) {
  if (!supabase) return
  await supabase.from('matches').update({ status: 'done' }).eq('id', id)
}

// Assina mudanças da sala e das jogadas. Devolve função de limpeza.
export function subscribeMatch(
  id: string,
  onMatch: (m: Match) => void,
  onMove: (m: Move) => void,
): () => void {
  const sb = supabase
  if (!sb) return () => {}
  const ch = sb
    .channel(`match:${id}`)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'matches', filter: `id=eq.${id}` },
      (p) => onMatch(p.new as Match),
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'match_moves', filter: `match_id=eq.${id}` },
      (p) => onMove(p.new as Move),
    )
    .subscribe()
  return () => {
    sb.removeChannel(ch)
  }
}
