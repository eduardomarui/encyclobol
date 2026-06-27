import { useState } from 'react'
import { Link } from 'react-router-dom'
import { players, type Player } from '../data/players'
import { dayNumber, seededShuffle } from '../lib/daily'
import {
  loadTLCareer,
  loadTLToday,
  recordTLCareer,
  type TLCareer,
} from '../lib/timelineStats'
import { confetti } from '../lib/juice'
import { shareScoreImage } from '../lib/shareCard'

const HELP_KEY = 'encyclobol:timeline:help'

type Card = { player: Player; year: number }

function startYear(era: string): number {
  const m = era.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}
const decadeOf = (y: number) => `${Math.floor(y / 10) * 10}s`

function buildDeck(seed: number): Card[] {
  const cards = players.map((p) => ({ player: p, year: startYear(p.era) }))
  return seededShuffle(cards, seed)
}

// Empate é justo: anos iguais aceitam encaixe de qualquer lado.
function validSlot(placed: Card[], slot: number, year: number): boolean {
  const okLeft = slot === 0 || placed[slot - 1].year <= year
  const okRight = slot === placed.length || year <= placed[slot].year
  return okLeft && okRight
}

function lowerBound(placed: Card[], year: number): number {
  let i = 0
  while (i < placed.length && placed[i].year < year) i++
  return i
}

const today = loadTLToday()
const DAILY_SEED = (dayNumber() + 1) * 40503

