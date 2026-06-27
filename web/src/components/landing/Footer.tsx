import { Link } from 'react-router-dom'

const BASE = import.meta.env.BASE_URL
const GH = 'https://github.com/eduardomarui/encyclobol'

type FLink = { label: string; to?: string; href?: string }

const cols: { title: string; links: FLink[] }[] = [
  {
    title: 'O caderno',
    links: [
      { label: 'Tira-Teima', to: '/jogos/quem-sou-ele' },
      { label: 'Copa de Pênaltis', to: '/jogos/penaltis' },
      { label: 'Quarteto', to: '/jogos/conexoes' },
      { label: 'Linha do Tempo', to: '/jogos/linha-do-tempo' },
      { label: 'O Intruso', to: '/jogos/o-intruso' },
      { label: 'Craque Misterioso', to: '/jogos/craque-misterioso' },
    ],
  },
  {
    title: 'A casa',
    links: [
      { label: 'Os jogos', to: '/jogos' },
      { label: 'Ranking', to: '/ranking' },
      { label: 'Meu perfil', to: '/perfil' },
      { label: 'Como se joga', href: `${BASE}#como-funciona` },
    ],
  },
  {
    title: 'Miudezas',
    links: [
      { label: 'Termos de uso', to: '/termos' },
      { label: 'Privacidade', to: '/privacidade' },
      { label: 'Fale com a gente', href: GH },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink-900 bg-grass-700 text-ink-900">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={`${BASE}logo.png`} alt="" className="h-8 w-auto" />
              <span className="font-display text-2xl uppercase tracking-tight">
                Encyclobol
              </span>
            </div>
            <p className="mt-4 max-w-xs font-serif text-[15px] leading-relaxed text-ink-900/60">
              O almanaque jogável do futebol. Feito por quem cresceu trocando
              figurinha e discutindo escalação no recreio.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-cond text-xs font-600 uppercase tracking-[0.18em] text-grass-400">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => {
                  const cls = 'font-serif text-[15px] text-ink-900/70 transition-colors hover:text-ink-900'
                  return (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to} className={cls}>
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className={cls} target={l.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {l.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 rule-double border-paper/40 pt-6 sm:flex-row sm:items-center">
          <p className="font-cond text-xs uppercase tracking-[0.14em] text-ink-900/50">
            Encyclobol · Edição independente · São Paulo, Brasil
          </p>
          <p className="font-cond text-xs uppercase tracking-[0.14em] text-ink-900/50">
            © 2026 · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
