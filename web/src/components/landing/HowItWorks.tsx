const steps = [
  {
    n: '01',
    title: 'Escolha um desafio',
    desc: 'Quiz, escalação, adivinhação — tem jogo pra todo tipo de torcedor.',
  },
  {
    n: '02',
    title: 'Teste seu conhecimento',
    desc: 'Da Copa de 1950 ao elenco de 2026. Memória e história valem pontos.',
  },
  {
    n: '03',
    title: 'Some pontos e jogue de novo',
    desc: 'Cada acerto soma. Volte todo dia pra um desafio inédito.',
  },
  {
    n: '04',
    title: 'Dispute o ranking',
    desc: 'Compare sua pontuação com torcedores do Brasil e do mundo.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="border-y border-white/5 bg-ink-800/40">
      <div className="container-page py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Simples, rápido e viciante. Em quatro passos você já está jogando.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <span className="font-display text-5xl font-extrabold text-field-500/30">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
