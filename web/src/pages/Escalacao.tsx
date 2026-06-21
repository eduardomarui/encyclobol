import { useState } from 'react'
import { Link } from 'react-router-dom'
import { players, type Player } from '../data/players'
import { eligible, simulate, type MatchResult, type SlotType } from '../lib/match'
import { BallMark } from '../components/landing/Icons'

type Slot = { id: string; type: SlotType; x: number; y: number }

// 4-4-2 (ataque em cima). x/y em % dentro do campo.
const SLOTS: Slot[] = [
  { id: 'a1', type: 'ATA', x: 35, y: 14 },
  { id: 'a2', type: 'ATA', x: 65, y: 14 },
  { id: 'm1', type: 'MEI', x: 14, y: 40 },
  { id: 'm2', type: 'MEI', x: 38, y: 40 },
  { id: 'm3', type: 'MEI', x: 62, y: 40 },
  { id: 'm4', type: 'MEI', x: 86, y: 40 },
  { id: 'd1', type: 'DEF', x: 14, y: 66 },
  { id: 'd2', type: 'DEF', x: 38, y: 66 },
  { id: 'd3', type: 'DEF', x: 62, y: 66 },
  { id: 'd4', type: 'DEF', x: 86, y: 66 },
  { id: 'g1', type: 'GOL', x: 50, y: 88 },
]

const slotLabel: Record<SlotType, string> = {
  GOL: 'Goleiro',
  DEF: 'Defesa',
  MEI: 'Meio',
  ATA: 'Ataque',
}

