type Badge = 'diário' | 'novo' | 'em breve'

type Game = {
  icon: string
  title: string
  desc: string
  badge?: Badge
}

const games: Game[] = [
  {
    icon: '🕵️',
    title: 'Quem sou eu?',
    desc: 'Adivinhe o sobrenome do craque em 6 tentativas. Estilo Wordle, novo a cada dia.',
    badge: 'diário',
  },
  {
    icon: '🧠',
    title: 'Quiz Relâmpago',
    desc: '15 segundos por pergunta. Responda o máximo que conseguir antes do apito final.',
    badge: 'diário',
  },
  {
    icon: '⚽',
    title: 'Escalação Rápida',
    desc: 'Monte um time de lendas no esquema 4-4-2 e simule a partida.',
    badge: 'novo',
  },
  {
    icon: '🏆',
    title: 'Montador de Lendas',
    desc: 'Construa o elenco perfeito com craques de todas as eras e vença a Copa.',
  },
  {
    icon: '🔗',
    title: 'Cadeia de Passes',
    desc: 'Conecte jogadores que atuaram juntos no mesmo time. Quanto você lembra?',
    badge: 'em breve',
  },
  {
    icon: '👕',
    title: 'Camisa Mistério',
    desc: 'Reconheça o clube pela camisa histórica. Dos anos 70 até hoje.',
    badge: 'em breve',
  },
]

const badgeStyles: Record<Badge, string> = {
  diário: 'bg-field-500/15 text-field-300 border-field-500/30',
  novo: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
  'em breve': 'bg-white/5 text-white/50 border-white/10',
}

export default function Games() {
  return (
    <section id="jogos" className="container-page py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Um jogo novo a cada dia
        </h2>
        <p className="mt-4 text-lg text-white/70">
          Minigames rápidos para matar a saudade do futebol e provar que você é o
          verdadeiro almanaque ambulante.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => {
          const soon = g.badge === 'em breve'
          return (
            <div
              key={g.title}
              className={`group relative flex flex-col rounded-2xl border border-white/10 bg-ink-800 p-6 transition-all ${
                soon ? 'opacity-70' : 'hover:-translate-y-1 hover:border-field-500/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{g.icon}</span>
                {g.badge && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${badgeStyles[g.badge]}`}
                  >
                    {g.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">
                {g.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {g.desc}
              </p>
              <span
                className={`mt-5 text-sm font-semibold ${
                  soon
                    ? 'text-white/40'
                    : 'text-field-400 transition-colors group-hover:text-field-300'
                }`}
              >
                {soon ? 'Em breve' : 'Jogar →'}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
