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



// ===================== Mundo em metros + câmera =====================
// O lance é calculado em 3D (metros) e projetado na tela. Gol oficial
// 7,32 × 2,44 m, marca do pênalti a 11 m, câmera 8 m atrás da marca a 1,54 m
// de altura. A câmera foi calibrada pra trave cair exatamente na caixa GOAL
// da tela. Como a bola segue uma parábola real (gravidade) até um alvo dentro
// do gol, ela nunca "passa por cima do travessão e cai" — antes o arco era
// desenhado direto na tela e subia além da trave.
export const GOAL = { left: 22, right: 78, top: 30, bottom: 60 } // % da cena
const HALF_W = 3.66
const BAR = 2.44
const LINE = 11
const CAM_BACK = 8
const CAM_H = 1.54
const D_GOAL = LINE + CAM_BACK
const KX = ((GOAL.right - 50) * D_GOAL) / HALF_W
const KY = ((GOAL.bottom - GOAL.top) * D_GOAL) / BAR
const HORIZON = GOAL.bottom - (KY * CAM_H) / D_GOAL
const R = 0.11 // raio da bola
const G = 9.81

export type P3 = { x: number; y: number; z: number }
// Mundo → tela (% da cena) e escala relativa à bola na marca do pênalti.
export function project(p: P3) {
  const d = Math.max(0.5, p.z + CAM_BACK)
  return { x: 50 + (KX * p.x) / d, y: HORIZON + (KY * (CAM_H - p.y)) / d, s: CAM_BACK / d }
}

export type Pose = 'idle' | 'center' | 'tl' | 'tr' | 'dl' | 'dr'
// Como o lance termina. 'goal' entra; os outros não.
export type Outcome = 'goal' | 'save' | 'post' | 'wide' | 'over' | 'weak'
export type Shot = {
  outcome: Outcome
  tx: number // onde a bola cruza (ou é tocada), em metros: x lateral, y altura
  ty: number
  xk: number // pra onde o goleiro mergulha (m)
  kx: number // mesma coisa em % da tela
  pose: Pose
  label: string
  good: boolean // bom pra quem está vendo
  net: boolean
  fast?: boolean
  slow?: boolean
} | null

const pick = <T,>(arr: T[], seed: number) => arr[((seed % arr.length) + arr.length) % arr.length]
const sgn = (v: number) => (v < 0 ? -1 : v > 0 ? 1 : 0)

function poseOf(side: number, high: boolean): Pose {
  if (side === 0) return high ? 'center' : 'idle'
  if (side < 0) return high ? 'tl' : 'dl'
  return high ? 'tr' : 'dr'
}

const LABEL: Record<Outcome, string> = {
  goal: 'GOOOL!',
  save: 'DEFENDEU!',
  post: 'NA TRAVE!',
  wide: 'PRA FORA!',
  over: 'POR CIMA!',
  weak: 'PERDEU A HORA!',
}

// Alvos dentro do gol (bola inteira dentro: |x| ≤ 3,66 − 0,25; y ≤ 2,44 − 0,25).
const IN = {
  gaveta: [{ x: -3.3, y: 2.1 }, { x: 3.3, y: 2.1 }],
  alto: [{ x: -2.9, y: 1.85 }, { x: 2.9, y: 1.85 }, { x: 0, y: 1.9 }],
  baixo: [{ x: -3.0, y: 0.25 }, { x: 3.0, y: 0.25 }, { x: -2.4, y: 0.6 }, { x: 2.4, y: 0.6 }],
}

