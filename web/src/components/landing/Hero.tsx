import { players } from '../../data/players'
import { quiz } from '../../data/quiz'

// Números reais, calculados da própria base — nunca desatualizam.
const nacoes = new Set(players.map((p) => p.nat)).size
const stats = [
  { value: players.length.toLocaleString('pt-BR'), label: 'craques catalogados' },
  { value: String(nacoes), label: 'seleções' },
  { value: quiz.length.toLocaleString('pt-BR'), label: 'perguntas no quiz' },
  { value: '6', label: 'modos de jogo' },
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
    <section className="relative overflow-hidden bg-[#0b241c] text-[#eef5f1]">
      {/* refletores */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 60% at 50% -10%, rgba(43,179,255,0.20), transparent 60%)' }}
      />
      {/* gramado listrado */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 84px)' }}
      />
      {/* marcações do campo */}
      <div className="pointer-events-none absolute left-1/2 top-[46%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

      {/* Tarja de cabeçalho — metadados de edição */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
          <span className="font-cond text-[11px] font-500 uppercase tracking-[0.2em] text-[#8fb0a4]">
            São Paulo · {dateline()}
          </span>
          <span className="hidden text-white/20 sm:inline">|</span>
          <span className="font-cond text-[11px] font-500 uppercase tracking-[0.2em] text-[#8fb0a4]">
            Edição diária · sob os refletores
          </span>
        </div>
      </div>

      <div className="relative z-10 container-page py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Encyclobol"
            className="mx-auto mb-6 h-40 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-52"
          />
          <p className="font-cond text-xs font-600 uppercase tracking-[0.22em] text-[#2bb3ff]">
            Desafio diário · desde a Copa de 1950
          </p>

          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-tight text-[#eef5f1] sm:text-7xl md:text-8xl">
            Você acha que sabe
            <br />
            <span className="text-[#2bb3ff]">de futebol?</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-[#bdd2c9] sm:text-2xl">
            Prove sem chutar e sem Google. Aqui vale só o que está guardado na
            memória — do escrete de 70 ao elenco de 2026.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#jogos"
              className="btn-stamp bg-[#2bb3ff] px-7 py-3.5 text-base text-[#06243a] hover:bg-[#5cc6ff]"
            >
              Começar a edição de hoje
            </a>
            <a
              href="#jogos"
              className="btn-stamp border-2 border-white/40 px-7 py-3.5 text-base text-[#eef5f1] hover:bg-white/10"
            >
              Ver os jogos
            </a>
          </div>
        </div>

        {/* Linha de estatísticas — placar sob os refletores */}
        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-sm border border-white/10 bg-white/5 px-3 py-6 text-center"
            >
              <dt className="font-display text-4xl text-[#eef5f1] sm:text-5xl">{s.value}</dt>
              <dd className="mt-2 font-cond text-[11px] font-500 uppercase tracking-[0.14em] text-[#8fb0a4]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
