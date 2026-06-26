import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { conexoes, type ConGroup, type GroupColor } from '../data/conexoes'
import { dailyIndex, dayNumber, seededShuffle } from '../lib/daily'
import {
  loadConCareer,
  loadConToday,
  recordConCareer,
  type ConCareer,
} from '../lib/conexoesStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const MAX_MISTAKES = 4
const SOLVE_PTS = 100
const LIFE_PTS = 40
const PERFECT_BONUS = 250
const ORDER_BONUS = 150
const ORDER: GroupColor[] = ['corn', 'grass', 'ochre', 'ink']
const HELP_KEY = 'encyclobol:quarteto:help'

const solvedBg: Record<GroupColor, string> = {
  corn: 'bg-corn-500',
  grass: 'bg-grass-600',
  ochre: 'bg-ochre-500',
  ink: 'bg-ink-700',
}
const emoji: Record<GroupColor, string> = {
  corn: '🟨',
  grass: '🟩',
  ochre: '🟥',
  ink: '⬛',
}

function computePoints(
  solvedCount: number,
  mistakes: number,
  won: boolean,
  seq: GroupColor[],
): number {
  let pts = solvedCount * SOLVE_PTS
  if (won) {
    pts += (MAX_MISTAKES - mistakes) * LIFE_PTS
    if (mistakes === 0) pts += PERFECT_BONUS
    if (seq.length === 4 && seq.every((c, i) => c === ORDER[i])) pts += ORDER_BONUS
  }
  return pts
}

const today = loadConToday()
const DAILY_INDEX = dailyIndex(conexoes.length)

