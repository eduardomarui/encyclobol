// Bandeiras simplificadas em SVG (emoji de bandeira não aparece no Windows).
// Código FIFA de 3 letras; sem desenho cadastrado, mostra só o código.
const W = 30
const H = 20

const h3 = (a: string, b: string, c: string) => (
  <>
    <rect width={W} height={H / 3} fill={a} />
    <rect y={H / 3} width={W} height={H / 3} fill={b} />
    <rect y={(2 * H) / 3} width={W} height={H / 3} fill={c} />
  </>
)
const v3 = (a: string, b: string, c: string) => (
  <>
    <rect width={W / 3} height={H} fill={a} />
    <rect x={W / 3} width={W / 3} height={H} fill={b} />
    <rect x={(2 * W) / 3} width={W / 3} height={H} fill={c} />
  </>
)

const FLAGS: Record<string, JSX.Element> = {
  BRA: (
    <>
      <rect width={W} height={H} fill="#1f9e45" />
      <path d="M15 2.5 L27.5 10 L15 17.5 L2.5 10 Z" fill="#f7d417" />
      <circle cx="15" cy="10" r="4.6" fill="#22408f" />
      <path d="M10.6 9.2 Q15 8 19.4 10.4" stroke="#fff" strokeWidth="0.8" fill="none" />
    </>
  ),
  ARG: (
    <>
      {h3('#74acdf', '#ffffff', '#74acdf')}
      <circle cx="15" cy="10" r="2" fill="#f6b40e" />
    </>
  ),
  ITA: v3('#009246', '#ffffff', '#ce2b37'),
  PER: v3('#d91023', '#ffffff', '#d91023'),
  BEL: v3('#1a1a1a', '#fdda24', '#ef3340'),
  NED: h3('#ae1c28', '#ffffff', '#21468b'),
  SRB: h3('#c6363c', '#0c4076', '#ffffff'),
  GER: h3('#1a1a1a', '#dd0000', '#ffce00'),
  QAT: (
    <>
      <rect width={W} height={H} fill="#8a1538" />
      <path d={`M0 0 H9 ${Array.from({ length: 9 }).map((_, i) => `L12 ${(i + 0.5) * (H / 9)} L9 ${(i + 1) * (H / 9)}`).join(' ')} H0 Z`} fill="#ffffff" />
    </>
  ),
  GRE: (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} y={(i * H) / 9} width={W} height={H / 9} fill={i % 2 ? '#ffffff' : '#0d5eaf'} />
      ))}
      <rect width={(5 * H) / 9} height={(5 * H) / 9} fill="#0d5eaf" />
      <rect x={(2 * H) / 9} width={H / 9} height={(5 * H) / 9} fill="#ffffff" />
      <rect y={(2 * H) / 9} width={(5 * H) / 9} height={H / 9} fill="#ffffff" />
    </>
  ),
  CZE: (
    <>
      <rect width={W} height={H / 2} fill="#ffffff" />
      <rect y={H / 2} width={W} height={H / 2} fill="#d7141a" />
      <path d={`M0 0 L${W / 2} ${H / 2} L0 ${H} Z`} fill="#11457e" />
    </>
  ),
  BIH: (
    <>
      <rect width={W} height={H} fill="#002395" />
      <path d="M8 0 H23 V15 Z" fill="#fecb00" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={6.5 + i * 2.6} cy={1.5 + i * 2.6} r="0.8" fill="#ffffff" />
      ))}
    </>
  ),
}

export function Bandeira({ code, className = 'h-3 w-[18px]' }: { code: string; className?: string }) {
  const f = FLAGS[code]
  if (!f) return <span className="font-cond text-[9px] font-600 uppercase">{code}</span>
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${className} rounded-[1px] ring-1 ring-black/30`} role="img" aria-label={code}>
      {f}
    </svg>
  )
}
