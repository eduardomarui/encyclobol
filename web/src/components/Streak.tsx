import { Link } from 'react-router-dom'
import { getStreak, type Streak } from '../lib/streak'

export function Flame({ on, className = 'h-5 w-5' }: { on: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.6.6-2.6 1.4-3.6.3 1.4 1.1 2.1 2.1 2.1.8 0 1.5-.6 1.5-1.6C13 5.7 12 4 12 2Zm0 20a7 7 0 0 1-7-7c0-2.6 1.4-4.7 3-6.3.2 2.6 1.9 4.3 4 4.3 1.6 0 3-1.2 3-3.2 1.9 1.6 4 3.7 4 5.2a7 7 0 0 1-7 7Z"
        fill={on ? '#e6b73e' : 'none'}
        stroke={on ? '#b8901f' : 'rgba(238,245,241,0.35)'}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Selo compacto pro menu: chama + número de dias.
export function StreakBadge() {
  const s = getStreak()
  return (
    <Link
      to="/perfil"
      title={s.atRisk ? `Sua ofensiva termina em ${s.hoursLeft}h` : 'Sua ofensiva'}
      className="flex items-center gap-1 font-cond text-sm font-700 tabular-nums text-ink-900"
    >
      <Flame on={s.current > 0 && !s.atRisk} />
      <span className={s.atRisk ? 'text-corn-500' : ''}>{s.current}</span>
    </Link>
  )
}

const dayCls: Record<Streak['days'][number]['state'], string> = {
  played: 'bg-corn-500',
  frozen: 'bg-[#6fb6d9]',
  missed: 'bg-white/10',
  'today-pending': 'border border-dashed border-corn-500/70',
}

// Painel completo pro hub e perfil.
export function StreakPanel({ compact = false }: { compact?: boolean }) {
  const s = getStreak()
  return (
    <section className="border-2 border-white/20 bg-paper-100 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-2">
          <Flame on={s.current > 0} className="h-9 w-9" />
          <div>
            <div className="font-display text-3xl leading-none text-ink-900">
              {s.current}
              <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">
                {s.current === 1 ? 'dia' : 'dias'} de ofensiva
              </span>
            </div>
            <div className="mt-1 font-cond text-[11px] font-500 uppercase tracking-wider text-ink-600">
              Recorde {s.best} · {s.freezes} congelamento{s.freezes === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        {s.atRisk ? (
          <p className="ml-auto max-w-xs font-serif text-sm italic text-corn-400">
            Sua ofensiva termina em <strong>{s.hoursLeft}h</strong>. Jogue qualquer edição pra manter.
          </p>
        ) : s.playedToday ? (
          <p className="ml-auto font-cond text-xs font-600 uppercase tracking-wider text-grass-400">
            Hoje garantido
          </p>
        ) : (
          <p className="ml-auto font-serif text-sm italic text-ink-600">Jogue hoje pra começar uma ofensiva.</p>
        )}
      </div>

      {!compact && (
        <div className="mt-4">
          <div className="grid grid-cols-14 gap-1" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
            {s.days.map((d) => (
              <span key={d.day} className={`aspect-square rounded-[3px] ${dayCls[d.state]}`} title={d.state} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">
            <span><i className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-corn-500 align-middle" />jogou</span>
            <span><i className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-[#6fb6d9] align-middle" />congelado</span>
            <span><i className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-white/10 align-middle" />perdeu</span>
            <span className="ml-auto">últimos 14 dias</span>
          </div>
          <p className="mt-3 font-serif text-xs italic text-ink-500">
            A cada 7 dias seguidos você ganha um congelamento: se faltar um dia, ele salva a sequência sozinho.
          </p>
        </div>
      )}
    </section>
  )
}
