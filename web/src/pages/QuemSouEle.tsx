import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { players } from '../data/players'
import { dailyIndex, dayNumber } from '../lib/daily'
import {
  loadCareer,
  loadCareerToday,
  loadDailyState,
  loadStats,
  recordCareer,
  recordResult,
  saveDailyState,
  type Career,
  type Stats,
} from '../lib/stats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const MAX_ATTEMPTS = 6
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
const CAREER_LIVES = 3

type Mode = 'daily' | 'practice' | 'carreira'
type Cell = 'correct' | 'present' | 'absent'

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

// Dificuldade da escada: nomes curtos no começo, longos no fim.
function lenWindow(stage: number): [number, number] {
  if (stage <= 2) return [3, 5]
  if (stage <= 4) return [5, 6]
  if (stage <= 6) return [6, 8]
  if (stage <= 9) return [7, 10]
  return [4, 30]
}
// Escada DETERMINÍSTICA do dia: todo mundo pega a mesma sequência hoje.
function ladderPick(stage: number, used: number[]): number {
  const [lo, hi] = lenWindow(stage)
  const pool = players
    .map((_, i) => i)
    .filter((i) => !used.includes(i) && players[i].answer.length >= lo && players[i].answer.length <= hi)
  const notUsed = players.map((_, i) => i).filter((i) => !used.includes(i))
  const arr = pool.length ? pool : notUsed.length ? notUsed : players.map((_, i) => i)
  const h = (dayNumber() * 131 + stage * 977 + 7) >>> 0
  return arr[h % arr.length]
}

const saved = loadDailyState()

