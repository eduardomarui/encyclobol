import { useEffect, useState } from 'react'
import { intruso, type IntrusoCat } from '../data/intruso'
import { dayNumber, seededShuffle } from '../lib/daily'
import {
  loadIntrusoCareer,
  loadIntrusoToday,
  recordIntrusoCareer,
  type IntrusoCareer,
} from '../lib/intrusoStats'
import { confetti } from '../lib/juice'
import { shareScoreImage } from '../lib/shareCard'
import { players } from '../data/players'
import { GameHeader, GameTitle, HelpModal, Lives, StatGrid, NextUp, TimeBar, ChallengeBanner, TreinoTag } from '../components/GameShell'
import { treinosRestantes, usarTreino } from '../lib/treino'
import { clearRun, loadRun, saveRun } from '../lib/runSave'
import { buzz, sfx } from '../lib/sfx'
import { buildElos, tierOf, type EloOptions } from '../lib/intrusoElos'
import { challengeLink } from '../lib/challenge'

const LIVES = 3
// Caçada do dia tem fim: 10 rodadas. O infinito fica no treino.
const DAILY_ROUNDS = 10
const COMBO_CAP = 3
const REASON_BONUS = 50
// As 3 primeiras rodadas são só "ache o intruso" (um toque): o elo entra na 4ª.
const ELO_FROM = 3
// Relógio: 15 s pra achar o intruso, 10 s pra cravar o elo. Rapidez vale até +30.
const ROUND_SEC = 15
const ELO_SEC = 10
const SPEED_MAX = 30
const TIER_LABEL = { 1: 'fácil', 2: 'médio', 3: 'difícil' } as const
const HELP_KEY = 'encyclobol:intruso:help'

// `cats`: todos os elos verdadeiros dos outros três (qualquer um vale o bônus).
type Round = {
  players: string[]
  intruderIdx: number
  rule: string
  cat: IntrusoCat
  cats: IntrusoCat[]
  elo: EloOptions | null // opções específicas; null = cai nas 4 categorias
  tier: 1 | 2 | 3
}

// Ficha curta (seleção · posição · época) mostrada na revelação, pra ficar
// claro o que cada um é — e por que o intruso não pertence ao grupo.
const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().replace(/[^A-Z]/g, '')
function metaFor(name: string): string | null {
  const n = norm(name)
  const p =
    players.find((x) => norm(x.display) === n) ??
    players.find((x) => x.answer === n) ??
    players.find((x) => norm(x.display).endsWith(n))
  return p ? `${p.nat} · ${p.pos} · ${p.era}` : null
}

function makeRounds(picks: number[], seedBase: number): Round[] {
  return picks.map((bi, qi) => {
    const base = intruso[bi]
    const players = seededShuffle(base.players, seedBase + qi * 17)
    return {
      players,
      intruderIdx: players.indexOf(base.intruder),
      rule: base.rule,
      cat: base.cat,
      cats: [base.cat, ...((base as { alsoCat?: IntrusoCat[] }).alsoCat ?? [])],
      elo: buildElos(players, players.indexOf(base.intruder), base.rule, seedBase + qi * 31, base.cat),
      tier: tierOf(base.cat, base.players),
    }
  })
}
// Caçada do dia: 10 rodadas do óbvio ao traiçoeiro (3 fáceis, 4 médias, 3 difíceis).
const TIERS = intruso.map((p) => tierOf(p.cat, p.players))
function dailyDeck(): Round[] {
  const s = dayNumber() * 131 + 1
  const byTier = (t: number) => seededShuffle(intruso.map((_, i) => i).filter((i) => TIERS[i] === t), s + t)
  const want: [number, number][] = [[1, 3], [2, 4], [3, 3]]
  const used = new Set<number>()
  const order: number[] = []
  for (const [t, n] of want) for (const i of byTier(t).slice(0, n)) (used.add(i), order.push(i))
  // Se algum nível tiver poucos puzzles, completa com o resto, mantendo o fim difícil.
  const rest = seededShuffle(intruso.map((_, i) => i).filter((i) => !used.has(i)), s + 9)
  while (order.length < DAILY_ROUNDS && rest.length) order.splice(order.length - 3, 0, rest.shift()!)
  return makeRounds(order, s)
}
function practiceDeck(): Round[] {
  const all = intruso.map((_, i) => i)
  const s = Math.floor(Math.random() * 1e9) + 1
  const order = [...seededShuffle(all, s), ...seededShuffle(all, s + 7), ...seededShuffle(all, s + 13)]
  return makeRounds(order, s)
}

