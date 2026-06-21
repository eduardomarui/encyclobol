const stats = [
  { value: '5.729', label: 'jogadores catalogados' },
  { value: '250', label: 'elencos históricos' },
  { value: '52', label: 'seleções' },
  { value: '8', label: 'modos de jogo' },
]

function dateline() {
  const fmt = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return fmt.format(new Date()).toUpperCase()
}

export default function Hero() {
  return (
    <section className="halftone relative overflow-hidden">
      {/* Tarja de cabeçalho — metadados de edição */}
      <div className="border-b border-ink-900/15">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
          <span className="font-cond text-[11px] font-500 uppercase tracking-[0.2em] text-ink-600">
            São Paulo · {dateline()}
          </span>
          <span className="hidden text-ink-900/30 sm:inline">|</span>
          <span className="font-cond text-[11px] font-500 uppercase tracking-[0.2em] text-ink-600">
            Edição diária · PT · ES · EN
          </span>
        </div>
      </div>

      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker">Desafio diário · desde a Copa de 1950</p>

          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 sm:text-7xl md:text-8xl">
            Você acha que sabe
            <br />
            <span className="text-grass-600">de futebol?</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-700 sm:text-2xl">
            Prove sem chutar e sem Google. Aqui vale só o que está guardado na
            memória — do escrete de 70 ao elenco de 2026.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#jogos"
              className="btn-stamp bg-grass-600 px-7 py-3.5 text-base text-paper hover:bg-grass-700"
            >
              Começar a edição de hoje
            </a>
            <a
              href="#jogos"
              className="btn-stamp border-2 border-ink-900 px-7 py-3.5 text-base text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              Ver os jogos
            </a>
          </div>
        </div>

        {/* Linha de estatísticas — como um placar de almanaque */}
        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rule-double bg-ink-900/15 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center bg-paper px-3 py-6 text-center"
            >
              <dt className="font-display text-4xl text-ink-900 sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-2 font-cond text-[11px] font-500 uppercase tracking-[0.14em] text-ink-600">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
