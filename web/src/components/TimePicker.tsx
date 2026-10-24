import { useMemo, useState, useSyncExternalStore } from 'react'
import { CLUBES, OUTRO, clubeById, doClube, type Clube } from '../data/clubes'
import { chooseTeam, myTeamId, subscribeTeam } from '../lib/team'
import { Camisa } from './Camisa'
import { sfx } from '../lib/sfx'

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function useMyTeam(): Clube | null {
  const id = useSyncExternalStore(subscribeTeam, myTeamId, () => null)
  return clubeById(id)
}

// Escolha do time do coração. Definitiva: há uma confirmação antes de gravar.
export function TimePicker({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [pick, setPick] = useState<Clube | null>(null)
  const [msg, setMsg] = useState('')
  const list = useMemo(() => {
    const n = norm(q.trim())
    const all = [...CLUBES].sort((a, b) => Number(b.serieA2026) - Number(a.serieA2026) || a.nome.localeCompare(b.nome))
    return n ? all.filter((c) => norm(c.nome).includes(n) || norm(c.uf).includes(n)) : all
  }, [q])

  async function confirmar() {
    if (!pick) return
    try {
      await chooseTeam(pick.id)
      sfx.stamp()
      onClose()
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 p-3 backdrop-blur-md">
      <div className="flex max-h-[94vh] w-full max-w-md flex-col border-2 border-white/20 bg-paper">
        {!pick ? (
          <>
            <div className="border-b border-white/10 p-4">
              <p className="kicker">Time do coração</p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink-900">Pra quem você torce?</h2>
              <p className="mt-1 font-serif text-sm italic text-ink-600">Seus pontos somam pra sua torcida no ranking da semana.</p>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar time ou estado…"
                className="mt-3 w-full border-2 border-white/20 bg-paper px-3 py-2 font-serif text-ink-900 outline-none focus:border-corn-500"
              />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 overflow-y-auto p-3 sm:grid-cols-4">
              {[...list, ...(norm(q) && !norm('outro time').includes(norm(q)) ? [] : [OUTRO])].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setPick(c)}
                  className="flex flex-col items-center gap-1 border-2 border-white/10 p-2 transition-colors hover:border-corn-500/70 hover:bg-paper-100"
                >
                  <Camisa clube={c} className="h-12 w-12" />
                  <span className="text-center font-cond text-[11px] font-600 uppercase leading-tight text-ink-900">{c.nome}</span>
                  <span className="font-cond text-[9px] uppercase tracking-wide text-ink-500">{c.uf}</span>
                </button>
              ))}
            </div>
            <button onClick={onClose} className="border-t border-white/10 py-3 font-cond text-xs font-600 uppercase tracking-wider text-ink-500 hover:text-corn-500">
              Depois
            </button>
          </>
        ) : (
          <div className="p-6 text-center">
            <Camisa clube={pick} className="mx-auto h-24 w-24" numero="10" />
            <p className="kicker mt-3">Confirma?</p>
            <h2 className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-900">Torcedor {doClube(pick)}</h2>
            <p className="mt-2 font-serif text-sm text-ink-600">
              Time do coração não se troca: <strong>depois de confirmar, não dá pra mudar</strong>.
            </p>
            {msg && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-400">{msg}</p>}
            <button onClick={confirmar} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-3 text-ink-900 hover:bg-grass-700">
              Confirmar pra sempre
            </button>
            <button onClick={() => setPick(null)} className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
