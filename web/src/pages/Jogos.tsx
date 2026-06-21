import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'
import {
  PlayerIcon,
  TimerIcon,
  GridIcon,
  TimelineIcon,
  IntruderIcon,
  MysteryIcon,
} from '../components/landing/Icons'
import { loadDailyState, loadStats } from '../lib/stats'
import { loadQuizDaily, loadQuizStats } from '../lib/quizStats'
import { loadConDaily, loadConStats } from '../lib/conexoesStats'
import { loadTLDaily, loadTLStats } from '../lib/timelineStats'
import { loadIntrusoDaily, loadIntrusoStats } from '../lib/intrusoStats'
import { loadMystDaily, loadMystStats } from '../lib/misteriosoStats'

type GameInfo = {
  n: string
  title: string
  category: string
  route: string
  Icon: ComponentType<{ className?: string }>
  status: () => { played: boolean; streak: number }
}

const games: GameInfo[] = [
  {
    n: '01',
    title: 'Tira-Teima',
    category: 'Adivinhação',
    route: '/jogos/quem-sou-ele',
    Icon: PlayerIcon,
    status: () => ({ played: !!loadDailyState(), streak: loadStats().currentStreak }),
  },
  {
    n: '02',
    title: 'Quiz Relâmpago',
    category: 'Quiz',
    route: '/jogos/quiz-relampago',
    Icon: TimerIcon,
    status: () => ({ played: !!loadQuizDaily(), streak: loadQuizStats().currentStreak }),
  },
  {
    n: '03',
    title: 'Conexões',
    category: 'Lógica',
    route: '/jogos/conexoes',
    Icon: GridIcon,
    status: () => ({ played: !!loadConDaily(), streak: loadConStats().currentStreak }),
  },
  {
    n: '04',
    title: 'Linha do Tempo',
    category: 'Cronologia',
    route: '/jogos/linha-do-tempo',
    Icon: TimelineIcon,
    status: () => ({ played: !!loadTLDaily(), streak: loadTLStats().currentStreak }),
  },
  {
    n: '05',
    title: 'O Intruso',
    category: 'Dedução',
    route: '/jogos/o-intruso',
    Icon: IntruderIcon,
    status: () => ({ played: !!loadIntrusoDaily(), streak: loadIntrusoStats().currentStreak }),
  },
  {
    n: '06',
    title: 'Craque Misterioso',
    category: 'Detetive',
    route: '/jogos/craque-misterioso',
    Icon: MysteryIcon,
    status: () => ({ played: !!loadMystDaily(), streak: loadMystStats().currentStreak }),
  },
]

export default function Jogos() {
  const total = games.length
  const jogadosHoje = games.filter((g) => g.status().played).length

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />
      <main className="container-page flex-1 py-12 sm:py-16">
        <header className="border-b-2 border-ink-900 pb-5">
          <p className="kicker">As edições de hoje</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
            O caderno de jogos
          </h1>
          <p className="mt-3 font-serif text-lg italic text-ink-600">
            {jogadosHoje === total
              ? 'Você fechou todas as edições de hoje. Volte amanhã para mais.'
              : `Você jogou ${jogadosHoje} de ${total} hoje. Bora completar o caderno?`}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => {
            const { played, streak } = g.status()
            return (
              <Link
                key={g.route}
                to={g.route}
                className="group relative flex flex-col border-t border-ink-900/15 p-6 transition-colors hover:bg-paper-100 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl text-ink-900/20">{g.n}</span>
                  <g.Icon className="h-9 w-9 text-grass-600" />
                </div>

                <p className="mt-5 kicker text-ink-500">{g.category}</p>
                <h2 className="mt-1.5 font-display text-2xl uppercase leading-[1.1] tracking-tight text-ink-900">
                  {g.title}
                </h2>

                <div className="mt-5 flex items-center justify-between border-t border-ink-900/10 pt-3">
                  <span
                    className={`font-cond text-[11px] font-600 uppercase tracking-[0.16em] ${
                      played ? 'text-grass-600' : 'text-ochre-600'
                    }`}
                  >
                    {played ? '✓ Jogado hoje' : '● Edição de hoje'}
                  </span>
                  {streak > 0 && (
                    <span className="font-cond text-[11px] font-500 uppercase tracking-wide text-ink-500">
                      Sequência: {streak}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
