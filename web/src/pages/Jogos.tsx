import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'
import {
  PlayerIcon,
  GoalIcon,
  GridIcon,
  TimelineIcon,
  IntruderIcon,
  MysteryIcon,
} from '../components/landing/Icons'
import { dayNumber } from '../lib/daily'
import { shareScoreImage, type Sq } from '../lib/shareCard'
import { loadCareer, loadCareerToday } from '../lib/stats'
import { loadCopaStats, loadCopaToday } from '../lib/penaltisStats'
import { loadConCareer, loadConToday } from '../lib/conexoesStats'
import { loadTLCareer, loadTLToday } from '../lib/timelineStats'
import { loadIntrusoCareer, loadIntrusoToday } from '../lib/intrusoStats'
import { loadMystCareer, loadMystToday } from '../lib/misteriosoStats'

type Result = { played: boolean; streak: number; detail: string; good: boolean }

type GameInfo = {
  n: string
  title: string
  category: string
  route: string
  Icon: ComponentType<{ className?: string }>
  result: () => Result
}

const games: GameInfo[] = [
  {
    n: '01',
    title: 'Tira-Teima',
    category: 'Carreira',
    route: '/jogos/quem-sou-ele',
    Icon: PlayerIcon,
    result: () => {
      const t = loadCareerToday()
      const c = loadCareer()
      return {
        played: !!t,
        streak: c.days,
        detail: t ? `${t.score} pts` : '—',
        good: !!t,
      }
    },
  },
  {
    n: '02',
    title: 'Copa de Pênaltis',
    category: 'Pênaltis',
    route: '/jogos/penaltis',
    Icon: GoalIcon,
    result: () => {
      const t = loadCopaToday()
      const c = loadCopaStats()
      return {
        played: !!t,
        streak: c.days,
        detail: t ? `${t.points} pts` : '—',
        good: !!t && t.champion,
      }
    },
  },
  {
    n: '03',
    title: 'Quarteto',
    category: 'Lógica',
    route: '/jogos/conexoes',
    Icon: GridIcon,
    result: () => {
      const t = loadConToday()
      const c = loadConCareer()
      return {
        played: !!t,
        streak: c.streak,
        detail: t ? `${t.points} pts` : '—',
        good: !!t && t.won,
      }
    },
  },
  {
    n: '04',
    title: 'Linha do Tempo',
    category: 'Cronologia',
    route: '/jogos/linha-do-tempo',
    Icon: TimelineIcon,
    result: () => {
      const t = loadTLToday()
      const c = loadTLCareer()
      return {
        played: !!t,
        streak: c.streak,
        detail: t ? `${t.points} pts` : '—',
        good: !!t && t.points >= 100,
      }
    },
  },
  {
    n: '05',
    title: 'O Intruso',
    category: 'Dedução',
    route: '/jogos/o-intruso',
    Icon: IntruderIcon,
    result: () => {
      const t = loadIntrusoToday()
      const c = loadIntrusoCareer()
      return {
        played: !!t,
        streak: c.streak,
        detail: t ? `${t.points} pts` : '—',
        good: !!t && t.points >= 300,
      }
    },
  },
  {
    n: '06',
    title: 'Craque Misterioso',
    category: 'Detetive',
    route: '/jogos/craque-misterioso',
    Icon: MysteryIcon,
    result: () => {
      const t = loadMystToday()
      const c = loadMystCareer()
      return {
        played: !!t,
        streak: c.streak,
        detail: t ? `${t.points} pts` : '—',
        good: !!t && t.won,
      }
    },
  },
]

export default function Jogos() {
  const [copied, setCopied] = useState(false)
  const entries = games.map((g) => ({ ...g, ...g.result() }))
  const total = entries.length
  const jogadosHoje = entries.filter((g) => g.played).length
  const fechou = jogadosHoje === total

  async function compartilharDia() {
    const squares: Sq[][] = [entries.map((g) => (!g.played ? 'k' : g.good ? 'g' : 'o'))]
    const r = await shareScoreImage({
      game: 'Caderno de Jogos',
      headline: `${jogadosHoje}/${total}`,
      sub: fechou ? 'fechei o dia!' : 'jogos de hoje',
      squares,
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · ${fechou ? 'Fechei o dia!' : `${jogadosHoje}/${total} jogos`} #${dayNumber()} · encyclobol.com.br`,
    })
    if (r !== 'error') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

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
            {fechou
              ? 'Você fechou todas as edições de hoje. Volte amanhã para mais.'
              : `Você jogou ${jogadosHoje} de ${total} hoje. Bora completar o caderno?`}
          </p>
          <Link
            to="/ranking"
            className="btn-stamp mt-4 inline-block bg-grass-600 px-5 py-2.5 text-ink-900 hover:bg-grass-700"
          >
            Ver o ranking →
          </Link>
        </header>

        {/* Resumo do dia */}
        <section className="mt-6 border-2 border-ink-900 bg-paper-100 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="kicker">{fechou ? 'Fechei o dia' : 'Meu dia'}</p>
            <span className="font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
              {jogadosHoje}/{total}
            </span>
          </div>

          <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {entries.map((g) => (
              <div key={g.route} className="flex items-center gap-2.5">
                <span
                  className={`h-3 w-3 flex-none ${
                    !g.played ? 'bg-ink-900/15' : g.good ? 'bg-grass-600' : 'bg-ochre-500'
                  }`}
                />
                <span className="font-cond text-sm font-600 uppercase tracking-wide text-ink-800">
                  {g.title}
                </span>
                <span className="ml-auto font-serif text-sm text-ink-600">{g.detail}</span>
              </div>
            ))}
          </div>

          <button
            onClick={compartilharDia}
            disabled={jogadosHoje === 0}
            className="btn-stamp mt-5 w-full bg-grass-700 px-6 py-3 text-ink-900 hover:bg-grass-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? 'Imagem pronta!' : fechou ? 'Compartilhar o dia' : 'Compartilhar meu progresso'}
          </button>
        </section>

        <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((g) => (
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
                    g.played ? 'text-grass-600' : 'text-ochre-600'
                  }`}
                >
                  {g.played ? '✓ Jogado hoje' : '● Edição de hoje'}
                </span>
                {g.streak > 0 && (
                  <span className="font-cond text-[11px] font-500 uppercase tracking-wide text-ink-500">
                    Sequência: {g.streak}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
