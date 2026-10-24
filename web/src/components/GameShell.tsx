import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { setSoundOn, soundOn, subscribeSound, sfx } from '../lib/sfx'
import { Link } from 'react-router-dom'
import { availableThemes, themeSize } from '../lib/themes'
import { gatherGames } from '../lib/profile'
import { getStreak, hoursUntilMidnight } from '../lib/streak'
import { Flame } from './Streak'
import { challengeLink, readChallenge } from '../lib/challenge'
import { treinosRestantes } from '../lib/treino'
import { confetti } from '../lib/juice'
import { dayNumber } from '../lib/daily'

// Peças compartilhadas pelas páginas de jogo: cabeçalho fixo, modal
// "Como jogar" e a grade de números do fim de rodada.

export function GameHeader({
  label,
  onHelp,
  extra,
  backTo = '/jogos',
  backLabel = 'Encyclobol',
}: {
  label: string
  onHelp: () => void
  extra?: ReactNode
  backTo?: string
  backLabel?: string
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to={backTo} className="flex items-center gap-2 text-ink-900">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto" />
          <span className="font-cond text-sm font-600 uppercase tracking-wider">← {backLabel}</span>
        </Link>
        <div className="flex items-center gap-3">
          {extra}
          <span className="hidden font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600 sm:inline">
            {label}
          </span>
          <SoundToggle />
          <button
            onClick={onHelp}
            aria-label="Como jogar"
            className="-m-2 flex h-11 w-11 items-center justify-center"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 font-cond text-sm font-700 text-ink-900 hover:bg-grass-700">
              ?
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

// Liga/desliga som e vibração (vale pra todas as páginas ao mesmo tempo).
export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, soundOn, () => true)
  return (
    <button
      onClick={() => {
        setSoundOn(!on)
        if (!on) setTimeout(() => sfx.tap(), 0)
      }}
      aria-pressed={on}
      aria-label="Som e vibração"
      title={on ? 'Som e vibração: ligados' : 'Som e vibração: desligados'}
      className="-m-2 flex h-11 w-11 items-center justify-center"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 hover:bg-grass-700">
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${on ? 'text-ink-900' : 'text-ink-500'}`} aria-hidden>
          <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
          {on ? (
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </span>
    </button>
  )
}

export function GameTitle({ kicker, title, blurb }: { kicker: string; title: string; blurb?: string }) {
  return (
    <>
      <p className="kicker">{kicker}</p>
      <h1 className="mt-2 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
        {title}
      </h1>
      {blurb && (
        <p className="mt-2 hidden max-w-md text-center font-serif text-sm italic text-ink-600 sm:block">{blurb}</p>
      )}
    </>
  )
}

export function HelpModal({
  title,
  cta = 'Entendi, bora',
  onClose,
  children,
}: {
  title: string
  cta?: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 p-4 backdrop-blur-md" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-sm overflow-y-auto border-2 border-white/20 bg-paper p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="kicker">Como jogar</p>
        <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">{title}</h2>
        <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">{children}</ul>
        <button onClick={onClose} className="btn-stamp mt-6 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
          {cta}
        </button>
      </div>
    </div>
  )
}

// Grade de números (Total / Recorde / Ofensiva / Dias...) do fim de rodada.
export function StatGrid({ items }: { items: [string, string | number][] }) {
  return (
    <div
      className="mt-5 grid gap-px overflow-hidden border-y border-white/10 bg-white/5"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(([k, v]) => (
        <div key={k} className="bg-paper-100 px-1 py-2">
          <div className="font-display text-xl text-ink-800">{typeof v === 'number' ? v.toLocaleString('pt-BR') : v}</div>
          <div className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">{k}</div>
        </div>
      ))}
    </div>
  )
}

// Vidas em losango (Intruso, Linha do Tempo) — mesma linguagem visual.
export function Lives({ total, left }: { total: number; left: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${left} de ${total} vidas`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rotate-45 transition-colors ${i < left ? 'bg-ochre-500' : 'bg-ink-900/20'}`}
        />
      ))}
    </span>
  )
}

// Escolha de campeonato (tema das perguntas) — Copa de Pênaltis e Duelo.
export function ThemePicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Campeonato">
      {availableThemes().map((t) => {
        const on = t.id === value
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(t.id)}
            className={`border-2 px-2.5 py-1.5 text-left font-cond text-[11px] font-700 uppercase tracking-wide transition-colors ${
              on ? 'border-corn-500 bg-corn-500 text-paper' : 'border-white/20 text-ink-900 hover:border-corn-500/60'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 font-500 ${on ? 'text-paper/70' : 'text-ink-500'}`}>{themeSize(t.id)}</span>
          </button>
        )
      })}
    </div>
  )
}

// Barra de tempo padrão (Tira-Teima, Pênaltis).
export function TimeBar({ left, total, danger = 10 }: { left: number; total: number; danger?: number }) {
  const hot = left <= danger
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10">
      <div
        className={`h-full transition-[width] duration-1000 ease-linear ${hot ? 'bg-ochre-500' : 'bg-grass-600'}`}
        style={{ width: `${Math.max(0, Math.min(100, (left / total) * 100))}%` }}
      />
    </div>
  )
}

// Fim de rodada: chama o próximo jogo do dia e mostra a ofensiva — no lugar do
// antigo "Voltar pro almanaque", que levava pra landing e encerrava a sessão.
export function NextUp({ current }: { current: string }) {
  const games = gatherGames()
  const done = games.filter((g) => g.playedToday).length
  const order = games.map((g) => g.key)
  const start = Math.max(0, order.indexOf(current))
  const next = [...games.slice(start + 1), ...games.slice(0, start)].find((g) => !g.playedToday)
  const st = getStreak()
  const hours = hoursUntilMidnight()
  return (
    <div className="mt-4 border-t border-white/10 pt-4 text-left">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 font-cond text-xs font-700 uppercase tracking-wider text-ink-900">
          <Flame on={st.playedToday} className="h-4 w-4" />
          {st.current > 0 ? `Ofensiva: ${st.current} ${st.current === 1 ? 'dia' : 'dias'}` : 'Ofensiva começa hoje'}
        </span>
        <span className="font-cond text-[11px] font-600 uppercase tracking-wider text-ink-500">{done} de {games.length} hoje</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {games.map((g) => (
          <span key={g.key} className={`h-1.5 flex-1 rounded-full ${g.playedToday ? 'bg-corn-500' : 'bg-ink-900/15'}`} />
        ))}
      </div>
      {!next && <DayClosed />}
      {next ? (
        <Link
          to={next.route}
          className="btn-stamp mt-3 flex w-full items-center justify-between bg-grass-600 px-5 py-3 text-ink-900 hover:bg-grass-700"
        >
          <span>Próximo: {next.name}</span>
          <span aria-hidden>→</span>
        </Link>
      ) : (
        <Link
          to="/jogos"
          className="btn-stamp mt-3 flex w-full items-center justify-between bg-corn-500 px-5 py-3 text-paper hover:bg-corn-400"
        >
          <span>Compartilhar o dia</span>
          <span aria-hidden>→</span>
        </Link>
      )}
      {!next && (
        <p className="mt-2 text-center font-serif text-sm italic text-ink-600">
          A próxima edição sai em {hours} {hours === 1 ? 'hora' : 'horas'}.
        </p>
      )}
      <Link
        to="/jogos"
        className="mt-2 block text-center font-cond text-xs font-600 uppercase tracking-wider text-ink-500 hover:text-corn-500"
      >
        Todos os jogos
      </Link>
    </div>
  )
}

// Fechou todos os jogos do dia: festa uma vez por dia (a primeira tela que mostrar).
const CLOSED_KEY = 'encyclobol:closed-day'
function DayClosed() {
  useEffect(() => {
    try {
      if (localStorage.getItem(CLOSED_KEY) === String(dayNumber())) return
      localStorage.setItem(CLOSED_KEY, String(dayNumber()))
    } catch {
      return
    }
    confetti(220)
    setTimeout(() => confetti(160), 450)
    sfx.fanfare()
  }, [])
  return (
    <div className="mt-3 animate-pop border-2 border-corn-500 bg-corn-500/15 px-4 py-3 text-center">
      <p className="font-display text-2xl uppercase leading-none tracking-tight text-corn-400">Caderno fechado!</p>
      <p className="mt-1 font-cond text-[11px] font-600 uppercase tracking-wider text-ink-700">Todos os jogos de hoje, completos</p>
    </div>
  )
}

// Faixa do desafio recebido por link: a meta durante o jogo e o placar no fim.
export function ChallengeBanner({ game, mine, over }: { game: string; mine: number; over: boolean }) {
  const ch = readChallenge()
  if (!ch) return null
  if (!over)
    return (
      <div className="mt-3 w-full max-w-md border-2 border-corn-500/70 bg-corn-500/10 px-3 py-2 text-center font-cond text-xs font-700 uppercase tracking-wider text-corn-400">
        {ch.from} fez {ch.pts} no {game} de hoje. Bate essa.
      </div>
    )
  const won = mine > ch.pts
  const tie = mine === ch.pts
  return <ChallengeResult game={game} mine={mine} from={ch.from} pts={ch.pts} won={won} tie={tie} />
}

function ChallengeResult({ game, mine, from, pts, won, tie }: { game: string; mine: number; from: string; pts: number; won: boolean; tie: boolean }) {
  const [sent, setSent] = useState(false)
  async function devolver() {
    const text = `Fiz ${mine} no ${game} de hoje${won ? ` e passei os seus ${pts}` : ''}. Bate essa: ${challengeLink(window.location.pathname, mine)}`
    try {
      if (navigator.share) await navigator.share({ text })
      else await navigator.clipboard.writeText(text)
      setSent(true)
    } catch {
      /* cancelou */
    }
  }
  const ch = { from, pts }
  return (
    <div className={`mt-3 w-full max-w-md border-2 px-3 py-2 text-center ${won ? 'border-grass-500 bg-grass-700/40' : tie ? 'border-white/20 bg-paper-100' : 'border-ochre-500 bg-ochre-500/10'}`}>
      <p className="font-cond text-[11px] font-600 uppercase tracking-wider text-ink-600">Desafio de {ch.from}</p>
      <p className="font-display text-2xl leading-tight text-ink-900">
        Você {mine} <span className="text-ink-500">×</span> {ch.pts} {ch.from}
      </p>
      <p className={`font-cond text-xs font-700 uppercase tracking-wider ${won ? 'text-grass-400' : tie ? 'text-ink-700' : 'text-ochre-400'}`}>
        {won ? 'Ganhou!' : tie ? 'Empate' : 'Perdeu dessa vez'}
      </p>
      <button
        onClick={devolver}
        className="btn-stamp mt-2 w-full bg-corn-500 px-4 py-2 text-xs text-paper hover:bg-corn-400"
      >
        {sent ? 'Desafio enviado!' : `Devolver o desafio pra ${from}`}
      </button>
    </div>
  )
}

// Quantos treinos sobram hoje (3 por jogo), dentro do botão de treinar.
export function TreinoTag({ game }: { game: string }) {
  const n = treinosRestantes(game)
  return <span className="ml-1.5 opacity-60">· {n ? `${n} hoje` : 'esgotado'}</span>
}
