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
import { confetti, buzz } from '../lib/juice'

const LIVES = 3

type Card = { player: Player; year: number }

function startYear(era: string): number {
  const m = era.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}

function buildDeck(seed: number): Card[] {
  const cards = players.map((p) => ({ player: p, year: startYear(p.era) }))
  return seededShuffle(cards, seed)
}

// Faixa de slots válidos para inserir `year` na linha ordenada.
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

export default function LinhaDoTempo() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [deck, setDeck] = useState<Card[]>(() =>
    buildDeck((dayNumber() + 1) * 40503),
  )
  const [placed, setPlaced] = useState<Card[]>(() => [deck0((dayNumber() + 1) * 40503)])
  const [cursor, setCursor] = useState(1)
  const [lives, setLives] = useState(LIVES)
  const [score, setScore] = useState(dailySaved?.score ?? 0)
  const [status, setStatus] = useState<'playing' | 'over'>(
    dailySaved ? 'over' : 'playing',
  )
  const [flash, setFlash] = useState('')
  const [recorded, setRecorded] = useState(!!dailySaved)
  const [stats, setStats] = useState<TLStats>(() => loadTLStats())
  const [copied, setCopied] = useState(false)

  const current = cursor < deck.length ? deck[cursor] : null
  const over = status === 'over'

  function finish(finalScore: number) {
    setStatus('over')
    if (finalScore >= 5) confetti()
    if (mode === 'daily' && !recorded) {
      setStats(recordTL(finalScore))
      saveTLDaily({ day: dayNumber(), score: finalScore })
      setRecorded(true)
    }
  }

  function place(slot: number) {
    if (over || !current) return
    const ok = validSlot(placed, slot, current.year)
    const at = lowerBound(placed, current.year)
    const next = [...placed.slice(0, at), current, ...placed.slice(at)]
    setPlaced(next)

    let newScore = score
    let newLives = lives
    if (ok) {
      newScore = score + 1
      setScore(newScore)
      setFlash('Na mosca!')
      buzz(30)
    } else {
      newLives = lives - 1
      setLives(newLives)
      setFlash(`Fora de época — estreou em ${current.year}`)
      buzz([0, 50, 30, 50])
    }

    const nextCursor = cursor + 1
    setCursor(nextCursor)
    if (newLives <= 0 || nextCursor >= deck.length) finish(newScore)
  }

  function restart(m: 'daily' | 'practice', seed: number) {
    const d = buildDeck(seed)
    setMode(m)
    setDeck(d)
    setPlaced([d[0]])
    setCursor(1)
    setLives(LIVES)
    setScore(0)
    setStatus('playing')
    setFlash('')
  }

  function treinar() {
    restart('practice', Math.floor(Math.random() * 1e9) + 1)
  }

  function compartilhar() {
    const text = `Encyclobol · Linha do Tempo #${dayNumber()} — ${score} carta${
      score === 1 ? '' : 's'
    } em sequência\nencyclobol.com.br`
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
            {mode === 'daily' ? 'Edição diária' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Cronologia · jogo 04</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Linha do Tempo
        </h1>

        {/* Placar / vidas */}
        <div className="mt-4 flex items-center gap-5">
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
            Sequência: <span className="text-grass-600">{score}</span>
          </span>
          <span className="flex items-center gap-1">
            {Array.from({ length: LIVES }).map((_, i) => (
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
            <p className="mt-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-600">
              {current.player.nat} · {current.player.pos}
            </p>
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
            <p className="kicker">Fim de jogo</p>
            <p className="mt-1 font-display text-6xl text-ink-900">{score}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              cartas em sequência
            </p>

            {mode === 'daily' && (
              <>
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
                <button
                  onClick={compartilhar}
                  className="btn-stamp mt-5 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
                >
                  {copied ? 'Copiado!' : 'Compartilhar resultado'}
                </button>
              </>
            )}

            <button
              onClick={treinar}
              className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              Treinar de novo
            </button>
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

// Primeira carta (semente) da linha, derivada do mesmo embaralhamento.
function deck0(seed: number): Card {
  return buildDeck(seed)[0]
}
