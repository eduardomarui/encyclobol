import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { quiz } from '../data/quiz'
import { dailySequence, dayNumber, seededShuffle } from '../lib/daily'
import {
  loadPenDaily,
  loadPenStats,
  recordPen,
  savePenDaily,
  type PenStats,
} from '../lib/penaltisStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const ROUNDS = 10 // 5 cobranças + 5 defesas, alternadas
const SECONDS = 8

type PQ = { q: string; cat: string; options: string[]; correct: number }
type Shot = {
  ballLeft: number
  ballTop: number
  keeperLeft: number
  label: string
  good: boolean
} | null

const saved = loadPenDaily()

function prepQ(bi: number, seed: number): PQ {
  const base = quiz[bi]
  const order = seededShuffle(
    base.options.map((_, i) => i),
    seed,
  )
  return {
    q: base.q,
    cat: base.cat,
    options: order.map((i) => base.options[i]),
    correct: order.indexOf(base.correct),
  }
}

function dailyPrepared(): PQ[] {
  const picks = dailySequence(quiz.length, ROUNDS)
  return picks.map((bi, qi) => prepQ(bi, dayNumber() * 101 + qi * 7 + 1))
}

function randomPrepared(n: number): PQ[] {
  const seed = Math.floor(Math.random() * 1e9) + 1
  const picks = seededShuffle(
    quiz.map((_, i) => i),
    seed,
  ).slice(0, n)
  return picks.map((bi, qi) => prepQ(bi, seed + qi * 13))
}

function extraQ(): PQ {
  const bi = Math.floor(Math.random() * quiz.length)
  return prepQ(bi, Math.floor(Math.random() * 1e9) + 1)
}

