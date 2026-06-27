import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { rankingEnabled, ensureSession, getProfile, setNick as apiSetNick } from '../lib/ranking'
import {
  createMatch,
  joinMatch,
  getMatch,
  getMoves,
  rematch,
  submitMove,
  subscribeMatch,
  finishMatch,
  duelShot,
  duelDefense,
  myId,
  type Match,
  type Move,
} from '../lib/duel'
import { PenaltyScene, shotFromOutcome, type Kind } from '../components/PenaltyScene'

const ATTACK_SEC = 10 // tempo pra cobrar
const DEF_SEC = 6 // tempo pra defender (menos — pressão; e perguntas mais difíceis)
const HELP_KEY = 'encyclobol:duelo:help'
type Phase = 'lobby' | 'waiting' | 'play' | 'done'

// ---------- Helpers puros (mesma conta nos dois clientes) ----------
const findMove = (moves: Move[], r: number, pid: string | null) =>
  pid ? moves.find((m) => m.round === r && m.player_id === pid) ?? null : null

function kickerOf(match: Match, r: number) {
  return r % 2 === 0 ? match.host_id : match.guest_id
}
function keeperOf(match: Match, r: number) {
  return r % 2 === 0 ? match.guest_id : match.host_id
}
function roundResolved(moves: Move[], match: Match, r: number) {
  return !!findMove(moves, r, kickerOf(match, r)) && !!findMove(moves, r, keeperOf(match, r))
}
function resolvedCount(moves: Move[], match: Match) {
  let r = 0
  while (roundResolved(moves, match, r)) r++
  return r
}
function outcomeOf(moves: Move[], match: Match, r: number): Kind {
  const sm = findMove(moves, r, kickerOf(match, r))
  const km = findMove(moves, r, keeperOf(match, r))
  if (!sm?.correct) return 'out'
  return km?.correct ? 'save' : 'goal'
}
function scoresOf(moves: Move[], match: Match) {
  const s: Record<string, number> = {}
  const n = resolvedCount(moves, match)
  for (let r = 0; r < n; r++) {
    if (outcomeOf(moves, match, r) === 'goal') {
      const kk = kickerOf(match, r)!
      s[kk] = (s[kk] ?? 0) + 1
    }
  }
  return s
}

