import { useState } from 'react'
import { Link } from 'react-router-dom'
import { players, type Player } from '../data/players'
import { dayNumber, seededShuffle } from '../lib/daily'
import {
  loadTLDaily,
  loadTLStats,
  recordTL,
  saveTLDaily,
  type TLStats,
} from '../lib/timelineStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

type Card = { player: Player; year: number }

function startYear(era: string): number {
  const m = era.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}

function buildDeck(seed: number): Card[] {
  const cards = players.map((p) => ({ player: p, year: startYear(p.era) }))
  return seededShuffle(cards, seed)
}

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

const dailySaved = loadTLDaily()
const DAILY_SEED = (dayNumber() + 1) * 40503

export default function LinhaDoTempo() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [hard, setHard] = useState(false)
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(DAILY_SEED))
  const [placed, setPlaced] = useState<Card[]>(() => [buildDeck(DAILY_SEED)[0]])
  const [cursor, setCursor] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(dailySaved?.score ?? 0)
  const [points, setPoints] = useState(dailySaved?.points ?? 0)
  const [combo, setCombo] = useState(0)
  const [status, setStatus] = useState<'playing' | 'over'>(
    dailySaved ? 'over' : 'playing',
  )
  const [flash, setFlash] = useState('')
  const [recorded, setRecorded] = useState(!!dailySaved)
  const [stats, setStats] = useState<TLStats>(() => loadTLStats())
  const [copied, setCopied] = useState(false)

  const current = cursor < deck.length ? deck[cursor] : null
  const over = status === 'over'
  const maxLives = hard ? 1 : 3

  function finish(finalScore: number, finalPoints: number) {
    setStatus('over')
    if (finalPoints >= 80) confetti()
    if (mode === 'daily' && !recorded) {
      setStats(recordTL(finalPoints))
      saveTLDaily({ day: dayNumber(), score: finalScore, points: finalPoints })
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
      setFlash(`Na mosca! +${gain}${c >= 2 ? ` (x${c})` : ''}`)
    } else {
      newLives = lives - 1
      setLives(newLives)
      setCombo(0)
      setFlash(`Fora de época — estreou em ${current.year}`)
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
    setStatus('playing')
    setFlash('')
  }

  function compartilhar() {
    const text = `Encyclobol · Linha do Tempo #${dayNumber()} — ${points} pts (${score} cartas)\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ink-900">
            <BallMark className="h-6 w-6 text-grass-600" />
            <span className="font-cond text-sm font-600 uppercase tracking-wider">
              ← Encyclobol
            </span>
          </Link>
          <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
            {mode === 'daily' ? 'Edição diária' : hard ? 'Treino · difícil' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Cronologia · jogo 04</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Linha do Tempo
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Encaixe cada craque na ordem certa da história, pelo ano de estreia.
          Acertos seguidos valem mais; errou a época, perde uma vida.
        </p>

        {/* Placar / combo / vidas */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="font-display text-2xl text-ink-900">
            {points}
            <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">
              pts
            </span>
          </span>
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
            Cartas: <span className="text-grass-600">{score}</span>
          </span>
          {combo >= 2 && (
            <span className="rounded-sm bg-ochre-500 px-2 py-0.5 font-cond text-xs font-700 uppercase tracking-wider text-paper">
              x{combo}
            </span>
          )}
          <span className="flex items-center gap-1">
            {Array.from({ length: maxLives }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rotate-45 ${i < lives ? 'bg-ochre-500' : 'bg-ink-900/20'}`}
              />
            ))}
          </span>
        </div>

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
              <p className="mt-2 font-serif text-sm italic text-ochre-600">{flash}</p>
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
                    <span className="mt-1 font-display text-lg text-grass-600">
                      {placed[slot].year}
                    </span>
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
            <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              pontos · {score} cartas em sequência
            </p>

            {mode === 'daily' && (
              <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                {[
                  ['Jogos', stats.played],
                  ['Recorde', stats.best],
                  ['Sequência', stats.currentStreak],
                  ['Melhor', stats.maxStreak],
                ].map(([k, v]) => (
                  <div key={k} className="bg-paper-100 px-1 py-2">
                    <div className="font-display text-2xl text-ink-900">{v}</div>
                    <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mode === 'daily' && (
              <button
                onClick={compartilhar}
                className="btn-stamp mt-5 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
              >
                {copied ? 'Copiado!' : 'Compartilhar resultado'}
              </button>
            )}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => restart(false)}
                className="btn-stamp flex-1 bg-grass-600 px-4 py-2.5 text-paper hover:bg-grass-700"
              >
                Treinar
              </button>
              <button
                onClick={() => restart(true)}
                className="btn-stamp flex-1 border-2 border-ink-900 px-4 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
              >
                Difícil
              </button>
            </div>
            <Link
              to="/"
              className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              Voltar pro almanaque
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
