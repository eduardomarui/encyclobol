// Progresso do aparelho (ofensiva, recordes, conquistas, partida do dia)
// copiado na conta salva. Em outro aparelho, junta os dois sem perder nada:
// dias jogados somam, conquistas somam, e em cada jogo vale o histórico mais
// longo. Só pra conta salva por e-mail — a anônima não teria como recuperar.
import { supabase } from './supabase'

type Snap = Record<string, string>

const STREAK = 'encyclobol:streak'
const ACHIEVEMENTS = 'encyclobol:achievements'
// Carreira de cada jogo: fica a de histórico mais longo.
const CAREER = [
  'encyclobol:qse:career',
  'encyclobol:qse:stats',
  'encyclobol:copa:stats',
  'encyclobol:quarteto:career',
  'encyclobol:intruso:career',
  'encyclobol:misterioso:career',
  'encyclobol:timeline:career',
  'encyclobol:escalacao:career',
]
// Resultado e partida do dia: fica a do dia mais recente (empate: a daqui).
const DAILY = [
  'encyclobol:qse:career-today',
  'encyclobol:qse:state',
  'encyclobol:copa:today',
  'encyclobol:quarteto:today',
  'encyclobol:timeline:today',
  'encyclobol:intruso:today',
  'encyclobol:misterioso:today',
  'encyclobol:escalacao:today',
]
const isDaily = (k: string) => DAILY.includes(k) || k.startsWith('encyclobol:run:')
// "Já vi o tutorial": basta ter visto em um aparelho.
const isFlag = (k: string) => k === 'encyclobol:onboarded' || k.endsWith(':help')
const synced = (k: string) => k === STREAK || k === ACHIEVEMENTS || CAREER.includes(k) || isDaily(k) || isFlag(k)

function collect(): Snap {
  const out: Snap = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && synced(k)) out[k] = localStorage.getItem(k) ?? ''
    }
  } catch {
    /* sem armazenamento */
  }
  return out
}

const parse = <T>(raw: string | undefined): T | null => {
  try {
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
const union = (a: number[] = [], b: number[] = []) => [...new Set([...a, ...b])].sort((x, y) => x - y)

type StreakState = { played: number[]; frozen: number[]; freezes: number; granted: number[]; best: number }
function mergeStreak(a: string, b: string): string {
  const x = parse<StreakState>(a)
  const y = parse<StreakState>(b)
  if (!x || !y) return x ? a : b
  const played = union(x.played, y.played)
  return JSON.stringify({
    played,
    frozen: union(x.frozen, y.frozen).filter((d) => !played.includes(d)),
    freezes: Math.max(x.freezes ?? 0, y.freezes ?? 0),
    granted: union(x.granted, y.granted),
    best: Math.max(x.best ?? 0, y.best ?? 0),
  })
}

type CareerLike = Record<string, unknown> & { days?: number; played?: number; lastDay?: number | null; lastDayWon?: number | null }
const depth = (c: CareerLike) => [c.days ?? c.played ?? 0, c.lastDay ?? c.lastDayWon ?? -1]
// Fica a carreira de histórico mais longo; recordes (best*, max*) valem o
// maior dos dois aparelhos.
function pickCareer(a: string, b: string): string {
  const x = parse<CareerLike>(a)
  const y = parse<CareerLike>(b)
  if (!x || !y) return x ? a : b
  const [dx, lx] = depth(x)
  const [dy, ly] = depth(y)
  const base = dy > dx || (dy === dx && ly > lx) ? y : x
  const other = base === x ? y : x
  const out: CareerLike = { ...base }
  for (const k of Object.keys(out)) {
    if (/^(best|max)/.test(k) && typeof out[k] === 'number' && typeof other[k] === 'number') {
      out[k] = Math.max(out[k] as number, other[k] as number)
    }
  }
  return JSON.stringify(out)
}

function pickDaily(a: string, b: string): string {
  const x = parse<{ day?: number }>(a)?.day ?? -1
  const y = parse<{ day?: number }>(b)?.day ?? -1
  return y > x ? b : a
}

function merge(local: Snap, remote: Snap): Snap {
  const out: Snap = { ...local }
  for (const k of Object.keys(remote)) {
    if (!synced(k) || typeof remote[k] !== 'string') continue
    if (!(k in local)) {
      out[k] = remote[k]
      continue
    }
    const a = local[k]
    const b = remote[k]
    if (k === STREAK) out[k] = mergeStreak(a, b)
    else if (k === ACHIEVEMENTS) out[k] = JSON.stringify([...new Set([...(parse<string[]>(a) ?? []), ...(parse<string[]>(b) ?? [])])])
    else if (CAREER.includes(k)) out[k] = pickCareer(a, b)
    else if (isDaily(k)) out[k] = pickDaily(a, b)
  }
  return out
}

async function savedUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  const u = data.session?.user
  return u && !u.is_anonymous ? u : null
}

let lastPushed = ''

export async function pushProgress() {
  const u = await savedUser()
  if (!u || !supabase) return
  const data = collect()
  const json = JSON.stringify(data)
  if (json === lastPushed) return
  const { error } = await supabase.from('progress').upsert({ user_id: u.id, data, updated_at: new Date().toISOString() })
  if (!error) lastPushed = json
}

// Traz o progresso da conta e junta com o daqui. Devolve se algo mudou.
export async function pullProgress(): Promise<boolean> {
  const u = await savedUser()
  if (!u || !supabase) return false
  const { data } = await supabase.from('progress').select('data').eq('user_id', u.id).maybeSingle()
  const remote = (data as { data?: Snap } | null)?.data
  if (!remote) return false
  const local = collect()
  const merged = merge(local, remote)
  let changed = false
  try {
    for (const [k, v] of Object.entries(merged)) {
      if (local[k] !== v) {
        localStorage.setItem(k, v)
        changed = true
      }
    }
  } catch {
    return false
  }
  return changed
}

// Abertura do app: junta com a conta e devolve o resultado pra ela.
export async function syncProgress() {
  await pullProgress()
  await pushProgress()
}