// Monta o lance a partir do resultado. Determinístico pelo `seed` (os dois
// lados do Duelo veem o mesmo lance). `fast` = respondeu rápido: gaveta.
export function makeShot(o: Outcome, opts: { seed: number; fast?: boolean; good: boolean; label?: string }): Shot {
  const { seed, fast = false, good } = opts
  const label = opts.label ?? (o === 'goal' && fast ? 'NA GAVETA!' : LABEL[o])
  const mk = (tx: number, ty: number, xk: number, high: boolean, extra: Partial<NonNullable<Shot>> = {}): Shot => ({
    outcome: o,
    tx,
    ty,
    xk,
    kx: project({ x: xk, y: 0, z: LINE }).x,
    pose: poseOf(sgn(xk), high),
    label,
    good,
    net: o === 'goal',
    fast,
    ...extra,
  })
  if (o === 'goal') {
    const t = fast ? pick(IN.gaveta, seed) : pick([...IN.alto, ...IN.baixo], seed)
    // O goleiro cai pro lado errado (no meio, escolhe um lado).
    const side = t.x === 0 ? (seed % 2 ? 1 : -1) : -sgn(t.x)
    return mk(t.x, t.y, side * 1.7, (seed >> 1) % 2 === 0)
  }
  if (o === 'save') {
    const t = pick([...IN.alto, ...IN.baixo], seed)
    // Corpo do goleiro a ~1 m do ponto: as mãos chegam na bola.
    const xk = t.x === 0 ? 0 : t.x - sgn(t.x) * 0.75
    const high = t.y > 1.1
    // Espalmar é coisa de bola alta; rasteira o goleiro segura.
    const lbl = label === 'ESPALMOU!' && !high ? 'VOCÊ PEGOU!' : label
    return { ...mk(t.x, t.y, xk, high)!, label: lbl }
  }
  if (o === 'post') {
    const side = seed % 2 ? 1 : -1
    // Centro da bola encostado na face interna do poste (raio do poste 0,06 + bola 0,11).
    return mk(side * (HALF_W - 0.17), pick([0.7, 1.2, 1.7], seed), -side * 1.6, false)
  }
  if (o === 'wide') {
    const side = seed % 2 ? 1 : -1
    return mk(side * 4.5, pick([0.4, 0.9, 1.4], seed), side * 1.6, false)
  }
  if (o === 'over') {
    return mk(pick([-2.2, -0.8, 0.9, 2.3], seed), 3.0, pick([-1.5, 1.5], seed + 1), true)
  }
  // Bola fraca: rasteira, devagar, o goleiro só agacha e segura.
  return mk(pick([-0.4, 0.3], seed), R, 0, false, { slow: true })
}

// Compatível com o Duelo: 'out' vira trave, pra fora ou por cima.
export type Kind = 'goal' | 'save' | 'out'
export function shotFromOutcome(kind: Kind, seed: number): Shot {
  if (kind === 'goal') return makeShot('goal', { seed, good: true })
  if (kind === 'save') return makeShot('save', { seed, good: false })
  return makeShot(pick<Outcome>(['post', 'wide', 'over'], seed), { seed, good: false })
}

// ===================== Trajetória =====================
type Seg = { ms: number; at: (u: number) => P3 }
type Plan = { segs: Seg[]; impactMs: number; fadeOut?: boolean }

// Parábola de A até B em `tf` segundos (gravidade real) com leve efeito lateral.
function flight(A: P3, B: P3, tf: number, curl: number): (u: number) => P3 {
  const lift = (G * tf * tf) / 2
  return (u) => ({
    x: A.x + (B.x - A.x) * (u + curl * u * (1 - u)),
    y: Math.max(R, A.y + (B.y - A.y) * u + lift * u * (1 - u)),
    z: A.z + (B.z - A.z) * (1.06 * u - 0.06 * u * u),
  })
}
const lerp = (A: P3, B: P3) => (u: number): P3 => ({ x: A.x + (B.x - A.x) * u, y: A.y + (B.y - A.y) * u, z: A.z + (B.z - A.z) * u })
// Quique: sobe um pouco e cai (bola rebatida ou caindo na rede).
function hop(A: P3, B: P3, h: number) {
  return (u: number): P3 => ({ x: A.x + (B.x - A.x) * u, y: Math.max(R, A.y + (B.y - A.y) * u + 4 * h * u * (1 - u)), z: A.z + (B.z - A.z) * u })
}

