import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { intruso, type IntrusoCat } from '../data/intruso'
import { dayNumber, seededShuffle } from '../lib/daily'
import {
  loadIntrusoCareer,
  loadIntrusoToday,
  recordIntrusoCareer,
  type IntrusoCareer,
} from '../lib/intrusoStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const LIVES = 3
const REASON_BONUS = 50
const CATS: IntrusoCat[] = ['Posição', 'Nacionalidade', 'Clube', 'Era']
const HELP_KEY = 'encyclobol:intruso:help'

type Round = { players: string[]; intruderIdx: number; rule: string; cat: IntrusoCat }

function makeRounds(picks: number[], seedBase: number): Round[] {
  return picks.map((bi, qi) => {
    const base = intruso[bi]
    const players = seededShuffle(base.players, seedBase + qi * 17)
    return {
      players,
      intruderIdx: players.indexOf(base.intruder),
      rule: base.rule,
      cat: base.cat,
    }
  })
}
function dailyDeck(): Round[] {
  const all = intruso.map((_, i) => i)
  const s = dayNumber() * 131 + 1
  const order = [
    ...seededShuffle(all, s),
    ...seededShuffle(all, s + 7),
    ...seededShuffle(all, s + 13),
  ]
  return makeRounds(order, s)
}
function practiceDeck(): Round[] {
  const all = intruso.map((_, i) => i)
  const s = Math.floor(Math.random() * 1e9) + 1
  const order = [...seededShuffle(all, s), ...seededShuffle(all, s + 7), ...seededShuffle(all, s + 13)]
  return makeRounds(order, s)
}

const today = loadIntrusoToday()

