import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GameHeader, HelpModal, TimeBar } from '../components/GameShell'
import { PenaltyScene, makeShot, type Outcome, type Shot } from '../components/PenaltyScene'
import { duelDefense, duelShot, type PQ } from '../lib/duel'
import { ensureSession, getProfile, rankingEnabled, setNick as apiSetNick } from '../lib/ranking'
import {
  DIVISIONS,
  ROUNDS,
  currentSeason,
  daysLeftInSeason,
  divisionOf,
  divisionProgress,
  botGhost,
  findGhost,
  queueJoin,
  queueLeave,
  queuePoll,
  rankedBoard,
  rankedMe,
  rankedMissing,
  seasonLabel,
  submitRanked,
  type Answer,
  type BoardRow,
  type Ghost,
  type RankedProfile,
} from '../lib/ranked'
import { buzz, sfx } from '../lib/sfx'
import { confetti } from '../lib/juice'
import { shareScoreImage } from '../lib/shareCard'
import { siteLink } from '../lib/site'

const ATTACK_SEC = 10
const DEF_SEC = 6
const HELP_KEY = 'encyclobol:ranqueada:help'

type Phase = 'lobby' | 'queue' | 'loading' | 'play' | 'done'
const QUEUE_SEC = 12 // espera por um adversário ao vivo antes de cair no fantasma

function DivisionBadge({ rating, big = false }: { rating: number; big?: boolean }) {
  const d = divisionOf(rating)
  const tone = d.id === 'elite' ? 'bg-corn-500 text-paper' : d.id === 'a' ? 'bg-grass-500 text-paper' : 'border-2 border-white/25 text-ink-900'
  return (
    <span className={`inline-flex items-center rounded-sm font-cond font-700 uppercase tracking-wider ${tone} ${big ? 'px-3 py-1 text-base' : 'px-1.5 py-0.5 text-[10px]'}`}>
      {d.name}
    </span>
  )
}

