import { useState } from 'react'
import { Link } from 'react-router-dom'

type NavLink = { label: string; to?: string; href?: string }

const BASE = import.meta.env.BASE_URL

const links: NavLink[] = [
  { label: 'Os jogos', to: '/jogos' },
  { label: 'Ranking', to: '/ranking' },
  { label: 'Perfil', to: '/perfil' },
  { label: 'Como se joga', href: `${BASE}#como-funciona` },
  { label: 'Assine', href: `${BASE}#planos` },
]

function NavItem({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  const cls =
    'font-cond text-sm font-500 uppercase tracking-wider text-ink-700 transition-colors hover:text-ochre-600'
  return link.to ? (
    <Link to={link.to} className={cls} onClick={onClick}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={cls} onClick={onClick}>
      {link.label}
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
      <nav className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-ink-900">
          <img src={`${BASE}logo.png`} alt="" className="h-9 w-auto" />
          <span className="font-display text-2xl uppercase tracking-tight">
            Encyclobol
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavItem key={l.label} link={l} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/jogos"
            className="btn-stamp bg-grass-700 px-4 py-2 text-ink-900 hover:bg-grass-600"
          >
            Edição de hoje
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center border-2 border-ink-900 text-ink-900 md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-ink-900/15 bg-paper md:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {links.map((l) => (
              <NavItem key={l.label} link={l} onClick={() => setOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