export default function Conexoes() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [pIdx, setPIdx] = useState(DAILY_INDEX)
  const puzzle = conexoes[pIdx]

  const groupOf = useMemo(() => {
    const map: Record<string, ConGroup> = {}
    for (const g of puzzle.groups) for (const m of g.members) map[m] = g
    return map
  }, [puzzle])

  const [order, setOrder] = useState<string[]>(() =>
    seededShuffle(puzzle.groups.flatMap((g) => g.members), (dayNumber() + 1) * 7919),
  )
  const [selected, setSelected] = useState<string[]>([])
  const [solved, setSolved] = useState<ConGroup[]>(() => (today ? puzzle.groups : []))
  const [solveSeq, setSolveSeq] = useState<GroupColor[]>([])
  const [mistakes, setMistakes] = useState(today?.mistakes ?? 0)
  const [rows, setRows] = useState<string[][]>(today?.rows ?? [])
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>(
    today ? (today.won ? 'won' : 'lost') : 'playing',
  )
  const [points, setPoints] = useState(today?.points ?? 0)
  const [career, setCareer] = useState<ConCareer>(() => loadConCareer())
  const [recorded, setRecorded] = useState(!!today)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const over = status !== 'playing'
  const daily = mode === 'daily'
  const won = status === 'won'
  const perfect = won && mistakes === 0
  const ordered = won && solveSeq.length === 4 && solveSeq.every((c, i) => c === ORDER[i])
  const solvedNames = new Set(solved.flatMap((g) => g.members))
  const remaining = order.filter((n) => !solvedNames.has(n))

  function toggle(name: string) {
    if (over) return
    setMessage('')
    setSelected((sel) =>
      sel.includes(name)
        ? sel.filter((n) => n !== name)
        : sel.length < 4
          ? [...sel, name]
          : sel,
    )
  }

  function finish(
    didWin: boolean,
    finalMistakes: number,
    finalRows: string[][],
    seq: GroupColor[],
  ) {
    setSolved(puzzle.groups)
    setStatus(didWin ? 'won' : 'lost')
    const solvedCount = didWin ? 4 : seq.length
    const pts = computePoints(solvedCount, finalMistakes, didWin, seq)
    setPoints(pts)
    if (didWin) confetti()
    if (daily && !recorded) {
      setCareer(recordConCareer({ points: pts, won: didWin, mistakes: finalMistakes, rows: finalRows }))
      setRecorded(true)
    }
  }

  function enviar() {
    if (selected.length !== 4 || over) return
    const colors = selected.map((n) => groupOf[n].color)
    const nextRows = [...rows, colors as string[]]
    setRows(nextRows)

    if (colors.every((c) => c === colors[0])) {
      const g = puzzle.groups.find((x) => x.color === colors[0])!
      const nextSolved = [...solved, g]
      const nextSeq = [...solveSeq, g.color]
      setSolveSeq(nextSeq)
      setSelected([])
      if (nextSolved.length === 4) finish(true, mistakes, nextRows, nextSeq)
      else setSolved(nextSolved)
      return
    }

    const counts: Record<string, number> = {}
    colors.forEach((c) => (counts[c] = (counts[c] ?? 0) + 1))
    const oneAway = Math.max(...Object.values(counts)) === 3
    const m = mistakes + 1
    setMistakes(m)
    setSelected([])
    setMessage(oneAway ? 'Faltou um! (cuidado com a isca)' : 'Não foi dessa vez')
    setWrong(true)
    setTimeout(() => setWrong(false), 450)
    if (m >= MAX_MISTAKES) finish(false, m, nextRows, solveSeq)
  }

  // Inicia um puzzle de treino (não conta pontos).
  function treinar() {
    let next = pIdx
    while (next === pIdx && conexoes.length > 1)
      next = Math.floor(Math.random() * conexoes.length)
    setMode('practice')
    setPIdx(next)
    setOrder(
      seededShuffle(
        conexoes[next].groups.flatMap((g) => g.members),
        Math.floor(Math.random() * 1e9) + 1,
      ),
    )
    setSelected([])
    setSolved([])
    setSolveSeq([])
    setMistakes(0)
    setRows([])
    setStatus('playing')
    setPoints(0)
    setMessage('')
  }

  function closeHelp() {
    setShowHelp(false)
    try {
      localStorage.setItem(HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  function compartilhar() {
    const head = `Encyclobol · Quarteto #${dayNumber()} — ${points} pts${
      perfect ? ' (limpo!)' : won ? '' : ' (X)'
    }`
    const grid = rows.map((row) => row.map((c) => emoji[c as GroupColor]).join('')).join('\n')
    const text = `${head}\n${grid}\nTotal: ${career.total} pts\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ink-900">
            <BallMark className="h-6 w-6 text-grass-600" />
            <span className="font-cond text-sm font-600 uppercase tracking-wider">← Encyclobol</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
              {daily ? 'Quarteto do dia' : 'Modo treino'}
            </span>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="Como jogar"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink-900 font-cond text-sm font-700 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Lógica · jogo 03</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Quarteto
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Ache os quatro grupos de quatro craques. Sempre tem uma isca: alguém que
          parece caber em dois lugares — mas só fecha de um jeito.
        </p>

        {daily && (
          <p className="mt-2 font-cond text-xs font-600 uppercase tracking-wider text-ink-500">
            Total na ofensiva: <span className="text-grass-600">{career.total} pts</span>
            {career.streak > 0 && <> · {career.streak} dia{career.streak === 1 ? '' : 's'} seguido{career.streak === 1 ? '' : 's'}</>}
          </p>
        )}

        <div className="mt-6 w-full max-w-xl">
          {solved.length > 0 && (
            <div className="mb-2 space-y-2">
              {solved.map((g) => (
                <div
                  key={g.color}
                  className={`animate-rise rounded-sm px-3 py-2 text-center text-paper ${solvedBg[g.color]}`}
                >
                  <div className="font-cond text-xs font-700 uppercase tracking-wider">{g.label}</div>
                  <div className="font-serif text-sm">{g.members.join(' · ')}</div>
                </div>
              ))}
            </div>
          )}

          {remaining.length > 0 && (
            <div className={`grid grid-cols-4 gap-1.5 ${wrong ? 'animate-shake' : ''}`}>
              {remaining.map((name) => {
                const on = selected.includes(name)
                return (
                  <button
                    key={name}
                    onClick={() => toggle(name)}
                    className={`flex min-h-[60px] items-center justify-center rounded-sm border-2 px-1 py-2 text-center font-cond text-[11px] font-600 uppercase leading-tight transition-colors sm:text-sm ${
                      on
                        ? 'border-ink-900 bg-ink-900 text-paper'
                        : 'border-ink-900/25 bg-paper text-ink-900 hover:border-ink-900'
                    }`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          )}

          {!over && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">Erros</span>
                {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${i < mistakes ? 'bg-ochre-500' : 'bg-ink-900/20'}`}
                  />
                ))}
              </div>
              <span className="font-cond text-xs font-600 uppercase tracking-wider text-ochre-600">{message}</span>
            </div>
          )}

          {!over && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setOrder((o) => seededShuffle(o, Math.floor(Math.random() * 1e9) + 1))}
                className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
              >
                Embaralhar
              </button>
              <button
                onClick={() => setSelected([])}
                className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
              >
                Limpar
              </button>
              <button
                onClick={enviar}
                disabled={selected.length !== 4}
                className="btn-stamp bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Enviar
              </button>
            </div>
          )}

          {over && (
            <div className="mt-4 border-2 border-ink-900 bg-paper-100 p-6 text-center">
              <p className="kicker">
                {won ? 'Cravou os quatro grupos!' : 'Acabaram as tentativas'}
                {!daily && ' · treino'}
              </p>
              <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
              <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                pontos {daily ? 'hoje' : 'no treino'}
              </p>

              {(perfect || ordered) && (
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {perfect && (
                    <span className="border border-grass-700 bg-grass-600 px-2 py-0.5 font-cond text-[10px] font-700 uppercase tracking-wide text-paper">
                      Sem erros +{PERFECT_BONUS}
                    </span>
                  )}
                  {ordered && (
                    <span className="border border-ink-900 bg-ink-900 px-2 py-0.5 font-cond text-[10px] font-700 uppercase tracking-wide text-paper">
                      Na ordem +{ORDER_BONUS}
                    </span>
                  )}
                </div>
              )}

              {daily && (
                <>
                  <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                    {[
                      ['Total', career.total],
                      ['Recorde', career.best],
                      ['Ofensiva', career.streak],
                      ['Dias', career.days],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-paper-100 px-1 py-2">
                        <div className="font-display text-2xl text-ink-900">{v}</div>
                        <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-serif text-sm italic text-ink-600">Volte amanhã pra somar mais.</p>
                  <button
                    onClick={compartilhar}
                    className="btn-stamp mt-4 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
                  >
                    {copied ? 'Copiado!' : 'Compartilhar resultado'}
                  </button>
                </>
              )}

              <button
                onClick={treinar}
                className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
              >
                {daily ? 'Treinar (sem pontos)' : 'Outro puzzle'}
              </button>
              <Link
                to="/"
                className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
              >
                Voltar pro almanaque
              </Link>
            </div>
          )}
        </div>
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4" onClick={closeHelp}>
          <div className="w-full max-w-sm border-2 border-ink-900 bg-paper p-6" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Como jogar</p>
            <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              Quarteto
            </h2>
            <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">
              <li>
                Os 16 craques formam <strong>4 grupos de 4</strong> por algum elo: clube, seleção,
                posição, era...
              </li>
              <li>
                Tem sempre uma <strong>isca</strong>: um craque que parece caber em dois grupos, mas
                só fecha de um jeito. São <strong>4 erros</strong> e acaba.
              </li>
              <li>
                A cor mostra a dificuldade do grupo:{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-corn-500" /> fácil →{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-grass-600" />{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-ochre-500" /> →{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-ink-700" /> traiçoeiro.
              </li>
              <li>
                <strong>Pontos:</strong> cada grupo +{SOLVE_PTS}; terminar <strong>sem erros</strong>{' '}
                rende +{PERFECT_BONUS}; achar do mais fácil ao mais difícil rende +{ORDER_BONUS}. Tudo
                soma num <strong>total</strong> que cresce a cada dia.
              </li>
            </ul>
            <button onClick={closeHelp} className="btn-stamp mt-6 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Entendi, bora
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
