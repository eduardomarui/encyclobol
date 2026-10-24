import { useEffect, useRef, useState } from 'react'
import { buzz, sfx } from '../lib/sfx'

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
// Câmera atrás do batedor: o gol fica no fundo, menor, centrado.
export const GOAL = { left: 22, right: 78, top: 30, bottom: 60 }
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

function Keeper({ pose, className = 'h-24 w-24' }: { pose: Pose; className?: string }) {
  const P = POSES[pose]
  return (
    <svg viewBox="0 0 60 64" className={`${className} overflow-visible`}>
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

const clampKx = (x: number) => Math.min(68, Math.max(32, x))
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
    const reach = z.x < 50 ? kx - 6 : z.x > 50 ? kx + 6 : kx
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
    return { bx: left ? 11 : 89, by: gy(pick([0.35, 0.6, 0.85], seed)), kx: clampKx(k.x), pose: poseFor(k), label, good, net: false, outcome: o }
  }
  if (o === 'over') {
    const k = pick(ZONES, seed + 1)
    return { bx: gx(pick([0.2, 0.45, 0.7], seed)), by: GOAL.top - 9, kx: clampKx(k.x), pose: poseFor(k), label, good, net: false, outcome: o }
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

// Batedor visto de costas (camisa verde, número dourado). 'run' = correndo
// pra bola; 'kick' = perna de chute à frente.
function Kicker({ pose }: { pose: 'run' | 'kick' }) {
  const kick = pose === 'kick'
  return (
    <svg viewBox="0 0 40 80" className="h-full w-auto overflow-visible" aria-hidden>
      {/* pernas */}
      <path d={kick ? 'M17 46 L11 63 L9 76' : 'M17 46 L13 61 L10 74'} stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d={kick ? 'M23 46 L31 58 L38 63' : 'M23 46 L26 61 L29 74'} stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d={kick ? 'M11 63 L9 76' : 'M13 61 L10 74'} stroke="#2c7d4f" strokeWidth="5.6" strokeLinecap="round" />
      <path d={kick ? 'M31 58 L38 63' : 'M26 61 L29 74'} stroke="#2c7d4f" strokeWidth="5.6" strokeLinecap="round" />
      <ellipse cx={kick ? 9 : 10} cy={kick ? 77.5 : 75.5} rx="3.6" ry="2" fill="#16130d" />
      <ellipse cx={kick ? 39.5 : 29.5} cy={kick ? 64 : 75.5} rx="3.6" ry="2" fill="#16130d" />
      {/* calção */}
      <path d="M13 40 H27 L28 50 H21 L20 46 L19 50 H12 Z" fill="#eef5f1" />
      {/* braços */}
      <path d={kick ? 'M13 24 L4 34' : 'M13 24 L8 37'} stroke="#e0b48a" strokeWidth="4" strokeLinecap="round" />
      <path d={kick ? 'M27 24 L35 30' : 'M27 24 L32 37'} stroke="#e0b48a" strokeWidth="4" strokeLinecap="round" />
      {/* camisa */}
      <path d="M12 20 Q20 16 28 20 L29 41 H11 Z" fill="#2c7d4f" />
      <path d="M12 20 L8 28 L11 30 L13 25 M28 20 L32 28 L29 30 L27 25" fill="#2c7d4f" />
      <text x="20" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Oswald, sans-serif" fill="#e6b73e">10</text>
      {/* cabeça de costas */}
      <circle cx="20" cy="12" r="5.6" fill="#3a2a1a" />
      <path d="M15 14 Q20 18.5 25 14 L25 16 Q20 19 15 16 Z" fill="#e0b48a" />
    </svg>
  )
}

// Torcida: fileiras de cabeças em cores apagadas, iluminadas pelos refletores.
const CROWD = Array.from({ length: 3 * 34 }, (_, i) => {
  const palette = ['#2c7d4f', '#d8a72e', '#eef5f1', '#1f5a3b', '#b8901f', '#84a094']
  return palette[(i * 7 + Math.floor(i / 34) * 3) % palette.length]
})

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
  const shadowRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [kickPose, setKickPose] = useState<'run' | 'kick'>('run')
  // O goleiro reage uma fração de segundo depois do chute.
  const [dive, setDive] = useState(false)
  const [impact, setImpact] = useState(false)

  useEffect(() => {
    setDive(false)
    setImpact(false)
    setKickPose('run')
    const el = ballRef.current
    const sh = shadowRef.current
    const kicker = kickerRef.current
    const scene = sceneRef.current
    if (!shot || !el || !sh || !kicker || !scene) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const { width: W, height: H } = scene.getBoundingClientRect()
    const px = (v: number) => (W * v) / 100
    const py = (v: number) => (H * v) / 100
    const sx = px(50)
    const sy = py(86)
    const at = (x: number, y: number, sc: number) => `translate(calc(-50% + ${x - sx}px), calc(-50% + ${y - sy}px)) scale(${sc})`

    const runUp = reduce ? 0 : 380
    const flight = reduce ? 1 : shot.slow ? 1000 : shot.label === 'NA GAVETA!' ? 640 : 520
    const tImpact = runUp + flight
    const anims: Animation[] = []

    // 1) Corrida do batedor até a bola.
    anims.push(
      kicker.animate(
        [
          { transform: 'translate(-70%, 6%) scale(1.06)' },
          { transform: 'translate(-8%, 0) scale(1)' },
        ],
        { duration: Math.max(1, runUp), easing: 'cubic-bezier(.4,.1,.7,1)', fill: 'forwards' },
      ),
    )

    // 2) Voo da bola: arco, curva lateral e encolhendo com a distância.
    const ix = px(shot.bx)
    const iy = py(shot.by)
    const high = shot.by < GOAL.top + (GOAL.bottom - GOAL.top) * 0.45
    const lift = shot.slow ? 0.02 : high ? 0.14 : 0.05
    const bend = (shot.bx < 50 ? -1 : shot.bx > 50 ? 1 : 0) * W * 0.05
    const mx = sx + (ix - sx) * 0.45 + bend
    const my = Math.min(sy, iy) - H * lift
    const far = 0.34
    const bounce = shot.ex !== undefined && shot.ey !== undefined
    const frames: Keyframe[] = [
      { transform: at(sx, sy, 1), offset: 0 },
      { transform: at(mx, my, 0.62), offset: bounce ? 0.32 : 0.5 },
      { transform: at(ix, iy, far), offset: bounce ? 0.64 : 1 },
    ]
    if (bounce) frames.push({ transform: at(px(shot.ex!), py(shot.ey!), 0.5), offset: 1 })
    const total = bounce ? flight / 0.64 : flight
    const easing = shot.label === 'NA GAVETA!' ? 'cubic-bezier(.15,.75,.25,1)' : shot.slow ? 'cubic-bezier(.2,.7,.4,1)' : 'cubic-bezier(.22,.62,.35,1)'
    anims.push(el.animate(frames, { duration: total, delay: runUp, easing, fill: 'forwards' }))

    // 3) Sombra da bola no gramado: segue a projeção no chão (linha do gol).
    const groundY = (y: number) => Math.max(y, py(GOAL.bottom))
    const sFrames: Keyframe[] = [
      { transform: at(sx, sy + 12, 1), opacity: 0.55, offset: 0 },
      { transform: at(ix, groundY(iy) + 2, far), opacity: high ? 0.18 : 0.4, offset: bounce ? 0.64 : 1 },
    ]
    if (bounce) sFrames.push({ transform: at(px(shot.ex!), groundY(py(shot.ey!)) + 2, 0.5), opacity: 0.3, offset: 1 })
    anims.push(sh.animate(sFrames, { duration: total, delay: runUp, easing, fill: 'forwards' }))

    const t0 = setTimeout(() => {
      setKickPose('kick')
      sfx.kick()
    }, runUp)
    const t1 = setTimeout(() => setDive(true), runUp + (shot.slow ? 350 : 120))
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
    }, tImpact)
    return () => {
      anims.forEach((a) => a.cancel())
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [shot])

  // Goleiro: posição e altura do mergulho (alto sobe, rasteiro cai).
  const kx = shot && dive ? shot.kx : 50
  const pose: Pose = shot && dive ? shot.pose : 'idle'
  const ky = pose === 'tl' || pose === 'tr' ? -9 : pose === 'dl' || pose === 'dr' ? 5 : pose === 'center' ? -4 : 0
  const goalTop = `${GOAL.top}%`
  const goalH = GOAL.bottom - GOAL.top
  const celebrate = impact && shot?.net && shot.good

  return (
    <div
      ref={sceneRef}
      className={`relative ${compact ? 'h-48 sm:h-64' : 'h-72'} w-full max-w-sm overflow-hidden rounded-sm border-2 border-white/20 bg-[#08180f] ${celebrate ? 'animate-shake' : ''}`}
    >
      {/* Noite, refletores e arquibancada */}
      <div className="absolute inset-x-0 top-0" style={{ height: goalTop, background: 'linear-gradient(#050d09, #0c2117)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(40% 30% at 8% 0%, rgba(238,245,241,0.22), transparent 70%), radial-gradient(40% 30% at 92% 0%, rgba(238,245,241,0.22), transparent 70%)' }} />
      <div
        className={`absolute inset-x-0 grid gap-[2px] px-1 ${celebrate ? 'animate-bob' : ''}`}
        style={{ top: `${GOAL.top - 14}%`, gridTemplateColumns: 'repeat(34, minmax(0, 1fr))' }}
        aria-hidden
      >
        {CROWD.map((c, i) => (
          <span key={i} className="aspect-square rounded-full" style={{ background: c, opacity: 0.32 + ((i * 13) % 5) * 0.06 }} />
        ))}
      </div>
      {/* placa de publicidade/muro atrás do gol */}
      <div className="absolute inset-x-0 h-[4%] bg-[#0f2a1d]" style={{ top: `${GOAL.top - 3}%`, boxShadow: 'inset 0 -1px 0 rgba(238,245,241,0.12)' }} />

      {/* Gramado em perspectiva: faixas que alargam perto da câmera */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect x="0" y={GOAL.top + 1} width="100" height={100 - GOAL.top} fill="#2a6d43" />
        {Array.from({ length: 7 }).map((_, i) => {
          const y0 = GOAL.bottom + (100 - GOAL.bottom) * Math.pow(i / 7, 1.7)
          const y1 = GOAL.bottom + (100 - GOAL.bottom) * Math.pow((i + 1) / 7, 1.7)
          return i % 2 === 0 ? <rect key={i} x="0" y={y0} width="100" height={y1 - y0} fill="#317a4c" /> : null
        })}
        <rect x="0" y={GOAL.top + 1} width="100" height={GOAL.bottom - GOAL.top - 1} fill="#2f7549" />
        <g stroke="rgba(238,245,241,0.6)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke">
          <line x1="-5" y1={GOAL.bottom} x2="105" y2={GOAL.bottom} />
          {/* pequena área */}
          <path d={`M${GOAL.left - 8} ${GOAL.bottom} L${GOAL.left - 13} ${GOAL.bottom + 9} L${GOAL.right + 13} ${GOAL.bottom + 9} L${GOAL.right + 8} ${GOAL.bottom}`} />
          {/* grande área */}
          <path d={`M${GOAL.left - 22} ${GOAL.bottom} L${GOAL.left - 40} ${GOAL.bottom + 30} M${GOAL.right + 22} ${GOAL.bottom} L${GOAL.right + 40} ${GOAL.bottom + 30}`} />
        </g>
        <ellipse cx="50" cy="86" rx="1.6" ry="0.7" fill="rgba(238,245,241,0.85)" />
      </svg>

      {/* Gol com profundidade: rede de fundo, laterais e traves */}
      <div className={`absolute ${impact && shot?.net ? 'animate-netshake' : ''}`} style={{ left: `${GOAL.left}%`, right: `${100 - GOAL.right}%`, top: goalTop, height: `${goalH}%` }}>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden>
          <defs>
            <pattern id="net" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 0 L4 4 M4 0 L0 4" stroke="rgba(238,245,241,0.28)" strokeWidth="0.35" />
            </pattern>
          </defs>
          {/* fundo da rede (mais baixo e estreito: está mais longe) */}
          <path d="M5 9 H95 V50 H5 Z" fill="url(#net)" />
          <path d="M0 0 L5 9 L5 50 L0 50 Z M100 0 L95 9 L95 50 L100 50 Z M0 0 H100 L95 9 H5 Z" fill="url(#net)" />
          <path d="M5 9 H95 M5 9 V50 M95 9 V50" stroke="rgba(238,245,241,0.35)" strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />
          {/* traves */}
          <path d="M0 50 V0 H100 V50" fill="none" stroke="#f7f4ec" strokeWidth="3.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Rede estufando no ponto do gol */}
      {impact && shot?.net && (
        <span
          key={`bulge${animKey}`}
          className="pointer-events-none absolute z-[15] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pop"
          style={{ left: `${shot.bx}%`, top: `${shot.by}%`, background: 'radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)' }}
        />
      )}

      {/* Goleiro, em escala do gol (~78% da altura da trave) */}
      <div
        className="absolute z-10 -translate-x-1/2"
        style={{
          left: `${kx}%`,
          top: `${GOAL.top + goalH * 0.12}%`,
          height: `${goalH * 0.9}%`,
          transform: `translate(-50%, ${ky}%)`,
          transition: 'left .3s cubic-bezier(.3,1.3,.5,1), transform .3s cubic-bezier(.3,1.3,.5,1)',
        }}
      >
        <div className={`h-full ${!shot ? 'animate-bob' : ''}`}>
          <Keeper pose={pose} className="h-full w-auto" />
        </div>
      </div>

      {/* Sombra e bola */}
      <div ref={shadowRef} className="absolute z-[18] h-2.5 w-7 rounded-[50%] bg-black/45 blur-[1.5px]" style={{ left: '50%', top: '86%', transform: 'translate(-50%,-50%)' }} />
      <div ref={ballRef} className="absolute z-20" style={{ left: '50%', top: '86%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ animation: shot && !impact && kickPose === 'kick' ? `ballspin ${shot.slow ? 0.9 : 0.25}s linear infinite` : 'none' }}>
          <SoccerBall className="h-7 w-7" />
        </div>
      </div>

      {/* Batedor de costas, perto da câmera */}
      <div ref={kickerRef} className="pointer-events-none absolute bottom-[-6%] left-[38%] z-[25] h-[42%]" style={{ transform: 'translate(-70%, 6%) scale(1.06)' }}>
        <Kicker pose={kickPose} />
      </div>

      {/* Gol a favor: brilho dourado. Lance ruim pra você: vinheta escura. */}
      {celebrate && <div key={`flash${animKey}`} className="pointer-events-none absolute inset-0 z-[26] animate-crowdflash bg-corn-400/40" />}
      {impact && shot && !shot.good && (
        <div key={`dim${animKey}`} className="pointer-events-none absolute inset-0 z-[26] animate-crowdflash" style={{ background: 'radial-gradient(closest-side, transparent 55%, rgba(0,0,0,0.6))' }} />
      )}

      {shot && impact && (
        <div className="absolute inset-x-0 top-3 z-30 flex justify-center">
          <span className={`animate-pop rounded-sm px-4 py-1 font-display text-2xl uppercase tracking-tight text-ink-900 shadow-lg sm:text-3xl ${shot.good ? 'bg-grass-600' : 'bg-ochre-500'}`}>
            {shot.label}
          </span>
        </div>
      )}
    </div>
  )
}
