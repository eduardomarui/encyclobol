import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { quiz } from '../data/quiz'
import { dailySequence, dayNumber, seededShuffle } from '../lib/daily'
import {
  loadQuizDaily,
  loadQuizStats,
  recordQuiz,
  saveQuizDaily,
  type QuizStats,
} from '../lib/quizStats'
import { BallMark } from '../components/landing/Icons'
import { confetti, buzz } from '../lib/juice'

const COUNT = 8
const SECONDS = 15

type Prepared = { q: string; cat: string; options: string[]; correct: number }

const saved = loadQuizDaily()

function makeRounds(picks: number[], seedBase: number): Prepared[] {
  return picks.map((bi, qi) => {
    const base = quiz[bi]
    const order = seededShuffle(
      base.options.map((_, i) => i),
      seedBase + qi * 7,
    )
    return {
      q: base.q,
      cat: base.cat,
      options: order.map((i) => base.options[i]),
      correct: order.indexOf(base.correct),
    }
  })
}

function dailyGame() {
  const picks = saved?.picks ?? dailySequence(quiz.length, COUNT)
  return { picks, questions: makeRounds(picks, dayNumber() * 101 + 1) }
}

function practiceGame() {
  const seed = Math.floor(Math.random() * 1e9) + 1
  const picks = seededShuffle(
    quiz.map((_, i) => i),
    seed,
  ).slice(0, COUNT)
  return { picks, questions: makeRounds(picks, seed) }
}

export default function QuizRelampago() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [game, setGame] = useState(dailyGame)
  const { picks, questions } = game
  const total = questions.length

  const [index, setIndex] = useState(saved ? total : 0)
  const [answers, setAnswers] = useState<number[]>(saved?.answers ?? [])
  const [selected, setSelected] = useState<number | null>(null)
  const [phase, setPhase] = useState<'answering' | 'revealed'>('answering')
  const [timeLeft, setTimeLeft] = useState(SECONDS)
  const [stats, setStats] = useState<QuizStats>(() => loadQuizStats())
  const [recorded, setRecorded] = useState(() => !!saved)
  const [copied, setCopied] = useState(false)
  const [celebrated, setCelebrated] = useState(() => !!saved)

  const finished = index >= total
  const score = answers.reduce(
    (acc, a, i) => acc + (a === questions[i]?.correct ? 1 : 0),
    0,
  )

  useEffect(() => {
    if (finished) return
    setSelected(null)
    setPhase('answering')
    setTimeLeft(SECONDS)
  }, [index, finished])

  useEffect(() => {
    if (finished || phase !== 'answering') return
    if (timeLeft <= 0) {
      setAnswers((a) => [...a, -1])
      setPhase('revealed')
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, phase, finished])

  useEffect(() => {
    if (phase !== 'revealed') return
    const t = setTimeout(() => setIndex((i) => i + 1), 1300)
    return () => clearTimeout(t)
  }, [phase, index])

  useEffect(() => {
    if (mode === 'daily' && finished && !recorded && answers.length === total) {
      setStats(recordQuiz(score, total))
      saveQuizDaily({ day: dayNumber(), picks, answers, score })
      setRecorded(true)
    }
  }, [mode, finished, recorded, answers, total, score, picks])

  useEffect(() => {
    if (finished && !celebrated) {
      if (score >= total / 2) confetti()
      buzz(score >= total / 2 ? [20, 40, 20] : 15)
      setCelebrated(true)
    }
  }, [finished, celebrated, score, total])

  function answer(i: number) {
    if (phase !== 'answering') return
    setSelected(i)
    setAnswers((a) => [...a, i])
    setPhase('revealed')
    buzz(i === current.correct ? 30 : [0, 40])
  }

  function treinar() {
    setMode('practice')
    setGame(practiceGame())
    setIndex(0)
    setAnswers([])
    setSelected(null)
    setPhase('answering')
    setTimeLeft(SECONDS)
    setCelebrated(false)
  }

  function compartilhar() {
    const head = `Encyclobol · Quiz Relâmpago #${dayNumber()} — ${score}/${total}`
    const dots = questions
      .map((qq, i) => (answers[i] === qq.correct ? '🟩' : '🟥'))
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

  const current = questions[index]
  const urgent = timeLeft <= 5
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
            {mode === 'daily' ? 'Edição diária' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Quiz · jogo 02</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Quiz Relâmpago
        </h1>

        {!finished && current && (
          <div className="mt-8 w-full max-w-xl">
            <div className="flex items-center justify-between font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
              <span>
                Pergunta {index + 1} de {total}
              </span>
              <span className={urgent ? 'text-ochre-600' : 'text-ink-700'}>
                {timeLeft}s
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full bg-paper-300">
              <div
                className={`h-2 transition-[width] duration-1000 ease-linear ${
                  urgent ? 'bg-ochre-500' : 'bg-grass-600'
                }`}
                style={{ width: `${(timeLeft / SECONDS) * 100}%` }}
              />
            </div>

            <p className="mt-6 kicker text-ink-500">{current.cat}</p>
            <h2 className="mt-1 font-serif text-2xl leading-snug text-ink-900 sm:text-3xl">
              {current.q}
            </h2>

            <div className="mt-6 grid gap-2.5">
              {current.options.map((opt, i) => {
                let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                if (phase === 'revealed') {
                  if (i === current.correct)
                    cls = 'animate-pop border-grass-700 bg-grass-600 text-paper'
                  else if (i === selected)
                    cls = 'border-ochre-600 bg-ochre-500 text-paper'
                  else cls = 'border-ink-900/15 bg-paper opacity-60'
                }
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={phase === 'revealed'}
                    className={`flex items-center gap-3 border-2 px-4 py-3 text-left font-serif text-lg transition-colors ${cls}`}
                  >
                    <span className="font-cond text-sm font-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {finished && (
          <div className="mt-8 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim de jogo{mode === 'practice' && ' · treino'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {score}
              <span className="text-3xl text-ink-500">/{total}</span>
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              {score === total
                ? 'Gabaritou! Almanaque ambulante.'
                : score >= total / 2
                  ? 'Mandou bem. Dá pra mais.'
                  : 'Bola pra frente — amanhã tem revanche.'}
            </p>

            {mode === 'daily' && (
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
            )}

            {/* Gabarito */}
            <div className="mt-4 space-y-1.5 text-left">
              {questions.map((qq, i) => {
                const ok = answers[i] === qq.correct
                return (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-0.5 h-3 w-3 flex-none ${ok ? 'bg-grass-600' : 'bg-ochre-500'}`}
                    />
                    <span className="font-serif text-ink-700">
                      {qq.q}{' '}
                      <span className="text-ink-900">— {qq.options[qq.correct]}</span>
                    </span>
                  </div>
                )
              })}
            </div>

            {mode === 'daily' && (
              <button
                onClick={compartilhar}
                className="btn-stamp mt-5 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600"
              >
                {copied ? 'Copiado!' : 'Compartilhar resultado'}
              </button>
            )}
            <button
              onClick={treinar}
              className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              Treinar com outras perguntas
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