export default function Intruso() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [rounds, setRounds] = useState<Round[]>(dailyDeck)
  const [index, setIndex] = useState(0)
  const [lives, setLives] = useState(LIVES)
  const [points, setPoints] = useState(today?.points ?? 0)
  const [caught, setCaught] = useState(today?.run ?? 0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [step, setStep] = useState<'intruder' | 'reason' | 'revealed'>('intruder')
  const [selIntruder, setSelIntruder] = useState<number | null>(null)
  const [selReason, setSelReason] = useState<IntrusoCat | null>(null)
  const [reasonGot, setReasonGot] = useState(false)
  const [lastGain, setLastGain] = useState(0)
  const [status, setStatus] = useState<'playing' | 'over'>(today ? 'over' : 'playing')
  const [career, setCareer] = useState<IntrusoCareer>(() => loadIntrusoCareer())
  const [prevBest] = useState(() => loadIntrusoCareer().best)
  const [recorded, setRecorded] = useState(!!today)
  const [copied, setCopied] = useState(false)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const daily = mode === 'daily'
  const over = status === 'over'
  const current = rounds[index]
  const beating = daily && points > prevBest && points > 0
  const newRecord = over && daily && points > prevBest && points > 0

  function finish() {
    setStatus('over')
    if ((daily && points > prevBest && points > 0) || points >= 300) confetti()
    if (daily && !recorded) {
      setCareer(recordIntrusoCareer(points, caught))
      setRecorded(true)
    }
  }

  // Após revelar, avança a rodada (ou encerra se acabaram as vidas).
  useEffect(() => {
    if (step !== 'revealed') return
    const t = setTimeout(() => {
      if (lives <= 0) finish()
      else {
        setIndex((i) => i + 1)
        setStep('intruder')
        setSelIntruder(null)
        setSelReason(null)
      }
    }, 1700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  function pickIntruder(i: number) {
    if (step !== 'intruder' || !current) return
    setSelIntruder(i)
    if (i === current.intruderIdx) {
      const nc = combo + 1
      const gain = 80 + nc * 20
      setCombo(nc)
      setBestCombo((b) => Math.max(b, nc))
      setCaught((c) => c + 1)
      setPoints((p) => p + gain)
      setLastGain(gain)
      setStep('reason')
    } else {
      setCombo(0)
      setLives((l) => l - 1)
      setStep('revealed')
    }
  }

  function pickReason(c: IntrusoCat) {
    if (step !== 'reason' || !current) return
    setSelReason(c)
    const ok = c === current.cat
    setReasonGot(ok)
    if (ok) setPoints((p) => p + REASON_BONUS)
    setStep('revealed')
  }

  function jogarTreino() {
    setMode('practice')
    setRounds(practiceDeck())
    setIndex(0)
    setLives(LIVES)
    setPoints(0)
    setCaught(0)
    setCombo(0)
    setBestCombo(0)
    setStep('intruder')
    setSelIntruder(null)
    setSelReason(null)
    setStatus('playing')
  }

  function closeHelp() {
    setShowHelp(false)
    try {
      localStorage.setItem(HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  function compartilhar() {
    const text =
      `Encyclobol · O Intruso #${dayNumber()} — ${points} pts · ${caught} caçados` +
      `${newRecord ? ' · novo recorde!' : ''}\n` +
      `Total: ${career.total} pts\nencyclobol.com.br`
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
            <span className="font-cond text-sm font-600 uppercase tracking-wider">← Encyclobol</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
              {daily ? 'Caçada do dia' : 'Modo treino'}
            </span>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="Como jogar"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink-900 font-cond text-sm font-700 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Dedução · jogo 05</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          O Intruso
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Três craques têm algo em comum, um não. Ache o infiltrado — e depois crave o
          porquê. Erre o intruso e perde vida; vá o mais longe que conseguir.
        </p>

        {/* HUD */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="font-display text-2xl text-ink-900">
            {points}
            <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">pts</span>
          </span>
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
            Caçados: <span className="text-grass-600">{caught}</span>
          </span>
          {combo >= 2 && (
            <span className="rounded-sm bg-ochre-500 px-2 py-0.5 font-cond text-xs font-700 uppercase tracking-wider text-paper">
              x{combo}
            </span>
          )}
          <span className="flex items-center gap-1">
            {Array.from({ length: LIVES }).map((_, i) => (
              <span key={i} className={`h-2.5 w-2.5 rotate-45 ${i < lives ? 'bg-ochre-500' : 'bg-ink-900/20'}`} />
            ))}
          </span>
        </div>

        {daily && !over && (
          <div className="mt-2 flex items-center gap-2 font-cond text-xs font-600 uppercase tracking-wider">
            <span className="text-ink-500">
              Recorde: <span className="text-ink-800">{prevBest}</span> pts
            </span>
            {beating && (
              <span className="animate-pop rounded-sm bg-grass-600 px-2 py-0.5 text-paper">Novo recorde!</span>
            )}
          </div>
        )}

        {/* Rodada */}
        {!over && current && (
          <div className="mt-7 w-full max-w-xl">
            <p className="text-center font-serif text-lg italic text-ink-700">Quem não pertence ao grupo?</p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {current.players.map((name, i) => {
                let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                if (step !== 'intruder') {
                  if (i === current.intruderIdx) cls = 'animate-pop border-grass-700 bg-grass-600 text-paper'
                  else if (i === selIntruder) cls = 'border-ochre-600 bg-ochre-500 text-paper'
                  else cls = 'border-ink-900/15 bg-paper opacity-60'
                }
                return (
                  <button
                    key={name}
                    onClick={() => pickIntruder(i)}
                    disabled={step !== 'intruder'}
                    className={`min-h-[64px] border-2 px-3 py-3 text-center font-cond text-sm font-600 uppercase leading-tight transition-colors ${cls}`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>

            {/* 2ª etapa: o porquê */}
            {(step === 'reason' || step === 'revealed') && (
              <div className="mt-5">
                <p className="text-center font-serif text-base italic text-ink-700">
                  {step === 'reason' ? 'O que liga os outros três? (+50)' : 'O elo era:'}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CATS.map((c) => {
                    let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                    if (step === 'revealed') {
                      if (c === current.cat) cls = 'border-grass-700 bg-grass-600 text-paper'
                      else if (c === selReason) cls = 'border-ochre-600 bg-ochre-500 text-paper'
                      else cls = 'border-ink-900/15 bg-paper opacity-60'
                    }
                    return (
                      <button
                        key={c}
                        onClick={() => pickReason(c)}
                        disabled={step !== 'reason'}
                        className={`border-2 px-2 py-2.5 text-center font-cond text-xs font-700 uppercase tracking-wide transition-colors ${cls}`}
                      >
                        {c}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 'revealed' && (
              <p className="mt-4 text-center font-serif text-base italic text-ink-700">
                {selIntruder === current.intruderIdx ? (
                  <span className="text-grass-700">
                    +{lastGain}
                    {reasonGot ? ' +50' : ''} ·{' '}
                  </span>
                ) : (
                  <span className="text-ochre-600">Perdeu uma vida · </span>
                )}
                {current.rule}
              </p>
            )}
          </div>
        )}

        {/* Fim de jogo */}
        {over && (
          <div className="mt-8 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim da caçada{mode === 'practice' && ' · treino'}</p>
            {newRecord && (
              <p className="mt-2 animate-pop font-display text-2xl uppercase tracking-tight text-grass-600">
                Novo recorde!
              </p>
            )}
            <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              pontos · {caught} caçados{bestCombo >= 3 ? ` · melhor combo x${bestCombo}` : ''}
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
                  className="btn-stamp mt-4 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
                >
                  {copied ? 'Copiado!' : 'Compartilhar resultado'}
                </button>
              </>
            )}

            <button
              onClick={jogarTreino}
              className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              {daily ? 'Treinar (sem pontos)' : 'Outra caçada'}
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

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4" onClick={closeHelp}>
          <div className="w-full max-w-sm border-2 border-ink-900 bg-paper p-6" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Como jogar</p>
            <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              O Intruso
            </h2>
            <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">
              <li>
                São 4 craques: <strong>3 compartilham um traço</strong> (posição, nacionalidade,
                clube ou era) e <strong>1 é o infiltrado</strong>. Ache o intruso.
              </li>
              <li>
                Acertou? Vem a 2ª etapa: <strong>diga qual era o elo</strong> dos outros três — acertar
                vale <strong>+{REASON_BONUS}</strong>. Isso é dedução, não chute.
              </li>
              <li>
                <strong>Acertos seguidos viram combo</strong> e valem cada vez mais. Errar o intruso
                <strong> custa uma vida</strong> — são {LIVES}.
              </li>
              <li>
                É <strong>sobrevivência</strong>: cace o máximo de intrusos até acabarem as vidas. Os
                pontos do dia somam num <strong>total</strong> que cresce sempre.
              </li>
            </ul>
            <button onClick={closeHelp} className="btn-stamp mt-6 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Entendi, bora caçar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
