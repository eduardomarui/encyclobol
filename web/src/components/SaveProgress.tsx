import { useState } from 'react'
import { AccountError, confirmCode, nudgeSnoozed, sendCode, snoozeNudge, useAccount, type Mode } from '../lib/account'
import { rankingEnabled } from '../lib/ranking'

const ERR: Record<AccountError['kind'], string> = {
  'email-used': 'Esse e-mail já guarda outro progresso.',
  'no-account': 'Nenhum progresso salvo com esse e-mail.',
  'bad-code': 'Código errado ou vencido. Confira ou peça outro.',
  'too-fast': 'Calma: espere um minuto pra pedir outro código.',
  other: 'Não deu certo agora. Tenta de novo.',
}

const input =
  'w-full border-2 border-white/20 bg-paper px-3 py-2.5 font-serif text-ink-900 outline-none focus:border-corn-500'
const primary = 'btn-stamp mt-2 w-full bg-grass-600 px-5 py-3 text-ink-900 hover:bg-grass-700 disabled:opacity-50'
const link = 'mt-2 w-full text-center font-cond text-xs font-600 uppercase tracking-wider text-ink-500 hover:text-corn-500'

// Salvar o progresso por e-mail. `nudge`: lembrete que aparece na hora em que
// a pessoa já tem algo a perder (some por uma semana em "Agora não").
export function SaveProgress({ nudge = false, why }: { nudge?: boolean; why?: string }) {
  const acc = useAccount()
  const [mode, setMode] = useState<Mode>('save')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<AccountError['kind'] | null>(null)
  const [hidden, setHidden] = useState(() => nudge && nudgeSnoozed())

  if (!rankingEnabled || hidden) return null
  // Aparelho novo, sem conta: no lembrete não há o que salvar.
  if (!acc.user && nudge) return null
  if (acc.saved) {
    if (nudge) return null
    return (
      <div className="border-2 border-grass-500/60 bg-grass-700/30 p-4">
        <p className="font-cond text-xs font-700 uppercase tracking-wider text-grass-400">✓ Progresso salvo</p>
        <p className="mt-1 font-serif text-sm text-ink-700">
          No e-mail <strong>{acc.email}</strong>. Em outro aparelho, é só entrar com ele.
        </p>
      </div>
    )
  }

  const m: Mode = acc.user ? mode : 'enter'
  const act = (f: () => Promise<void>) => async () => {
    setBusy(true)
    setErr(null)
    try {
      await f()
    } catch (e) {
      setErr(e instanceof AccountError ? e.kind : 'other')
    } finally {
      setBusy(false)
    }
  }
  const pedir = act(async () => {
    await sendCode(m, email.trim())
    setSent(true)
  })
  const confirmar = act(() => confirmCode(m, email.trim(), code.trim()))
  const trocar = (to: Mode) => {
    setMode(to)
    setSent(false)
    setCode('')
    setErr(null)
  }
  const okEmail = /^\S+@\S+\.\S+$/.test(email.trim())

  return (
    <div className="border-2 border-corn-500/70 bg-corn-500/10 p-4 text-left">
      <p className="kicker">{m === 'save' ? 'Salvar meu progresso' : 'Entrar na conta salva'}</p>
      <p className="mt-1 font-serif text-sm text-ink-700">
        {m === 'save'
          ? `${why ? `${why} ` : ''}Hoje sua conta mora só neste navegador. Salve com seu e-mail pra não perder apelido, divisão e time, e jogar em qualquer aparelho.`
          : 'Use o e-mail em que você salvou. Este aparelho passa a usar aquele progresso.'}
      </p>

      {!sent ? (
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (okEmail && !busy) pedir()
          }}
        >
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={input}
          />
          <button type="submit" disabled={!okEmail || busy} className={primary}>
            {busy ? 'Mandando…' : 'Mandar código'}
          </button>
        </form>
      ) : (
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (code.trim().length >= 6 && !busy) confirmar()
          }}
        >
          <p className="font-serif text-sm text-ink-600">
            Mandamos um código pra <strong className="text-ink-900">{email.trim()}</strong>. Olhe também no spam.
          </p>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="Código de 6 dígitos"
            className={`${input} mt-2 text-center font-display text-2xl tracking-[0.3em]`}
          />
          <button type="submit" disabled={code.trim().length < 6 || busy} className={primary}>
            {busy ? 'Conferindo…' : 'Confirmar'}
          </button>
          <button type="button" onClick={() => trocar(m)} className={link}>
            Trocar e-mail ou pedir outro código
          </button>
        </form>
      )}

      {err && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-400">{ERR[err]}</p>}
      {err === 'email-used' && (
        <button type="button" onClick={() => trocar('enter')} className={link}>
          Entrar nessa conta (o progresso daqui fica pra trás)
        </button>
      )}

      {nudge ? (
        <button
          type="button"
          onClick={() => {
            snoozeNudge()
            setHidden(true)
          }}
          className={link}
        >
          Agora não
        </button>
      ) : (
        acc.user &&
        err !== 'email-used' && (
          <button type="button" onClick={() => trocar(m === 'save' ? 'enter' : 'save')} className={link}>
            {m === 'save' ? 'Já salvei em outro aparelho · entrar' : 'Voltar pra salvar este aparelho'}
          </button>
        )
      )}
    </div>
  )
}