function planFor(shot: NonNullable<Shot>): Plan {
  const S: P3 = { x: 0, y: R, z: 0 }
  const o = shot.outcome
  const side = sgn(shot.tx)
  // Tempo de voo real (s) e tempo de tela (ms, ~15% mais lento pra dar pra ver).
  const tf = shot.slow ? 1.0 : shot.fast ? 0.42 : shot.ty < 0.8 ? 0.48 : 0.52
  const ms = Math.round(tf * 1000 * 1.15)
  const zHit = o === 'save' ? LINE - 0.35 : o === 'weak' ? LINE - 0.6 : LINE
  const E: P3 = { x: shot.tx, y: shot.ty, z: zHit }
  const curl = shot.slow ? 0 : -0.3
  const segs: Seg[] = [{ ms, at: shot.slow ? lerp(S, E) : flight(S, E, tf, curl) }]
  // Pausa no impacto (hit-stop): a bola "segura" 70 ms na rede, na luva ou na trave.
  if (o === 'goal' || o === 'save' || o === 'post') segs.push({ ms: 70, at: () => E })
  if (o === 'goal') {
    const N: P3 = { x: shot.tx * 1.03, y: Math.max(R, shot.ty * 0.75), z: LINE + 1.3 }
    segs.push({ ms: 170, at: lerp(E, N) })
    segs.push({ ms: 320, at: hop(N, { x: N.x, y: R, z: LINE + 1.0 }, 0.05) })
  } else if (o === 'save') {
    if (shot.ty > 1.1) segs.push({ ms: 320, at: hop(E, { x: side * 4.8 || 4.8, y: shot.ty + 0.6, z: LINE + 0.5 }, 0.4) })
    else segs.push({ ms: 300, at: hop(E, { x: shot.tx * 0.85, y: R, z: LINE - 1.4 }, 0.15) })
  } else if (o === 'post') {
    segs.push({ ms: 460, at: hop(E, { x: shot.tx - side * 1.8, y: R, z: LINE - 3.5 }, 0.5) })
  } else if (o === 'wide' || o === 'over') {
    const F: P3 = { x: shot.tx * 1.2, y: shot.ty * 1.1, z: LINE + 4 }
    segs.push({ ms: 300, at: lerp(E, F) })
    return { segs, impactMs: ms, fadeOut: true }
  }
  return { segs, impactMs: ms }
}

