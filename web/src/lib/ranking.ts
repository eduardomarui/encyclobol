// Camada de ranking: sessão anônima, perfil, envio de placar e leaderboards.
// Tudo no-op quando o Supabase não está configurado.
import { supabase, rankingEnabled } from './supabase'
import { dayNumber } from './daily'

export { rankingEnabled }

export type Profile = { nick: string; friend_code: string }
export type BoardRow = { nick: string; total: number; rank: number; is_me?: boolean; friend_code?: string }

// Mapa: cada jogo guarda o resultado do dia no localStorage com o campo de pontos.
const TODAY_KEYS: { game: string; key: string; field: string }[] = [
  { game: 'Tira-Teima', key: 'encyclobol:qse:career-today', field: 'score' },
  { game: 'Copa de Pênaltis', key: 'encyclobol:copa:today', field: 'points' },
  { game: 'Quarteto', key: 'encyclobol:quarteto:today', field: 'points' },
  { game: 'Linha do Tempo', key: 'encyclobol:timeline:today', field: 'points' },
  { game: 'O Intruso', key: 'encyclobol:intruso:today', field: 'points' },
  { game: 'Craque Misterioso', key: 'encyclobol:misterioso:today', field: 'points' },
]

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
  return (data as Profile) ?? null
}

export async function setNick(nick: string): Promise<Profile | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('set_nick', { p_nick: nick })
  if (error) throw new Error(error.message)
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
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) return
  const day = dayNumber()
  const rows: { user_id: string; game: string; day: number; points: number }[] = []
  for (const t of TODAY_KEYS) {
    try {
      const raw = localStorage.getItem(t.key)
      if (!raw) continue
      const obj = JSON.parse(raw) as Record<string, unknown>
      if (obj.day !== day) continue
      const pts = Number(obj[t.field] ?? 0)
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

export async function globalBoard(limit = 50): Promise<BoardRow[]> {
  if (!supabase) return []
  const { data } = await supabase.rpc('global_leaderboard', { p_limit: limit })
  return (data as BoardRow[]) ?? []
}

export async function friendsBoard(): Promise<BoardRow[]> {
  if (!supabase) return []
  const { data } = await supabase.rpc('friends_leaderboard')
  return (data as BoardRow[]) ?? []
}
