// Camada de ranking: sessão anônima, perfil, envio de placar e leaderboards.
// Tudo no-op quando o Supabase não está configurado.
import { supabase, rankingEnabled } from './supabase'
import { dayNumber } from './daily'
import { rememberNick } from './challenge'

export { rankingEnabled }

export type Profile = { nick: string; friend_code: string }
export type BoardRow = { nick: string; total: number; rank: number; is_me?: boolean; friend_code?: string }

// Mapa: cada jogo guarda o resultado do dia no localStorage com o campo de pontos.
// `full`: pontos de uma partida excelente no jogo, que viram nota 1.000 no
// ranking. Assim cada jogo pesa igual — antes Intruso e Linha do Tempo, sem
// teto, decidiam o ranking sozinhos.
const TODAY_KEYS: { game: string; key: string; field: string; full: number }[] = [
  { game: 'Tira-Teima', key: 'encyclobol:qse:career-today', field: 'score', full: 2400 },
  { game: 'Copa de Pênaltis', key: 'encyclobol:copa:today', field: 'points', full: 1600 },
  { game: 'Quarteto', key: 'encyclobol:quarteto:today', field: 'points', full: 960 },
  { game: 'Linha do Tempo', key: 'encyclobol:timeline:today', field: 'points', full: 330 },
  { game: 'O Intruso', key: 'encyclobol:intruso:today', field: 'points', full: 2000 },
  { game: 'Craque Misterioso', key: 'encyclobol:misterioso:today', field: 'points', full: 800 },
  // 11 × 100 + segundos que sobraram nos 11: uma escalação completa rápida.
  { game: 'Escalação', key: 'encyclobol:escalacao:today', field: 'points', full: 1200 },
]

// Nota de 0 a 1.000 que vai pro ranking.
export const rankNote = (points: number, full: number) => Math.max(0, Math.min(1000, Math.round((points / full) * 1000)))

export async function ensureSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session
  const { data: signed, error } = await supabase.auth.signInAnonymously()
  if (error) return null
  return signed.session ?? null
}

export async function getProfile(): Promise<Profile | null> {
  if (!supabase) return null
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) return null
  const { data } = await supabase
    .from('profiles')
    .select('nick, friend_code')
    .eq('id', u.user.id)
    .maybeSingle()
  rememberNick((data as Profile | null)?.nick)
  return (data as Profile) ?? null
}

export async function setNick(nick: string): Promise<Profile | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('set_nick', { p_nick: nick })
  if (error) throw new Error(error.message)
  rememberNick((data as Profile | null)?.nick ?? nick)
  return data as Profile
}

export async function addFriend(code: string): Promise<Profile> {
  if (!supabase) throw new Error('ranking desligado')
  const { data, error } = await supabase.rpc('add_friend', {
    p_code: code.trim().toUpperCase(),
  })
  if (error) throw new Error(error.message)
  return data as Profile
}

// Envia os resultados de hoje (lidos do localStorage) pro banco.
export async function syncToday() {
  if (!supabase) return
  // getSession lê a sessão local (sem ida ao servidor); sem sessão = não entrou no ranking.
  const { data: sess } = await supabase.auth.getSession()
  const u = { user: sess.session?.user ?? null }
  if (!u.user) return
  const day = dayNumber()
  const rows: { user_id: string; game: string; day: number; points: number }[] = []
  for (const t of TODAY_KEYS) {
    try {
      const raw = localStorage.getItem(t.key)
      if (!raw) continue
      const obj = JSON.parse(raw) as Record<string, unknown>
      if (obj.day !== day) continue
      const pts = rankNote(Number(obj[t.field] ?? 0), t.full)
      if (!pts) continue
      rows.push({ user_id: u.user.id, game: t.game, day, points: pts })
    } catch {
      /* ignora item inválido */
    }
  }
  if (rows.length) {
    await supabase.from('scores').upsert(rows, { onConflict: 'user_id,game,day' })
  }
}

export type Period = 'all' | 'week' | 'month'
export const GAMES = [
  'Tira-Teima',
  'Copa de Pênaltis',
  'Quarteto',
  'Linha do Tempo',
  'O Intruso',
  'Craque Misterioso',
  'Escalação',
] as const

// Converte o período no "dia mínimo" (usa a mesma contagem de dias do app).
export function sinceForPeriod(period: Period): number {
  if (period === 'week') return dayNumber() - 6
  if (period === 'month') return dayNumber() - 29
  return 0
}

// Fora da tabela: contas sem nenhum ponto (testes, quem só criou apelido) e
// contas da equipe (código de amigo), pra não competir com os jogadores.
const HIDDEN_CODES = new Set(['BFHBPZ'])
// A posição é recontada depois do filtro (senão o 1º visível aparecia como 2º).
function visible(rows: BoardRow[]): BoardRow[] {
  const kept = rows.filter((r) => (r.total > 0 || r.is_me) && !(r.friend_code && HIDDEN_CODES.has(r.friend_code) && !r.is_me))
  let rank = 0
  return kept.map((r, i) => {
    if (i === 0 || r.total !== kept[i - 1].total) rank = i + 1
    return { ...r, rank }
  })
}

export async function globalBoard(
  game: string | null = null,
  since = 0,
  limit = 50,
): Promise<BoardRow[]> {
  if (!supabase) return []
  const { data } = await supabase.rpc('global_leaderboard', {
    p_limit: limit,
    p_game: game,
    p_since: since,
  })
  return visible((data as BoardRow[]) ?? [])
}

export async function friendsBoard(game: string | null = null, since = 0): Promise<BoardRow[]> {
  if (!supabase) return []
  const { data } = await supabase.rpc('friends_leaderboard', { p_game: game, p_since: since })
  return visible((data as BoardRow[]) ?? [])
}
