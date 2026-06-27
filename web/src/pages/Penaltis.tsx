import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { quiz } from '../data/quiz'
import { dayNumber, seededShuffle } from '../lib/daily'
import {
  loadCopaStats,
  loadCopaToday,
  recordCopa,
  type CopaStats,
} from '../lib/penaltisStats'
import { PenaltyScene, ZONES, poseFor, type Zone, type Shot } from '../components/PenaltyScene'
import { confetti } from '../lib/juice'
import { shareScoreImage } from '../lib/shareCard'

const HELP_KEY = 'encyclobol:copa:help'

// Copa: 4 fases, cada uma mais difícil (menos tempo).
const ROUND_NAMES = ['Oitavas', 'Quartas', 'Semifinal', 'Final']
const RIVALS = ['os Estreantes', 'os Veteranos', 'os Craques', 'as Lendas']
const ATK = [8, 7, 6, 6] // segundos pra cobrar, por fase
const DEF = [6, 5, 5, 4] // segundos pra defender, por fase (pressão sobe)
const ROUND_PTS = [120, 180, 260, 380]
const CHAMP_BONUS = 500
const secsFor = (round: number, i: number) =>
  i % 2 === 0 ? ATK[round - 1] : DEF[round - 1]

type Mark = 'goal' | 'miss'
type PQ = { q: string; cat: string; options: string[]; correct: number }

function prepQ(bi: number, seed: number): PQ {
  const base = quiz[bi]
  const order = seededShuffle(base.options.map((_, i) => i), seed)
  return {
    q: base.q,
    cat: base.cat,
    options: order.map((i) => base.options[i]),
    correct: order.indexOf(base.correct),
  }
}
const EASY = quiz.flatMap((q, i) => (q.dif === 'facil' ? [i] : []))
const HARD = quiz.flatMap((q, i) => (q.dif === 'dificil' ? [i] : []))

// Intercala cobrança (fácil) e defesa (difícil): A, D, A, D...
function interleave(eIdx: number[], hIdx: number[], seed: number): PQ[] {
  const out: PQ[] = []
  for (let p = 0; p < 5; p++) {
    out.push(prepQ(eIdx[p], seed + p * 7 + 1))
    out.push(prepQ(hIdx[p], seed + p * 7 + 4))
  }
  return out
}
// Confronto da fase: determinístico no dia (mesmo pra todos), por fase.
function dailyShootout(round: number): PQ[] {
  const seed = dayNumber() * 100 + round * 7
  const e = seededShuffle(EASY, seed + 1).slice(0, 5)
  const h = seededShuffle(HARD, seed + 2).slice(0, 5)
  return interleave(e, h, seed)
}
function randomShootout(): PQ[] {
  const s = Math.floor(Math.random() * 1e9) + 1
  const e = seededShuffle(EASY, s).slice(0, 5)
  const h = seededShuffle(HARD, s + 1).slice(0, 5)
  return interleave(e, h, s)
}
function extraPair(): PQ[] {
  return [
    prepQ(EASY[Math.floor(Math.random() * EASY.length)], Math.floor(Math.random() * 1e9) + 1),
    prepQ(HARD[Math.floor(Math.random() * HARD.length)], Math.floor(Math.random() * 1e9) + 1),
  ]
}

function Pip({ mark, team }: { mark?: Mark; team: 'me' | 'op' }) {
  if (!mark) return <span className="h-3.5 w-3.5 rounded-full border border-paper/30" />
  if (mark === 'goal')
    return <span className={`h-3.5 w-3.5 rounded-full ${team === 'me' ? 'bg-grass-400' : 'bg-ochre-500'}`} />
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-paper/40 text-[9px] text-ink-900/50">
      ✕
    </span>
  )
}

