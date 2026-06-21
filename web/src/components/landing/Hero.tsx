const stats = [
  { value: '5.700+', label: 'jogadores' },
  { value: '250', label: 'seleções e clubes' },
  { value: '8', label: 'jogos e minigames' },
]

export default function Hero() {
  return (
    <section className="pitch-lines relative overflow-hidden">
      <div className="container-page relative flex flex-col items-center py-20 text-center sm:py-28">
        <span className="animate-fade-up rounded-full border border-field-500/30 bg-field-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-field-300">
          ⚽ Copa do Mundo 2026 · jogue todos os dias
        </span>

        <h1 className="animate-fade-up mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
          A enciclopédia <span className="text-field-400">jogável</span> do futebol
        </h1>

        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Quizzes, escalações de lendas e desafios diários sobre toda a história do
          futebol mundial. Teste o quanto você realmente sabe.
        </p>

        <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#jogos"
            className="rounded-full bg-field-500 px-7 py-3.5 text-base font-semibold text-ink-900 shadow-lg shadow-field-500/20 transition-all hover:-translate-y-0.5 hover:bg-field-400"
          >
            Começar a jogar
          </a>
          <a
            href="#como-funciona"
            className="rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/5"
          >
            Como funciona
          </a>
        </div>

        <dl className="animate-fade-up mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <dt className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