function posAt(plan: Plan, t: number): { p: P3; i: number } {
  let acc = 0
  for (let i = 0; i < plan.segs.length; i++) {
    const g = plan.segs[i]
    if (t <= acc + g.ms) return { p: g.at(Math.max(0, (t - acc) / g.ms)), i }
    acc += g.ms
  }
  const last = plan.segs[plan.segs.length - 1]
  return { p: last.at(1), i: plan.segs.length - 1 }
}

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
  const spinRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [kickPose, setKickPose] = useState<'run' | 'kick'>('run')
  const [dive, setDive] = useState(false)
  const [impact, setImpact] = useState(false)

  // Coloca bola e sombra num ponto do mundo (sem re-render do React).
  const place = (p: P3, angle: number) => {
    const el = ballRef.current
    const sh = shadowRef.current
    const sc = sceneRef.current
    if (!el || !sh || !sc) return
    // clientWidth/Height: área interna (sem a borda), a mesma dos filhos absolutos.
    const W = sc.clientWidth
    const H = sc.clientHeight
    const b = project(p)
    const g = project({ x: p.x, y: 0, z: p.z })
    el.style.transform = `translate(${(W * b.x) / 100}px, ${(H * b.y) / 100}px) translate(-50%, -50%) scale(${b.s})`
    // Dentro do gol (atrás da linha) a bola passa atrás do goleiro e da trave.
    el.style.zIndex = p.z > LINE + 0.05 ? '9' : '20'
    sh.style.transform = `translate(${(W * g.x) / 100}px, ${(H * g.y) / 100}px) translate(-50%, -50%) scale(${g.s})`
    sh.style.opacity = String(Math.max(0.1, 0.5 - p.y * 0.12))
    if (spinRef.current) spinRef.current.style.transform = `rotate(${angle}deg)`
  }

  useEffect(() => {
    setDive(false)
    setImpact(false)
    setKickPose('run')
    const kicker = kickerRef.current
    const start: P3 = { x: 0, y: R, z: 0 }
    // Antes de cada lance: bola na marca.
    requestAnimationFrame(() => {
      place(start, 0)
      if (ballRef.current) ballRef.current.style.opacity = '1'
    })
    if (!shot || !kicker) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const plan = planFor(shot)
    const runUp = reduce ? 0 : 380
    const total = plan.segs.reduce((a, g) => a + g.ms, 0)

    const run = kicker.animate(
      [{ transform: 'translate(-70%, 6%) scale(1.06)' }, { transform: 'translate(-8%, 0) scale(1)' }],
      { duration: Math.max(1, runUp), easing: 'cubic-bezier(.4,.1,.7,1)', fill: 'forwards' },
    )

    let raf = 0
    let t0 = 0
    let angle = 0
    let last: P3 = start
    const tick = (now: number) => {
      if (!t0) t0 = now
      const t = now - t0
      const { p } = posAt(plan, Math.min(t, total))
      // Giro proporcional à distância percorrida.
      const d = Math.hypot(p.x - last.x, p.y - last.y, p.z - last.z)
      angle += (d / (2 * Math.PI * R)) * 360 * (shot.slow ? 1 : 0.5)
      last = p
      place(p, angle)
      if (plan.fadeOut && ballRef.current) ballRef.current.style.opacity = String(Math.max(0, 1 - Math.max(0, t - plan.impactMs) / 260))
      if (t < total) raf = requestAnimationFrame(tick)
    }

    const tKick = setTimeout(() => {
      setKickPose('kick')
      sfx.kick()
      if (reduce) {
        const { p } = posAt(plan, total)
        place(p, 0)
      } else raf = requestAnimationFrame(tick)
    }, runUp)
    // O goleiro reage ~0,11 s depois do chute (bola fraca: sem pressa).
    const tDive = setTimeout(() => setDive(true), runUp + (shot.slow ? 420 : shot.outcome === 'save' ? 0 : 120))
    const tHit = setTimeout(() => {
      setImpact(true)
      const o = shot.outcome
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
    }, runUp + (reduce ? 0 : plan.impactMs))
    return () => {
      run.cancel()
      cancelAnimationFrame(raf)
      clearTimeout(tKick)
      clearTimeout(tDive)
      clearTimeout(tHit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shot, animKey])

  // Goleiro: posição e altura do mergulho (alto sobe, rasteiro cai).
  const kx = shot && dive ? shot.kx : 50
  const pose: Pose = shot && dive ? shot.pose : 'idle'
  const ky = pose === 'tl' || pose === 'tr' ? -10 : pose === 'dl' || pose === 'dr' ? 18 : pose === 'center' ? -5 : 0
  const goalH = GOAL.bottom - GOAL.top
  const goalBox = { left: `${GOAL.left}%`, right: `${100 - GOAL.right}%`, top: `${GOAL.top}%`, height: `${goalH}%` }
  const celebrate = impact && shot?.net && shot.good
  const bulge = shot && shot.net ? project({ x: shot.tx * 1.03, y: Math.max(R, shot.ty * 0.75), z: LINE + 1.3 }) : null

  return (
    <div
      ref={sceneRef}
      className={`relative ${compact ? 'h-48 sm:h-64' : 'h-72'} w-full max-w-sm overflow-hidden rounded-sm border-2 border-white/20 bg-[#08180f] ${celebrate ? 'animate-shake' : ''}`}
    >
      {/* Noite, refletores e arquibancada */}
      <div className="absolute inset-x-0 top-0" style={{ height: `${GOAL.top}%`, background: 'linear-gradient(#050d09, #0c2117)' }} />
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
      <div className="absolute inset-x-0 h-[4%] bg-[#0f2a1d]" style={{ top: `${GOAL.top - 3}%`, boxShadow: 'inset 0 -1px 0 rgba(238,245,241,0.12)' }} />

      {/* Gramado e linhas, projetados do mundo real (pequena área 5,5 m; grande 16,5 m) */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect x="0" y={GOAL.top + 1} width="100" height={100 - GOAL.top} fill="#2a6d43" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = project({ x: 0, y: 0, z: LINE - i * 2 }).y
          const b = project({ x: 0, y: 0, z: LINE - (i + 1) * 2 }).y
          return i % 2 === 0 ? <rect key={i} x="0" y={a} width="100" height={Math.min(100, b) - a} fill="#317a4c" /> : null
        })}
        <rect x="0" y={GOAL.top + 1} width="100" height={GOAL.bottom - GOAL.top - 1} fill="#2f7549" />
        <g stroke="rgba(238,245,241,0.6)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke">
          {(() => {
            const P = (x: number, z: number) => {
              const q = project({ x, y: 0, z })
              return `${q.x} ${q.y}`
            }
            return (
              <>
                <path d={`M${P(-30, LINE)} L${P(30, LINE)}`} />
                <path d={`M${P(-9.16, LINE)} L${P(-9.16, LINE - 5.5)} L${P(9.16, LINE - 5.5)} L${P(9.16, LINE)}`} />
                <path d={`M${P(-20.16, LINE)} L${P(-20.16, LINE - 16.5)} M${P(20.16, LINE)} L${P(20.16, LINE - 16.5)}`} />
              </>
            )
          })()}
        </g>
      </svg>

      {/* Rede (fundo e laterais) — atrás de tudo do gol */}
      <div className={`absolute z-[5] ${impact && shot?.net ? 'animate-netshake' : ''}`} style={goalBox}>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden>
          <defs>
            <pattern id="net" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 0 L4 4 M4 0 L0 4" stroke="rgba(238,245,241,0.28)" strokeWidth="0.35" />
            </pattern>
          </defs>
          <path d="M5 9 H95 V50 H5 Z" fill="url(#net)" />
          <path d="M0 0 L5 9 L5 50 L0 50 Z M100 0 L95 9 L95 50 L100 50 Z M0 0 H100 L95 9 H5 Z" fill="url(#net)" />
          <path d="M5 9 H95 M5 9 V50 M95 9 V50" stroke="rgba(238,245,241,0.35)" strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Rede estufando onde a bola bate */}
      {impact && bulge && (
        <div key={`bulge${animKey}`} className="pointer-events-none absolute z-[6] -translate-x-1/2 -translate-y-1/2" style={{ left: `${bulge.x}%`, top: `${bulge.y}%` }}>
          <span className="block h-8 w-8 animate-pop rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)' }} />
        </div>
      )}

      {/* Goleiro sobre a linha, em escala (~1,9 m pra 2,44 m de trave) */}
      <div
        className="absolute z-10"
        style={{
          left: `${kx}%`,
          top: `${GOAL.top + goalH * 0.12}%`,
          height: `${goalH * 0.9}%`,
          transform: `translate(-50%, ${ky}%)`,
          // Sem efeito mola: mergulho acelera e assenta.
          transition: 'left .42s cubic-bezier(.2,.8,.3,1), transform .42s cubic-bezier(.2,.8,.3,1)',
        }}
      >
        <div className={`h-full ${!shot ? 'animate-bob' : ''}`}>
          <Keeper pose={pose} className="h-full w-auto" />
        </div>
      </div>

      {/* Traves na frente do goleiro e da bola que entra */}
      <div className="pointer-events-none absolute z-[14]" style={goalBox}>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden>
          <path d="M0 50 V0 H100 V50" fill="none" stroke="#f7f4ec" strokeWidth="3.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Sombra e bola: posicionadas por quadro a partir do mundo */}
      <div ref={shadowRef} className="absolute left-0 top-0 z-[8] h-2.5 w-7 rounded-[50%] bg-black/45 blur-[1.5px]" style={{ transform: 'translate(-100px,-100px)' }} />
      <div ref={ballRef} className="absolute left-0 top-0 z-20" style={{ transform: 'translate(-100px,-100px)' }}>
        <div ref={spinRef} className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]">
          <SoccerBall className="h-7 w-7" />
        </div>
      </div>

      {/* Batedor de costas, perto da câmera */}
      <div ref={kickerRef} className="pointer-events-none absolute bottom-[-6%] left-[38%] z-[25] h-[42%]" style={{ transform: 'translate(-70%, 6%) scale(1.06)' }}>
        <Kicker pose={kickPose} />
      </div>

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
