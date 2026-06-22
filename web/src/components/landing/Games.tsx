import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  PlayerIcon,
  TimerIcon,
  GridIcon,
  TimelineIcon,
  IntruderIcon,
  MysteryIcon,
  AlbumIcon,
} from './Icons'

type Status = 'Edição de hoje' | 'No ar' | 'Em breve'

type Game = {
  n: string
  Icon: ComponentType<{ className?: string }>
  category: string
  title: string
  desc: string
  status: Status
  to?: string
}

const games: Game[] = [
  {
    n: '01',
    Icon: PlayerIcon,
    category: 'Adivinhação',
    title: 'Tira-Teima',
    desc: 'Seis tentativas pra cravar o nome do craque. Errou? O alfabeto vai pintando de verde e amarelo até você acertar.',
    status: 'Edição de hoje',
    to: '/jogos/quem-sou-ele',
  },
  {
    n: '02',
    Icon: TimerIcon,
    category: 'Quiz',
    title: 'Quiz Relâmpago',
    desc: 'Quinze segundos por pergunta. O cronômetro não tem dó de quem trava na hora de lembrar o artilheiro daquela Copa.',
    status: 'Edição de hoje',
    to: '/jogos/quiz-relampago',
  },
  {
    n: '03',
    Icon: GridIcon,
    category: 'Lógica',
    title: 'Conexões',
    desc: 'Dezesseis craques, quatro grupos secretos. Ache o que liga cada quarteto antes de queimar as quatro tentativas.',
    status: 'Edição de hoje',
    to: '/jogos/conexoes',
  },
  {
    n: '04',
    Icon: TimelineIcon,
    category: 'Cronologia',
    title: 'Linha do Tempo',
    desc: 'Encaixe cada craque na ordem certa da história. Uma carta fora de época e a sua sequência morre.',
    status: 'Edição de hoje',
    to: '/jogos/linha-do-tempo',
  },
  {
    n: '05',
    Icon: IntruderIcon,
    category: 'Dedução',
    title: 'O Intruso',
    desc: 'Quatro craques, três com algo em comum e um infiltrado. Ache quem não pertence — cuidado com as pistas falsas.',
    status: 'Edição de hoje',
    to: '/jogos/o-intruso',
  },
  {
    n: '06',
    Icon: MysteryIcon,
    category: 'Detetive',
    title: 'Craque Misterioso',
    desc: 'Há um craque secreto. Chute nomes e use as pistas — seleção, posição e época — pra desvendar quem é.',
    status: 'Edição de hoje',
    to: '/jogos/craque-misterioso',
  },
  {
    n: '07',
    Icon: AlbumIcon,
    category: 'Figurinhas',
    title: 'A Grade',
    desc: 'Preencha o quadrado que cruza seleção e posição. Garimpe o craque mais raro pra pontuar — ou chame um amigo na pelada 2 jogadores.',
    status: 'Edição de hoje',
    to: '/jogos/a-grade',
  },
]

function StatusTag({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    'Edição de hoje': 'text-ochre-600',
    'No ar': 'text-grass-600',
    'Em breve': 'text-ink-500',
  }
  return (
    <span className={`font-cond text-[11px] font-600 uppercase tracking-[0.16em] ${styles[status]}`}>
      {status === 'Edição de hoje' && '● '}
      {status}
    </span>
  )
}

export default function Games() {
  return (
    <section id="jogos" className="border-t-2 border-ink-900 bg-paper-100">
      <div className="container-page py-16 sm:py-20">
        <header className="flex flex-col items-baseline justify-between gap-3 border-b border-ink-900/15 pb-5 sm:flex-row">
          <div>
            <p className="kicker">O caderno de jogos</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
              Escolha sua peneira
            </h2>
          </div>
          <p className="max-w-sm font-serif text-base italic text-ink-600">
            Seis modos pra matar a saudade do futebol e provar que você é mesmo um
            almanaque ambulante.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => {
            const soon = g.status === 'Em breve'
            const cls = `group relative flex flex-col border-t border-ink-900/15 p-6 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-child(3n)]:border-r-0 ${
              soon ? 'opacity-70' : 'transition-colors hover:bg-paper'
            }`
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl text-ink-900/20">{g.n}</span>
                  <g.Icon className="h-9 w-9 text-grass-600" />
                </div>

                <p className="mt-5 kicker text-ink-500">{g.category}</p>
                <h3 className="mt-1.5 font-display text-2xl uppercase leading-[1.1] tracking-tight text-ink-900">
                  {g.title}
                </h3>
                <p className="mt-2 flex-1 font-serif text-[15px] leading-relaxed text-ink-700">
                  {g.desc}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <StatusTag status={g.status} />
                  {!soon && (
                    <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-900 transition-transform group-hover:translate-x-1">
                      Jogar →
                    </span>
                  )}
                </div>
              </>
            )
            return g.to ? (
              <Link key={g.title} to={g.to} className={cls}>
                {inner}
              </Link>
            ) : (
              <article key={g.title} className={cls}>
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