export default function LinhaDoTempo() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [hard, setHard] = useState(false)
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(DAILY_SEED))
  const [placed, setPlaced] = useState<Card[]>(() => [buildDeck(DAILY_SEED)[0]])
  const [cursor, setCursor] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(today?.score ?? 0)
  const [points, setPoints] = useState(today?.points ?? 0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [status, setStatus] = useState<'playing' | 'over'>(today ? 'over' : 'playing')
  const [flash, setFlash] = useState('')
  const [flashOk, setFlashOk] = useState(true)
  const [recorded, setRecorded] = useState(!!today)
  const [career, setCareer] = useState<TLCareer>(() => loadTLCareer())
  const [prevBest] = useState(() => loadTLCareer().best)
  const [copied, setCopied] = useState(false)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const current = cursor < deck.length ? deck[cursor] : null
  const over = status === 'over'
  const daily = mode === 'daily'
  const maxLives = hard ? 1 : 3
  const beating = daily && points > prevBest && points > 0
  const newRecord = over && daily && points > prevBest && points > 0

  function finish(finalScore: number, finalPoints: number) {
    setStatus('over')
    if (daily && finalPoints > prevBest && finalPoints > 0) confetti()
    else if (finalPoints >= 100) confetti()
    if (daily && !recorded) {
      setCareer(recordTLCareer(finalPoints, finalScore))
      setRecorded(true)
    }
  }

  function place(slot: number) {
    if (over || !current) return
    const ok = validSlot(placed, slot, current.year)
    const at = lowerBound(placed, current.year)
    setPlaced([...placed.slice(0, at), current, ...placed.slice(at)])

    let newScore = score
    let newPoints = points
    let newLives = lives
    if (ok) {
      const c = combo + 1
      const gain = c * 10
      newScore = score + 1
      newPoints = points + gain
      setScore(newScore)
      setPoints(newPoints)
      setCombo(c)
      setBestCombo((b) => Math.max(b, c))
      setFlashOk(true)
      setFlash(`Na mosca! +${gain}${c >= 2 ? ` (x${c})` : ''} · ${current.year}`)
    } else {
      newLives = lives - 1
      setLives(newLives)
      setCombo(0)
      setFlashOk(false)
      setFlash(`Fora de época — ${current.player.display} surgiu em ${current.year} (${decadeOf(current.year)})`)
    }

    const nextCursor = cursor + 1
    setCursor(nextCursor)
    if (newLives <= 0 || nextCursor >= deck.length) finish(newScore, newPoints)
  }

  function restart(isHard: boolean) {
    const seed = Math.floor(Math.random() * 1e9) + 1
    const d = buildDeck(seed)
    setMode('practice')
    setHard(isHard)
    setDeck(d)
    setPlaced([d[0]])
    setCursor(1)
    setLives(isHard ? 1 : 3)
    setScore(0)
    setPoints(0)
    setCombo(0)
    setBestCombo(0)
    setStatus('playing')
    setFlash('')
  }

  function closeHelp() {
    setShowHelp(false)
    try {
      localStorage.setItem(HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  async function compartilhar() {
    const r = await shareScoreImage({
      game: 'Linha do Tempo',
      headline: String(points),
      sub: newRecord ? 'novo recorde!' : 'pontos',
      lines: [`${score} cartas em sequência`, `Total ${career.total} pts`],
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · Linha do Tempo #${dayNumber()} — ${points} pts (${score} cartas) · encyclobol.com.br`,
    })
    if (r !== 'error') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-paper/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ink-900">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto" />
            <span className="font-cond text-sm font-600 uppercase tracking-wider">← Encyclobol</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
              {daily ? 'Linha do dia' : hard ? 'Treino · difícil' : 'Modo treino'}
            </span>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="Como jogar"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink-900 font-cond text-sm font-700 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Cronologia · jogo 04</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Linha do Tempo
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Empilhe os craques na ordem da história, pelo início de carreira. Acertos
          seguidos valem mais; errou a época, perde vida. Vá o mais longe que conseguir.
        </p>

        {/* Placar / combo / vidas */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="font-display text-2xl text-ink-900">
            {points}
            <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">pts</span>
          </span>
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
            Cartas: <span className="text-grass-600">{score}</span>
          </span>
          {combo >= 2 && (
            <span className="rounded-sm bg-ochre-500 px-2 py-0.5 font-cond text-xs font-700 uppercase tracking-wider text-ink-900">
              x{combo}
            </span>
          )}
          <span className="flex items-center gap-1">
            {Array.from({ length: maxLives }).map((_, i) => (
              <span key={i} className={`h-2.5 w-2.5 rotate-45 ${i < lives ? 'bg-ochre-500' : 'bg-ink-900/20'}`} />
            ))}
          </span>
        </div>

        {daily && (
          <div className="mt-2 flex items-center gap-2 font-cond text-xs font-600 uppercase tracking-wider">
            <span className="text-ink-500">
              Recorde: <span className="text-ink-800">{prevBest}</span> pts
            </span>
            {beating && (
              <span className="animate-pop rounded-sm bg-grass-600 px-2 py-0.5 text-ink-900">Novo recorde!</span>
            )}
          </div>
        )}

        {/* Carta atual */}
        {!over && current && (
          <div className="mt-6 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-5 text-center">
            <p className="kicker">Onde ele se encaixa?</p>
            <p className="mt-2 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              {current.player.display}
            </p>
            {!hard && (
              <p className="mt-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-600">
                {current.player.nat} · {current.player.pos}
              </p>
            )}
            {flash && (
              <p className={`mt-2 font-serif text-sm italic ${flashOk ? 'text-grass-700' : 'text-ochre-600'}`}>
                {flash}
              </p>
            )}
          </div>
        )}

        {/* Linha do tempo */}
        <div className="mt-6 w-full max-w-3xl overflow-x-auto pb-3">
          <div className="flex items-stretch justify-start gap-0">
            {Array.from({ length: placed.length + 1 }).map((_, slot) => (
              <div key={slot} className="flex items-stretch">
                {!over && current ? (
                  <button
                    onClick={() => place(slot)}
                    className="group mx-0.5 flex w-7 flex-none items-center justify-center self-stretch rounded-sm border-2 border-dashed border-grass-600/50 bg-grass-600/5 text-grass-600 transition-colors hover:border-grass-600 hover:bg-grass-600/15"
                    title="Encaixar aqui"
                  >
                    <span className="font-cond text-lg font-700">+</span>
                  </button>
                ) : (
                  <span className="w-1.5 flex-none" />
                )}
                {slot < placed.length && (
                  <div className="flex w-[84px] flex-none flex-col items-center justify-between border-2 border-ink-900 bg-paper p-2 text-center">
                    <span className="font-cond text-[11px] font-600 uppercase leading-tight text-ink-900">
                      {placed[slot].player.display}
                    </span>
                    <span className="mt-1 font-display text-lg text-grass-600">{placed[slot].year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fim de jogo */}
        {over && (
          <div className="mt-2 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim de jogo{mode === 'practice' && (hard ? ' · difícil' : ' · treino')}</p>
            {newRecord && (
              <p className="mt-2 animate-pop font-display text-2xl uppercase tracking-tight text-grass-600">
                Novo recorde!
              </p>
            )}
            <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              pontos · {score} cartas{bestCombo >= 3 ? ` · melhor combo x${bestCombo}` : ''}
            </p>

            {daily && (
              <>
                <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                  {[
                    ['Total', career.total],
                    ['Recorde', career.best],
                    ['Ofensiva', career.streak],
                    ['Dias', career.days],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-paper-100 px-1 py-2">
                      <div className="font-display text-2xl text-ink-900">{v}</div>
                      <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-serif text-sm italic text-ink-600">Volte amanhã pra somar mais ao total.</p>
                <button
                  onClick={compartilhar}
                  className="btn-stamp mt-4 w-full bg-grass-700 px-6 py-2.5 text-ink-900 hover:bg-grass-600"
                >
                  {copied ? 'Imagem pronta!' : 'Compartilhar imagem'}
                </button>
              </>
            )}

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => restart(false)}
                className="btn-stamp flex-1 bg-grass-600 px-4 py-2.5 text-ink-900 hover:bg-grass-700"
              >
                {daily ? 'Treinar' : 'De novo'}
              </button>
              <button
                onClick={() => restart(true)}
                className="btn-stamp flex-1 border-2 border-ink-900 px-4 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
              >
                Difícil
              </button>
            </div>
            <Link
              to="/"
              className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
            >
              Voltar pro almanaque
            </Link>
          </div>
        )}
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closeHelp}>
          <div className="w-full max-w-sm border-2 border-ink-900 bg-paper p-6" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Como jogar</p>
            <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              Linha do Tempo
            </h2>
            <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">
              <li>
                Cada craque tem um <strong>início de carreira</strong>. Encaixe a carta no lugar
                certo da linha, da mais antiga pra mais recente.
              </li>
              <li>
                Acertou, ganha pontos — e <strong>acertos seguidos viram combo</strong> (x2, x3...),
                valendo cada vez mais. Errou a época, <strong>perde uma vida</strong>.
              </li>
              <li>
                É <strong>infinito</strong>: empilhe o máximo que conseguir até acabarem as 3 vidas.
                O objetivo é <strong>bater seu recorde</strong>.
              </li>
              <li>
                Empate é justo: craques do <strong>mesmo ano</strong> encaixam de qualquer lado. Os
                pontos do dia somam num <strong>total</strong> que cresce a cada dia.
              </li>
            </ul>
            <button onClick={closeHelp} className="btn-stamp mt-6 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
              Entendi, bora
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
