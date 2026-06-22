import { BallMark } from './Icons'

const cols = [
  {
    title: 'O caderno',
    links: ['Tira-Teima', 'Conexões', 'O Intruso', 'Craque Misterioso', 'A Grade'],
  },
  {
    title: 'A casa',
    links: ['Como se joga', 'Assine', 'Ranking', 'Quem faz'],
  },
  {
    title: 'Miudezas',
    links: ['Termos de uso', 'Privacidade', 'Fale com a redação'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink-900 bg-ink-900 text-paper">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BallMark className="h-7 w-7 text-grass-400" />
              <span className="font-display text-2xl uppercase tracking-tight">
                Encyclobol
              </span>
            </div>
            <p className="mt-4 max-w-xs font-serif text-[15px] leading-relaxed text-paper/60">
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
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="font-serif text-[15px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 rule-double border-paper/40 pt-6 sm:flex-row sm:items-center">
          <p className="font-cond text-xs uppercase tracking-[0.14em] text-paper/50">
            Encyclobol · Edição independente · São Paulo, Brasil
          </p>
          <p className="font-cond text-xs uppercase tracking-[0.14em] text-paper/50">
            © 2026 · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
