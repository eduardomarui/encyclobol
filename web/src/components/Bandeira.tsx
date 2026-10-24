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

const cross = (bg: string, fg: string, edge?: string) => (
  <>
    <rect width={W} height={H} fill={bg} />
    {edge && <rect x={7} width={6} height={H} fill={edge} />}
    {edge && <rect y={7} width={W} height={6} fill={edge} />}
    <rect x={edge ? 8.5 : 8} width={edge ? 3 : 4} height={H} fill={fg} />
    <rect y={edge ? 8.5 : 8} width={W} height={edge ? 3 : 4} fill={fg} />
  </>
)
const h2 = (a: string, b: string) => (
  <>
    <rect width={W} height={H / 2} fill={a} />
    <rect y={H / 2} width={W} height={H / 2} fill={b} />
  </>
)
const star = (cx: number, cy: number, r: number, fill: string) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const rr = i % 2 ? r * 0.45 : r
    return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`
  }).join(' ')
  return <polygon points={pts} fill={fill} />
}

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
  FRA: v3('#002395', '#ffffff', '#ed2939'),
  IRL: v3('#169b62', '#ffffff', '#ff883e'),
  ROU: v3('#002b7f', '#fcd116', '#ce1126'),
  NGA: v3('#008751', '#ffffff', '#008751'),
  CIV: v3('#f77f00', '#ffffff', '#009e60'),
  MLI: v3('#14b53a', '#fcd116', '#ce1126'),
  CMR: (
    <>
      {v3('#007a5e', '#ce1126', '#fcd116')}
      {star(15, 10, 3.2, '#fcd116')}
    </>
  ),
  AUT: h3('#ed2939', '#ffffff', '#ed2939'),
  PAR: h3('#d52b1e', '#ffffff', '#0038a8'),
  VEN: (
    <>
      {h3('#ffcc00', '#00247d', '#cf142b')}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={15 + 5.5 * Math.cos(Math.PI * (1.1 + (i * 0.8) / 7))} cy={11.5 + 5.5 * Math.sin(Math.PI * (1.1 + (i * 0.8) / 7))} r="0.55" fill="#ffffff" />
      ))}
    </>
  ),
  POL: h2('#ffffff', '#dc143c'),
  ESP: (
    <>
      <rect width={W} height={H} fill="#aa151b" />
      <rect y={5} width={W} height={10} fill="#f1bf00" />
    </>
  ),
  POR: (
    <>
      <rect width={W} height={H} fill="#da291c" />
      <rect width={12} height={H} fill="#046a38" />
      <circle cx={12} cy={10} r={3.6} fill="#ffe900" />
      <circle cx={12} cy={10} r={2.2} fill="#da291c" />
    </>
  ),
  ENG: (
    <>
      <rect width={W} height={H} fill="#ffffff" />
      <rect x={13} width={4} height={H} fill="#ce1124" />
      <rect y={8} width={W} height={4} fill="#ce1124" />
    </>
  ),
  WAL: (
    <>
      {h2('#ffffff', '#00b140')}
      <path d="M8 13 Q12 6 18 9 L22 7 L20 11 Q22 14 18 15 Q13 16 8 13 Z" fill="#c8102e" />
    </>
  ),
  DEN: cross('#c8102e', '#ffffff'),
  SWE: cross('#006aa7', '#fecc00'),
  FIN: cross('#ffffff', '#002f6c'),
  NOR: cross('#ba0c2f', '#00205b', '#ffffff'),
  CRO: (
    <>
      {h3('#ff0000', '#ffffff', '#171796')}
      <rect x={12} y={5} width={6} height={7} fill="#ffffff" stroke="#ff0000" strokeWidth="0.6" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => ((r + c) % 2 === 0 ? <rect key={`${r}${c}`} x={12 + c * 2} y={5 + r * 2.33} width={2} height={2.33} fill="#ff0000" /> : null)))}
    </>
  ),
  MKD: (
    <>
      <rect width={W} height={H} fill="#d20000" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return <path key={i} d={`M15 10 L${15 + 20 * Math.cos(a - 0.12)} ${10 + 20 * Math.sin(a - 0.12)} L${15 + 20 * Math.cos(a + 0.12)} ${10 + 20 * Math.sin(a + 0.12)} Z`} fill="#ffe600" />
      })}
      <circle cx={15} cy={10} r={3} fill="#ffe600" stroke="#d20000" strokeWidth="0.6" />
    </>
  ),
  GEO: (
    <>
      <rect width={W} height={H} fill="#ffffff" />
      <rect x={13} width={4} height={H} fill="#ff0000" />
      <rect y={8} width={W} height={4} fill="#ff0000" />
      {[
        [6.5, 4],
        [23.5, 4],
        [6.5, 16],
        [23.5, 16],
      ].map(([x, y]) => (
        <g key={`${x}${y}`} fill="#ff0000">
          <rect x={x - 0.6} y={y - 2} width={1.2} height={4} />
          <rect x={x - 2} y={y - 0.6} width={4} height={1.2} />
        </g>
      ))}
    </>
  ),
  ALG: (
    <>
      <rect width={W / 2} height={H} fill="#006233" />
      <rect x={W / 2} width={W / 2} height={H} fill="#ffffff" />
      <circle cx={15} cy={10} r={5} fill="#d21034" />
      <circle cx={16.4} cy={10} r={4.1} fill="#ffffff" />
      {star(17.5, 10, 2.2, '#d21034')}
    </>
  ),
  MAR: (
    <>
      <rect width={W} height={H} fill="#c1272d" />
      <polygon points="15,5 17.6,13.2 10.8,8.1 19.2,8.1 12.4,13.2" fill="none" stroke="#006233" strokeWidth="1" />
    </>
  ),
  JPN: (
    <>
      <rect width={W} height={H} fill="#ffffff" />
      <circle cx={15} cy={10} r={5.4} fill="#bc002d" />
    </>
  ),
  AUS: (
    <>
      <rect width={W} height={H} fill="#012169" />
      <rect width={13} height={9} fill="#012169" />
      <path d="M0 0 L13 9 M13 0 L0 9" stroke="#ffffff" strokeWidth="1.6" />
      <rect x={5.5} width={2} height={9} fill="#ffffff" />
      <rect y={3.5} width={13} height={2} fill="#ffffff" />
      <rect x={6} width={1} height={9} fill="#c8102e" />
      <rect y={4} width={13} height={1} fill="#c8102e" />
      {star(6.5, 14.5, 2.4, '#ffffff')}
      {star(22, 4.5, 1.3, '#ffffff')}
      {star(25.5, 9, 1.3, '#ffffff')}
      {star(22, 16, 1.3, '#ffffff')}
      {star(19, 10, 1.3, '#ffffff')}
    </>
  ),
  COL: (
    <>
      <rect width={W} height={H / 2} fill="#fcd116" />
      <rect y={H / 2} width={W} height={H / 4} fill="#003893" />
      <rect y={(3 * H) / 4} width={W} height={H / 4} fill="#ce1126" />
    </>
  ),
  ECU: (
    <>
      <rect width={W} height={H / 2} fill="#ffdd00" />
      <rect y={H / 2} width={W} height={H / 4} fill="#034ea2" />
      <rect y={(3 * H) / 4} width={W} height={H / 4} fill="#ed1c24" />
      <ellipse cx={15} cy={10} rx={2.6} ry={3.2} fill="#6b8e23" stroke="#8b5a2b" strokeWidth="0.6" />
    </>
  ),
  URU: (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} y={(i * H) / 9} width={W} height={H / 9} fill={i % 2 ? '#0038a8' : '#ffffff'} />
      ))}
      <rect width={(5 * H) / 9} height={(5 * H) / 9} fill="#ffffff" />
      <circle cx={(2.5 * H) / 9} cy={(2.5 * H) / 9} r={3.2} fill="#fcd116" />
    </>
  ),
  CRC: (
    <>
      <rect width={W} height={H} fill="#002b7f" />
      <rect y={H / 6} width={W} height={(2 * H) / 3} fill="#ffffff" />
      <rect y={H / 3} width={W} height={H / 3} fill="#ce1126" />
    </>
  ),
  JAM: (
    <>
      <rect width={W} height={H} fill="#009b3a" />
      <path d="M0 0 L15 10 L0 20 Z M30 0 L15 10 L30 20 Z" fill="#000000" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fed100" strokeWidth="3" />
    </>
  ),
  TRI: (
    <>
      <rect width={W} height={H} fill="#da1a35" />
      <path d="M2 0 L30 18.5 L30 20 L28 20 L0 1.5 L0 0 Z" fill="#ffffff" transform="translate(-1 0)" />
      <path d="M4 0 L30 17 L30 20 L26 20 L0 3 L0 0 Z" fill="#000000" />
    </>
  ),

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
