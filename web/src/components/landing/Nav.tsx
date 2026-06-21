const links = [
  { href: '#jogos', label: 'Jogos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#planos', label: 'Planos' },
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
        <rect width="64" height="64" rx="14" fill="#054f31" />
        <circle cx="32" cy="32" r="18" fill="none" stroke="#32d583" strokeWidth="3" />
        <path d="M32 18 l4.2 3 -1.6 4.9 -5.2 0 -1.6 -4.9 z" fill="#fbbf24" />
        <circle cx="32" cy="32" r="3.4" fill="#fbbf24" />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        Encyclo<span className="text-field-400">bol</span>
      </span>
    </a>
  )
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-900/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#jogos"
          className="rounded-full bg-field-500 px-5 py-2 text-sm font-semibold text-ink-900 transition-colors hover:bg-field-400"
        >
          Jogar agora
        </a>
      </nav>
    </header>
  )
}