type IntrRun = { index: number; lives: number; points: number; caught: number; combo: number; bestCombo: number }

export default function Intruso() {
  // Estado do dia lido a cada montagem + corrida salva a cada rodada (F5 retoma).
  const [today] = useState(loadIntrusoToday)
  const [saved] = useState(() => (today ? null : loadRun<IntrRun>('intruso')))
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [rounds, setRounds] = useState<Round[]>(dailyDeck)
  const [index, setIndex] = useState(saved?.index ?? 0)
  const [lives, setLives] = useState(saved?.lives ?? LIVES)
  const [points, setPoints] = useState(today?.points ?? saved?.points ?? 0)
  const [caught, setCaught] = useState(today?.run ?? saved?.caught ?? 0)
  const [combo, setCombo] = useState(saved?.combo ?? 0)
  const [bestCombo, setBestCombo] = useState(saved?.bestCombo ?? 0)
  const [step, setStep] = useState<'intruder' | 'reason' | 'revealed'>('intruder')
  const [selIntruder, setSelIntruder] = useState<number | null>(null)
  const [selElo, setSelElo] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_SEC)
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

  // Rodada respondida = já conta: salva como se tivesse avançado.
  useEffect(() => {
    if (!daily) return
    if (over) clearRun('intruso')
    else if (step !== 'intruder') saveRun<IntrRun>('intruso', { index: index + 1, lives, points, caught, combo, bestCombo })
  }, [daily, over, step, index, lives, points, caught, combo, bestCombo])

  // Voltou com a corrida já sem vidas (fechou antes do "Ver resultado"): encerra e grava.
  useEffect(() => {
    if (saved && (saved.lives <= 0 || saved.index >= DAILY_ROUNDS)) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    setStatus('over')
    if ((daily && points > prevBest && points > 0) || points >= 300) {
      confetti()
      sfx.fanfare()
      buzz.win()
    }
    if (daily && !recorded) {
      setCareer(recordIntrusoCareer(points, caught))
      setRecorded(true)
    }
  }

  // Avança a rodada (ou encerra se acabaram as vidas) — no clique do jogador.
  function advance() {
    if (lives <= 0 || (daily && index + 1 >= DAILY_ROUNDS)) {
      finish()
      return
    }
    setIndex((i) => i + 1)
    setStep('intruder')
    setSelIntruder(null)
    setSelElo(null)
    setTimeLeft(ROUND_SEC)
  }

  // Relógio da rodada (pausa com a ajuda aberta). Zerou = errou.
  useEffect(() => {
    if (over || showHelp || (step !== 'intruder' && step !== 'reason')) return
    if (timeLeft <= 0) {
      if (step === 'intruder') pickIntruder(-1)
      else pickElo(-1)
      return
    }
    if (timeLeft <= 3) sfx.tickHot()
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, step, over, showHelp])

  // Acerto passa rápido; erro fica mais, que é quando se aprende a regra.
  const revealMs = selIntruder === current?.intruderIdx && (reasonGot || index < ELO_FROM || !current?.elo) ? 1500 : 3400

  // Depois da revelação o jogo segue sozinho (o botão só adianta).
  useEffect(() => {
    if (step !== 'revealed' || over) return
    const t = setTimeout(advance, revealMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, index])

  function pickIntruder(i: number) {
    if (step !== 'intruder' || !current) return
    setSelIntruder(i)
    if (i === current.intruderIdx) {
      const nc = combo + 1
      const speed = Math.round((SPEED_MAX * timeLeft) / ROUND_SEC)
      const gain = 80 + Math.min(nc, COMBO_CAP) * 20 + speed
      setCombo(nc)
      setBestCombo((b) => Math.max(b, nc))
      setCaught((c) => c + 1)
      setPoints((p) => p + gain)
      setLastGain(gain)
      // Sem etapa do elo nas 3 primeiras e no tema Clube (ver buildElos).
      if (index < ELO_FROM || !current.elo) {
        setReasonGot(false)
        setStep('revealed')
      } else {
        setStep('reason')
        setTimeLeft(ELO_SEC)
      }
      sfx.ok(nc)
      buzz.ok()
    } else {
      setCombo(0)
      setReasonGot(false)
      setLives((l) => l - 1)
      sfx.lifeLost()
      buzz.life()
      setStep('revealed')
    }
  }

  function pickElo(i: number) {
    if (step !== 'reason' || !current?.elo) return
    setSelElo(i)
    const ok = i === current.elo.correct
    setReasonGot(ok)
    if (ok) {
      setPoints((p) => p + REASON_BONUS)
      sfx.stamp()
    } else sfx.nearMiss()
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
    setSelElo(null)
    setTimeLeft(ROUND_SEC)
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

  async function compartilhar() {
    const r = await shareScoreImage({
      game: 'O Intruso',
      stamp: newRecord ? 'Recorde' : undefined,
      headline: String(points),
      sub: newRecord ? 'novo recorde!' : 'pontos',
      lines: [`${caught} intrusos caçados`, `Total ${career.total} pts`],
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · O Intruso #${dayNumber()} — ${points} pts · ${caught} caçados · ${challengeLink('/jogos/o-intruso', points)}`,
    })
    if (r !== 'error') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <GameHeader label={daily ? 'Caçada do dia' : 'Modo treino'} onHelp={() => setShowHelp(true)} />

      <main className="container-page flex flex-1 flex-col items-center py-5">
        <GameTitle
          kicker="Dedução · jogo 05"
          title="O Intruso"
          blurb="Três craques têm algo em comum, um não. Ache o infiltrado — e depois crave o porquê. Erre o intruso e perde vida; vá o mais longe que conseguir."
        />
        <ChallengeBanner game="O Intruso" mine={points} over={over} />

        {/* HUD */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="font-display text-2xl text-corn-500">
            {points}
            <span className="ml-1 font-cond text-xs font-500 uppercase tracking-wide text-ink-500">pts</span>
          </span>
          <span className="font-cond text-sm font-600 uppercase tracking-wider text-ink-700">
            Caçados: <span className="text-grass-500">{caught}</span>
          </span>
          {combo >= 2 && (
            <span className="animate-pop rounded-sm bg-corn-500 px-2 py-0.5 font-cond text-xs font-700 uppercase tracking-wider text-paper">
              combo x{combo}
            </span>
          )}
          <Lives total={LIVES} left={lives} />
        </div>

        {daily && !over && (
          <div className="mt-2 flex items-center gap-2 font-cond text-xs font-600 uppercase tracking-wider">
            <span className="text-ink-500">
              Recorde: <span className="text-ink-800">{prevBest}</span> pts
            </span>
            {beating && (
              <span className="animate-pop rounded-sm bg-grass-600 px-2 py-0.5 text-ink-900">Novo recorde!</span>
            )}
          </div>
        )}

        {/* Rodada */}
        {!over && current && (
          <div className="mt-6 w-full max-w-xl">
            <div className="flex items-baseline justify-between">
              <span className="font-cond text-[11px] font-600 uppercase tracking-[0.16em] text-ink-500">
                Rodada {String(index + 1).padStart(2, '0')}{daily ? ` de ${DAILY_ROUNDS}` : ''} ·{' '}
                <span className={current.tier === 3 ? 'text-ochre-400' : current.tier === 2 ? 'text-corn-500' : 'text-grass-400'}>
                  {TIER_LABEL[current.tier]}
                </span>
              </span>
              <p className="font-serif text-base italic text-ink-700 sm:text-lg">
                {step === 'reason' ? 'Agora: qual é o elo?' : 'Quem não pertence?'}
              </p>
            </div>
            {/* O tema da rodada: o intruso é o que foge DESSE traço (títulos,
                continente etc. não contam), então a resposta é uma só. */}
            <p className="mt-1.5 text-center">
              <span className="inline-block border border-corn-500/60 px-2 py-0.5 font-cond text-[11px] font-700 uppercase tracking-[0.18em] text-corn-400">
                Tema: {current.cats[0]}
              </span>
            </p>
            {(step === 'intruder' || step === 'reason') && (
              <div className="mt-2 flex items-center gap-2">
                <TimeBar left={timeLeft} total={step === 'intruder' ? ROUND_SEC : ELO_SEC} danger={3} />
                <span className={`w-5 text-right font-display text-base leading-none tabular-nums ${timeLeft <= 3 ? 'animate-pulse text-ochre-400' : 'text-ink-700'}`}>
                  {timeLeft}
                </span>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2">
              {current.players.map((name, i) => {
                const revealedRound = step !== 'intruder'
                let cls = 'border-ink-900/25 bg-paper hover:-translate-y-0.5 hover:border-white/30 hover:bg-paper-100'
                if (revealedRound) {
                  if (i === current.intruderIdx) cls = 'animate-pop border-corn-500 bg-corn-500 text-paper'
                  else if (i === selIntruder) cls = 'border-ochre-600 bg-ochre-500 text-ink-900'
                  else cls = 'border-grass-600/60 bg-grass-700/40 text-ink-900'
                }
                // A ficha só aparece depois do elo — antes, entregava a resposta.
                const meta = step === 'revealed' ? metaFor(name) : null
                return (
                  <button
                    key={name}
                    onClick={() => pickIntruder(i)}
                    disabled={revealedRound}
                    className={`flex min-h-[60px] flex-col items-center justify-center border-2 px-3 py-2 text-center transition-all ${cls}`}
                  >
                    <span className="font-cond text-sm font-600 uppercase leading-tight">{name}</span>
                    {meta && <span className="mt-1 font-cond text-[10px] font-500 uppercase tracking-wide opacity-80">{meta}</span>}
                    {revealedRound && i === current.intruderIdx && (
                      <span className="mt-1 font-cond text-[9px] font-700 uppercase tracking-[0.16em]">intruso</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* 2ª etapa: o elo dos outros três */}
            {(step === 'reason' || step === 'revealed') && current.elo && (
              <div className="mt-4">
                <p className="text-center font-serif text-sm italic text-ink-600">
                  {step === 'reason' ? `O que liga os outros três? (+${REASON_BONUS})` : 'O elo era:'}
                </p>
                <div className="mt-2 grid gap-2">
                  {current.elo.options.map((txt, i) => {
                    let cls = 'border-ink-900/25 bg-paper hover:border-white/30 hover:bg-paper-100'
                    if (step === 'revealed') {
                      if (i === current.elo!.correct) cls = 'border-grass-700 bg-grass-600 text-ink-900'
                      else if (i === selElo) cls = 'border-ochre-600 bg-ochre-500 text-ink-900'
                      else cls = 'border-ink-900/15 bg-paper opacity-50'
                    }
                    return (
                      <button
                        key={txt}
                        onClick={() => pickElo(i)}
                        disabled={step !== 'reason'}
                        className={`min-h-[44px] border-2 px-3 py-2 text-left font-serif text-[15px] leading-snug transition-colors ${cls}`}
                      >
                        {txt}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 'revealed' && (
              <div className="mt-4 text-center">
                <p className="font-serif text-base italic text-ink-700">
                  {selIntruder === current.intruderIdx ? (
                    <span className="text-grass-400">
                      Acertou! +{lastGain}
                      {index < ELO_FROM || !current.elo ? '' : reasonGot ? ` +${REASON_BONUS} (elo certo)` : ' (elo errado)'} ·{' '}
                    </span>
                  ) : (
                    <span className="text-ochre-400">
                      {selIntruder === -1 ? 'Tempo esgotado. ' : ''}Era <strong>{current.players[current.intruderIdx]}</strong> · perdeu uma vida ·{' '}
                    </span>
                  )}
                  {current.rule}
                </p>
                <button
                  onClick={advance}
                  className="btn-stamp relative mt-4 overflow-hidden bg-grass-600 px-8 py-2.5 text-ink-900 hover:bg-grass-700"
                >
                  <span key={index} className="animate-drain absolute inset-x-0 bottom-0 h-1 bg-corn-400" style={{ animationDuration: `${revealMs}ms` }} />
                  {lives <= 0 || (daily && index + 1 >= DAILY_ROUNDS) ? 'Ver resultado →' : 'Continuar →'}
                </button>
                {index + 1 === ELO_FROM && selIntruder === current.intruderIdx && (
                  <p className="mt-2 animate-pop font-cond text-xs font-700 uppercase tracking-wider text-corn-400">Agora vale o elo: +{REASON_BONUS} por rodada</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fim de jogo */}
        {over && (
          <div className="mt-8 w-full max-w-md border-2 border-white/20 bg-paper-100 p-6 text-center">
            <p className="kicker">Fim da caçada{mode === 'practice' && ' · treino'}</p>
            {newRecord && (
              <p className="mt-2 animate-pop font-display text-2xl uppercase tracking-tight text-grass-400">
                Novo recorde!
              </p>
            )}
            <p className="mt-1 font-display text-6xl text-ink-900">{points}</p>
            <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
              pontos · {caught} caçados{bestCombo >= 3 ? ` · melhor combo x${bestCombo}` : ''}
            </p>

            {daily && (
              <>
                <StatGrid
                  items={[
                    ['Total', career.total],
                    ['Recorde', career.best],
                    ['Ofensiva', career.streak],
                    ['Dias', career.days],
                  ]}
                />
                <p className="mt-3 font-serif text-sm italic text-ink-600">Volte amanhã pra somar mais ao total.</p>
                <button
                  onClick={compartilhar}
                  className="btn-stamp mt-4 w-full bg-corn-500 px-6 py-3 text-paper hover:bg-corn-400"
                >
                  {copied ? 'Imagem pronta!' : 'Compartilhar imagem'}
                </button>
              </>
            )}

            <button
              onClick={() => usarTreino('intruso') && jogarTreino()}
                disabled={!treinosRestantes('intruso')}
              className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 disabled:opacity-40"
            >
              {daily ? 'Treinar (sem pontos)' : 'Outra caçada'}
            <TreinoTag game="intruso" />
                </button>
            <NextUp current="intruso" />
          </div>
        )}
      </main>

      {showHelp && (
        <HelpModal title="O Intruso" cta="Entendi, bora caçar" onClose={closeHelp}>
              <li>
                São 4 craques: <strong>3 têm algo em comum</strong> e <strong>1 é o infiltrado</strong>. O{' '}
                <strong>tema</strong> da rodada (clube, seleção, posição ou época) diz onde procurar.
                Ache o intruso em até <strong>{ROUND_SEC} segundos</strong> — quanto mais rápido, mais pontos.
              </li>
              <li>
                A partir da {ELO_FROM + 1}ª rodada, depois de achar o intruso, diga{' '}
                <strong>o que liga os outros três</strong>, entre três opções (+{REASON_BONUS}). Só uma é verdadeira. No tema clube, basta achar o intruso.
              </li>
              <li>
                Acertos seguidos viram combo (até x{COMBO_CAP}). Errar ou deixar o tempo zerar{' '}
                <strong>custa uma vida</strong> — são {LIVES}.
              </li>
              <li>
                A caçada do dia tem <strong>{DAILY_ROUNDS} rodadas</strong>, do fácil ao difícil. No treino é
                infinito. Os pontos somam num <strong>total</strong> que cresce sempre.
              </li>
        </HelpModal>
      )}
    </div>
  )
}
