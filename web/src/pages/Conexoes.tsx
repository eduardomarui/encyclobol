import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { conexoes, type ConGroup, type GroupColor } from '../data/conexoes'
import { dailyIndex, dayNumber, seededShuffle } from '../lib/daily'
import {
  loadConDaily,
  loadConStats,
  recordCon,
  saveConDaily,
  type ConStats,
} from '../lib/conexoesStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const MAX_MISTAKES = 4

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

const saved = loadConDaily()
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
  const [solved, setSolved] = useState<ConGroup[]>(() =>
    saved ? puzzle.groups : [],
  )
  const [mistakes, setMistakes] = useState(saved?.mistakes ?? 0)
  const [rows, setRows] = useState<string[][]>(saved?.rows ?? [])
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>(
    saved ? (saved.won ? 'won' : 'lost') : 'playing',
  )
  const [message, setMessage] = useState('')
  const [recorded, setRecorded] = useState(!!saved)
  const [copied, setCopied] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [stats, setStats] = useState<ConStats>(() => loadConStats())

  const over = status !== 'playing'
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

  function finish(won: boolean, finalMistakes: number, finalRows: string[][]) {
    setSolved(puzzle.groups)
    setStatus(won ? 'won' : 'lost')
    if (won) {
      confetti()
    }
    if (mode === 'daily' && !recorded) {
      setStats(recordCon(won))
      saveConDaily({ day: dayNumber(), won, mistakes: finalMistakes, rows: finalRows })
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
      setSelected([])
      if (nextSolved.length === 4) finish(true, mistakes, nextRows)
      else setSolved(nextSolved)
      return
    }

    const counts: Record<string, number> = {}
    colors.forEach((c) => (counts[c] = (counts[c] ?? 0) + 1))
    const oneAway = Math.max(...Object.values(counts)) === 3
    const m = mistakes + 1
    setMistakes(m)
    setSelected([])
    setMessage(oneAway ? 'Faltou um!' : 'Não foi dessa vez')
    setWrong(true)
    setTimeout(() => setWrong(false), 450)
    if (m >= MAX_MISTAKES) finish(false, m, nextRows)
  }

  // Inicia um puzzle de treino (não conta pro placar diário).
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
    setMistakes(0)
    setRows([])
    setStatus('playing')
    setMessage('')
  }

  function compartilhar() {
    const head = `Encyclobol · Conexões #${dayNumber()} — ${
      status === 'won' ? `${mistakes} erro${mistakes === 1 ? '' : 's'}` : 'X'
    }`
    const grid = rows.map((row) => row.map((c) => emoji[c as GroupColor]).join('')).join('\n')
    const text = `${head}\n${grid}\nencyclobol.com.br`
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
            <span className="font-cond text-sm font-600 uppercase tracking-wider">
              ← Encyclobol
            </span>
          </Link>
          <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
            {mode === 'daily' ? 'Edição diária' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Lógica · jogo 03</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Conexões
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Encontre os quatro grupos de quatro craques. Cuidado: alguns parecem se
          encaixar em mais de um lugar.
        </p>

        <div className="mt-6 w-full max-w-xl">
          {solved.length > 0 && (
            <div className="mb-2 space-y-2">
              {solved.map((g) => (
                <div
                  key={g.color}
                  className={`animate-rise rounded-sm px-3 py-2 text-center text-paper ${solvedBg[g.color]}`}
                >
                  <div className="font-cond text-xs font-700 uppercase tracking-wider">
                    {g.label}
                  </div>
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
                <span className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                  Erros
                </span>
                {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < mistakes ? 'bg-ochre-500' : 'bg-ink-900/20'
                    }`}
                  />
                ))}
              </div>
              <span className="font-cond text-xs font-600 uppercase tracking-wider text-ochre-600">
                {message}
              </span>
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
                {status === 'won' ? 'Cravou os quatro grupos!' : 'Acabaram as tentativas'}
                {mode === 'practice' && ' · treino'}
              </p>

              {mode === 'daily' && (
                <>
                  <div className="mt-4 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                    {[
                      ['Jogos', stats.played],
                      ['Vitórias', stats.wins],
                      ['Sequência', stats.currentStreak],
                      ['Melhor', stats.maxStreak],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-paper-100 px-1 py-2">
                        <div className="font-display text-2xl text-ink-900">{v}</div>
                        <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">
                          {k}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={compartilhar}
                    className="btn-stamp mt-5 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
                  >
                    {copied ? 'Copiado!' : 'Compartilhar resultado'}
                  </button>
                </>
              )}

              <button
                onClick={treinar}
                className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
              >
                Treinar com outro puzzle
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
    </div>
  )
}
