const cols = [
  {
    title: 'Jogos',
    links: ['Quem sou eu?', 'Quiz Relâmpago', 'Escalação Rápida', 'Montador de Lendas'],
  },
  {
    title: 'Plataforma',
    links: ['Como funciona', 'Planos', 'Ranking', 'Sobre'],
  },
  {
    title: 'Legal',
    links: ['Termos de uso', 'Privacidade', 'Contato'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
                <rect width="64" height="64" rx="14" fill="#054f31" />
                <circle cx="32" cy="32" r="18" fill="none" stroke="#32d583" strokeWidth="3" />
                <path d="M32 18 l4.2 3 -1.6 4.9 -5.2 0 -1.6 -4.9 z" fill="#fbbf24" />
                <circle cx="32" cy="32" r="3.4" fill="#fbbf24" />
              </svg>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Encyclo<span className="text-field-400">bol</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              A enciclopédia jogável do futebol. Feito por torcedores, para torcedores.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/40">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/70 transition-colors hover:text-field-400"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-white/40">
            © 2026 Encyclobol. Todos os direitos reservados.
          </p>
          <p className="text-sm text-white/40">Feito com ⚽ no Brasil</p>
        </div>
      </div>
    </footer>
  )
}
