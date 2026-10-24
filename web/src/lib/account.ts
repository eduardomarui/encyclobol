// Conta: todo mundo começa anônimo (só apelido). "Salvar meu progresso" põe
// um e-mail na MESMA conta anônima — id, apelido, divisão e time ficam.
// Em outro aparelho, "Entrar" recupera essa conta. Os dois pedem um código de
// 6 dígitos mandado por e-mail (o link do e-mail também funciona, mas no
// celular costuma abrir no navegador do app de e-mail, outro armazenamento).
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { pushProgress, syncProgress } from './progress'

export type Account = { user: User | null; saved: boolean; email: string | null }

const read = (user: User | null): Account => ({
  user,
  saved: !!user && !user.is_anonymous,
  email: user?.email ?? null,
})

export function useAccount(): Account {
  const [acc, setAcc] = useState<Account>(read(null))
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setAcc(read(data.session?.user ?? null)))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setAcc(read(s?.user ?? null)))
    return () => data.subscription.unsubscribe()
  }, [])
  return acc
}

export type Mode = 'save' | 'enter'

// Volta do link pra mesma página, sem o fragmento.
const back = () => window.location.href.split('#')[0]

export class AccountError extends Error {
  constructor(public kind: 'email-used' | 'no-account' | 'bad-code' | 'too-fast' | 'other') {
    super(kind)
  }
}

function fail(msg: string, code?: string): never {
  if (code === 'email_exists' || /already (been )?registered/i.test(msg)) throw new AccountError('email-used')
  if (code === 'otp_disabled' || /signups not allowed/i.test(msg)) throw new AccountError('no-account')
  if (code === 'otp_expired' || /expired|invalid/i.test(msg)) throw new AccountError('bad-code')
  if (code === 'over_email_send_rate_limit' || /rate limit|seconds/i.test(msg)) throw new AccountError('too-fast')
  throw new AccountError('other')
}

// Manda o código. `save`: liga o e-mail à conta deste aparelho.
// `enter`: entra numa conta já salva (não cria conta nova).
export async function sendCode(mode: Mode, email: string) {
  if (!supabase) return
  const { error } =
    mode === 'save'
      ? await supabase.auth.updateUser({ email }, { emailRedirectTo: back() })
      : await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: back() } })
  if (error) fail(error.message, error.code)
}

export async function confirmCode(mode: Mode, email: string, token: string) {
  if (!supabase) return
  const { error } = await supabase.auth.verifyOtp({ email, token, type: mode === 'save' ? 'email_change' : 'email' })
  if (error) fail(error.message, error.code)
  if (mode === 'save') {
    await pushProgress().catch(() => {})
    return
  }
  // Entrou numa conta salva: junta o progresso dela com o daqui e recarrega,
  // pra todas as telas lerem apelido, ofensiva e recordes da conta.
  await syncProgress().catch(() => {})
  window.location.reload()
}

// Lembrete de salvar: "Agora não" some por uma semana.
const NUDGE = 'encyclobol:save-nudge'
export function nudgeSnoozed(): boolean {
  try {
    return Date.now() < Number(localStorage.getItem(NUDGE) ?? 0)
  } catch {
    return false
  }
}
export function snoozeNudge() {
  try {
    localStorage.setItem(NUDGE, String(Date.now() + 7 * 864e5))
  } catch {
    /* ignore */
  }
}
