import { useEffect, useRef } from 'react'
import { BallMark } from './landing/Icons'
import LottieBox from './LottieBox'

const LOTTIE_KEEPER = `${import.meta.env.BASE_URL}lottie/keeper.json`

export type Pose = 'idle' | 'center' | 'tl' | 'tr' | 'dl' | 'dr'
export type Zone = { x: number; y: number }
export type Shot = {
  bx: number
  by: number
  kx: number
  pose: Pose
  label: string
  good: boolean
  net: boolean
} | null

export const ZONES: Zone[] = [
  { x: 22, y: 20 },
  { x: 50, y: 15 },
  { x: 78, y: 20 },
  { x: 24, y: 38 },
  { x: 50, y: 40 },
  { x: 76, y: 38 },
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
  if (z.x < 50) return z.y < 25 ? 'tl' : 'dl'
  return z.y < 25 ? 'tr' : 'dr'
}

// Constrói um "shot" a partir do resultado (gol/defesa/fora), determinístico.
export type Kind = 'goal' | 'save' | 'out'
const clampKx = (x: number) => Math.min(66, Math.max(34, x))
export function shotFromOutcome(kind: Kind, seed: number): Shot {
  const z = ZONES[seed % ZONES.length]
  if (kind === 'goal') {
    const k = ZONES[(seed + 3) % ZONES.length]
    return { bx: z.x, by: z.y, kx: clampKx(k.x), pose: poseFor(k), label: 'GOOOL!', good: true, net: true }
  }
  if (kind === 'save') {
    return { bx: z.x, by: 44, kx: clampKx(z.x), pose: poseFor(z), label: 'DEFENDEU!', good: false, net: false }
  }
  const k = ZONES[(seed + 2) % ZONES.length]
  return { bx: z.x, by: 6, kx: clampKx(k.x), pose: poseFor(k), label: 'PRA FORA!', good: false, net: false }
}

export function PenaltyScene({ shot, animKey = 0 }: { shot: Shot; animKey?: number }) {
  const ballRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

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

  const kx = shot ? shot.kx : 50
  const pose: Pose = shot ? shot.pose : 'idle'

  return (
    <div
      ref={sceneRef}
      className={`relative h-64 w-full max-w-sm overflow-hidden rounded-sm border-2 border-ink-900 ${shot?.net ? 'animate-shake' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#9ec7d8] via-[#86b98f] to-grass-700" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 55% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)' }} />
      <div className="absolute inset-x-0 bottom-0 top-[52%]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 20px, transparent 20px 40px)' }} />
      <div className="absolute inset-x-0 top-0 h-[22%] bg-ink-800" style={{ backgroundImage: 'radial-gradient(rgba(242,238,226,0.35) 1px, transparent 1.4px)', backgroundSize: '6px 6px' }} />
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

      <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${kx}%`, top: '44%', transition: 'left .4s cubic-bezier(.3,1.4,.5,1)' }}>
        <div className={!shot ? 'animate-bob' : ''}>
          <LottieBox path={LOTTIE_KEEPER} className="h-24 w-24" fallback={<Keeper pose={pose} />} />
        </div>
      </div>

      {shot && (
        <div key={`dust${animKey}`} className="absolute left-1/2 top-[82%] z-10 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute" style={{ transform: `rotate(${i * 60}deg)` }}>
              <span className="block h-1.5 w-1.5 rounded-full bg-paper/70" style={{ animation: 'dustfly 0.5s ease-out forwards' }} />
            </div>
          ))}
        </div>
      )}

      {shot?.net && <div key={`flash${animKey}`} className="pointer-events-none absolute inset-0 z-20 animate-crowdflash bg-paper" />}

      <div ref={ballRef} className="absolute z-20" style={{ left: '50%', top: '82%', transform: 'translate(-50%,-50%)' }}>
        <div className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]" style={{ animation: shot ? 'ballspin 0.4s linear infinite' : 'none' }}>
          <BallMark className="h-8 w-8 text-paper" />
        </div>
      </div>

      {shot && (
        <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center">
          <span className={`animate-pop rounded-sm px-4 py-1.5 font-display text-3xl uppercase tracking-tight text-paper shadow-lg ${shot.good ? 'bg-grass-600' : 'bg-ochre-500'}`}>
            {shot.label}
          </span>
        </div>
      )}
    </div>
  )
}