export default function Escalacao() {
  const [assign, setAssign] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<MatchResult | null>(null)

  const used = new Set(Object.values(assign))
  const filled = Object.keys(assign).length === SLOTS.length
  const selSlot = SLOTS.find((s) => s.id === selected) ?? null

  function selectSlot(id: string) {
    setResult(null)
    setSelected((cur) => (cur === id ? null : id))
  }

  function assignPlayer(i: number) {
    if (!selected) return
    setAssign((a) => ({ ...a, [selected]: i }))
    setSelected(null)
  }

  function clearSlot(id: string) {
    setAssign((a) => {
      const next = { ...a }
      delete next[id]
      return next
    })
    setSelected(null)
  }

  function autoEscalar() {
    setResult(null)
    const next: Record<string, number> = {}
    const taken = new Set<number>()
    for (const slot of SLOTS) {
      const pool = players
        .map((p, i) => ({ p, i }))
        .filter(({ p, i }) => !taken.has(i) && eligible(p.pos, slot.type))
      if (pool.length) {
        const choice = pool[Math.floor(Math.random() * pool.length)]
        next[slot.id] = choice.i
        taken.add(choice.i)
      }
    }
    setAssign(next)
    setSelected(null)
  }

  function limpar() {
    setAssign({})
    setSelected(null)
    setResult(null)
  }

  function simular() {
    if (!filled) return
    const team: Player[] = SLOTS.map((s) => players[assign[s.id]])
    setResult(simulate(team))
  }

  const eligiblePlayers = selSlot
    ? players
        .map((p, i) => ({ p, i }))
        .filter(({ p, i }) => eligible(p.pos, selSlot.type) && (!used.has(i) || assign[selSlot.id] === i))
    : []

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ink-900">
            <BallMark className="h-6 w-6 text-grass-600" />
            <span className="font-cond text-sm font-600 uppercase tracking-wider">
              ← Encyclobol
            </span>
          </Link>
          <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
            {Object.keys(assign).length}/11 escalados
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Tática · jogo 03</p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-tight text-ink-900 sm:text-5xl">
          Escalação Rápida
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Monte seu 4-4-2 com craques de todo tempo, toque numa vaga e escolha quem
          veste a camisa. Depois é só mandar pra campo.
        </p>

        {/* Campo */}
        <div className="relative mt-7 aspect-[3/4] w-full max-w-sm border-2 border-ink-900 bg-grass-600">
          {/* linhas */}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper/30" />
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-paper/30" />
          <div className="absolute left-1/2 top-0 h-12 w-28 -translate-x-1/2 border-2 border-t-0 border-paper/30" />
          <div className="absolute bottom-0 left-1/2 h-12 w-28 -translate-x-1/2 border-2 border-b-0 border-paper/30" />

          {SLOTS.map((slot) => {
            const idx = assign[slot.id]
            const p = idx != null ? players[idx] : null
            const isSel = selected === slot.id
            return (
              <button
                key={slot.id}
                onClick={() => selectSlot(slot.id)}
                style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-center font-cond text-[10px] font-700 leading-none transition-colors ${
                    p
                      ? 'border-ink-900 bg-paper text-ink-900'
                      : 'border-paper bg-grass-700/60 text-paper'
                  } ${isSel ? 'ring-4 ring-corn-500' : ''}`}
                >
                  {p ? p.answer.slice(0, 3) : slot.type}
                </span>
                <span className="mt-1 max-w-[64px] truncate rounded-sm bg-ink-900/80 px-1 font-cond text-[9px] uppercase tracking-wide text-paper">
                  {p ? p.display : slotLabel[slot.type]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Ações */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            onClick={autoEscalar}
            className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
          >
            Auto-escalar
          </button>
          <button
            onClick={limpar}
            className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
          >
            Limpar
          </button>
          <button
            onClick={simular}
            disabled={!filled}
            className="btn-stamp bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Simular partida
          </button>
        </div>

        {/* Banco / seleção de jogador */}
        {selSlot && (
          <div className="mt-6 w-full max-w-xl border-2 border-ink-900 bg-paper-100 p-4">
            <div className="flex items-center justify-between">
              <p className="kicker">Escolha um · {slotLabel[selSlot.type]}</p>
              {assign[selSlot.id] != null && (
                <button
                  onClick={() => clearSlot(selSlot.id)}
                  className="font-cond text-xs font-600 uppercase tracking-wider text-ochre-600 hover:underline"
                >
                  Tirar do time
                </button>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {eligiblePlayers.map(({ p, i }) => (
                <button
                  key={i}
                  onClick={() => assignPlayer(i)}
                  className={`border-2 px-3 py-2 text-left transition-colors ${
                    assign[selSlot.id] === i
                      ? 'border-grass-700 bg-grass-600 text-paper'
                      : 'border-ink-900/20 bg-paper hover:border-ink-900'
                  }`}
                >
                  <div className="font-cond text-sm font-600 uppercase leading-tight">
                    {p.display}
                  </div>
                  <div
                    className={`font-cond text-[10px] uppercase tracking-wide ${
                      assign[selSlot.id] === i ? 'text-paper/80' : 'text-ink-500'
                    }`}
                  >
                    {p.pos} · {p.nat}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className="mt-6 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">{result.verdict}</p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <span className="font-cond text-sm font-600 uppercase tracking-wide text-ink-700">
                Seu time
              </span>
              <span className="font-display text-5xl text-ink-900">
                {result.gf}
                <span className="mx-2 text-ink-500">–</span>
                {result.ga}
              </span>
              <span className="font-cond text-sm font-600 uppercase tracking-wide text-ink-700">
                {result.rival}
              </span>
            </div>

            <div className="mt-4 border-t border-ink-900/15 pt-3 text-left">
              <p className="font-cond text-[10px] font-600 uppercase tracking-wider text-ink-500">
                Quem balançou a rede
              </p>
              {result.scorers.length ? (
                <ul className="mt-1.5 space-y-1">
                  {result.scorers.map((s) => (
                    <li key={s.name} className="font-serif text-sm text-ink-800">
                      {s.name}
                      {s.goals > 1 && (
                        <span className="font-cond text-ink-500"> ×{s.goals}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1.5 font-serif text-sm italic text-ink-500">
                  Seu time não saiu do zero. Acontece nas melhores famílias.
                </p>
              )}
            </div>

            <button
              onClick={simular}
              className="btn-stamp mt-5 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
            >
              Simular de novo
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
