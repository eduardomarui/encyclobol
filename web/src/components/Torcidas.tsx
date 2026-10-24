import { useEffect, useState } from 'react'
import { clubeById, doClube } from '../data/clubes'
import { torcidaBoard, type TorcidaRow } from '../lib/team'
import { Camisa } from './Camisa'
import { TimePicker, useMyTeam } from './TimePicker'

const MIN_FANS = 3

// Tabela da semana: média de pontos por torcedor de cada time.
export function Torcidas() {
  const team = useMyTeam()
  const [rows, setRows] = useState<TorcidaRow[] | null>(null)
  const [err, setErr] = useState('')
  const [pick, setPick] = useState(false)
  useEffect(() => {
    torcidaBoard(MIN_FANS)
      .then(setRows)
      .catch((e) => setErr((e as Error).message))
  }, [team?.id])

  return (
    <div className="mt-3">
      {team ? (
        <p className="flex items-center gap-2 font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
          <Camisa clube={team} className="h-6 w-6" /> Você é torcedor {doClube(team)}
        </p>
      ) : (
        <button onClick={() => setPick(true)} className="btn-stamp w-full bg-corn-500 px-4 py-2.5 text-paper hover:bg-corn-400">
          Escolher meu time do coração
        </button>
      )}
      <div className="mt-3 overflow-hidden border-2 border-white/20">
        {err && <p className="bg-paper-100 px-4 py-6 text-center font-serif text-sm italic text-ink-600">A disputa de torcidas liga em breve.</p>}
        {!err && rows && rows.length === 0 && (
          <p className="bg-paper-100 px-4 py-6 text-center font-serif text-sm italic text-ink-600">
            Nenhuma torcida com {MIN_FANS} torcedores jogando nesta semana ainda. Chama a galera do seu time.
          </p>
        )}
        {rows?.map((r, i) => {
          const c = clubeById(r.team)
          if (!c) return null
          return (
            <div key={r.team} className={`flex items-center gap-3 border-b border-ink-900/10 px-4 py-2.5 last:border-b-0 ${r.my_team ? 'bg-corn-500/10' : i % 2 ? 'bg-paper-100' : 'bg-paper'}`}>
              <span className="w-7 font-display text-xl text-ink-900/40">{i + 1}</span>
              <Camisa clube={c} className="h-8 w-8" />
              <span className="flex-1 font-cond text-base font-600 uppercase tracking-wide text-ink-900">
                {c.nome}
                <span className="ml-2 font-500 text-[10px] text-ink-500">{r.fans} torcedores</span>
              </span>
              <span className="font-display text-xl text-ink-900">{r.avg_points}</span>
              <span className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">média</span>
            </div>
          )
        })}
      </div>
      <p className="mt-2 font-serif text-xs italic text-ink-500">
        A semana vai de segunda a domingo. Vale a média das notas de cada torcedor, então torcida pequena também briga pelo topo.
      </p>
      {pick && <TimePicker onClose={() => setPick(false)} />}
    </div>
  )
}
