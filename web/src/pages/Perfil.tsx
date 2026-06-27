import { Link } from 'react-router-dom'
import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'
import { gatherGames, gatherAchievements, grandTotal } from '../lib/profile'

function Medal({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <circle cx="12" cy="14" r="6.5" fill={on ? '#d8a51f' : 'none'} stroke={on ? '#a87f10' : 'rgba(22,19,13,0.3)'} strokeWidth="1.5" />
      <path d="M8 2.5l2 5M16 2.5l-2 5" stroke={on ? '#c1452a' : 'rgba(22,19,13,0.3)'} strokeWidth="1.6" strokeLinecap="round" />
      {on && <path d="M12 11l1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L9 13h2z" fill="#16130d" opacity="0.6" />}
    </svg>
  )
}

export default function Perfil() {
  const games = gatherGames()
  const total = grandTotal(games)
  const achievements = gatherAchievements(games)
  const unlocked = achievements.filter((a) => a.unlocked).length
  const playedToday = games.filter((g) => g.playedToday).length

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />
      <main className="container-page flex-1 py-12 sm:py-16">
        <header className="border-b-2 border-ink-900 pb-5">
          <p className="kicker">A ficha do craque</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
            Meu perfil
          </h1>
          <p className="mt-3 font-serif text-lg italic text-ink-600">
            Tudo o que você acumulou no almanaque, somado.
          </p>
        </header>

        {/* Resumão */}
        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
          {[
            ['Pontos no total', total.toLocaleString('pt-BR')],
            ['Conquistas', `${unlocked}/${achievements.length}`],
            ['Jogos hoje', `${playedToday}/6`],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper-100 px-2 py-4 text-center">
              <div className="font-display text-3xl text-ink-900 sm:text-4xl">{v}</div>
              <div className="mt-1 font-cond text-[10px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
            </div>
          ))}
        </div>

        {/* Ranking CTA */}
        <Link
          to="/ranking"
          className="btn-stamp mt-4 inline-block bg-grass-600 px-5 py-2.5 text-paper hover:bg-grass-700"
        >
          Ver o ranking →
        </Link>

        {/* Conquistas */}
        <h2 className="mt-10 font-display text-2xl uppercase tracking-tight text-ink-900">Conquistas</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`flex items-center gap-3 border-2 p-3 ${
                a.unlocked ? 'border-ink-900 bg-paper-100' : 'border-ink-900/15 bg-paper opacity-60'
              }`}
            >
              <Medal on={a.unlocked} />
              <div>
                <div className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">{a.title}</div>
                <div className="font-serif text-[13px] italic text-ink-600">{a.desc}</div>
              </div>
              {a.unlocked && <span className="ml-auto font-cond text-[10px] font-700 uppercase tracking-wide text-grass-600">✓</span>}
            </div>
          ))}
        </div>

        {/* Por jogo */}
        <h2 className="mt-10 font-display text-2xl uppercase tracking-tight text-ink-900">Por jogo</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.key}
              to={g.route}
              className="group flex flex-col border-2 border-ink-900 bg-paper-100 p-4 transition-colors hover:bg-paper"
            >
              <div className="flex items-center justify-between">
                <span className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">{g.name}</span>
                {g.playedToday && <span className="font-cond text-[10px] font-700 uppercase tracking-wide text-grass-600">hoje ✓</span>}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Total', g.total.toLocaleString('pt-BR')],
                  ['Recorde', g.best],
                  [g.streak > 0 ? 'Ofensiva' : 'Dias', g.streak > 0 ? g.streak : g.days],
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <div className="font-display text-2xl text-ink-900">{v}</div>
                    <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                  </div>
                ))}
              </div>
              <span className="mt-3 font-cond text-xs font-600 uppercase tracking-wider text-ink-900 transition-transform group-hover:translate-x-1">
                Jogar →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 font-serif text-sm italic text-ink-500">
          Seus números ficam guardados neste aparelho. Entre no ranking pra disputar com os amigos.
        </p>
      </main>
      <Footer />
    </div>
  )
}
