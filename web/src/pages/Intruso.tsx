import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { intruso } from '../data/intruso'
import { dailySequence, dayNumber, seededShuffle } from '../lib/daily'
import {
  loadIntrusoDaily,
  loadIntrusoStats,
  recordIntruso,
  saveIntrusoDaily,
  type IntrusoStats,
} from '../lib/intrusoStats'
import { BallMark } from '../components/landing/Icons'

const COUNT = 5

type Round = { players: string[]; intruderIdx: number; rule: string }

const saved = loadIntrusoDaily()

function buildDaily(): { picks: number[]; rounds: Round[] } {
  const picks = saved?.picks ?? dailySequence(intruso.length, COUNT)
  const day = dayNumber()
  const rounds = picks.map((bi, qi) => {
    const base = intruso[bi]
    const players = seededShuffle(base.players, day * 131 + qi * 17 + 1)
    return {
      players,
      intruderIdx: players.indexOf(base.intruder),
      rule: base.rule,
    }
  })
  return { picks, rounds }
}

export default function Intruso() {
  const { picks, rounds } = useMemo(buildDaily, [])
  const total = rounds.length

  const [index, setIndex] = useState(saved ? total : 0)
  const [answers, setAnswers] = useState<number[]>(saved?.answers ?? [])
  const [selected, setSelected] = useState<number | null>(null)
  const [phase, setPhase] = useState<'answering' | 'revealed'>('answering')
  const [stats, setStats] = useState<IntrusoStats>(() => loadIntrusoStats())
  const [recorded, setRecorded] = useState(() => !!saved)
  const [copied, setCopied] = useState(false)

  const finished = index >= total
  const score = answers.reduce(
    (acc, a, i) => acc + (a === rounds[i]?.intruderIdx ? 1 : 0),
    0,
  )

  useEffect(() => {
    if (finished) return
    setSelected(null)
    setPhase('answering')
  }, [index, finished])

  useEffect(() => {
    if (phase !== 'revealed') return
    const t = setTimeout(() => setIndex((i) => i + 1), 1700)
    return () => clearTimeout(t)
  }, [phase, index])

  useEffect(() => {
    if (finished && !recorded && answers.length === total) {
      setStats(recordIntruso(score, total))
      saveIntrusoDaily({ day: dayNumber(), picks, answers, score })
      setRecorded(true)
    }
  }, [finished, recorded, answers, total, score, picks])

  function answer(i: number) {
    if (phase !== 'answering') return
    setSelected(i)
    setAnswers((a) => [...a, i])
    setPhase('revealed')
  }

  function compartilhar() {
    const head = `Encyclobol · O Intruso #${dayNumber()} — ${score}/${total}`
    const dots = rounds
      .map((r, i) => (answers[i] === r.intruderIdx ? '🟩' : '🟥'))
      .join('')
    const text = `${head}\n${dots}\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const current = rounds[index]
  const avg = stats.played ? (stats.totalScore / stats.played).toFixed(1) : '0'

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
            Edição diária
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Dedução · jogo 05</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          O Intruso
        </h1>

        {!finished && current && (
          <div className="mt-7 w-full max-w-xl">
            <div className="flex items-center justify-between font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
              <span>
                Rodada {index + 1} de {total}
              </span>
              <span>Acertos: {score}</span>
            </div>

            <p className="mt-5 text-center font-serif text-lg italic text-ink-700">
              Quem não pertence ao grupo?
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {current.players.map((name, i) => {
                let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                if (phase === 'revealed') {
                  if (i === current.intruderIdx)
                    cls = 'border-grass-700 bg-grass-600 text-paper'
                  else if (i === selected)
                    cls = 'border-ochre-600 bg-ochre-500 text-paper'
                  else cls = 'border-ink-900/15 bg-paper opacity-60'
                }
                return (
                  <button
                    key={name}
                    onClick={() => answer(i)}
                    disabled={phase === 'revealed'}
                    className={`min-h-[64px] border-2 px-3 py-3 text-center font-cond text-sm font-600 uppercase leading-tight transition-colors ${cls}`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>

            {phase === 'revealed' && (
              <p className="mt-4 text-center font-serif text-base italic text-ink-700">
                {current.rule}
              </p>
            )}
          </div>
        )}

        {finished && (
          <div className="mt-8 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim de jogo</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {score}
              <span className="text-3xl text-ink-500">/{total}</span>
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              {score === total
                ? 'Olho clínico! Não passou nada.'
                : score >= total / 2
                  ? 'Boa leitura. Dá pra afiar mais.'
                  : 'As pistas falsas te pegaram. Amanhã tem mais.'}
            </p>

            <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
              {[
                ['Jogos', stats.played],
                ['Recorde', stats.best],
                ['Média', avg],
                ['Sequência', stats.currentStreak],
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
