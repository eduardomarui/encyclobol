import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { players } from '../data/players'
import { dailyIndex } from '../lib/daily'
import { BallMark } from '../components/landing/Icons'

const MAX_ATTEMPTS = 6
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

type Cell = 'correct' | 'present' | 'absent'

// Avalia um palpite contra a resposta, tratando letras repetidas.
function evaluate(guess: string, answer: string): Cell[] {
  const result: Cell[] = new Array(answer.length).fill('absent')
  const counts: Record<string, number> = {}
  for (const ch of answer) counts[ch] = (counts[ch] ?? 0) + 1

  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct'
      counts[guess[i]]--
    }
  }
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === 'correct') continue
    const ch = guess[i]
    if (ch && counts[ch] > 0) {
      result[i] = 'present'
      counts[ch]--
    }
  }
  return result
}

const cellClass: Record<Cell, string> = {
  correct: 'bg-grass-600 text-paper border-grass-700',
  present: 'bg-corn-500 text-paper border-corn-600',
  absent: 'bg-ink-700 text-paper border-ink-800',
}

const keyClass: Record<Cell | 'idle', string> = {
  correct: 'bg-grass-600 text-paper',
  present: 'bg-corn-500 text-paper',
  absent: 'bg-ink-700 text-paper/60',
  idle: 'bg-paper-200 text-ink-900 hover:bg-paper-300',
}

export default function QuemSouEle() {
  const [pick, setPick] = useState(() => dailyIndex(players.length))
  const player = players[pick]
  const answer = player.answer

  const [guesses, setGuesses] = useState<string[]>([])
  const [current, setCurrent] = useState('')

  const won = guesses.includes(answer)
  const lost = !won && guesses.length >= MAX_ATTEMPTS
  const over = won || lost

  // Estado de cada tecla, considerando todos os palpites já feitos.
  const keyStates = useMemo(() => {
    const map: Record<string, Cell> = {}
    const rank: Record<Cell, number> = { absent: 0, present: 1, correct: 2 }
    for (const g of guesses) {
      const ev = evaluate(g, answer)
      for (let i = 0; i < g.length; i++) {
        const prev = map[g[i]]
        if (!prev || rank[ev[i]] > rank[prev]) map[g[i]] = ev[i]
      }
    }
    return map
  }, [guesses, answer])

  const submit = useCallback(() => {
    if (current.length !== answer.length) return
    setGuesses((g) => [...g, current])
    setCurrent('')
  }, [current, answer.length])

  const onKey = useCallback(
    (k: string) => {
      if (over) return
      if (k === 'ENTER') submit()
      else if (k === 'BACK') setCurrent((c) => c.slice(0, -1))
      else if (/^[A-Z]$/.test(k) && current.length < answer.length)
        setCurrent((c) => c + k)
    },
    [over, submit, current.length, answer.length],
  )

  // Teclado físico
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onKey('ENTER')
      else if (e.key === 'Backspace') onKey('BACK')
      else {
        const up = e.key.toUpperCase()
        if (/^[A-Z]$/.test(up)) onKey(up)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onKey])

  function novoJogador() {
    let next = pick
    while (next === pick && players.length > 1)
      next = Math.floor(Math.random() * players.length)
    setPick(next)
    setGuesses([])
    setCurrent('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Cabeçalho do jogo */}
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
        <p className="kicker">Adivinhação · jogo 01</p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-tight text-ink-900 sm:text-5xl">
          Quem sou ele?
        </h1>

        {/* Dicas */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[
            ['Seleção', player.nat],
            ['Posição', player.pos],
            ['Período', player.era],
          ].map(([k, v]) => (
            <span
              key={k}
              className="border border-ink-900/20 bg-paper-100 px-3 py-1 font-cond text-[11px] font-500 uppercase tracking-wider text-ink-700"
            >
              <span className="text-ink-500">{k}:</span> {v}
            </span>
          ))}
        </div>
        <p className="mt-3 font-serif text-sm italic text-ink-500">
          {answer.length} letras · {MAX_ATTEMPTS} tentativas
        </p>

        {/* Tabuleiro */}
        <div className="mt-6 flex flex-col gap-1.5">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, r) => {
            const guessed = guesses[r]
            const isCurrent = r === guesses.length && !over
            const text = guessed ?? (isCurrent ? current : '')
            const ev = guessed ? evaluate(guessed, answer) : null
            return (
              <div key={r} className="flex gap-1.5">
                {Array.from({ length: answer.length }).map((__, c) => {
                  const ch = text[c] ?? ''
                  const state = ev ? cellClass[ev[c]] : 'border-ink-900/25 bg-paper text-ink-900'
                  return (
                    <div
                      key={c}
                      className={`flex h-11 w-11 items-center justify-center border-2 font-display text-2xl uppercase sm:h-12 sm:w-12 ${state} ${
                        !ev && ch ? 'border-ink-900/60' : ''
                      }`}
                    >
                      {ch}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Fim de jogo */}
        {over && (
          <div className="mt-6 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-5 text-center">
            <p className="kicker">{won ? 'Cravou!' : 'Acabaram as tentativas'}</p>
            <p className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-900">
              {player.display}
            </p>
            <p className="mt-1 font-serif text-sm italic text-ink-600">
              {player.nat} · {player.pos} · {player.era}
            </p>
            <button
              onClick={novoJogador}
              className="btn-stamp mt-4 bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
            >
              Sortear outro jogador
            </button>
          </div>
        )}

        {/* Teclado virtual */}
        <div className="mt-8 flex w-full max-w-lg flex-col gap-1.5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex justify-center gap-1.5">
              {i === 2 && (
                <button
                  onClick={() => onKey('ENTER')}
                  className="flex h-12 flex-[1.5] items-center justify-center rounded-sm bg-ink-900 px-2 font-cond text-xs font-600 uppercase tracking-wider text-paper hover:bg-grass-600"
                >
                  Enter
                </button>
              )}
              {row.split('').map((k) => (
                <button
                  key={k}
                  onClick={() => onKey(k)}
                  className={`flex h-12 flex-1 items-center justify-center rounded-sm font-cond text-base font-600 uppercase transition-colors ${
                    keyClass[keyStates[k] ?? 'idle']
                  }`}
                >
                  {k}
                </button>
              ))}
              {i === 2 && (
                <button
                  onClick={() => onKey('BACK')}
                  className="flex h-12 flex-[1.5] items-center justify-center rounded-sm bg-ink-900 px-2 font-cond text-xs font-600 uppercase tracking-wider text-paper hover:bg-ochre-600"
                >
                  Apagar
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