export default function Ranqueada() {
  const season = currentSeason()
  const [phase, setPhase] = useState<Phase>('lobby')
  const [nick, setNick] = useState<string | null>(null)
  const [nickInput, setNickInput] = useState('')
  const [me, setMe] = useState<RankedProfile | null>(null)
  const [board, setBoard] = useState<BoardRow[]>([])
  const [msg, setMsg] = useState('')
  const [ghost, setGhost] = useState<Ghost | null>(null)
  const [round, setRound] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeLeft, setTimeLeft] = useState(ATTACK_SEC)
  const [selected, setSelected] = useState<number | null>(null)
  const [shot, setShot] = useState<Shot>(null)
  const [myGoals, setMyGoals] = useState<boolean[]>([])
  const [oppGoals, setOppGoals] = useState<boolean[]>([])
  const [final, setFinal] = useState<(RankedProfile & { delta: number; before: number }) | null>(null)
  // Treino contra o robô: funciona sem banco e não mexe na nota.
  const [practice, setPractice] = useState(false)
  const [queueLeft, setQueueLeft] = useState(QUEUE_SEC)
  const queueOn = useRef(false)
  const navigate = useNavigate()
  const startedAt = useRef(0)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  // Entra, garante sessão anônima, lê apelido, nota da temporada e tabela.
  useEffect(() => {
    if (!rankingEnabled) return
    ;(async () => {
      try {
        await ensureSession()
        const p = await getProfile()
        setNick(p?.nick ?? null)
        if (p?.nick) {
          setMe(await rankedMe(season))
          setBoard(await rankedBoard(season))
        }
      } catch (e) {
        setMsg((e as Error).message)
      }
    })()
  }, [season])

  const iKick = (r: number, g: Ghost) => (r % 2 === 0) !== g.kicksEven
  const question: PQ | null =
    ghost && phase === 'play' ? (iKick(round, ghost) ? duelShot(ghost.seed, round) : duelDefense(ghost.seed, round)) : null

  // Relógio da pergunta.
  useEffect(() => {
    if (phase !== 'play' || !ghost || selected !== null || showHelp) return
    if (timeLeft <= 0) {
      answer(-1)
      return
    }
    if (timeLeft <= 3) sfx.tickHot()
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, selected, ghost, showHelp])

  async function salvarNick() {
    const n = nickInput.trim()
    if (n.length < 2) return setMsg('Apelido com pelo menos 2 letras.')
    try {
      const p = await apiSetNick(n)
      setNick(p?.nick ?? n)
      setMe(await rankedMe(season))
      setBoard(await rankedBoard(season))
      setMsg('')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  function comecarCom(g: Ghost) {
    setGhost(g)
    setRound(0)
    setAnswers([])
    setMyGoals([])
    setOppGoals([])
    setSelected(null)
    setShot(null)
    setFinal(null)
    setTimeLeft(iKick(0, g) ? ATTACK_SEC : DEF_SEC)
    startedAt.current = Date.now()
    sfx.whistle()
    setPhase('play')
  }

  function treinarRobo() {
    setPractice(true)
    comecarCom(botGhost(me?.rating ?? 900, Math.random() < 0.5))
  }

  // 1) Fila ao vivo por até QUEUE_SEC; 2) senão, fantasma; 3) senão, robô.
  async function jogar() {
    if (!me) return
    setPractice(false)
    setMsg('')
    setPhase('queue')
    setQueueLeft(QUEUE_SEC)
    queueOn.current = true
    const ao = (id: string) => {
      queueOn.current = false
      sfx.whistle()
      navigate(`/jogos/penaltis/online?m=${id}`)
    }
    try {
      const now = await queueJoin(season)
      if (now) return ao(now)
      const t0 = Date.now()
      while (queueOn.current && Date.now() - t0 < QUEUE_SEC * 1000) {
        await new Promise((r) => setTimeout(r, 1500))
        setQueueLeft(Math.max(0, QUEUE_SEC - Math.round((Date.now() - t0) / 1000)))
        const id = await queuePoll()
        if (id) return ao(id)
      }
      if (!queueOn.current) return // cancelou
      const late = await queueLeave()
      if (late) return ao(late)
      queueOn.current = false
      setPhase('loading')
      comecarCom(await findGhost(me.rating, season))
    } catch (e) {
      queueOn.current = false
      setMsg((e as Error).message)
      setPhase('lobby')
    }
  }

  async function cancelarFila() {
    queueOn.current = false
    const late = await queueLeave().catch(() => null)
    if (late) return navigate(`/jogos/penaltis/online?m=${late}`)
    setPhase('lobby')
  }

  // Saiu da página com a fila aberta: tira da fila.
  useEffect(
    () => () => {
      if (queueOn.current) queueLeave().catch(() => {})
    },
    [],
  )

  function answer(choice: number) {
    if (!ghost || !question || selected !== null) return
    const kicking = iKick(round, ghost)
    const c = choice === question.correct
    setSelected(choice)
    const mine: Answer = { r: round, c, ms: Date.now() - startedAt.current }
    const next = [...answers, mine]
    setAnswers(next)

    // Resultado do lance: quem bate precisa acertar; quem defende, se acertar, pega.
    const theirs = ghost.answers.find((a) => a.r === round)?.c ?? false
    const kickerOk = kicking ? c : theirs
    const keeperOk = kicking ? theirs : c
    const o: Outcome = !kickerOk ? (['post', 'wide', 'over'] as Outcome[])[(ghost.seed + round) % 3] : keeperOk ? 'save' : 'goal'
    const goal = o === 'goal'
    const good = kicking ? goal : !goal
    const label = kicking ? undefined : goal ? 'TOMOU GOL' : o === 'save' ? 'VOCÊ PEGOU!' : 'PRA FORA!'
    setShot(makeShot(o, { seed: ghost.seed + round * 7, good, label, fast: kicking && goal && timeLeft >= (ATTACK_SEC * 2) / 3 }))
    const myG = kicking ? [...myGoals, goal] : myGoals
    const opG = kicking ? oppGoals : [...oppGoals, goal]
    setMyGoals(myG)
    setOppGoals(opG)

    setTimeout(() => {
      const nr = round + 1
      if (nr >= ROUNDS) return fechar(next, myG, opG)
      setRound(nr)
      setSelected(null)
      setShot(null)
      setTimeLeft(iKick(nr, ghost) ? ATTACK_SEC : DEF_SEC)
      startedAt.current = Date.now()
    }, 2300)
  }

  async function fechar(all: Answer[], myG: boolean[], opG: boolean[]) {
    if (!ghost || !me) return
    const a = myG.filter(Boolean).length
    const b = opG.filter(Boolean).length
    const result: 0 | 0.5 | 1 = a > b ? 1 : a === b ? 0.5 : 0
    setPhase('done')
    if (practice) return
    try {
      const r = await submitRanked({ ghost, answers: all, result, season })
      setFinal({ ...r, before: me.rating })
      setMe(r)
      setBoard(await rankedBoard(season))
      if (result === 1) {
        sfx.fanfare()
        buzz.win()
        if (divisionOf(r.rating).id !== divisionOf(me.rating).id) confetti()
      }
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  // Card do resultado com a divisão: "Subi pra Série B" é o que se posta.
  const [shared, setShared] = useState(false)
  async function compartilhar() {
    if (!ghost || !final) return
    const subiu = divisionOf(final.rating).id !== divisionOf(final.before).id && final.rating > final.before
    const div = divisionOf(final.rating).name
    const r = await shareScoreImage({
      game: 'Ranqueada · Pênaltis',
      stamp: subiu ? 'Acesso' : undefined,
      headline: `${my} × ${opp}`,
      sub: subiu ? `subi pra ${div}` : `${my > opp ? 'vitória' : my === opp ? 'empate' : 'derrota'} contra ${ghost.nick}`,
      lines: [`${div} · ${final.rating} pts`, seasonLabel(season)],
      text: subiu
        ? `Subi pra ${div} na ranqueada do Encyclobol. Vem me encarar: ${siteLink('/jogos/penaltis/ranqueada')}`
        : `${div} na ranqueada do Encyclobol (${final.rating} pts). Vem me encarar: ${siteLink('/jogos/penaltis/ranqueada')}`,
    })
    if (r !== 'error') {
      setShared(true)
      setTimeout(() => setShared(false), 2500)
    }
  }

  function closeHelp() {
    setShowHelp(false)
    try {
      localStorage.setItem(HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const my = myGoals.filter(Boolean).length
  const opp = oppGoals.filter(Boolean).length
  const header = <GameHeader label="Ranqueada" onHelp={() => setShowHelp(true)} backTo="/jogos/penaltis" backLabel="Pênaltis" />

  if ((!rankingEnabled || rankedMissing()) && phase === 'lobby') {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        {header}
        <main className="container-page flex flex-1 flex-col items-center py-10 text-center">
          <p className="kicker">Ranqueada</p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight text-ink-900">Quase lá</h1>
          <p className="mt-3 max-w-sm font-serif text-ink-600">A ranqueada liga assim que o banco da temporada for ativado. Enquanto isso, jogue a Copa do dia.</p>
          <button onClick={treinarRobo} className="btn-stamp mt-6 bg-grass-600 px-6 py-3 text-ink-900 hover:bg-grass-700">Treinar contra o robô →</button>
          <Link to="/jogos/penaltis" className="btn-stamp mt-2 border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700">Ir pra Copa</Link>
        </main>
      </div>
    )
  }

  const kicking = ghost ? iKick(round, ghost) : true
  const prog = me ? divisionProgress(me.rating) : 0
  const div = me ? divisionOf(me.rating) : DIVISIONS[0]

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {header}
      <main className="container-page flex flex-1 flex-col items-center py-3 sm:py-5">
        {/* Sem apelido ainda */}
        {nick === null && rankingEnabled && !rankedMissing() && phase === 'lobby' && (
          <div className="mt-6 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-5">
            <p className="kicker">Antes de jogar</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink-900">Seu apelido</h2>
            <div className="mt-4 flex gap-2">
              <input
                value={nickInput}
                onChange={(e) => setNickInput(e.target.value.slice(0, 20))}
                placeholder="Apelido"
                className="flex-1 border-2 border-white/20 bg-paper px-4 py-2.5 font-cond uppercase tracking-wide text-ink-900 outline-none focus:border-corn-500"
              />
              <button onClick={salvarNick} className="btn-stamp bg-grass-600 px-5 text-ink-900 hover:bg-grass-700">Salvar</button>
            </div>
          </div>
        )}

        {/* Vestiário: divisão, temporada e tabela */}
        {nick && (phase === 'lobby' || phase === 'loading') && (
          <div className="w-full max-w-md">
            <p className="kicker text-center">{seasonLabel(season)} · faltam {daysLeftInSeason()} dias</p>
            <div className="mt-3 border-2 border-white/20 bg-paper-100 p-5 text-center">
              {me ? (
                <>
                  <DivisionBadge rating={me.rating} big />
                  <p className="mt-2 font-display text-5xl leading-none text-ink-900">{me.rating}</p>
                  <p className="font-cond text-[11px] font-500 uppercase tracking-wider text-ink-500">
                    pontos de ranking · {me.wins}V {me.draws}E {me.losses}D
                  </p>
                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-900/10">
                      <div className="h-full bg-corn-500 transition-[width] duration-700" style={{ width: `${prog * 100}%` }} />
                    </div>
                    <p className="mt-1 font-cond text-[11px] font-600 uppercase tracking-wider text-ink-600">
                      {div.next ? `Faltam ${div.next - me.rating} pts pro acesso` : 'Você está na Elite'}
                    </p>
                  </div>
                  <button onClick={jogar} disabled={phase === 'loading'} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-3 text-ink-900 hover:bg-grass-700 disabled:opacity-50">
                    {phase === 'loading' ? 'Chamando o adversário…' : 'Jogar ranqueada →'}
                  </button>
                </>
              ) : (
                <p className="font-serif italic text-ink-600">Carregando sua temporada…</p>
              )}
            </div>
            {msg && <p className="mt-2 text-center font-cond text-xs uppercase tracking-wider text-ochre-400">{msg}</p>}
            <button onClick={treinarRobo} className="mt-2 w-full text-center font-cond text-xs font-600 uppercase tracking-wider text-ink-500 hover:text-corn-500">
              Treinar contra o robô (não vale pontos)
            </button>

            <h2 className="mt-6 font-display text-xl uppercase tracking-tight text-ink-900">Tabela da temporada</h2>
            {board.length === 0 ? (
              <p className="mt-2 font-serif text-sm italic text-ink-600">Ninguém jogou ainda nesta temporada. Seja o primeiro.</p>
            ) : (
              <ol className="mt-2 divide-y divide-white/10 border-2 border-white/20">
                {board.map((b, i) => (
                  <li key={i} className={`flex items-center gap-2 px-3 py-2 ${b.is_me ? 'bg-corn-500/10' : ''}`}>
                    <span className="w-6 font-display text-lg text-ink-500">{i + 1}</span>
                    <span className="flex-1 truncate font-cond text-sm font-600 uppercase tracking-wide text-ink-900">
                      {b.nick}
                      {b.is_me && <span className="text-corn-500"> (você)</span>}
                    </span>
                    <DivisionBadge rating={b.rating} />
                    <span className="w-12 text-right font-display text-lg text-ink-900">{b.rating}</span>
                  </li>
                ))}
              </ol>
            )}
            <p className="mt-3 font-serif text-xs italic text-ink-500">
              No fim do mês a temporada vira: sua nota encolhe pela metade em direção à Série D e a briga recomeça.
            </p>
          </div>
        )}

        {/* Procurando adversário ao vivo */}
        {phase === 'queue' && (
          <div className="mt-6 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-6 text-center">
            <p className="kicker">Procurando adversário ao vivo</p>
            <p className="mt-2 font-display text-6xl leading-none text-ink-900">{queueLeft}</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10">
              <div className="h-full bg-corn-500 transition-[width] duration-1000 ease-linear" style={{ width: `${(queueLeft / QUEUE_SEC) * 100}%` }} />
            </div>
            <p className="mt-3 font-serif text-sm italic text-ink-600">
              Se ninguém do seu nível aparecer, você enfrenta a partida gravada de um jogador parecido.
            </p>
            <button onClick={cancelarFila} className="btn-stamp mt-4 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
              Cancelar
            </button>
          </div>
        )}

        {/* Partida */}
        {phase === 'play' && ghost && question && (
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between border-2 border-white/20 bg-grass-700 px-3 py-2">
              <div>
                <p className="font-cond text-[10px] font-700 uppercase tracking-wider text-grass-400">Você</p>
                <p className="font-display text-2xl leading-none text-ink-900">{my}</p>
              </div>
              <p className="font-cond text-[11px] font-600 uppercase tracking-wider text-ink-700">
                Cobrança {Math.floor(round / 2) + 1}/5
              </p>
              <div className="text-right">
                <p className="truncate font-cond text-[10px] font-700 uppercase tracking-wider text-ochre-400">{ghost.nick} · {ghost.rating}</p>
                <p className="font-display text-2xl leading-none text-ink-900">{opp}</p>
              </div>
            </div>
            <p className="mt-2 text-center font-cond text-xs font-600 uppercase tracking-[0.16em]">
              <span className={kicking ? 'text-grass-400' : 'text-ochre-400'}>{kicking ? 'Você bate' : 'Você defende · difícil'}</span>
            </p>
            <div className="mt-2 flex justify-center">
              <PenaltyScene shot={shot} animKey={round} compact />
            </div>
            <div className="mt-3">
              <div className="mb-1.5 flex items-center gap-2">
                <TimeBar left={timeLeft} total={kicking ? ATTACK_SEC : DEF_SEC} danger={3} />
                <span className={`w-5 text-right font-display text-base leading-none tabular-nums ${timeLeft <= 3 ? 'animate-pulse text-ochre-400' : 'text-ink-700'}`}>{timeLeft}</span>
              </div>
              <p className="kicker text-ink-500">{question.cat}</p>
              <h2 className="mt-1 font-serif text-lg leading-snug text-ink-900">{question.q}</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {question.options.map((opt, i) => {
                  let cls = 'border-ink-900/25 bg-paper hover:border-white/20 hover:bg-paper-100'
                  if (selected !== null) {
                    if (i === question.correct) cls = 'border-grass-700 bg-grass-600 text-ink-900'
                    else if (i === selected) cls = 'border-ochre-600 bg-ochre-500 text-ink-900'
                    else cls = 'border-ink-900/15 bg-paper opacity-60'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      disabled={selected !== null}
                      className={`flex min-h-[56px] items-center gap-2 border-2 px-3 py-2 text-left font-serif text-[15px] leading-snug transition-colors ${cls}`}
                    >
                      <span className="font-cond text-xs font-700 text-ink-500">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Fim */}
        {phase === 'done' && ghost && (
          <div className="mt-4 w-full max-w-sm border-2 border-white/20 bg-paper-100 p-6 text-center">
            <p className="kicker">{my > opp ? 'Vitória' : my === opp ? 'Empate' : 'Derrota'} contra {ghost.nick}</p>
            <p className="mt-1 font-display text-6xl leading-none text-ink-900">
              {my} <span className="text-ink-500">×</span> {opp}
            </p>
            {practice ? (
              <p className="mt-3 font-serif italic text-ink-600">Treino contra o robô: não vale pontos de ranking.</p>
            ) : final ? (
              <>
                <p className={`mt-3 font-display text-3xl ${final.delta >= 0 ? 'text-grass-400' : 'text-ochre-400'}`}>
                  {final.delta >= 0 ? '+' : ''}
                  {final.delta} pts
                </p>
                <p className="font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
                  {final.before} → {final.rating}
                </p>
                {divisionOf(final.rating).id !== divisionOf(final.before).id && (
                  <p className="mt-3 animate-pop font-display text-2xl uppercase tracking-tight text-corn-500">
                    {final.rating > final.before ? 'Acesso! ' : 'Rebaixado pra '}
                    {divisionOf(final.rating).name}
                  </p>
                )}
                <div className="mt-3">
                  <DivisionBadge rating={final.rating} big />
                </div>
              </>
            ) : (
              <p className="mt-3 font-serif italic text-ink-600">{msg || 'Lançando o resultado na súmula…'}</p>
            )}
            {final && !practice && (
              <button onClick={compartilhar} className="btn-stamp mt-5 w-full bg-corn-500 px-6 py-3 text-paper hover:bg-corn-400">
                {shared ? 'Imagem pronta!' : 'Compartilhar resultado'}
              </button>
            )}
            <button onClick={practice ? treinarRobo : jogar} className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-3 text-ink-900 hover:bg-grass-700">
              Jogar outra →
            </button>
            <button onClick={() => setPhase('lobby')} className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
              Ver a tabela
            </button>
          </div>
        )}
      </main>

      {showHelp && (
        <HelpModal title="Ranqueada" onClose={closeHelp}>
          <li>
            Você enfrenta um jogador de <strong>nível parecido</strong>: as respostas dele ficaram gravadas, e você
            joga as mesmas perguntas no papel contrário. Quando ele bateu, você defende.
          </li>
          <li>
            <strong>Bater:</strong> acertou, a bola vai no gol (se ele acertou a defesa, ele pega).{' '}
            <strong>Defender:</strong> pergunta mais difícil e com menos tempo.
          </li>
          <li>
            Vitória dá pontos, derrota tira. Os pontos te levam da <strong>Série D</strong> até a{' '}
            <strong>Elite</strong>.
          </li>
          <li>
            Cada mês é uma <strong>temporada</strong>. Na virada, a nota encolhe e a disputa por acesso recomeça.
          </li>
        </HelpModal>
      )}
    </div>
  )
}
