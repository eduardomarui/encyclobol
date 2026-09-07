import { useCallback, useEffect, useMemo, useState } from 'react'
import { players } from '../data/players'
import { dayNumber } from '../lib/daily'
import {
  loadCareer,
  loadCareerToday,
  recordCareer,
  type Career,
} from '../lib/stats'
import { confetti } from '../lib/juice'
import { shareScoreImage } from '../lib/shareCard'
import { GameHeader, HelpModal, StatGrid, TimeBar } from '../components/GameShell'

const MAX_ATTEMPTS = 6
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

// Cronômetro por craque: começa em 60s e aperta a cada estágio (mín. 25s).
const TIME_BASE = 60
const TIME_MIN = 25
const timeForStage = (s: number) => Math.max(TIME_MIN, TIME_BASE - (s - 1) * 4)
const CAREER_LIVES = 3
const HELP_KEY = 'encyclobol:qse:help'

type Mode = 'carreira' | 'practice'
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
  correct: 'bg-grass-600 text-ink-900 border-grass-700',
  present: 'bg-corn-500 text-ink-900 border-corn-600',
  absent: 'bg-[#3b4a44] text-ink-800 border-[#4a5a53]',
}
const keyClass: Record<Cell | 'idle', string> = {
  correct: 'bg-grass-600 text-ink-900',
  present: 'bg-corn-500 text-ink-900',
  absent: 'bg-[#3b4a44] text-ink-700',
  idle: 'bg-paper-200 text-ink-900 hover:bg-paper-300',
}

function Heart({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M12 21C12 21 3.5 14.6 3.5 8.8 3.5 6 5.6 4 8 4c1.9 0 3.2 1.1 4 2.4C12.8 5.1 14.1 4 16 4c2.4 0 4.5 2 4.5 4.8 0 5.8-8.5 12.2-8.5 12.2Z"
        fill={on ? '#d24a3a' : 'none'}
        stroke={on ? '#d24a3a' : 'rgba(255,255,255,0.28)'}
        strokeWidth="1.6"
      />
    </svg>
  )
}

function lenWindow(stage: number): [number, number] {
  if (stage <= 2) return [3, 5]
  if (stage <= 4) return [5, 6]
  if (stage <= 6) return [6, 8]
  if (stage <= 9) return [7, 10]
  return [4, 30]
}
// Escada determinística do dia (mesma sequência pra todos).
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

const today = loadCareerToday()

