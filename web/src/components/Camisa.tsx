import type { Clube } from '../data/clubes'

// Camisa estilizada (SVG) nas cores do clube — sem escudo, sem patrocínio.
export function Camisa({ clube, className = 'h-12 w-12', numero }: { clube: Clube; className?: string; numero?: string }) {
  const [a, b, c = b] = clube.cores
  const id = `c-${clube.id}`
  const body = 'M18 8 L26 4 Q32 9 38 4 L46 8 L58 18 L50 28 L46 25 L46 58 L18 58 L18 25 L14 28 L6 18 Z'
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <path d={body} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="64" height="64" fill={a} />
        {clube.padrao === 'listras' &&
          Array.from({ length: 8 }).map((_, i) =>
            i % 2 === 1 ? <rect key={i} x={i * 8} y="0" width="8" height="64" fill={i % 4 === 3 ? c : b} /> : null,
          )}
        {clube.padrao === 'aros' &&
          Array.from({ length: 8 }).map((_, i) =>
            i % 2 === 1 ? <rect key={i} x="0" y={i * 8} width="64" height="8" fill={i % 4 === 3 ? c : b} /> : null,
          )}
        {clube.padrao === 'faixa' && <path d="M8 4 L22 4 L58 58 L44 58 Z" fill={b} />}
        {clube.padrao === 'banda' && (
          <>
            <rect x="0" y="27" width="64" height="5" fill={b} />
            <rect x="0" y="32" width="64" height="5" fill={c} />
          </>
        )}
        {clube.padrao === 'metades' && <rect x="32" y="0" width="32" height="64" fill={b} />}
      </g>
      <path d={body} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
      <path d="M26 4 Q32 11 38 4" fill="none" stroke={clube.gola} strokeWidth="2.6" strokeLinecap="round" />
      {numero && (
        <text x="32" y="44" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="Oswald, sans-serif" fill={clube.gola} stroke="rgba(0,0,0,0.25)" strokeWidth="0.6">
          {numero}
        </text>
      )}
    </svg>
  )
}
