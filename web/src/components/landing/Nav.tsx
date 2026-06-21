import { BallMark } from './Icons'

const links = [
  { href: '#jogos', label: 'Os jogos' },
  { href: '#como-funciona', label: 'Como se joga' },
  { href: '#planos', label: 'Assine' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
      <nav className="container-page flex h-14 items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-ink-900">
          <BallMark className="h-7 w-7 text-grass-600" />
          <span className="font-display text-2xl uppercase tracking-tight">
            Encyclobol
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-cond text-sm font-500 uppercase tracking-wider text-ink-700 transition-colors hover:text-ochre-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#jogos"
          className="btn-stamp bg-ink-900 px-4 py-2 text-paper hover:bg-grass-600"
        >
          Edição de hoje
        </a>
      </nav>
    </header>
  )
}
