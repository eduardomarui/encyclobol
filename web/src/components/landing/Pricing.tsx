const plans = [
  {
    name: 'Torcedor',
    price: 'Grátis',
    period: '',
    desc: 'Pra quem joga de vez em quando.',
    features: [
      '3 minigames por dia',
      'Desafio diário',
      'Ranking semanal',
      'Com anúncios',
    ],
    cta: 'Começar grátis',
    highlight: false,
  },
  {
    name: 'Craque',
    price: 'R$ 9,90',
    period: '/mês',
    desc: 'Pra quem vive de futebol.',
    features: [
      'Jogos ilimitados',
      'Todos os minigames',
      'Sem anúncios',
      'Histórico e estatísticas',
      'Ranking global',
    ],
    cta: 'Virar Craque',
    highlight: true,
  },
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 flex-none text-field-400" aria-hidden>
      <path
        fill="currentColor"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
      />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="planos" className="container-page py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Escolha seu plano
        </h2>
        <p className="mt-4 text-lg text-white/70">
          Comece de graça. Vire Craque quando quiser jogar sem limites.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl border p-8 ${
              p.highlight
                ? 'border-field-500/50 bg-gradient-to-b from-field-500/10 to-ink-800'
                : 'border-white/10 bg-ink-800'
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-900">
                Mais popular
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-white/60">{p.desc}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-extrabold text-white">
                {p.price}
              </span>
              {p.period && <span className="mb-1 text-white/50">{p.period}</span>}
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-white/80">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#jogos"
              className={`mt-8 rounded-full px-6 py-3 text-center text-base font-semibold transition-all ${
                p.highlight
                  ? 'bg-field-500 text-ink-900 hover:-translate-y-0.5 hover:bg-field-400'
                  : 'border border-white/15 text-white hover:bg-white/5'
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
