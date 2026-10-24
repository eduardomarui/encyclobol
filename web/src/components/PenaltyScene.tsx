import { useEffect, useRef, useState } from 'react'
import { buzz, sfx } from '../lib/sfx'
import LottieBox from './LottieBox'

// Bola de futebol "de verdade": branca com gomos pretos (pentágonos).
function SoccerBall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <defs>
        <clipPath id="ballclip">
          <circle cx="16" cy="16" r="15" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="15" fill="#f7f4ec" stroke="#16130d" strokeWidth="1.4" />
      <g clipPath="url(#ballclip)">
        <g stroke="#16130d" strokeWidth="0.9" fill="none">
          <line x1="16" y1="10.5" x2="16" y2="1" />
          <line x1="21.2" y1="14.3" x2="30.3" y2="11.4" />
          <line x1="19.2" y1="20.4" x2="24.8" y2="28.1" />
          <line x1="12.8" y1="20.4" x2="7.2" y2="28.1" />
          <line x1="10.8" y1="14.3" x2="1.7" y2="11.4" />
        </g>
        <g fill="#16130d">
          <polygon points="16,10.5 21.2,14.3 19.2,20.4 12.8,20.4 10.8,14.3" />
          <polygon points="23.6,2.3 26.6,4.5 25.5,8.1 21.7,8.1 20.6,4.5" />
          <polygon points="28.4,16.8 31.4,19 30.3,22.6 26.5,22.6 25.4,19" />
          <polygon points="16,25.8 19,28 17.9,31.6 14.1,31.6 13,28" />
          <polygon points="3.6,16.8 6.6,19 5.5,22.6 1.7,22.6 0.6,19" />
          <polygon points="8.4,2.3 11.4,4.5 10.3,8.1 6.5,8.1 5.4,4.5" />
        </g>
      </g>
    </svg>
  )
}

const LOTTIE_KEEPER = `${import.meta.env.BASE_URL}lottie/keeper.json`

export type Pose = 'idle' | 'center' | 'tl' | 'tr' | 'dl' | 'dr'
export type Zone = { x: number; y: number }
// Como o lance termina. 'goal' entra; os outros não.
export type Outcome = 'goal' | 'save' | 'post' | 'wide' | 'over' | 'weak'
export type Shot = {
  bx: number // ponto de impacto (% da cena)
  by: number
  ex?: number // pra onde a bola sai depois do impacto (trave, espalmada)
  ey?: number
  kx: number
  pose: Pose
  label: string
  good: boolean // bom pra quem está vendo
  net: boolean
  outcome?: Outcome
  slow?: boolean
} | null

// O gol, em % da cena. Bola, goleiro e desenho usam a MESMA régua — antes o
// gol tinha altura fixa em pixels e o destino da bola era em %, então no
// celular o "ângulo" passava por cima do travessão e contava gol.
export const GOAL = { left: 14, right: 86, top: 24, bottom: 62 }
const gx = (u: number) => GOAL.left + u * (GOAL.right - GOAL.left)
const gy = (v: number) => GOAL.top + v * (GOAL.bottom - GOAL.top)

// 0-2: alto (esq, meio, dir) · 3-5: rasteiro
export const ZONES: Zone[] = [
  { x: gx(0.12), y: gy(0.18) },
  { x: gx(0.5), y: gy(0.16) },
  { x: gx(0.88), y: gy(0.18) },
  { x: gx(0.12), y: gy(0.8) },
  { x: gx(0.5), y: gy(0.78) },
  { x: gx(0.88), y: gy(0.8) },
]

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
      <g transform={`rotate(${P.tilt} 30 34)`} style={{ transition: 'transform .14s' }}>
        {([P.footL, P.footR] as [number, number][]).map((f, i) => (
          <g key={i}>
            <path d={`M30 39 L${f[0]} ${f[1]}`} stroke="#e0b48a" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d={`M30 39 L${(30 + f[0]) / 2} ${(39 + f[1]) / 2}`} stroke="#262219" strokeWidth="6.5" strokeLinecap="round" fill="none" />
            <ellipse cx={f[0]} cy={f[1] + 1.5} rx="3.4" ry="2" fill="#16130d" />
          </g>
        ))}
        <path d={`M30 24 L${P.handL[0]} ${P.handL[1]}`} stroke="#caa83a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M30 24 L${P.handR[0]} ${P.handR[1]}`} stroke="#caa83a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M21 21 Q30 17 39 21 L38 40 Q30 43 22 40 Z" fill="#caa83a" />
        <path d="M26 18 Q30 22 34 18" fill="none" stroke="#16130d" strokeWidth="1.4" opacity="0.5" />
        <text x="30" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16130d" opacity="0.55">1</text>
        <circle cx={P.handL[0]} cy={P.handL[1]} r="5" fill="#f2eee2" stroke="#16130d" strokeWidth="1.4" />
        <circle cx={P.handR[0]} cy={P.handR[1]} r="5" fill="#f2eee2" stroke="#16130d" strokeWidth="1.4" />
        <circle cx="30" cy="12.5" r="5.4" fill="#e8c39e" />
        <path d="M24.8 11.5 Q30 4 35.2 11.5 Q30 8.5 24.8 11.5 Z" fill="#3a2a1a" />
      </g>
    </svg>
  )
}

