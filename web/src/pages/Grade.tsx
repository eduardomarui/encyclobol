import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { players } from '../data/players'
import { dayNumber } from '../lib/daily'
import {
  buildGrid,
  findPlayer,
  rarityPoints,
  satisfies,
  type Grid,
} from '../lib/grade'
import {
  loadGradeDaily,
  loadGradeStats,
  recordGrade,
  saveGradeDaily,
  type GradeStats,
} from '../lib/gradeStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const DAILY_SEED = (dayNumber() + 1) * 50021
const gradeSaved = loadGradeDaily()
const rnd = () => Math.floor(Math.random() * 1e9) + 1

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function Grade() {
  const [mode, setMode] = useState<'solo' | 'pelada'>('solo')
  const [practice, setPractice] = useState(false)
  const [grid, setGrid] = useState<Grid>(() => buildGrid(DAILY_SEED))
  const { rows, cols } = grid

  // Solo
  const [filled, setFilled] = useState<Record<number, { name: string; pts: number }>>({})
  const [missed, setMissed] = useState<number[]>([])
  const [used, setUsed] = useState<string[]>([])
  const [ended, setEnded] = useState(!!gradeSaved)
  const [recorded, setRecorded] = useState(!!gradeSaved)
  const [stats, setStats] = useState<GradeStats>(() => loadGradeStats())
  const [copied, setCopied] = useState(false)

  // Pelada
  const [claimed, setClaimed] = useState<Record<number, 1 | 2>>({})
  const [cellName, setCellName] = useState<Record<number, string>>({})
  const [turn, setTurn] = useState<1 | 2>(1)
  const [winner, setWinner] = useState<0 | 1 | 2 | null>(null)

  // Compartilhado
  const [sel, setSel] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [note, setNote] = useState('')

  const filledCount = Object.keys(filled).length
  const points = Object.values(filled).reduce((s, f) => s + f.pts, 0)
  const soloOver = mode === 'solo' && (ended || filledCount + missed.length === 9)
  const peladaOver = mode === 'pelada' && winner !== null

  useEffect(() => {
    if (mode === 'solo' && !practice && soloOver && !recorded) {
      setStats(recordGrade(filledCount, points))
      saveGradeDaily({ day: dayNumber(), filled: filledCount, points })
      setRecorded(true)
      if (filledCount >= 6) confetti()
    }
  }, [mode, practice, soloOver, recorded, filledCount, points])

  function resetCommon() {
    setSel(null)
    setInput('')
    setNote('')
  }

  function startSoloDaily() {
    setMode('solo')
    setPractice(false)
    setGrid(buildGrid(DAILY_SEED))
    setFilled({})
    setMissed([])
    setUsed([])
    setEnded(!!gradeSaved)
    resetCommon()
  }

  function startSoloPractice() {
    setMode('solo')
    setPractice(true)
    setGrid(buildGrid(rnd()))
    setFilled({})
    setMissed([])
    setUsed([])
    setEnded(false)
    resetCommon()
  }

  function startPelada() {
    setMode('pelada')
    setGrid(buildGrid(rnd()))
    setClaimed({})
    setCellName({})
    setTurn(1)
    setWinner(null)
    resetCommon()
  }

  function rc(i: number): [number, number] {
    return [Math.floor(i / 3), i % 3]
  }

  function selectCell(i: number) {
    if (mode === 'solo') {
      if (soloOver || filled[i] || missed.includes(i)) return
    } else {
      if (peladaOver || claimed[i]) return
    }
    setSel(i)
    setInput('')
    setNote('')
  }

  function checkWin(c: Record<number, 1 | 2>): 1 | 2 | null {
    for (const [a, b, d] of WIN_LINES) {
      if (c[a] && c[a] === c[b] && c[a] === c[d]) return c[a]
    }
    return null
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sel == null) return
    const p = findPlayer(input)
    if (!p) {
      setNote('Não achei esse craque')
      return
    }
    const [r, c] = rc(sel)
    const ok = satisfies(p, rows[r], cols[c])

    if (mode === 'solo') {
      if (used.includes(p.answer)) {
        setNote('Você já usou esse craque')
        return
      }
      if (ok) {
        setFilled({ ...filled, [sel]: { name: p.display, pts: rarityPoints(p) } })
        setUsed([...used, p.answer])
      } else {
        setMissed([...missed, sel])
        setNote('Não encaixa')
      }
      setSel(null)
      setInput('')
    } else {
      if (!ok) {
        setNote('Não encaixa, tente outro')
        return
      }
      const nc = { ...claimed, [sel]: turn }
      setClaimed(nc)
      setCellName({ ...cellName, [sel]: p.display })
      setSel(null)
      setInput('')
      setNote('')
      const w = checkWin(nc)
      if (w) setWinner(w)
      else if (Object.keys(nc).length === 9) setWinner(0)
      else setTurn(turn === 1 ? 2 : 1)
    }
  }

  function compartilhar() {
    let g = ''
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) g += filled[r * 3 + c] ? '🟩' : '⬛'
      g += '\n'
    }
    const text = `Encyclobol · A Grade #${dayNumber()} — ${filledCount}/9 · ${points} pts (raridade)\n${g}encyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const selLabels =
    sel != null ? `${rows[rc(sel)[0]].label} × ${cols[rc(sel)[1]].label}` : ''

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
            {mode === 'solo'
              ? practice
                ? 'Treino'
                : 'Edição diária'
              : 'Pelada · 2 jogadores'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Figurinhas · jogo 07</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          A Grade
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Preencha cada quadrado com um craque que cruza a linha e a coluna. No
          solo, craque óbvio vale pouco — garimpo raro vale mais.
        </p>

        {/* Seletor de modo */}
        <div className="mt-5 flex overflow-hidden rounded-sm border-2 border-ink-900">
          <button
            onClick={startSoloDaily}
            className={`px-4 py-1.5 font-cond text-xs font-600 uppercase tracking-wider ${
              mode === 'solo' ? 'bg-ink-900 text-paper' : 'bg-paper text-ink-900'
            }`}
          >
            Solo
          </button>
          <button
            onClick={() => mode !== 'pelada' && startPelada()}
            className={`px-4 py-1.5 font-cond text-xs font-600 uppercase tracking-wider ${
              mode === 'pelada' ? 'bg-ink-900 text-paper' : 'bg-paper text-ink-900'
            }`}
          >
            Pelada (2P)
          </button>
        </div>

        {/* Status */}
        {mode === 'solo' && !soloOver && (
          <div className="mt-4 flex items-center gap-5">
            <span className="font-display text-2xl text-ink-900">
              {points}
              <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">
                pts
              </span>
            </span>
            <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
              {filledCount}/9 preenchidos
            </span>
          </div>
        )}
        {mode === 'pelada' && !peladaOver && (
          <p className="mt-4 font-cond text-sm font-600 uppercase tracking-wider">
            Vez do{' '}
            <span className={turn === 1 ? 'text-grass-600' : 'text-ochre-600'}>
              Jogador {turn}
            </span>
          </p>
        )}

        {/* Grade 3x3 com cabeçalhos */}
        <div className="mt-5 w-full max-w-md">
          <div className="grid grid-cols-[64px_repeat(3,1fr)] gap-1.5">
            <div />
            {cols.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-center bg-paper-200 px-1 py-2 text-center font-cond text-[10px] font-700 uppercase leading-tight text-ink-800"
              >
                {c.label}
              </div>
            ))}

            {rows.map((row, r) => (
              <div key={row.id} className="contents">
                <div className="flex items-center justify-center bg-paper-200 px-1 text-center font-cond text-[10px] font-700 uppercase leading-tight text-ink-800">
                  {row.label}
                </div>
                {cols.map((_, c) => {
                  const i = r * 3 + c
                  const f = filled[i]
                  const isMiss = missed.includes(i)
                  const own = claimed[i]
                  const isSel = sel === i
                  let cls = 'bg-paper hover:bg-paper-100'
                  if (mode === 'solo') {
                    if (f) cls = 'bg-grass-600 text-paper'
                    else if (isMiss) cls = 'bg-ink-700 text-paper/60'
                  } else if (own) {
                    cls = own === 1 ? 'bg-grass-600 text-paper' : 'bg-ochre-500 text-paper'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => selectCell(i)}
                      className={`flex aspect-square flex-col items-center justify-center border-2 px-1 text-center transition-colors ${cls} ${
                        isSel ? 'border-ink-900 ring-4 ring-corn-500' : 'border-ink-900/30'
                      }`}
                    >
                      {mode === 'solo' && f && (
                        <>
                          <span className="font-cond text-[10px] font-600 uppercase leading-tight">
                            {f.name}
                          </span>
                          <span className="mt-0.5 font-display text-sm">+{f.pts}</span>
                        </>
                      )}
                      {mode === 'solo' && isMiss && <span className="text-xl">✕</span>}
                      {mode === 'pelada' && own && (
                        <span className="font-cond text-[10px] font-600 uppercase leading-tight">
                          {cellName[i]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Entrada */}
        {sel != null && !soloOver && !peladaOver && (
          <form onSubmit={submit} className="mt-5 w-full max-w-md">
            <p className="mb-2 text-center font-serif text-sm italic text-ink-600">
              {selLabels}
            </p>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nome do craque…"
                autoFocus
                list="craques"
                autoComplete="off"
                className="flex-1 border-2 border-ink-900 bg-paper px-4 py-3 font-serif text-base text-ink-900 outline-none placeholder:text-ink-500 focus:bg-paper-100"
              />
              <datalist id="craques">
                {players.map((p) => (
                  <option key={p.answer} value={p.display} />
                ))}
              </datalist>
              <button
                type="submit"
                className="btn-stamp bg-grass-600 px-6 text-paper hover:bg-grass-700"
              >
                Ok
              </button>
            </div>
            {note && (
              <p className="mt-2 text-center font-cond text-xs font-600 uppercase tracking-wider text-ochre-600">
                {note}
              </p>
            )}
          </form>
        )}

        {mode === 'solo' && !soloOver && sel == null && (
          <p className="mt-5 font-serif text-sm italic text-ink-500">
            Toque num quadrado pra preencher.
          </p>
        )}

        {/* Fim solo */}
        {soloOver && (
          <div className="mt-6 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">{practice ? 'Treino encerrado' : 'Grade do dia'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              pontos de raridade · {filledCount}/9 preenchidos
            </p>

            {!practice && (
              <>
                <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                  {[
                    ['Jogos', stats.played],
                    ['Recorde', stats.best],
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
              onClick={startSoloPractice}
              className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              Treinar com outra grade
            </button>
            <button
              onClick={startPelada}
              className="btn-stamp mt-2 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              Chamar um amigo (Pelada)
            </button>
          </div>
        )}

        {/* Fim pelada */}
        {peladaOver && (
          <div className="mt-6 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim da pelada</p>
            <p className="mt-1 font-display text-4xl uppercase tracking-tight text-ink-900">
              {winner === 0 ? 'Empate!' : `Jogador ${winner} venceu`}
            </p>
            <button
              onClick={startPelada}
              className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              Jogar de novo
            </button>
            <button
              onClick={startSoloDaily}
              className="btn-stamp mt-2 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              Voltar pro solo
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
