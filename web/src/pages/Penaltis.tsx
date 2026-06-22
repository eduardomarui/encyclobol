import { useEffect, useRef, useState } from 'react'
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

const ROUNDS = 10
const SECONDS = 8

type Mark = 'goal' | 'miss'
type PQ = { q: string; cat: string; options: string[]; correct: number }
type Zone = { x: number; y: number }
type Pose = 'idle' | 'center' | 'tl' | 'tr' | 'dl' | 'dr'
type Shot = {
  bx: number
  by: number
  kx: number
  pose: Pose
  label: string
  good: boolean
  net: boolean
} | null

const ZONES: Zone[] = [
  { x: 22, y: 20 },
  { x: 50, y: 15 },
  { x: 78, y: 20 },
  { x: 24, y: 38 },
  { x: 50, y: 40 },
  { x: 76, y: 38 },
]

// "Folha de poses" do goleiro: cada pose é um quadro com braços/pernas/tronco
// em posições diferentes. xy = ponto final de cada membro; tilt = inclinação.
type PoseDef = {
  tilt: number
  handL: [number, number]
  handR: [number, number]
  footL: [number, number]
  footR: [number, number]
}
const POSES: Record<Pose, PoseDef> = {
  idle: { tilt: 0, handL: [16, 32], handR: [44, 32], footL: [24, 54], footR: [36, 54] },
  center: { tilt: 0, handL: [20, 6], handR: [40, 6], footL: [26, 52], footR: [34, 52] },
  tl: { tilt: -34, handL: [6, 8], handR: [20, 16], footL: [40, 50], footR: [46, 44] },
  tr: { tilt: 34, handL: [40, 16], handR: [54, 8], footL: [14, 44], footR: [20, 50] },
  dl: { tilt: -16, handL: [4, 36], handR: [18, 30], footL: [44, 48], footR: [50, 42] },
  dr: { tilt: 16, handL: [42, 30], handR: [56, 36], footL: [10, 42], footR: [16, 48] },
}

function Keeper({ pose }: { pose: Pose }) {
  const P = POSES[pose]
  return (
    <svg viewBox="0 0 60 64" className="h-24 w-24 overflow-visible">
      <g
        transform={`rotate(${P.tilt} 30 34)`}
        style={{ transition: 'transform .12s' }}
      >
        {/* pernas */}
        <path d={`M30 40 L${P.footL[0]} ${P.footL[1]}`} stroke="#16130d" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M30 40 L${P.footR[0]} ${P.footR[1]}`} stroke="#16130d" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* tronco (camisa de goleiro) */}
        <rect x="23" y="20" width="14" height="22" rx="5" fill="#caa83a" />
        <rect x="23" y="27" width="14" height="3" fill="#16130d" opacity="0.25" />
        {/* braços */}
        <path d={`M30 25 L${P.handL[0]} ${P.handL[1]}`} stroke="#caa83a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M30 25 L${P.handR[0]} ${P.handR[1]}`} stroke="#caa83a" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* luvas */}
        <circle cx={P.handL[0]} cy={P.handL[1]} r="4.3" fill="#f2eee2" stroke="#16130d" strokeWidth="1.3" />
        <circle cx={P.handR[0]} cy={P.handR[1]} r="4.3" fill="#f2eee2" stroke="#16130d" strokeWidth="1.3" />
        {/* cabeça */}
        <circle cx="30" cy="13" r="5.2" fill="#e0b48a" />
      </g>
    </svg>
  )
}

const saved = loadPenDaily()

function prepQ(bi: number, seed: number): PQ {
  const base = quiz[bi]
  const order = seededShuffle(base.options.map((_, i) => i), seed)
  return {
    q: base.q,
    cat: base.cat,
    options: order.map((i) => base.options[i]),
    correct: order.indexOf(base.correct),
  }
}
function dailyPrepared(): PQ[] {
  return dailySequence(quiz.length, ROUNDS).map((bi, qi) => prepQ(bi, dayNumber() * 101 + qi * 7 + 1))
}
function randomPrepared(n: number): PQ[] {
  const seed = Math.floor(Math.random() * 1e9) + 1
  return seededShuffle(quiz.map((_, i) => i), seed)
    .slice(0, n)
    .map((bi, qi) => prepQ(bi, seed + qi * 13))
}
function extraQ(): PQ {
  return prepQ(Math.floor(Math.random() * quiz.length), Math.floor(Math.random() * 1e9) + 1)
}

function poseFor(z: Zone): Pose {
  if (Math.abs(z.x - 50) < 8) return 'center'
  if (z.x < 50) return z.y < 25 ? 'tl' : 'dl'
  return z.y < 25 ? 'tr' : 'dr'
}