export function poseFor(z: Zone): Pose {
  if (Math.abs(z.x - 50) < 8) return 'center'
  const high = z.y < (GOAL.top + GOAL.bottom) / 2
  if (z.x < 50) return high ? 'tl' : 'dl'
  return high ? 'tr' : 'dr'
}

const clampKx = (x: number) => Math.min(66, Math.max(34, x))
const pick = <T,>(arr: T[], seed: number) => arr[((seed % arr.length) + arr.length) % arr.length]

const LABEL: Record<Outcome, string> = {
  goal: 'GOOOL!',
  save: 'DEFENDEU!',
  post: 'NA TRAVE!',
  wide: 'PRA FORA!',
  over: 'POR CIMA!',
  weak: 'PERDEU A HORA!',
}

// Monta o lance a partir do resultado. Determinístico pelo `seed` (os dois
// lados do Duelo veem o mesmo lance). `fast` = respondeu rápido: gol na gaveta.
export function makeShot(o: Outcome, opts: { seed: number; fast?: boolean; good: boolean; label?: string }): Shot {
  const { seed, fast = false, good } = opts
  const label = opts.label ?? (o === 'goal' && fast ? 'NA GAVETA!' : LABEL[o])
  if (o === 'goal') {
    // Rápido: ângulo alto. Normal: qualquer canto. O goleiro cai pro lado errado.
    const z = fast ? pick([ZONES[0], ZONES[2]], seed) : pick([ZONES[0], ZONES[2], ZONES[3], ZONES[5], ZONES[4]], seed)
    const k = z.x < 50 ? ZONES[z.y < 40 ? 5 : 2] : z.x > 50 ? ZONES[z.y < 40 ? 3 : 0] : pick([ZONES[3], ZONES[5]], seed + 1)
    return { bx: z.x, by: z.y, kx: clampKx(k.x), pose: poseFor(k), label, good, net: true, outcome: o }
  }
  if (o === 'save') {
    const z = pick(ZONES, seed)
    const kx = clampKx(z.x)
    const reach = z.x < 50 ? kx - 9 : z.x > 50 ? kx + 9 : kx
    const high = z.y < 40
    // Bola alta é espalmada pra fora; rasteira o goleiro segura.
    return high
      ? { bx: reach, by: z.y, ex: z.x < 50 ? 4 : 96, ey: GOAL.top - 8, kx, pose: poseFor(z), label, good, net: false, outcome: o }
      : { bx: reach, by: z.y, kx, pose: poseFor(z), label, good, net: false, outcome: o }
  }
  if (o === 'post') {
    const left = seed % 2 === 0
    const px = left ? GOAL.left : GOAL.right
    const py = gy(pick([0.3, 0.55, 0.7], seed))
    const k = left ? ZONES[5] : ZONES[3]
    return { bx: px, by: py, ex: left ? px + 14 : px - 14, ey: 86, kx: clampKx(k.x), pose: poseFor(k), label, good, net: false, outcome: o }
  }
  if (o === 'wide') {
    const left = seed % 2 === 0
    const k = pick(ZONES, seed + 2)
    return { bx: left ? 5 : 95, by: gy(pick([0.35, 0.6, 0.85], seed)), kx: clampKx(k.x), pose: poseFor(k), label, good, net: false, outcome: o }
  }
  if (o === 'over') {
    const k = pick(ZONES, seed + 1)
    return { bx: gx(pick([0.2, 0.45, 0.7], seed)), by: GOAL.top - 13, kx: clampKx(k.x), pose: poseFor(k), label, good, net: false, outcome: o }
  }
  // Bola fraca: rola até o meio e o goleiro pega sem esforço.
  return { bx: 50, by: gy(0.82), kx: 50, pose: 'idle', label, good, net: false, outcome: o, slow: true }
}

