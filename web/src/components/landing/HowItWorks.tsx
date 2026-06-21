const rules = [
  {
    n: '01',
    title: 'Escolha um jogo',
    desc: 'Tem quiz, tem escalação, tem adivinhação. Todo dia entra coisa nova no caderno.',
  },
  {
    n: '02',
    title: 'Confie na memória',
    desc: 'Da Copa de 50 ao time de 2026. Aqui vale o que está na cabeça, não no buscador.',
  },
  {
    n: '03',
    title: 'Some os pontos',
    desc: 'Cada acerto conta. Travou hoje? Amanhã tem revanche com edição nova.',
  },
  {
    n: '04',
    title: 'Encare o ranking',
    desc: 'Veja onde você para entre os almanaques ambulantes do Brasil e do mundo.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t-2 border-ink-900 bg-ink-900 text-paper">
      <div className="container-page py-16 sm:py-20">
        <header className="border-b border-paper/20 pb-5">
          <p className="font-cond text-xs font-600 uppercase tracking-[0.18em] text-grass-400">
            As regras da casa
          </p>
          <h2 className="mt-1 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Como se joga
          </h2>
        </header>

        <ol className="grid gap-px overflow-hidden bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((r) => (
            <li key={r.n} className="bg-ink-900 px-6 py-8">
              <span className="font-display text-5xl text-grass-400">{r.n}</span>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tight">
                {r.title}
              </h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-paper/70">
                {r.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
