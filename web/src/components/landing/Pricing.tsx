const plans = [
  {
    name: 'Avulso',
    price: 'Grátis',
    period: '',
    desc: 'Pra quem passa na banca de vez em quando.',
    features: [
      'Três jogos por dia',
      'Desafio diário',
      'Ranking semanal',
      'Com anúncios',
    ],
    cta: 'Começar de graça',
    featured: false,
  },
  {
    name: 'Assinante',
    price: 'R$ 9,90',
    period: '/mês',
    desc: 'Pra quem não perde uma edição.',
    features: [
      'Jogos ilimitados',
      'Todos os modos liberados',
      'Sem anúncios',
      'Histórico e estatísticas',
      'Ranking global',
    ],
    cta: 'Assinar a edição',
    featured: true,
  },
]

function Bullet() {
  return (
    <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-grass-600" aria-hidden />
  )
}

export default function Pricing() {
  return (
    <section id="planos" className="border-t-2 border-ink-900 halftone">
      <div className="container-page py-16 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="kicker">Faça sua assinatura</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            Assine a edição
          </h2>
          <p className="mt-4 font-serif text-lg italic text-ink-600">
            Comece de graça. Vire assinante quando bater a vontade de jogar sem
            olhar pro relógio.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15 sm:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col p-8 ${
                p.featured ? 'bg-grass-600 text-ink-900' : 'bg-paper text-ink-900'
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rotate-3 border-2 border-paper px-2 py-0.5 font-cond text-[11px] font-700 uppercase tracking-widest">
                  Edição completa
                </span>
              )}
              <h3 className="font-display text-2xl uppercase tracking-tight">{p.name}</h3>
              <p
                className={`mt-1 font-serif text-[15px] italic ${
                  p.featured ? 'text-ink-900/80' : 'text-ink-600'
                }`}
              >
                {p.desc}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl tracking-tight">{p.price}</span>
                {p.period && (
                  <span
                    className={`mb-1.5 font-cond text-sm uppercase ${
                      p.featured ? 'text-ink-900/80' : 'text-ink-500'
                    }`}
                  >
                    {p.period}
                  </span>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 font-serif text-[15px]">
                    <Bullet />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#jogos"
                className={`btn-stamp mt-8 px-6 py-3.5 text-base ${
                  p.featured
                    ? 'bg-paper text-ink-900 hover:bg-paper-200'
                    : 'bg-grass-700 text-ink-900 hover:bg-grass-600'
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
