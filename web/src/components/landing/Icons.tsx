// Ícones de linha desenhados à mão, estilo editorial.
// Todos herdam a cor via currentColor e o traço é consistente.

type IconProps = { className?: string }

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PlayerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="16" cy="10" r="5" />
      <path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" />
      <path d="M16 5v10" strokeDasharray="1.5 2.5" opacity="0.5" />
    </svg>
  )
}

export function TimerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="16" cy="18" r="10" />
      <path d="M16 18l5-4" />
      <path d="M13 4h6M16 4v4" />
      <path d="M25 9l2-2" />
    </svg>
  )
}

export function PitchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="4" y="7" width="24" height="18" rx="1" />
      <path d="M16 7v18" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="M4 12h4v8H4M28 12h-4v8h4" />
    </svg>
  )
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M10 6h12v6a6 6 0 0 1-12 0V6Z" />
      <path d="M10 8H6v2a4 4 0 0 0 4 4M22 8h4v2a4 4 0 0 1-4 4" />
      <path d="M16 18v4M12 26h8M13 26c0-2 1.5-2 3-4 1.5 2 3 2 3 4" />
    </svg>
  )
}

export function ChainIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="4" y="12" width="13" height="8" rx="4" />
      <rect x="15" y="12" width="13" height="8" rx="4" />
    </svg>
  )
}

export function JerseyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M11 5 7 8l-3 4 4 3 1-2v10h14V13l1 2 4-3-3-4-4-3" />
      <path d="M11 5a5 5 0 0 0 10 0" />
    </svg>
  )
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="5" y="5" width="9" height="9" rx="1" />
      <rect x="18" y="5" width="9" height="9" rx="1" />
      <rect x="5" y="18" width="9" height="9" rx="1" />
      <rect x="18" y="18" width="9" height="9" rx="1" />
    </svg>
  )
}

// Marca: bola com gomos clássicos
export function BallMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 9l4.5 3.3-1.7 5.3h-5.6l-1.7-5.3L16 9Z"
        fill="currentColor"
      />
      <path
        d="M16 9V5M20.5 12.3l3.8-1.3M18.8 17.6l2.4 3.2M13.2 17.6l-2.4 3.2M11.5 12.3l-3.8-1.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