export default function QuemSouEle() {
  const [mode, setMode] = useState<Mode>('carreira')
  const [pick, setPick] = useState(() => ladderPick(1, []))
  const [guesses, setGuesses] = useState<string[]>([])
  const [current, setCurrent] = useState('')

  const [stage, setStage] = useState(today?.stage ?? 1)
  const [lives, setLives] = useState(CAREER_LIVES)
  const [careerScore, setCareerScore] = useState(today?.score ?? 0)
  const [career, setCareerInfo] = useState<Career>(() => loadCareer())
  const [careerDoneToday, setCareerDoneToday] = useState(!!today)
  const [revealCount, setRevealCount] = useState(1)
  const [skipCount, setSkipCount] = useState(1)
  const [revealed, setRevealed] = useState(0)
  const [usedPicks, setUsedPicks] = useState<number[]>([])
  const [roundDone, setRoundDone] = useState(false)
  const [lastGain, setLastGain] = useState(0)
  const [celebrated, setCelebrated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => timeForStage(today?.stage ?? 1))
  const [timedOut, setTimedOut] = useState(false)
  // Craques enfrentados na corrida de hoje (pra ficha do fim).
  const [history, setHistory] = useState<{ name: string; ok: boolean; tries: number }[]>([])
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const player = players[pick]
  const answer = player.answer
  const careerMode = mode === 'carreira'

  const won = guesses.includes(answer)
  const lost = timedOut || (!won && guesses.length >= MAX_ATTEMPTS)
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

  // Confete no treino.
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
    setHistory((h) => [...h, { name: player.display, ok: won, tries: guesses.length }])
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

  // Cronômetro do craque (só na carreira). Estourar = perde o craque.
  useEffect(() => {
    if (!careerMode || careerDoneToday || over || showHelp) return
    if (timeLeft <= 0) {
      setTimedOut(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, careerMode, careerDoneToday, over, showHelp])

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
    setTimedOut(false)
  }

  function voltarCarreira() {
    setMode('carreira')
    setCareerInfo(loadCareer())
    const done = loadCareerToday()
    if (done) {
      setCareerDoneToday(true)
      setCareerScore(done.score)
      setStage(done.stage)
      return
    }
    // (não deveria cair aqui se já jogou; corrida nova só amanhã)
    setCareerDoneToday(false)
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
    setTimedOut(false)
    setTimeLeft(timeForStage(ns))
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
      game: 'Tira-Teima · Carreira',
      headline: String(careerScore),
      sub: 'pontos hoje',
      lines: [`Estágio ${stage}`, `Total ${career.total} pts`],
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · Tira-Teima #${dayNumber()} — ${careerScore} pts · encyclobol.com.br`,
    })
    if (r !== 'error') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const tileFont =
    answer.length >= 11 ? '0.95rem' : answer.length >= 9 ? '1.15rem' : answer.length >= 7 ? '1.4rem' : '1.7rem'

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <GameHeader label={careerMode ? 'Carreira do dia' : 'Modo treino'} onHelp={() => setShowHelp(true)} />

      <main className="container-page flex flex-1 flex-col items-center py-4">
        {/* Título compacto: a página inteira (tabuleiro + teclado) tem que caber sem rolar */}
        <p className="kicker">Carreira · jogo 01</p>
        <h1 className="mt-1 font-display text-3xl uppercase leading-none tracking-tight text-ink-900">Tira-Teima</h1>

        {/* HUD da carreira numa linha: estágio · pontos · vidas · relógio */}
        {careerMode && !careerDoneToday && (
          <div className="mt-3 flex w-full max-w-md items-stretch divide-x divide-white/10 border-2 border-white/20 bg-paper-100">
            <div className="flex items-baseline gap-1.5 px-3 py-1.5">
              <span className="font-display text-xl leading-none text-ink-900">{stage}</span>
              <span className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">estágio</span>
            </div>
            <div className="flex items-baseline gap-1.5 px-3 py-1.5">
              <span className="font-display text-xl leading-none text-corn-500">{careerScore}</span>
              <span className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">pts</span>
            </div>
            <div className="flex items-center gap-0.5 px-3 py-1.5">
              {Array.from({ length: CAREER_LIVES }).map((_, i) => (
                <Heart key={i} on={i < lives} />
              ))}
            </div>
            {!over && (
              <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
                <TimeBar left={timeLeft} total={timeForStage(stage)} />
                <span
                  className={`w-7 text-right font-display text-lg leading-none tabular-nums ${
                    timeLeft <= 10 ? 'animate-pulse text-ochre-500' : 'text-ink-800'
                  }`}
                >
                  {timeLeft}
                </span>
              </div>
            )}
          </div>
        )}

        {mode === 'practice' && (
          <p className="mt-2 font-cond text-xs font-500 uppercase tracking-wider text-ink-500">
            Treino · não conta pontos
          </p>
        )}

        {/* Conteúdo do jogo (escondido no resumo) */}
        {!(careerMode && careerDoneToday) && (
          <>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              {[
                ['Seleção', player.nat],
                ['Posição', player.pos],
                ['Período', player.era],
              ].map(([k, v]) => (
                <span
                  key={k}
                  className="border border-ink-900/20 bg-paper-100 px-2.5 py-0.5 font-cond text-[11px] font-500 uppercase tracking-wider text-ink-700"
                >
                  <span className="text-ink-500">{k}:</span> {v}
                </span>
              ))}
              <span className="px-1 font-serif text-[13px] italic text-ink-500">
                {answer.length} letras · {MAX_ATTEMPTS} tentativas
              </span>
            </div>

            {careerMode && revealed > 0 && (
              <div
                className="mx-auto mt-3 flex w-full gap-1"
                style={{ maxWidth: `${answer.length * 28}px` }}
              >
                {answer.split('').map((ch, i) => (
                  <span
                    key={i}
                    className={`flex aspect-square min-w-0 flex-1 items-center justify-center border font-display text-sm uppercase ${
                      i < revealed ? 'border-grass-700 bg-grass-600 text-ink-900' : 'border-ink-900/20 text-ink-500'
                    }`}
                  >
                    {i < revealed ? ch : '·'}
                  </span>
                ))}
              </div>
            )}

            <div
              className="mx-auto mt-3 flex w-full flex-col gap-1"
              style={{ maxWidth: `${answer.length * 46}px` }}
            >
              {Array.from({ length: MAX_ATTEMPTS }).map((_, r) => {
                const guessed = guesses[r]
                const isCurrent = r === guesses.length && !over
                const text = guessed ?? (isCurrent ? current : '')
                const ev = guessed ? evaluate(guessed, answer) : null
                return (
                  <div key={r} className="flex w-full gap-1">
                    {Array.from({ length: answer.length }).map((__, c) => {
                      const ch = text[c] ?? ''
                      const state = ev
                        ? cellClass[ev[c]]
                        : `bg-paper text-ink-900 ${ch ? 'border-ink-900/60' : 'border-ink-900/25'}`
                      return (
                        <div
                          key={c}
                          style={{
                            fontSize: tileFont,
                            ...(ev ? { animationDelay: `${c * 60}ms` } : {}),
                          }}
                          className={`flex aspect-square min-w-0 flex-1 items-center justify-center border-2 font-display uppercase ${state} ${ev ? 'animate-pop' : ''}`}
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
              <div className="mt-3 flex gap-2">
                <button
                  onClick={revelar}
                  disabled={revealCount <= 0 || revealed >= answer.length}
                  className="btn-stamp border-2 border-white/20 px-4 py-1.5 text-xs text-ink-900 hover:bg-grass-700 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Revelar letra ({revealCount})
                </button>
                <button
                  onClick={pular}
                  disabled={skipCount <= 0}
                  className="btn-stamp border-2 border-white/20 px-4 py-1.5 text-xs text-ink-900 hover:bg-grass-700 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Pular ({skipCount})
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== Fim de rodada ===== */}
        {ended && (
          <div className="mt-6 w-full max-w-md border-2 border-white/20 bg-paper-100 p-5 text-center">
            {careerMode && careerDoneToday ? (
              <>
                <p className="kicker">Carreira de hoje</p>
                <p className="mt-1 font-display text-6xl text-ink-900">{careerScore}</p>
                <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                  pontos hoje · chegou ao estágio {stage}
                </p>
                {history.length > 0 && (
                  <ul className="mt-4 max-h-40 space-y-1 overflow-y-auto border-y border-white/10 py-2 text-left">
                    {history.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 font-cond text-xs uppercase tracking-wide">
                        <span className={`h-2 w-2 flex-none rounded-full ${h.ok ? 'bg-grass-500' : 'bg-ochre-500'}`} />
                        <span className="text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                        <span className="flex-1 truncate text-ink-900">{h.name}</span>
                        <span className="text-ink-500">{h.ok ? `${h.tries}ª tent.` : 'errou'}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <StatGrid
                  items={[
                    ['Total', career.total],
                    ['Recorde/dia', career.best],
                    ['Dias', career.days],
                  ]}
                />
                <p className="mt-3 font-serif text-sm italic text-ink-600">
                  Volte amanhã pra somar mais à sua carreira.
                </p>
                <button
                  onClick={compartilhar}
                  className="btn-stamp mt-4 w-full bg-grass-700 px-6 py-2.5 text-ink-900 hover:bg-grass-600"
                >
                  {copied ? 'Imagem pronta!' : 'Compartilhar imagem'}
                </button>
                <button
                  onClick={praticar}
                  className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
                >
                  Treinar (sem pontos)
                </button>
              </>
            ) : careerMode ? (
              <>
                <p className="kicker">
                  {won
                    ? `Cravou! +${lastGain} pts`
                    : timedOut
                      ? 'Tempo esgotado — perdeu uma vida'
                      : 'Errou — perdeu uma vida'}
                </p>
                <p className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-900">
                  {player.display}
                </p>
                <p className="mt-1 font-serif text-sm italic text-ink-600">
                  {player.nat} · {player.pos} · {player.era}
                </p>
                <button
                  onClick={avancar}
                  className="btn-stamp mt-4 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700"
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
                <button
                  onClick={praticar}
                  className="btn-stamp mt-4 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700"
                >
                  Sortear outro
                </button>
                <button
                  onClick={voltarCarreira}
                  className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
                >
                  Voltar pra carreira
                </button>
              </>
            )}
          </div>
        )}

        {/* Teclado */}
        {!ended && (
          <div className="mt-4 flex w-full max-w-lg flex-col gap-1">
            {ROWS.map((row, i) => (
              <div key={i} className="flex justify-center gap-1">
                {i === 2 && (
                  <button
                    onClick={() => onKey('ENTER')}
                    className="flex h-10 flex-[1.5] items-center justify-center rounded-sm bg-grass-700 px-2 font-cond text-xs font-600 uppercase tracking-wider text-ink-900 hover:bg-grass-600"
                  >
                    Enter
                  </button>
                )}
                {row.split('').map((k) => (
                  <button
                    key={k}
                    onClick={() => onKey(k)}
                    className={`flex h-10 flex-1 items-center justify-center rounded-sm font-cond text-sm font-600 uppercase transition-colors ${
                      keyClass[keyStates[k] ?? 'idle']
                    }`}
                  >
                    {k}
                  </button>
                ))}
                {i === 2 && (
                  <button
                    onClick={() => onKey('BACK')}
                    className="flex h-10 flex-[1.5] items-center justify-center rounded-sm bg-grass-700 px-2 font-cond text-xs font-600 uppercase tracking-wider text-ink-900 hover:bg-ochre-600"
                  >
                    Apagar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {showHelp && (
        <HelpModal title="Tira-Teima" cta="Entendi, bora jogar" onClose={closeHelp}>
              <li>
                Adivinhe o craque digitando o <strong>nome pelo qual ele é conhecido</strong> —
                tudo junto, <strong>sem espaço e sem acento</strong>. Ex: <em>Thiago Silva</em> →{' '}
                <span className="font-cond tracking-wide">THIAGOSILVA</span>.
              </li>
              <li>
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-grass-600" /> verde: letra
                certa no lugar.{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-corn-500" /> amarelo:
                existe, lugar errado.{' '}
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-[#3b4a44]" /> escuro: não tem.
              </li>
              <li>Use as dicas (seleção, posição, época). São 6 tentativas por craque.</li>
              <li>
                Corra contra o <strong>relógio</strong>: cada craque tem um tempo que{' '}
                <strong>aperta a cada estágio</strong>. Se o tempo zerar, você perde uma vida.
              </li>
              <li>
                É uma <strong>carreira</strong>: uma corrida por dia com <strong>3 vidas</strong>{' '}
                <span className="inline-block translate-y-0.5">
                  <Heart on />
                </span>
                , craques cada vez mais difíceis. Os pontos somam num total que cresce a cada dia.
              </li>
        </HelpModal>
      )}
    </div>
  )
}