// Compatível com o Duelo: 'out' vira trave, pra fora ou por cima.
export type Kind = 'goal' | 'save' | 'out'
export function shotFromOutcome(kind: Kind, seed: number): Shot {
  if (kind === 'goal') return makeShot('goal', { seed, good: true })
  if (kind === 'save') return makeShot('save', { seed, good: false })
  return makeShot(pick<Outcome>(['post', 'wide', 'over'], seed), { seed, good: false })
}

export function PenaltyScene({
  shot,
  animKey = 0,
  compact = false,
}: {
  shot: Shot
  animKey?: number
  compact?: boolean
}) {
  const ballRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  // O goleiro reage uma fração de segundo depois do chute (antes já saía voando).
  const [dive, setDive] = useState(false)
  const [impact, setImpact] = useState(false)

  useEffect(() => {
    setDive(false)
    setImpact(false)
    const el = ballRef.current
    const scene = sceneRef.current
    if (!shot || !el || !scene) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const { width: W, height: H } = scene.getBoundingClientRect()
    const sx = W * 0.5
    const sy = H * 0.84
    const px = (v: number) => (W * v) / 100
    const py = (v: number) => (H * v) / 100
    const at = (x: number, y: number, sc: number) =>
      `translate(calc(-50% + ${x - sx}px), calc(-50% + ${y - sy}px)) scale(${sc})`
    const ix = px(shot.bx)
    const iy = py(shot.by)
    // Arco: sobe mais quando a bola vai alta; rasteira quase não sobe.
    const lift = shot.slow ? 0.02 : shot.by < GOAL.top + 12 ? 0.2 : 0.09
    const mx = (sx + ix) / 2
    const my = Math.min(sy, iy) - H * lift
    const tImpact = shot.slow ? 1100 : 560
    const frames: Keyframe[] = [
      { transform: at(sx, sy, 1), offset: 0 },
      { transform: at(mx, my, 0.78), offset: shot.ex !== undefined ? 0.32 : 0.5 },
      { transform: at(ix, iy, 0.56), offset: shot.ex !== undefined ? 0.64 : 1 },
    ]
    if (shot.ex !== undefined && shot.ey !== undefined) frames.push({ transform: at(px(shot.ex), py(shot.ey), 0.66), offset: 1 })
    const total = shot.ex !== undefined ? tImpact / 0.64 : tImpact
    const anim = el.animate(frames, {
      duration: reduce ? 1 : total,
      easing: shot.slow ? 'cubic-bezier(.2,.7,.4,1)' : 'cubic-bezier(.22,.62,.35,1)',
      fill: 'forwards',
    })

    sfx.kick()
    const t1 = setTimeout(() => setDive(true), shot.slow ? 350 : 130)
    const t2 = setTimeout(() => {
      setImpact(true)
      const o = shot.outcome ?? (shot.net ? 'goal' : 'save')
      if (o === 'goal') sfx.net()
      else if (o === 'save' || o === 'weak') sfx.glove()
      else if (o === 'post') sfx.post()
      if (shot.good) {
        if (o === 'goal') sfx.crowd()
        buzz.goal()
      } else {
        if (o !== 'save' && o !== 'weak') sfx.groan()
        buzz.err()
      }
    }, reduce ? 0 : tImpact)
    return () => {
      anim.cancel()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [shot])

  const kx = shot && dive ? shot.kx : 50
  const pose: Pose = shot && dive ? shot.pose : 'idle'
  const goalStyle = { left: `${GOAL.left}%`, right: `${100 - GOAL.right}%`, top: `${GOAL.top}%`, bottom: `${100 - GOAL.bottom}%` }

  return (
    <div
      ref={sceneRef}
      className={`relative ${compact ? 'h-44 sm:h-60' : 'h-64'} w-full max-w-sm overflow-hidden rounded-sm border-2 border-white/20 ${impact && shot?.net && shot.good ? 'animate-shake' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#9ec7d8] via-[#86b98f] to-grass-700" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 55% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)' }} />
      <div className="absolute inset-x-0 bottom-0" style={{ top: `${GOAL.bottom}%`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 20px, transparent 20px 40px)' }} />
      <div className="absolute inset-x-0 top-0 h-[16%] bg-[#0e1f19]" style={{ backgroundImage: 'radial-gradient(rgba(242,238,226,0.35) 1px, transparent 1.4px)', backgroundSize: '6px 6px' }} />
      {/* linha do gol e marca do pênalti */}
      <div className="absolute inset-x-0 h-px bg-white/45" style={{ top: `${GOAL.bottom}%` }} />
      <div className="absolute left-1/2 top-[84%] h-2 w-2 -translate-x-1/2 rounded-full bg-white/80" />
      <div className="absolute left-1/2 h-8 w-28 -translate-x-1/2 rounded-[100%] border-2 border-b-0 border-white/25" style={{ top: `${GOAL.bottom + 8}%` }} />

      {/* Gol: rede + traves, ocupando exatamente a caixa GOAL */}
      <div className={`absolute ${impact && shot?.net ? 'animate-netshake' : ''}`} style={goalStyle}>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <rect x="0" y="0" width="100" height="50" fill="rgba(255,255,255,0.06)" />
          <g stroke="#f2eee2" strokeWidth="0.35" opacity="0.55" vectorEffect="non-scaling-stroke">
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={(i * 100) / 12} y1="0" x2={(i * 100) / 12} y2="50" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i * 50) / 6} x2="100" y2={(i * 50) / 6} />
            ))}
          </g>
          <path d="M0 50 V0 H100 V50" fill="none" stroke="#f7f4ec" strokeWidth="3.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Rede estufando no ponto do gol */}
      {impact && shot?.net && (
        <span
          key={`bulge${animKey}`}
          className="pointer-events-none absolute z-[15] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pop"
          style={{ left: `${shot.bx}%`, top: `${shot.by}%`, background: 'radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)' }}
        />
      )}

      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${kx}%`, top: `${(GOAL.top + GOAL.bottom) / 2 + 2}%`, transition: 'left .32s cubic-bezier(.3,1.3,.5,1)' }}
      >
        <div className={!shot ? 'animate-bob' : ''}>
          <LottieBox path={LOTTIE_KEEPER} className={compact ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-24 w-24'} fallback={<Keeper pose={pose} />} />
        </div>
      </div>

      {shot && (
        <div key={`dust${animKey}`} className="absolute left-1/2 top-[84%] z-10 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute" style={{ transform: `rotate(${i * 60}deg)` }}>
              <span className="block h-1.5 w-1.5 rounded-full bg-white/70" style={{ animation: 'dustfly 0.5s ease-out forwards' }} />
            </div>
          ))}
        </div>
      )}

      {/* Gol a favor: brilho dourado. Gol sofrido: vinheta escura, sem festa. */}
      {impact && shot?.net && shot.good && <div key={`flash${animKey}`} className="pointer-events-none absolute inset-0 z-20 animate-crowdflash bg-corn-400/50" />}
      {impact && shot && !shot.good && (
        <div key={`dim${animKey}`} className="pointer-events-none absolute inset-0 z-20 animate-crowdflash" style={{ background: 'radial-gradient(closest-side, transparent 55%, rgba(0,0,0,0.6))' }} />
      )}

      <div ref={ballRef} className="absolute z-20" style={{ left: '50%', top: '84%', transform: 'translate(-50%,-50%)' }}>
        <div className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]" style={{ animation: shot && !impact ? `ballspin ${shot.slow ? 0.9 : 0.3}s linear infinite` : 'none' }}>
          <SoccerBall className="h-8 w-8" />
        </div>
      </div>

      {shot && impact && (
        <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center">
          <span className={`animate-pop rounded-sm px-4 py-1.5 font-display text-3xl uppercase tracking-tight shadow-lg ${shot.good ? 'bg-grass-600 text-ink-900' : 'bg-ochre-500 text-ink-900'}`}>
            {shot.label}
          </span>
        </div>
      )}
    </div>
  )
}
