import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// Peças compartilhadas pelas seis páginas de jogo: cabeçalho fixo, modal
// "Como jogar" e a grade de números do fim de rodada.

export function GameHeader({
  label,
  onHelp,
  extra,
}: {
  label: string
  onHelp: () => void
  extra?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/jogos" className="flex items-center gap-2 text-ink-900">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto" />
          <span className="font-cond text-sm font-600 uppercase tracking-wider">← Encyclobol</span>
        </Link>
        <div className="flex items-center gap-3">
          {extra}
          <span className="hidden font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600 sm:inline">
            {label}
          </span>
          <button
            onClick={onHelp}
            aria-label="Como jogar"
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 font-cond text-sm font-700 text-ink-900 hover:bg-grass-700"
          >
            ?
          </button>
        </div>
      </div>
    </header>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
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
      className="mt-5 grid gap-px overflow-hidden border-2 border-white/20 bg-ink-900/15"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(([k, v]) => (
        <div key={k} className="bg-paper-100 px-1 py-2">
          <div className="font-display text-2xl text-ink-900">{typeof v === 'number' ? v.toLocaleString('pt-BR') : v}</div>
          <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
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
