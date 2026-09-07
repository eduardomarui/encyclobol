import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { players } from '../../data/players'
import { quiz } from '../../data/quiz'
import { conexoes } from '../../data/conexoes'
import { dailyIndex, dayNumber, seededShuffle } from '../../lib/daily'

// Números reais, calculados da própria base.
const nacoes = new Set(players.map((p) => p.nat)).size

const programa = [
  { n: '01', nome: 'Tira-Teima', tipo: 'carreira', to: '/jogos/quem-sou-ele' },
  { n: '02', nome: 'Copa de Pênaltis', tipo: 'mata-mata', to: '/jogos/penaltis' },
  { n: '03', nome: 'Quarteto', tipo: 'lógica', to: '/jogos/conexoes' },
  { n: '04', nome: 'Linha do Tempo', tipo: 'cronologia', to: '/jogos/linha-do-tempo' },
  { n: '05', nome: 'O Intruso', tipo: 'dedução', to: '/jogos/o-intruso' },
  { n: '06', nome: 'Craque Misterioso', tipo: 'detetive', to: '/jogos/craque-misterioso' },
]

function dateline() {
  const fmt = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  return fmt.format(new Date())
}

export default function Hero() {
  // Aquecimento: uma pergunta real do banco, a mesma pra todo mundo no dia.
  const teaser = useMemo(() => {
    const base = quiz[dailyIndex(quiz.length)]
    const order = seededShuffle(base.options.map((_, i) => i), dayNumber() * 17 + 3)
    return {
      q: base.q,
      cat: base.cat,
      options: order.map((i) => base.options[i]),
      correct: order.indexOf(base.correct),
    }
  }, [])
  const [pick, setPick] = useState<number | null>(null)
  const answered = pick !== null
  const acertou = pick === teaser.correct

  return (
    <section className="relative overflow-hidden bg-[#0b241c] text-[#eef5f1]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(90% 50% at 20% -10%, rgba(224,176,58,0.16), transparent 60%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 84px)' }}
      />

      {/* Cabeçalho da edição */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container-page flex items-center justify-between py-2 font-cond text-[11px] font-500 uppercase tracking-[0.2em] text-[#8fb0a4]">
          <span>Edição nº {dayNumber()}</span>
          <span className="hidden sm:inline">{dateline()}</span>
          <span>São Paulo</span>
        </div>
      </div>

      <div className="relative z-10 container-page grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Coluna editorial */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-12 w-auto" />
            <p className="font-cond text-xs font-600 uppercase tracking-[0.22em] text-[#e6b73e]">
              O almanaque jogável do futebol
            </p>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Quem sabe de bola
            <br />
            não precisa de Google.
          </h1>

          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-[#bdd2c9] sm:text-xl">
            Seis desafios curtos por dia sobre a história do futebol — do escrete de 70 ao
            elenco de 2026. Uma base de <strong className="text-[#eef5f1]">{players.length} craques</strong>{' '}
            de <strong className="text-[#eef5f1]">{nacoes} seleções</strong>,{' '}
            <strong className="text-[#eef5f1]">{quiz.length} perguntas</strong> e{' '}
            <strong className="text-[#eef5f1]">{conexoes.length} quartetos</strong>, conferidos um a um.
            Sem chute. Sem buscador. Vale o que ficou na cabeça.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/jogos"
              className="btn-stamp bg-[#e0b03a] px-7 py-3.5 text-base text-[#1c2b1f] hover:bg-[#efc760]"
            >
              Abrir a edição de hoje
            </Link>
            <Link
              to="/ranking"
              className="font-cond text-sm font-600 uppercase tracking-wider text-[#bdd2c9] underline-offset-4 hover:text-[#eef5f1] hover:underline"
            >
              Ver o ranking →
            </Link>
          </div>

          <p className="mt-10 font-cond text-[11px] font-500 uppercase tracking-[0.18em] text-[#8fb0a4]">
            Projeto independente · Sem vínculo com clubes ou ligas · Grátis
          </p>
        </div>

        {/* Coluna do programa + aquecimento */}
        <aside className="lg:col-span-5">
          <div className="border border-white/15 bg-white/5">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="font-cond text-xs font-700 uppercase tracking-[0.18em] text-[#e6b73e]">
                Aquecimento
              </span>
              <span className="font-cond text-[11px] font-500 uppercase tracking-wider text-[#8fb0a4]">
                {teaser.cat}
              </span>
            </div>
            <div className="px-5 py-5">
              <p className="font-serif text-lg leading-snug text-[#eef5f1]">{teaser.q}</p>
              <div className="mt-4 grid gap-2">
                {teaser.options.map((opt, i) => {
                  let cls = 'border-white/15 hover:border-white/40 hover:bg-white/5'
                  if (answered) {
                    if (i === teaser.correct) cls = 'border-[#54b97b] bg-[#2c7d4f] text-[#eef5f1]'
                    else if (i === pick) cls = 'border-[#d24a3a] bg-[#d24a3a]/80 text-[#eef5f1]'
                    else cls = 'border-white/10 opacity-50'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => !answered && setPick(i)}
                      disabled={answered}
                      className={`flex items-center gap-3 border px-4 py-2.5 text-left font-serif text-[15px] transition-colors ${cls}`}
                    >
                      <span className="font-cond text-xs font-700 text-[#8fb0a4]">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {answered && (
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="font-cond text-sm font-700 uppercase tracking-wide text-[#eef5f1]">
                    {acertou ? 'Cravou. Bora pro resto?' : 'Essa era difícil. Tem mais cinco.'}
                  </span>
                  <Link
                    to="/jogos/penaltis"
                    className="btn-stamp shrink-0 bg-[#2c7d4f] px-4 py-2 text-xs text-[#eef5f1] hover:bg-[#389a5f]"
                  >
                    Jogar →
                  </Link>
                </div>
              )}
            </div>
          </div>

          <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {programa.map((g) => (
              <li key={g.n}>
                <Link to={g.to} className="group flex items-center gap-4 py-2.5 hover:bg-white/5">
                  <span className="w-8 font-display text-xl text-white/25">{g.n}</span>
                  <span className="flex-1 font-cond text-sm font-600 uppercase tracking-wide">{g.nome}</span>
                  <span className="font-cond text-[11px] uppercase tracking-wider text-[#8fb0a4]">{g.tipo}</span>
                  <span className="font-cond text-sm text-[#e6b73e] transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}