export default function QuemSouEle() {
  const [mode, setMode] = useState<Mode>('daily')
  const [pick, setPick] = useState(() => saved?.pick ?? dailyIndex(players.length))
  const [guesses, setGuesses] = useState<string[]>(() => saved?.guesses ?? [])
  const [current, setCurrent] = useState('')
  const [stats, setStats] = useState<Stats>(() => loadStats())
  const [recorded, setRecorded] = useState(() => !!saved)
  const [copied, setCopied] = useState(false)
  const [celebrated, setCelebrated] = useState(() => !!saved)

  // Modo Carreira (corrida diária acumulativa)
  const [stage, setStage] = useState(1)
  const [lives, setLives] = useState(CAREER_LIVES)
  const [careerScore, setCareerScore] = useState(0)
  const [career, setCareerInfo] = useState<Career>(() => loadCareer())
  const [careerDoneToday, setCareerDoneToday] = useState(false)
  const [revealCount, setRevealCount] = useState(1)
  const [skipCount, setSkipCount] = useState(1)
  const [revealed, setRevealed] = useState(0)
  const [usedPicks, setUsedPicks] = useState<number[]>([])
  const [roundDone, setRoundDone] = useState(false)
  const [lastGain, setLastGain] = useState(0)

  const player = players[pick]
  const answer = player.answer
  const careerMode = mode === 'carreira'

  const won = guesses.includes(answer)
  const lost = !won && guesses.length >= MAX_ATTEMPTS
  const over = won || lost
  const ended = over || (careerMode && careerDoneToday)

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

  // Comemora vitória (diário/treino).
  useEffect(() => {
    if (!careerMode && won && !celebrated) {
      confetti()
      setCelebrated(true)
    }
  }, [careerMode, won, celebrated])

  // Resolve a rodada da carreira (uma vez por craque).
  useEffect(() => {
    if (!careerMode || careerDoneToday || !over || roundDone) return
    setRoundDone(true)
    if (won) {
      const gain = 100 + (MAX_ATTEMPTS - guesses.length) * 25 + stage * 10
      setLastGain(gain)
      setCareerScore((s) => s + gain)
      confetti()
    } else {
      setLastGain(0)
      const nl = lives - 1
      setLives(nl)
      if (nl <= 0) {
        setCareerDoneToday(true)
        setCareerInfo(recordCareer(careerScore, stage))
      }
    }
  }, [careerMode, careerDoneToday, over, roundDone])

  // Registra o diário, uma vez.
  useEffect(() => {
    if (mode === 'daily' && over && !recorded) {
      const attempts = won ? guesses.length : MAX_ATTEMPTS
      setStats(recordResult(won, attempts))
      saveDailyState({ day: dayNumber(), pick, guesses, status: won ? 'won' : 'lost' })
      setRecorded(true)
    }
  }, [mode, over, recorded, won, guesses, pick])

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

  function praticar() {
    let next = pick
    while (next === pick && players.length > 1) next = Math.floor(Math.random() * players.length)
    setMode('practice')
    setCareerDoneToday(false)
    setPick(next)
    setGuesses([])
    setCurrent('')
    setCelebrated(false)
  }

  function voltarParaHoje() {
    const s = loadDailyState()
    setMode('daily')
    setCareerDoneToday(false)
    setPick(s?.pick ?? dailyIndex(players.length))
    setGuesses(s?.guesses ?? [])
    setCurrent('')
    setRecorded(!!s)
    setCelebrated(!!s)
  }

  function iniciarCarreira() {
    setMode('carreira')
    setCareerInfo(loadCareer())
    const done = loadCareerToday()
    if (done) {
      // Já jogou a corrida de hoje — mostra o resumo.
      setCareerDoneToday(true)
      setCareerScore(done.score)
      setStage(done.stage)
      setRoundDone(true)
      return
    }
    setCareerDoneToday(false)
    setStage(1)
    setLives(CAREER_LIVES)
    setCareerScore(0)
    setRevealCount(1)
    setSkipCount(1)
    setRevealed(0)
    setUsedPicks([])
    setRoundDone(false)
    setLastGain(0)
    setPick(ladderPick(1, []))
    setGuesses([])
    setCurrent('')
    setCelebrated(false)
  }

  function avancar() {
    const ns = stage + 1
    const used = [...usedPicks, pick]
    setStage(ns)
    setUsedPicks(used)
    setPick(ladderPick(ns, used))
    setGuesses([])
    setCurrent('')
    setRevealed(0)
    setRoundDone(false)
    if (ns % 3 === 1) setRevealCount((c) => c + 1)
  }

  function pular() {
    if (skipCount <= 0 || over) return
    setSkipCount((c) => c - 1)
    avancar()
  }

  function revelar() {
    if (revealCount <= 0 || revealed >= answer.length || over) return
    setRevealCount((c) => c - 1)
    setRevealed((r) => r + 1)
  }

  function compartilhar() {
    const head = `Encyclobol · Tira-Teima #${dayNumber()} — ${
      won ? `${guesses.length}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`
    }`
    const grid = guesses
      .map((g) =>
        evaluate(g, answer)
          .map((c) => (c === 'correct' ? '🟩' : c === 'present' ? '🟨' : '⬛'))
          .join(''),
      )
      .join('\n')
    const text = `${head}\n${grid}\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const winRate = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0
  const maxDist = Math.max(1, ...stats.dist)

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
            {mode === 'daily' ? 'Edição diária' : careerMode ? 'Carreira do dia' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Adivinhação · jogo 01</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Tira-Teima
        </h1>

        {/* HUD da carreira */}
        {careerMode && !careerDoneToday && (
          <div className="mt-4 flex items-center gap-5">
            <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
              Estágio <span className="text-grass-600">{stage}</span>
            </span>
            <span className="font-display text-2xl text-ink-900">
              {careerScore}
              <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">pts hoje</span>
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: CAREER_LIVES }).map((_, i) => (
                <span key={i} className={`h-2.5 w-2.5 rotate-45 ${i < lives ? 'bg-ochre-500' : 'bg-ink-900/20'}`} />
              ))}
            </span>
          </div>
        )}

        {!careerMode && (
          <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
            Adivinhe o craque pelo nome que ele é conhecido — primeiro nome,
            apelido ou sobrenome.
          </p>
        )}

        {/* Conteúdo do jogo (escondido no resumo da carreira) */}
        {!(careerMode && careerDoneToday) && (
          <>
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
              {mode === 'practice' && ' · treino não conta pro placar'}
            </p>

            {careerMode && revealed > 0 && (
              <div className="mt-3 flex gap-1">
                {answer.split('').map((ch, i) => (
                  <span
                    key={i}
                    className={`flex h-6 w-6 items-center justify-center border font-display text-sm uppercase ${
                      i < revealed ? 'border-grass-700 bg-grass-600 text-paper' : 'border-ink-900/20 text-ink-500'
                    }`}
                  >
                    {i < revealed ? ch : '·'}
                  </span>
                ))}
              </div>
            )}

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
                      const state = ev
                        ? cellClass[ev[c]]
                        : `bg-paper text-ink-900 ${ch ? 'border-ink-900/60' : 'border-ink-900/25'}`
                      return (
                        <div
                          key={c}
                          style={ev ? { animationDelay: `${c * 60}ms` } : undefined}
                          className={`flex h-11 w-11 items-center justify-center border-2 font-display text-2xl uppercase sm:h-12 sm:w-12 ${state} ${ev ? 'animate-pop' : ''}`}
                        >
                          {ch}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {careerMode && !over && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={revelar}
                  disabled={revealCount <= 0 || revealed >= answer.length}
                  className="btn-stamp border-2 border-ink-900 px-4 py-2 text-ink-900 hover:bg-ink-900 hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Revelar letra ({revealCount})
                </button>
                <button
                  onClick={pular}
                  disabled={skipCount <= 0}
                  className="btn-stamp border-2 border-ink-900 px-4 py-2 text-ink-900 hover:bg-ink-900 hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Pular ({skipCount})
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== Fim de rodada ===== */}
        {ended && (
          <div className="mt-6 w-full max-w-md border-2 border-ink-900 bg-paper-100 p-5 text-center">
            {careerMode && careerDoneToday ? (
              <>
                <p className="kicker">Carreira de hoje</p>
                <p className="mt-1 font-display text-6xl text-ink-900">{careerScore}</p>
                <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                  pontos hoje · chegou ao estágio {stage}
                </p>
                <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                  {[
                    ['Total', career.total],
                    ['Recorde/dia', career.best],
                    ['Dias', career.days],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-paper-100 px-1 py-2">
                      <div className="font-display text-2xl text-ink-900">{v}</div>
                      <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-serif text-sm italic text-ink-600">
                  Volte amanhã pra somar mais à sua carreira.
                </p>
                <button
                  onClick={praticar}
                  className="btn-stamp mt-4 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
                >
                  Treinar (sem pontos)
                </button>
                <button
                  onClick={voltarParaHoje}
                  className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
                >
                  Edição de hoje
                </button>
              </>
            ) : careerMode ? (
              <>
                <p className="kicker">{won ? `Cravou! +${lastGain} pts` : 'Errou — perdeu uma vida'}</p>
                <p className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-900">
                  {player.display}
                </p>
                <p className="mt-1 font-serif text-sm italic text-ink-600">
                  {player.nat} · {player.pos} · {player.era}
                </p>
                <button
                  onClick={avancar}
                  className="btn-stamp mt-4 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
                >
                  Próximo craque →
                </button>
              </>
            ) : (
              <>
                <p className="kicker">{won ? 'Cravou!' : 'Acabaram as tentativas'}</p>
                <p className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-900">
                  {player.display}
                </p>
                <p className="mt-1 font-serif text-sm italic text-ink-600">
                  {player.nat} · {player.pos} · {player.era}
                </p>

                {mode === 'daily' && (
                  <>
                    <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                      {[
                        ['Jogos', stats.played],
                        ['% Vitória', winRate],
                        ['Sequência', stats.currentStreak],
                        ['Melhor', stats.maxStreak],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-paper-100 px-1 py-2">
                          <div className="font-display text-2xl text-ink-900">{v}</div>
                          <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-1 text-left">
                      <p className="font-cond text-[10px] font-600 uppercase tracking-wider text-ink-500">
                        Distribuição de tentativas
                      </p>
                      {stats.dist.map((n, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-3 font-cond text-xs text-ink-600">{i + 1}</span>
                          <div className="h-4 flex-1 bg-paper-300">
                            <div
                              className="flex h-4 items-center justify-end bg-grass-600 px-1.5 font-cond text-[10px] font-600 text-paper"
                              style={{ width: `${Math.max((n / maxDist) * 100, n ? 12 : 0)}%` }}
                            >
                              {n > 0 ? n : ''}
                            </div>
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
                  onClick={iniciarCarreira}
                  className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
                >
                  Carreira do dia
                </button>
                <button
                  onClick={praticar}
                  className="btn-stamp mt-2 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
                >
                  Sortear outro
                </button>
                {mode === 'practice' && (
                  <button
                    onClick={voltarParaHoje}
                    className="btn-stamp mt-2 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
                  >
                    Edição de hoje
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Teclado */}
        {!ended && (
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
        )}
      </main>
    </div>
  )
}