function Pip({ mark, team }: { mark?: Mark; team: 'me' | 'op' }) {
  if (!mark) return <span className="h-3.5 w-3.5 rounded-full border border-paper/30" />
  if (mark === 'goal')
    return <span className={`h-3.5 w-3.5 rounded-full ${team === 'me' ? 'bg-grass-400' : 'bg-ochre-500'}`} />
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-paper/40 text-[9px] text-paper/50">
      ✕
    </span>
  )
}

export default function Penaltis() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [prepared, setPrepared] = useState<PQ[]>(() => dailyPrepared())
  const [index, setIndex] = useState(0)
  const [meus, setMeus] = useState<Mark[]>([])
  const [rival, setRival] = useState<Mark[]>([])
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

  const ballRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const current = prepared[index]
  const attacking = index % 2 === 0
  const pair = Math.floor(index / 2) + 1
  const slots = Math.max(5, meus.length, rival.length)

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

  useEffect(() => {
    const el = ballRef.current
    const scene = sceneRef.current
    if (!shot || !el || !scene) return
    const { width: W, height: H } = scene.getBoundingClientRect()
    const sx = W * 0.5
    const sy = H * 0.82
    const ex = (W * shot.bx) / 100
    const ey = (H * shot.by) / 100
    const ax = (sx + ex) / 2
    const ay = Math.min(sy, ey) - H * 0.16
    const anim = el.animate(
      [
        { transform: 'translate(-50%,-50%) scale(1)' },
        { transform: `translate(calc(-50% + ${ax - sx}px), calc(-50% + ${ay - sy}px)) scale(0.82)`, offset: 0.5 },
        { transform: `translate(calc(-50% + ${ex - sx}px), calc(-50% + ${ey - sy}px)) scale(0.56)` },
      ],
      { duration: 600, easing: 'cubic-bezier(.25,.6,.35,1)', fill: 'forwards' },
    )
    return () => anim.cancel()
  }, [shot])

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

    const p = Math.floor(index / 2)
    const nm = [...meus]
    const nr = [...rival]
    if (attacking) nm[p] = correct ? 'goal' : 'miss'
    else nr[p] = correct ? 'miss' : 'goal'
    setMeus(nm)
    setRival(nr)
    const myG = nm.filter((g) => g === 'goal').length
    const oppG = nr.filter((g) => g === 'goal').length
    setMy(myG)
    setOpp(oppG)

    const ballZone = ZONES[Math.floor(Math.random() * ZONES.length)]
    const isGoal = (attacking && correct) || (!attacking && !correct)
    let keeperZone: Zone
    if (isGoal) {
      const others = ZONES.filter((z) => z !== ballZone)
      keeperZone = others[Math.floor(Math.random() * others.length)]
    } else {
      keeperZone = ballZone
    }

    let label = ''
    let good = false
    if (attacking) {
      if (correct) { label = 'GOOOL!'; good = true }
      else label = choice === -1 ? 'PERDEU A HORA!' : 'DEFENDEU!'
    } else {
      if (correct) { label = 'VOCÊ PEGOU!'; good = true }
      else label = 'TOMOU GOL'
    }

    setShot({
      bx: ballZone.x,
      by: isGoal ? ballZone.y : 44,
      kx: Math.min(66, Math.max(34, keeperZone.x)),
      pose: poseFor(keeperZone),
      label,
      good,
      net: isGoal,
    })
    setPhase('shoot')

    setTimeout(() => {
      const i = index + 1
      if (i < prepared.length) goAsk(i)
      else if (myG !== oppG) finish(myG, oppG)
      else {
        setPrepared((pp) => [...pp, extraQ(), extraQ()])
        goAsk(i)
      }
    }, 1800)
  }

  function treinar() {
    setMode('practice')
    setPrepared(randomPrepared(ROUNDS))
    setIndex(0)
    setMeus([])
    setRival([])
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
    const board = (arr: Mark[]) =>
      Array.from({ length: slots })
        .map((_, i) => (arr[i] === 'goal' ? '🟢' : arr[i] === 'miss' ? '⚪' : '▫️'))
        .join('')
    const text =
      `Encyclobol · Pênaltis #${dayNumber()} — ${won ? 'venci' : 'perdi'} ${my}×${opp}\n` +
      `Você  ${board(meus)}\nRival ${board(rival)}\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const kx = shot ? shot.kx : 50
  const pose: Pose = shot ? shot.pose : 'idle'

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ink-900">
            <BallMark className="h-6 w-6 text-grass-600" />
            <span className="font-cond text-sm font-600 uppercase tracking-wider">← Encyclobol</span>
          </Link>
          <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
            {mode === 'daily' ? 'Edição diária' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-5">
        {/* PLACAR */}
        <div className="w-full max-w-sm border-2 border-ink-900 bg-ink-900 text-paper">
          <div className="flex items-center gap-3 border-b border-paper/15 px-3 py-2">
            <span className="w-12 font-cond text-xs font-700 uppercase tracking-wider text-grass-400">Você</span>
            <div className="flex flex-1 flex-wrap gap-1">
              {Array.from({ length: slots }).map((_, i) => (
                <Pip key={i} mark={meus[i]} team="me" />
              ))}
            </div>
            <span className="w-7 text-right font-display text-2xl leading-none">{my}</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="w-12 font-cond text-xs font-700 uppercase tracking-wider text-ochre-500">Rival</span>
            <div className="flex flex-1 flex-wrap gap-1">
              {Array.from({ length: slots }).map((_, i) => (
                <Pip key={i} mark={rival[i]} team="op" />
              ))}
            </div>
            <span className="w-7 text-right font-display text-2xl leading-none">{opp}</span>
          </div>
        </div>

        {!over && (
          <p className="mt-2 font-cond text-xs font-600 uppercase tracking-[0.16em] text-ink-500">
            {pair <= 5 ? `Cobrança ${pair}/5` : 'Morte súbita'} ·{' '}
            <span className={attacking ? 'text-grass-600' : 'text-ochre-600'}>
              {attacking ? 'Você cobra' : 'Você defende'}
            </span>
          </p>
        )}

        {/* CENA */}
        {!over && (
          <div
            ref={sceneRef}
            className={`relative mt-3 h-64 w-full max-w-sm overflow-hidden rounded-sm border-2 border-ink-900 ${
              shot?.net ? 'animate-shake' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#9ec7d8] via-[#86b98f] to-grass-700" />
            <div
              className="absolute inset-x-0 top-0 h-[22%] bg-ink-800"
              style={{
                backgroundImage: 'radial-gradient(rgba(242,238,226,0.35) 1px, transparent 1.4px)',
                backgroundSize: '6px 6px',
              }}
            />
            <div className="absolute inset-x-0 top-[52%] h-px bg-paper/40" />
            <div className="absolute left-1/2 top-[78%] h-2 w-2 -translate-x-1/2 rounded-full bg-paper/80" />
            <div className="absolute left-1/2 top-[64%] h-10 w-28 -translate-x-1/2 rounded-[100%] border-2 border-b-0 border-paper/25" />

            <div className={`absolute left-[11%] top-[16%] w-[78%] ${shot?.net ? 'animate-netshake' : ''}`}>
              <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="h-28 w-full">
                <g stroke="#f2eee2" strokeWidth="0.4" opacity="0.5">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <line key={`v${i}`} x1={4 + i * 9.2} y1="4" x2={4 + i * 9.2} y2="42" />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line key={`h${i}`} x1="4" y1={4 + i * 8} x2="96" y2={4 + i * 8} />
                  ))}
                </g>
                <path d="M4 42 V4 H96 V42" fill="none" stroke="#f2eee2" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            </div>

            {/* GOLEIRO (poses tipo sprite) */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${kx}%`, top: '44%', transition: 'left .4s cubic-bezier(.3,1.4,.5,1)' }}
            >
              <Keeper pose={pose} />
            </div>

            {/* BOLA */}
            <div
              ref={ballRef}
              className="absolute z-20"
              style={{ left: '50%', top: '82%', transform: 'translate(-50%,-50%)' }}
            >
              <div
                className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]"
                style={{ animation: shot ? 'ballspin 0.4s linear infinite' : 'none' }}
              >
                <BallMark className="h-8 w-8 text-paper" />
              </div>
            </div>

            {shot && (
              <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center">
                <span
                  className={`animate-pop rounded-sm px-4 py-1.5 font-display text-3xl uppercase tracking-tight text-paper shadow-lg ${
                    shot.good ? 'bg-grass-600' : 'bg-ochre-500'
                  }`}
                >
                  {shot.label}
                </span>
              </div>
            )}
          </div>
        )}

        {/* PERGUNTA */}
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
            <h2 className="mt-1 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">{current.q}</h2>
            <div className="mt-3 grid gap-2">
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
                    <span className="font-cond text-xs font-700">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* FIM */}
        {over && (
          <div className="mt-8 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">{won ? 'Vitória nos pênaltis!' : 'Disputa perdida'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {my} <span className="text-ink-500">×</span> {opp}
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              {won ? 'Frieza na cobrança e mão firme na defesa. Craque!' : 'Faltou pontaria. Amanhã tem revanche.'}
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
                      <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
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