function Trophy({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-12 w-12" aria-hidden>
      <path
        d="M7 4h10v3a5 5 0 0 1-10 0V4Zm0 1H4v1a3 3 0 0 0 3 3m10-4h3v1a3 3 0 0 1-3 3M9 12.5h6M12 12v3m-3 4h6l-.5-2h-5L9 19Z"
        fill="none"
        stroke={on ? '#caa83a' : 'rgba(22,19,13,0.3)'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

const copaToday = loadCopaToday()

export default function Penaltis() {
  const [mode, setMode] = useState<'copa' | 'practice'>('copa')
  const [round, setRound] = useState(copaToday?.round ?? 1)
  const [prepared, setPrepared] = useState<PQ[]>(() => dailyShootout(1))
  const [index, setIndex] = useState(0)
  const [meus, setMeus] = useState<Mark[]>([])
  const [rival, setRival] = useState<Mark[]>([])
  const [my, setMy] = useState(0)
  const [opp, setOpp] = useState(0)
  const [phase, setPhase] = useState<'ask' | 'shoot'>('ask')
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(ATK[0])
  const [shot, setShot] = useState<Shot>(null)

  const [shootoutOver, setShootoutOver] = useState(false)
  const [bracketResolved, setBracketResolved] = useState(false)
  const [interRound, setInterRound] = useState(false)
  const [copaScore, setCopaScore] = useState(copaToday?.points ?? 0)
  const [lastGain, setLastGain] = useState(0)
  const [champion, setChampion] = useState(copaToday?.champion ?? false)
  const [copaDone, setCopaDone] = useState(!!copaToday)
  const [copa, setCopa] = useState<CopaStats>(() => loadCopaStats())
  const [copied, setCopied] = useState(false)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const current = prepared[index]
  const attacking = index % 2 === 0
  const pair = Math.floor(index / 2) + 1
  const slots = Math.max(5, meus.length, rival.length)
  const copaMode = mode === 'copa'
  const wonShootout = my > opp
  const showGame = !copaDone && !interRound && !shootoutOver

  // Timer da pergunta.
  useEffect(() => {
    if (shootoutOver || copaDone || interRound || phase !== 'ask') return
    if (timeLeft <= 0) {
      resolve(-1)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, shootoutOver, copaDone, interRound])


  // Resolve o chaveamento quando uma disputa termina (só na Copa).
  useEffect(() => {
    if (!shootoutOver || bracketResolved || !copaMode) return
    setBracketResolved(true)
    if (my > opp) {
      const pts = ROUND_PTS[round - 1] + (my - opp) * 20
      if (round >= 4) {
        const total = copaScore + pts + CHAMP_BONUS
        setCopaScore(total)
        setChampion(true)
        setCopaDone(true)
        setCopa(recordCopa(total, 4, true))
        confetti()
      } else {
        setLastGain(pts)
        setCopaScore((s) => s + pts)
        setInterRound(true)
        confetti()
      }
    } else {
      setCopaDone(true)
      setCopa(recordCopa(copaScore, round, false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shootoutOver, bracketResolved])

  function startShootout(r: number, daily: boolean) {
    setRound(r)
    setPrepared(daily ? dailyShootout(r) : randomShootout())
    setIndex(0)
    setMeus([])
    setRival([])
    setMy(0)
    setOpp(0)
    setPhase('ask')
    setSelected(null)
    setTimeLeft(secsFor(r, 0))
    setShot(null)
    setShootoutOver(false)
    setBracketResolved(false)
    setInterRound(false)
  }

  function finishShootout(myG: number, oppG: number) {
    setShootoutOver(true)
    if (!copaMode && myG > oppG) confetti()
  }

  function goAsk(i: number) {
    setIndex(i)
    setShot(null)
    setSelected(null)
    setTimeLeft(secsFor(round, i))
    setPhase('ask')
  }

  function resolve(choice: number) {
    if (phase !== 'ask') return
    const correct = choice === current.correct
    setSelected(choice)

    const p = Math.floor(index / 2)
    const nm = [...meus]
    const nr = [...rival]
    if (attacking) nm[p] = correct ? 'goal' : 'miss'
    else nr[p] = correct ? 'miss' : 'goal'
    setMeus(nm)
    setRival(nr)
    const myG = nm.filter((g) => g === 'goal').length
    const oppG = nr.filter((g) => g === 'goal').length
    setMy(myG)
    setOpp(oppG)

    const ballZone = ZONES[Math.floor(Math.random() * ZONES.length)]
    const isGoal = (attacking && correct) || (!attacking && !correct)
    let keeperZone: Zone
    if (isGoal) {
      const others = ZONES.filter((z) => z !== ballZone)
      keeperZone = others[Math.floor(Math.random() * others.length)]
    } else {
      keeperZone = ballZone
    }

    let label = ''
    let good = false
    if (attacking) {
      if (correct) { label = 'GOOOL!'; good = true }
      else label = choice === -1 ? 'PERDEU A HORA!' : 'DEFENDEU!'
    } else {
      if (correct) { label = 'VOCÊ PEGOU!'; good = true }
      else label = 'TOMOU GOL'
    }

    setShot({
      bx: ballZone.x,
      by: isGoal ? ballZone.y : 44,
      kx: Math.min(66, Math.max(34, keeperZone.x)),
      pose: poseFor(keeperZone),
      label,
      good,
      net: isGoal,
    })
    setPhase('shoot')

    // Decisão antecipada (como na disputa real): se a vantagem já não pode
    // ser alcançada com as cobranças que faltam na melhor de 5, acabou.
    const myKicks = Math.floor(index / 2) + 1
    const rivalKicks = Math.floor((index + 1) / 2)
    const myRem = Math.max(0, 5 - myKicks)
    const rivalRem = Math.max(0, 5 - rivalKicks)
    const clinched = index < 10 && (myG > oppG + rivalRem || oppG > myG + myRem)

    setTimeout(() => {
      const i = index + 1
      if (clinched) finishShootout(myG, oppG)
      else if (i < prepared.length) goAsk(i)
      else if (myG !== oppG) finishShootout(myG, oppG)
      else {
        setPrepared((pp) => [...pp, ...extraPair()])
        goAsk(i)
      }
    }, 1800)
  }

  function treinar() {
    setMode('practice')
    setRound(1)
    setCopaDone(false)
    setChampion(false)
    startShootout(1, false)
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
      game: 'Copa de Pênaltis',
      headline: champion ? 'CAMPEÃO' : String(copaScore),
      sub: champion ? 'campeão da copa' : 'pontos hoje',
      lines: [
        champion ? `${copaScore} pts` : `Parou nas ${ROUND_NAMES[round - 1]}`,
        `Total ${copa.total} pts · ${copa.cups} copa${copa.cups === 1 ? '' : 's'}`,
      ],
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · Copa de Pênaltis #${dayNumber()} — ${champion ? 'CAMPEÃO' : copaScore + ' pts'} · encyclobol.com.br`,
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
            <Link
              to="/jogos/penaltis/online"
              className="font-cond text-xs font-700 uppercase tracking-wider text-grass-600 hover:text-grass-700"
            >
              1×1 online
            </Link>
            <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">
              {copaMode ? 'Copa de Pênaltis' : 'Modo treino'}
            </span>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="Como jogar"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 font-cond text-sm font-700 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-5">
        {/* Cabeçalho da fase */}
        {!copaDone && (
          <div className="mb-3 flex w-full max-w-sm items-center justify-between">
            <div>
              <p className="kicker text-ink-500">
                {copaMode ? `${ROUND_NAMES[round - 1]} · vs ${RIVALS[round - 1]}` : 'Treino livre'}
              </p>
              <div className="mt-0.5 flex gap-1">
                {ROUND_NAMES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${
                      i < round - 1 ? 'bg-grass-600' : i === round - 1 ? 'bg-ochre-500' : 'bg-ink-900/15'
                    }`}
                  />
                ))}
              </div>
            </div>
            {copaMode && (
              <div className="text-right">
                <div className="font-display text-2xl leading-none text-ink-900">{copaScore}</div>
                <div className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">pts na copa</div>
              </div>
            )}
          </div>
        )}

        {/* PLACAR */}
        {!copaDone && (
          <div className="w-full max-w-sm border-2 border-white/20 bg-grass-700 text-ink-900">
            <div className="flex items-center gap-3 border-b border-paper/15 px-3 py-2">
              <span className="w-12 font-cond text-xs font-700 uppercase tracking-wider text-grass-400">Você</span>
              <div className="flex flex-1 flex-wrap gap-1">
                {Array.from({ length: slots }).map((_, i) => (
                  <Pip key={i} mark={meus[i]} team="me" />
                ))}
              </div>
              <span className="w-7 text-right font-display text-2xl leading-none">{my}</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="w-12 font-cond text-xs font-700 uppercase tracking-wider text-ochre-500">Rival</span>
              <div className="flex flex-1 flex-wrap gap-1">
                {Array.from({ length: slots }).map((_, i) => (
                  <Pip key={i} mark={rival[i]} team="op" />
                ))}
              </div>
              <span className="w-7 text-right font-display text-2xl leading-none">{opp}</span>
            </div>
          </div>
        )}

        {showGame && (
          <p className="mt-2 font-cond text-xs font-600 uppercase tracking-[0.16em] text-ink-500">
            {pair <= 5 ? `Cobrança ${pair}/5` : 'Morte súbita'} ·{' '}
            <span className={attacking ? 'text-grass-600' : 'text-ochre-600'}>
              {attacking ? `Você cobra · ${secsFor(round, index)}s` : `Você defende · difícil · ${secsFor(round, index)}s`}
            </span>
          </p>
        )}

        {/* CENA */}
        {showGame && (
          <div className="mt-3 flex w-full justify-center">
            <PenaltyScene shot={shot} animKey={index} />
          </div>
        )}

        {/* PERGUNTA */}
        {showGame && current && (
          <div className="mt-4 w-full max-w-sm">
            <div className="mb-1.5 h-1.5 w-full bg-paper-300">
              <div
                className={`h-1.5 transition-[width] duration-1000 ease-linear ${
                  timeLeft <= 3 ? 'bg-ochre-500' : 'bg-grass-600'
                }`}
                style={{ width: `${(timeLeft / secsFor(round, index)) * 100}%` }}
              />
            </div>
            <p className="kicker text-ink-500">{current.cat}</p>
            <h2 className="mt-1 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">{current.q}</h2>
            <div className="mt-3 grid gap-2">
              {current.options.map((opt, i) => {
                let cls = 'border-ink-900/25 bg-paper hover:border-white/20 hover:bg-paper-100'
                if (phase === 'shoot') {
                  if (i === current.correct) cls = 'border-grass-700 bg-grass-600 text-ink-900'
                  else if (i === selected) cls = 'border-ochre-600 bg-ochre-500 text-ink-900'
                  else cls = 'border-ink-900/15 bg-paper opacity-60'
                }
                return (
                  <button
                    key={i}
                    onClick={() => resolve(i)}
                    disabled={phase === 'shoot'}
                    className={`flex items-center gap-3 border-2 px-4 py-2.5 text-left font-serif text-base transition-colors ${cls}`}
                  >
                    <span className="font-cond text-xs font-700">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* CLASSIFICOU — entre fases */}
        {interRound && (
          <div className="mt-8 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-6 text-center">
            <p className="kicker">Classificado!</p>
            <p className="mt-1 font-display text-5xl text-ink-900">
              {my} <span className="text-ink-500">×</span> {opp}
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              Passou pelas {ROUND_NAMES[round - 1]} (+{lastGain} pts). Pela frente:{' '}
              <strong>{ROUND_NAMES[round]}</strong> contra {RIVALS[round]} — mais difícil.
            </p>
            <button
              onClick={() => startShootout(round + 1, copaMode)}
              className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700"
            >
              Avançar pra {ROUND_NAMES[round]} →
            </button>
          </div>
        )}

        {/* PRÁTICA — fim de disputa solta */}
        {mode === 'practice' && shootoutOver && (
          <div className="mt-8 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-6 text-center">
            <p className="kicker">{wonShootout ? 'Venceu a disputa!' : 'Disputa perdida'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {my} <span className="text-ink-500">×</span> {opp}
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">Treino não conta pontos.</p>
            <button onClick={treinar} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
              Outra disputa
            </button>
            <Link
              to="/"
              className="btn-stamp mt-2 block border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
            >
              Voltar pro almanaque
            </Link>
          </div>
        )}

        {/* COPA ENCERRADA — resumo do dia */}
        {copaDone && (
          <div className="mt-6 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-6 text-center">
            <Trophy on={champion} />
            <p className="kicker mt-1">
              {champion ? 'Campeão da Copa!' : `Eliminado nas ${ROUND_NAMES[round - 1]}`}
            </p>
            <p className="mt-1 font-display text-6xl text-ink-900">{copaScore}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">pontos hoje</p>
            <p className="mt-2 font-serif text-base italic text-ink-600">
              {champion
                ? 'Levantou a taça! Frieza do começo ao fim.'
                : 'Bom caminho. Amanhã tem outra chance de erguer o caneco.'}
            </p>

            <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-white/20 bg-ink-900/15">
              {[
                ['Total', copa.total],
                ['Recorde', copa.best],
                ['Copas', copa.cups],
                ['Dias', copa.days],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper-100 px-1 py-2">
                  <div className="font-display text-2xl text-ink-900">{v}</div>
                  <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">{k}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 font-serif text-sm italic text-ink-600">Volte amanhã pra nova Copa.</p>

            <button
              onClick={compartilhar}
              className="btn-stamp mt-4 w-full bg-grass-700 px-6 py-2.5 text-ink-900 hover:bg-grass-600"
            >
              {copied ? 'Imagem pronta!' : 'Compartilhar imagem'}
            </button>
            <button
              onClick={treinar}
              className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
            >
              Treinar (sem pontos)
            </button>
          </div>
        )}
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closeHelp}>
          <div className="w-full max-w-sm border-2 border-white/20 bg-paper p-6" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Como jogar</p>
            <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              Copa de Pênaltis
            </h2>
            <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">
              <li>
                Cada pergunta é uma cobrança. <strong>Quando você cobra:</strong> acertou, é gol;
                errou, o goleiro defende.
              </li>
              <li>
                <strong>Quando você defende:</strong> acertar a pergunta significa que você{' '}
                <em>pegou</em>; errar é gol do rival. E o tempo é <strong>mais curto</strong>.
              </li>
              <li>Cada confronto é melhor de cinco — empatou, vai pra morte súbita.</li>
              <li>
                É um <strong>mata-mata</strong>: Oitavas → Quartas → Semi → Final, cada rival mais
                difícil (menos tempo). Venceu, avança; perdeu, acabou o dia. Os pontos somam num{' '}
                <strong>total</strong>. Vença a Final pra levantar a{' '}
                <span className="inline-block translate-y-1">
                  <svg viewBox="0 0 24 24" className="inline h-5 w-5"><path d="M7 4h10v3a5 5 0 0 1-10 0V4Zm0 1H4v1a3 3 0 0 0 3 3m10-4h3v1a3 3 0 0 1-3 3M9 12.5h6M12 12v3m-3 4h6l-.5-2h-5L9 19Z" fill="none" stroke="#caa83a" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" /></svg>
                </span>
                .
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