export default function Duelo() {
  const [me, setMe] = useState<string | null>(null)
  const [nick, setNickState] = useState<string | null>(null)
  const [nickInput, setNickInput] = useState('')
  const [phase, setPhase] = useState<Phase>('lobby')
  const [match, setMatch] = useState<Match | null>(null)
  const [moves, setMoves] = useState<Move[]>([])
  const [shown, setShown] = useState(0)
  const [revealing, setRevealing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(ATTACK_SEC)
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })
  const cleanup = useRef<(() => void) | null>(null)

  function closeHelp() {
    setShowHelp(false)
    try {
      localStorage.setItem(HELP_KEY, '1')
    } catch {
      /* ignore */
    }
  }
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const seedRef = useRef<number | null>(null)
  const matchId = match?.id

  // Aplica atualização da sala; detecta revanche (seed novo) e zera o jogo.
  function syncMatch(m: Match) {
    setMatch(m)
    if (m.status === 'playing') {
      if (seedRef.current !== null && seedRef.current !== m.seed) {
        setMoves([])
        setShown(0)
        setRevealing(false)
        if (revealTimer.current) clearTimeout(revealTimer.current)
      }
      seedRef.current = m.seed
      // Sala em jogo: entra na partida venha de onde vier (lobby/waiting/done).
      setPhase((ph) => (ph === 'play' ? ph : 'play'))
    }
  }

  useEffect(() => () => {
    if (revealTimer.current) clearTimeout(revealTimer.current)
  }, [])

  // Rede de segurança: revalida jogadas/estado periodicamente e ao voltar pra aba
  // (cobre Realtime perdido quando o navegador suspende a aba em segundo plano).
  useEffect(() => {
    if (!matchId || (phase !== 'play' && phase !== 'waiting')) return
    const tick = async () => {
      mergeMoves(await getMoves(matchId))
      const m = await getMatch(matchId)
      if (m) syncMatch(m)
    }
    tick() // imediato, não espera o primeiro intervalo
    const iv = setInterval(tick, 2000)
    const onVis = () => {
      if (!document.hidden) tick()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onVis)
    return () => {
      clearInterval(iv)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onVis)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, matchId])

  useEffect(() => {
    if (!rankingEnabled) return
    ;(async () => {
      await ensureSession()
      setMe(await myId())
      setNickState((await getProfile())?.nick ?? null)
    })()
    return () => cleanup.current?.()
  }, [])

  function mergeMove(m: Move) {
    setMoves((prev) =>
      prev.some((x) => x.round === m.round && x.player_id === m.player_id) ? prev : [...prev, m],
    )
  }
  function mergeMoves(list: Move[]) {
    setMoves((prev) => {
      const key = (m: Move) => `${m.round}:${m.player_id}`
      const map = new Map(prev.map((m) => [key(m), m]))
      for (const m of list) if (!map.has(key(m))) map.set(key(m), m)
      return Array.from(map.values())
    })
  }
  function listen(id: string) {
    cleanup.current?.()
    cleanup.current = subscribeMatch(id, syncMatch, mergeMove)
  }

  async function salvarNick() {
    const n = nickInput.trim()
    if (n.length < 2) return setMsg('Apelido com pelo menos 2 letras.')
    try {
      setNickState((await apiSetNick(n))?.nick ?? n)
      setMsg('')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }
  async function criar() {
    setBusy(true)
    setMsg('')
    try {
      await ensureSession()
      setMe(await myId())
      const m = await createMatch(5)
      setMatch(m)
      setMoves([])
      setShown(0)
      setPhase('waiting')
      listen(m.id)
    } catch (e) {
      setMsg((e as Error).message || 'Não foi possível criar a sala.')
    } finally {
      setBusy(false)
    }
  }
  async function entrar() {
    const c = code.trim()
    if (c.length < 4) {
      setMsg('Digite o código da sala.')
      return
    }
    setBusy(true)
    setMsg('')
    try {
      await ensureSession()
      setMe(await myId())
      const m = await joinMatch(c)
      const mv = await getMoves(m.id)
      setMoves(mv)
      setShown(resolvedCount(mv, m))
      listen(m.id)
      syncMatch(m)
    } catch (e) {
      const t = (e as Error).message || ''
      setMsg(
        t.includes('nao encontrada')
          ? 'Partida não encontrada — confira o código.'
          : t.includes('cheia')
            ? 'Essa sala já está cheia.'
            : t.includes('encerrada')
              ? 'Essa partida já terminou.'
              : t.includes('apelido')
                ? 'Defina um apelido primeiro.'
                : t || 'Não foi possível entrar.',
      )
    } finally {
      setBusy(false)
    }
  }
  function resetToLobby() {
    cleanup.current?.()
    seedRef.current = null
    setPhase('lobby')
    setMatch(null)
    setMoves([])
    setShown(0)
    setRevealing(false)
    setTimeLeft(ATTACK_SEC)
    setMsg('')
  }

  async function pedirRevanche() {
    if (!match) return
    try {
      const m = await rematch(match.id)
      if (revealTimer.current) clearTimeout(revealTimer.current)
      setMoves([])
      setShown(0)
      setRevealing(false)
      seedRef.current = m.seed
      setMatch(m)
      setPhase('play')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  const resolved = match ? resolvedCount(moves, match) : 0
  const scores = match ? scoresOf(moves, match) : {}
  const amHost = !!(match && me && me === match.host_id)
  const oppId = match ? (amHost ? match.guest_id : match.host_id) : null
  const myScore = (me && scores[me]) || 0
  const oppScore = (oppId && scores[oppId]) || 0
  const myNick = match ? (amHost ? match.host_nick : match.guest_nick) : null
  const oppNick = match ? (amHost ? match.guest_nick : match.host_nick) : null

  const amKicker = !!(match && me && me === kickerOf(match, shown))
  const myMove = match ? findMove(moves, shown, me) : null
  const iMoved = !!myMove
  const question = match && phase === 'play' ? (amKicker ? duelShot(match.seed, shown) : duelDefense(match.seed, shown)) : null

  // Revela a rodada concluída (com animação) e depois avança.
  // O timer fica numa ref pra a re-execução do efeito NÃO cancelá-lo.
  useEffect(() => {
    if (phase !== 'play' || !match || revealing) return
    if (resolved > shown) {
      setRevealing(true)
      revealTimer.current = setTimeout(() => {
        setRevealing(false)
        setShown((s) => s + 1)
      }, 2100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved, shown, revealing, phase, match])

  // Fim de jogo (após revelar tudo): melhor de N + morte súbita.
  useEffect(() => {
    if (phase !== 'play' || !match || revealing) return
    if (shown === resolved && resolved >= match.rounds * 2 && resolved % 2 === 0 && myScore !== oppScore) {
      setPhase('done')
      if (amHost) finishMatch(match.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, resolved, revealing, phase, match])

  // A cada nova cobrança, reinicia o tempo conforme o papel (defesa = menos).
  useEffect(() => {
    if (!match || !me) return
    const iKick = (me === match.host_id) === (shown % 2 === 0)
    setTimeLeft(iKick ? ATTACK_SEC : DEF_SEC)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, matchId, me])

  // Timer da minha resposta (ambos respondem ao mesmo tempo).
  useEffect(() => {
    if (phase !== 'play' || !match || revealing || iMoved) return
    if (timeLeft <= 0) {
      if (me) mergeMove({ match_id: match.id, round: shown, player_id: me, choice: -1, correct: false })
      submitMove(match.id, shown, -1, false)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft, revealing, iMoved, match, shown])

  function responder(i: number) {
    if (!match || !question || iMoved || !me) return
    const correct = i === question.correct
    mergeMove({ match_id: match.id, round: shown, player_id: me, choice: i, correct })
    submitMove(match.id, shown, i, correct)
  }

  function convidar() {
    if (!match) return
    const url = `${window.location.origin}${import.meta.env.BASE_URL}jogos/penaltis/online`
    navigator.clipboard?.writeText(`Te desafiei no Encyclobol! Código da sala: ${match.code}\nEntra em ${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const header = (
    <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/jogos/penaltis" className="flex items-center gap-2 text-ink-900">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto" />
          <span className="font-cond text-sm font-600 uppercase tracking-wider">← Pênaltis</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">Duelo online</span>
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
  )

  if (!rankingEnabled) {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        {header}
        <main className="container-page flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="font-display text-3xl uppercase tracking-tight text-ink-900">Em breve</p>
          <p className="mt-2 max-w-sm font-serif italic text-ink-600">O duelo online precisa do servidor configurado.</p>
        </main>
      </div>
    )
  }

  const pairNo = Math.floor(shown / 2) + 1
  const sceneKind: Kind = match ? outcomeOf(moves, match, shown) : 'out'
  const sceneShot = match ? shotFromOutcome(sceneKind, match.seed + shown) : null

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {header}
      <main className="container-page flex flex-1 flex-col items-center py-5">
        {phase !== 'play' && (
          <>
            <p className="kicker">Multiplayer · jogo 02</p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
              Duelo de Pênaltis
            </h1>
          </>
        )}

        {!nick && (
          <div className="mt-8 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-6">
            <p className="kicker">Antes de jogar</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink-900">Seu apelido</h2>
            <div className="mt-4 flex gap-2">
              <input
                value={nickInput}
                onChange={(e) => setNickInput(e.target.value.slice(0, 20))}
                placeholder="Apelido"
                className="flex-1 border-2 border-ink-900 bg-paper px-4 py-2.5 font-cond uppercase tracking-wide text-ink-900 outline-none"
              />
              <button onClick={salvarNick} className="btn-stamp bg-grass-600 px-5 py-2.5 text-paper hover:bg-grass-700">
                Salvar
              </button>
            </div>
            {msg && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-600">{msg}</p>}
          </div>
        )}

        {nick && phase === 'lobby' && (
          <div className="mt-8 w-full max-w-sm space-y-4">
            <button onClick={criar} disabled={busy} className="btn-stamp w-full bg-grass-600 px-6 py-3 text-paper hover:bg-grass-700 disabled:opacity-50">
              {busy ? 'Criando…' : 'Criar partida'}
            </button>
            <div className="border-2 border-ink-900 bg-paper-100 p-4">
              <p className="kicker">Entrar numa sala</p>
              <div className="mt-2 flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
                  placeholder="Código"
                  className="flex-1 border-2 border-ink-900 bg-paper px-4 py-2.5 font-cond uppercase tracking-[0.2em] text-ink-900 outline-none"
                />
                <button onClick={entrar} disabled={busy} className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper disabled:opacity-50">
                  {busy ? 'Entrando…' : 'Entrar'}
                </button>
              </div>
            </div>
            {msg && <p className="font-cond text-xs uppercase tracking-wider text-ochre-600">{msg}</p>}
          </div>
        )}

        {phase === 'waiting' && match && (
          <div className="mt-8 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">Sala criada</p>
            <p className="mt-2 font-display text-5xl tracking-[0.1em] text-ink-900">{match.code}</p>
            <p className="mt-2 font-serif text-sm italic text-ink-600">Mande o código pro amigo. Começa quando ele entrar.</p>
            <button onClick={convidar} className="btn-stamp mt-4 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600">
              {copied ? 'Copiado!' : 'Convidar amigo'}
            </button>
            <p className="mt-3 font-cond text-xs uppercase tracking-wider text-ink-500">Aguardando adversário…</p>
          </div>
        )}

        {phase === 'play' && match && match.guest_id && (
          <div className="w-full max-w-md">
            <div className="grid grid-cols-2 gap-2">
              {[
                { nm: myNick, sc: myScore, mine: true },
                { nm: oppNick, sc: oppScore, mine: false },
              ].map((p, idx) => (
                <div key={idx} className={`border-2 px-3 py-1.5 text-center ${p.mine ? 'border-grass-700 bg-grass-600/10' : 'border-ink-900 bg-paper-100'}`}>
                  <div className="truncate font-cond text-[11px] font-700 uppercase tracking-wide text-ink-800">
                    {p.nm ?? '—'} {p.mine && <span className="text-grass-600">(você)</span>}
                  </div>
                  <div className="font-display text-3xl text-ink-900">{p.sc}</div>
                </div>
              ))}
            </div>

            <p className="mt-2 text-center font-cond text-xs font-600 uppercase tracking-[0.16em] text-ink-500">
              {shown >= match.rounds * 2 ? 'Morte súbita' : `Cobrança ${pairNo}/${match.rounds}`} ·{' '}
              <span className={amKicker ? 'text-grass-600' : 'text-ochre-600'}>{amKicker ? 'Você bate' : 'Você defende'}</span>
            </p>

            {/* Campo sempre visível: goleiro parado enquanto espera, anima quando os dois respondem */}
            <div className="mt-2 flex w-full justify-center">
              <PenaltyScene shot={revealing ? sceneShot : null} animKey={shown} compact />
            </div>

            {revealing ? null : iMoved ? (
              <p className="mt-2 text-center font-serif text-sm italic text-ink-600">
                Você respondeu ✓ — esperando o adversário {amKicker ? 'defender' : 'bater'}…
              </p>
            ) : question ? (
              <>
                <div className="mx-auto mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-paper-300">
                  <div className={`h-full transition-[width] duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-ochre-500' : 'bg-grass-600'}`} style={{ width: `${(timeLeft / (amKicker ? ATTACK_SEC : DEF_SEC)) * 100}%` }} />
                </div>
                <h2 className="mt-2 text-center font-serif text-base leading-snug text-ink-900 sm:text-lg">{question.q}</h2>
                <div className="mt-2 grid gap-1.5">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => responder(i)}
                      className="flex items-center gap-3 border-2 border-ink-900/25 bg-paper px-3 py-2 text-left font-serif text-[15px] transition-colors hover:border-ink-900 hover:bg-paper-100"
                    >
                      <span className="font-cond text-xs font-700">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}

        {phase === 'play' && match && !match.guest_id && (
          <p className="mt-8 font-cond text-sm uppercase tracking-wider text-ink-500">Conectando…</p>
        )}

        {phase === 'done' && match && (
          <div className="mt-8 w-full max-w-sm border-2 border-ink-900 bg-paper-100 p-6 text-center">
            <p className="kicker">{myScore > oppScore ? 'Você venceu!' : 'Você perdeu'}</p>
            <p className="mt-1 font-display text-6xl text-ink-900">
              {myScore} <span className="text-ink-500">×</span> {oppScore}
            </p>
            <p className="mt-1 font-serif text-base italic text-ink-600">
              {myScore > oppScore ? 'Frieza na cobrança e mão firme na defesa!' : 'Faltou pontaria. Revanche?'}
            </p>
            <button onClick={pedirRevanche} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Revanche
            </button>
            {msg && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-600">{msg}</p>}
            <button onClick={resetToLobby} className="btn-stamp mt-2 w-full border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper">
              Sair da sala
            </button>
            <Link to="/jogos/penaltis" className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper">
              Voltar
            </Link>
          </div>
        )}

        {(phase === 'waiting' || phase === 'play') && (
          <button onClick={resetToLobby} className="mt-8 font-cond text-xs uppercase tracking-wider text-ink-500 underline">
            Sair da sala
          </button>
        )}
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4" onClick={closeHelp}>
          <div className="w-full max-w-sm border-2 border-ink-900 bg-paper p-6" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Como funciona</p>
            <h2 className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
              Duelo 1×1
            </h2>
            <ul className="mt-4 space-y-3 font-serif text-[15px] leading-snug text-ink-700">
              <li>
                Em cada cobrança, <strong>um bate e o outro defende</strong> — e isso{' '}
                <strong>alterna</strong> a cada rodada.
              </li>
              <li>
                <span className="text-grass-700">Quem bate:</span> acertou a pergunta = <strong>vai no gol</strong>;
                errou = chuta <strong>pra fora</strong>.
              </li>
              <li>
                <span className="text-ochre-600">Quem defende:</span> acertou = <strong>defendeu</strong>; errou ={' '}
                <strong>gol</strong> do adversário. (A defesa tem <strong>menos tempo</strong> e perguntas mais difíceis.)
              </li>
              <li>
                Os dois respondem <strong>ao mesmo tempo</strong>. O lance (a animação) só acontece{' '}
                <strong>quando os dois respondem</strong>.
              </li>
              <li>É melhor de 5 cobranças — empatou, vai pra <strong>morte súbita</strong>.</li>
            </ul>
            <button onClick={closeHelp} className="btn-stamp mt-6 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Entendi, bora
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