export default function Penaltis() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [prepared, setPrepared] = useState<PQ[]>(() => dailyPrepared())
  const [index, setIndex] = useState(0)
  const [my, setMy] = useState(saved?.myGoals ?? 0)
  const [opp, setOpp] = useState(saved?.oppGoals ?? 0)
  const [phase, setPhase] = useState<'ask' | 'shoot'>('ask')
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(SECONDS)
  const [shot, setShot] = useState<Shot>(null)
  const [over, setOver] = useState(!!saved)
  const [won, setWon] = useState(saved?.won ?? false)
  const [recorded, setRecorded] = useState(!!saved)
  const [stats, setStats] = useState<PenStats>(() => loadPenStats())
  const [copied, setCopied] = useState(false)

  const current = prepared[index]
  const attacking = index % 2 === 0
  const pair = Math.floor(index / 2) + 1

  // Cronômetro
  useEffect(() => {
    if (over || phase !== 'ask') return
    if (timeLeft <= 0) {
      resolve(-1)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, over])

  function finish(myG: number, oppG: number) {
    const w = myG > oppG
    setOver(true)
    setWon(w)
    if (w) confetti()
    if (mode === 'daily' && !recorded) {
      setStats(recordPen(w))
      savePenDaily({ day: dayNumber(), myGoals: myG, oppGoals: oppG, won: w })
      setRecorded(true)
    }
  }

  function goAsk(i: number) {
    setIndex(i)
    setShot(null)
    setSelected(null)
    setTimeLeft(SECONDS)
    setPhase('ask')
  }

  function resolve(choice: number) {
    if (phase !== 'ask') return
    const correct = choice === current.correct
    setSelected(choice)

    let myG = my
    let oppG = opp
    const side: 'L' | 'R' = (index + (correct ? 1 : 0)) % 2 === 0 ? 'L' : 'R'
    const ballLeft = side === 'L' ? 24 : 76
    let keeperLeft = 50
    let ballTop = 42
    let label = ''
    let good = false

    if (attacking) {
      if (correct) {
        myG++
        keeperLeft = side === 'L' ? 66 : 34
        ballTop = 18
        label = 'GOOOL!'
        good = true
      } else {
        keeperLeft = side === 'L' ? 34 : 66
        ballTop = 42
        label = choice === -1 ? 'PERDEU A HORA!' : 'DEFENDEU!'
      }
    } else {
      if (correct) {
        keeperLeft = side === 'L' ? 34 : 66
        ballTop = 42
        label = 'VOCÊ PEGOU!'
        good = true
      } else {
        oppG++
        keeperLeft = side === 'L' ? 66 : 34
        ballTop = 18
        label = 'TOMOU GOL'
      }
    }

    setMy(myG)
    setOpp(oppG)
    setShot({ ballLeft, ballTop, keeperLeft, label, good })
    setPhase('shoot')

    setTimeout(() => {
      const i = index + 1
      if (i < prepared.length) goAsk(i)
      else if (myG !== oppG) finish(myG, oppG)
      else {
        setPrepared((p) => [...p, extraQ(), extraQ()])
        goAsk(i)
      }
    }, 1700)
  }

  function treinar() {
    setMode('practice')
    setPrepared(randomPrepared(ROUNDS))
    setIndex(0)
    setMy(0)
    setOpp(0)
    setPhase('ask')
    setSelected(null)
    setTimeLeft(SECONDS)
    setShot(null)
    setOver(false)
    setWon(false)
  }

  function compartilhar() {
    const head = `Encyclobol · Disputa de Pênaltis #${dayNumber()} — ${
      won ? 'venci' : 'perdi'
    } por ${my} a ${opp}`
    const text = `${head}\n${won ? '🥅⚽🏆' : '🥅⚽'}\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const ballLeft = shot ? shot.ballLeft : 50
  const ballTop = shot ? shot.ballTop : 80
  const keeperLeft = shot ? shot.keeperLeft : 50

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

      <main className="container-page flex flex-1 flex-col items-center py-6">
        {/* Placar */}
        <div className="flex items-center gap-4">
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-grass-600">
            Você
          </span>
          <span className="font-display text-4xl text-ink-900">
            {my} <span className="text-ink-500">×</span> {opp}
          </span>
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ochre-600">
            Rival
          </span>
        </div>
        {!over && (
          <p className="mt-1 font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-500">
            {pair <= 5 ? `Cobrança ${pair} de 5` : 'Morte súbita'} ·{' '}
            <span className={attacking ? 'text-grass-600' : 'text-ochre-600'}>
              {attacking ? 'Você cobra' : 'Você defende'}
            </span>
          </p>
        )}

        {/* Cena do gol */}
        {!over && (
          <div className="relative mt-4 h-56 w-full max-w-sm overflow-hidden rounded-sm border-2 border-ink-900 bg-gradient-to-b from-[#bcd9e6] via-[#7fb38a] to-grass-600">
            {/* Gol / rede */}
            <svg
              viewBox="0 0 100 44"
              preserveAspectRatio="none"
              className="absolute left-1/2 top-2 h-[40%] w-[78%] -translate-x-1/2 text-paper"
            >
              <rect x="2" y="2" width="96" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
              <g stroke="currentColor" strokeWidth="0.5" opacity="0.55">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v${i}`} x1={2 + (i + 1) * 9.6} y1="2" x2={2 + (i + 1) * 9.6} y2="42" />
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={`h${i}`} x1="2" y1={2 + (i + 1) * 8} x2="98" y2={2 + (i + 1) * 8} />
                ))}
              </g>
            </svg>

            {/* Goleiro */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
              style={{ left: `${keeperLeft}%`, top: '40%' }}
            >
              <svg viewBox="0 0 24 28" className="h-14 w-12 text-ink-900">
                <circle cx="12" cy="5" r="3.4" fill="currentColor" />
                <path
                  d="M12 9c-3 0-5 2-5 5v6h10v-6c0-3-2-5-5-5Z"
                  fill="currentColor"
                />
                <path d="M7 12 2 9M17 12l5-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="2" cy="9" r="1.8" fill="#c8472b" />
                <circle cx="22" cy="9" r="1.8" fill="#c8472b" />
              </svg>
            </div>

            {/* Bola */}
            <div
              className="absolute z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${ballLeft}%`,
                top: `${ballTop}%`,
                transition: shot ? 'left 0.7s cubic-bezier(.3,.7,.4,1), top 0.7s cubic-bezier(.3,.7,.4,1)' : 'none',
              }}
            >
              <BallMark className="h-7 w-7 text-paper drop-shadow" />
            </div>

            {/* Resultado */}
            {shot && (
              <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center">
                <span
                  className={`animate-pop rounded-sm px-3 py-1 font-display text-2xl uppercase tracking-tight text-paper ${
                    shot.good ? 'bg-grass-600' : 'bg-ochre-500'
                  }`}
                >
                  {shot.label}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Pergunta */}
        {!over && current && (
          <div className="mt-4 w-full max-w-sm">
            <div className="mb-1.5 h-1.5 w-full bg-paper-300">
              <div
                className={`h-1.5 transition-[width] duration-1000 ease-linear ${
                  timeLeft <= 3 ? 'bg-ochre-500' : 'bg-grass-600'
                }`}
                style={{ width: `${(timeLeft / SECONDS) * 100}%` }}
              />
            </div>
            <p className="kicker text-ink-500">{current.cat}</p>
            <h2 className="mt-1 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">
              {current.q}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {current.options.map((opt, i) => {
                let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                if (phase === 'shoot') {
                  if (i === current.correct) cls = 'border-grass-700 bg-grass-600 text-paper'
                  else if (i === selected) cls = 'border-ochre-600 bg-ochre-500 text-paper'
                  else cls = 'border-ink-900/15 bg-paper opacity-60'
                }
                return (
                  <button
                    key={i}
                    onClick={() => resolve(i)}
                    disabled={phase === 'shoot'}
                    className={`flex items-center gap-3 border-2 px-4 py-2.5 text-left font-serif text-base transition-colors ${cls}`}
                  >
                    <span className="font-cond text-xs font-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Fim */}
        {over && (
          <div className="mt-8 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">{won ? 'Vitória!' : 'Não foi dessa vez'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {my} <span className="text-ink-500">×</span> {opp}
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              {won
                ? 'Disputa vencida nos pênaltis. Craque!'
                : 'Faltou frieza na cobrança. Amanhã tem revanche.'}
            </p>

            {mode === 'daily' && (
              <>
                <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
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
              Outra disputa
            </button>
            <Link
              to="/"
              className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              Voltar pro almanaque
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
