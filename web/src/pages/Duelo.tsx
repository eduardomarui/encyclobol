import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { rankingEnabled, ensureSession, getProfile, setNick as apiSetNick } from '../lib/ranking'
import {
  createMatch,
  joinMatch,
  getMoves,
  submitMove,
  subscribeMatch,
  finishMatch,
  duelShot,
  duelDefense,
  myId,
  type Match,
  type Move,
} from '../lib/duel'

const DUEL_SEC = 10

type Phase = 'lobby' | 'waiting' | 'play' | 'done'

export default function Duelo() {
  const [me, setMe] = useState<string | null>(null)
  const [nick, setNickState] = useState<string | null>(null)
  const [nickInput, setNickInput] = useState('')
  const [phase, setPhase] = useState<Phase>('lobby')
  const [match, setMatch] = useState<Match | null>(null)
  const [moves, setMoves] = useState<Move[]>([])
  const [localRound, setLocalRound] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(DUEL_SEC)
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const cleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!rankingEnabled) return
    ;(async () => {
      await ensureSession()
      setMe(await myId())
      const p = await getProfile()
      setNickState(p?.nick ?? null)
    })()
    return () => {
      cleanup.current?.()
    }
  }, [])

  function mergeMove(m: Move) {
    setMoves((prev) =>
      prev.some((x) => x.round === m.round && x.player_id === m.player_id) ? prev : [...prev, m],
    )
  }

  function listen(id: string) {
    cleanup.current?.()
    cleanup.current = subscribeMatch(
      id,
      (m) => {
        setMatch(m)
        if (m.status === 'playing') setPhase((ph) => (ph === 'waiting' ? 'play' : ph))
      },
      (mv) => mergeMove(mv),
    )
  }

  async function salvarNick() {
    const n = nickInput.trim()
    if (n.length < 2) {
      setMsg('Apelido com pelo menos 2 letras.')
      return
    }
    try {
      const p = await apiSetNick(n)
      setNickState(p?.nick ?? n)
      setMsg('')
    } catch (e) {
      setMsg((e as Error).message)
    }
  }

  async function criar() {
    setBusy(true)
    setMsg('')
    try {
      const m = await createMatch(5)
      setMatch(m)
      setMoves([])
      setLocalRound(0)
      setPhase('waiting')
      listen(m.id)
    } catch (e) {
      setMsg((e as Error).message)
    }
    setBusy(false)
  }

  async function entrar() {
    setBusy(true)
    setMsg('')
    try {
      const m = await joinMatch(code)
      setMatch(m)
      setMoves(await getMoves(m.id))
      setLocalRound(0)
      setPhase('play')
      listen(m.id)
    } catch (e) {
      const t = (e as Error).message
      setMsg(t.includes('nao encontrada') ? 'Partida não encontrada.' : t)
    }
    setBusy(false)
  }

  function resetToLobby() {
    cleanup.current?.()
    setPhase('lobby')
    setMatch(null)
    setMoves([])
    setLocalRound(0)
    setSelected(null)
    setTimeLeft(DUEL_SEC)
    setMsg('')
  }

  const moveOf = (round: number, pid: string | null) =>
    pid ? moves.find((m) => m.round === round && m.player_id === pid) ?? null : null

  // Quem bate alterna a cada cobrança (par = host, ímpar = guest).
  const kickerId = match ? (localRound % 2 === 0 ? match.host_id : match.guest_id) : null
  const keeperId = match ? (localRound % 2 === 0 ? match.guest_id : match.host_id) : null
  const amKicker = !!(me && me === kickerId)

  const shotMove = moveOf(localRound, kickerId)
  const defMove = moveOf(localRound, keeperId)
  const onTarget = shotMove?.correct === true
  const roundResolved = !!shotMove && (shotMove.correct === false || !!defMove)
  const myTurn = amKicker ? !shotMove : onTarget && !defMove
  const iMoved = amKicker ? !!shotMove : !!defMove

  const amHost = !!(match && me && me === match.host_id)
  const myNick = match ? (amHost ? match.host_nick : match.guest_nick) : null
  const oppNick = match ? (amHost ? match.guest_nick : match.host_nick) : null

  const { myScore, oppScore, completed } = useMemo(() => {
    if (!match || !me) return { myScore: 0, oppScore: 0, completed: 0 }
    const score: Record<string, number> = {}
    let c = 0
    const maxR = Math.max(localRound, ...moves.map((m) => m.round), 0)
    for (let r = 0; r <= maxR; r++) {
      const kk = r % 2 === 0 ? match.host_id : match.guest_id
      const kp = r % 2 === 0 ? match.guest_id : match.host_id
      if (!kk) continue
      const sm = moveOf(r, kk)
      const km = moveOf(r, kp)
      const resolved = sm && (!sm.correct || km)
      if (resolved) c++
      if (sm?.correct && km && !km.correct) score[kk] = (score[kk] ?? 0) + 1
    }
    const opp = amHost ? match.guest_id : match.host_id
    return { myScore: score[me] ?? 0, oppScore: (opp && score[opp]) || 0, completed: c }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, match, me, localRound, amHost])

  const question = match && myTurn ? (amKicker ? duelShot(match.seed, localRound) : duelDefense(match.seed, localRound)) : null

  // Timer só corre quando é a MINHA vez. Estourou = errei (chute fora / não defendi).
  useEffect(() => {
    if (phase !== 'play' || !match || !myTurn || iMoved) return
    if (timeLeft <= 0) {
      submitMove(match.id, localRound, -1, false)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft, myTurn, iMoved, match, localRound])

  // Rodada resolvida → revela e avança (ou encerra).
  useEffect(() => {
    if (phase !== 'play' || !roundResolved || !match) return
    const t = setTimeout(() => {
      const decided = completed >= match.rounds * 2 && completed % 2 === 0 && myScore !== oppScore
      if (decided) {
        setPhase('done')
        if (amHost) finishMatch(match.id)
      } else {
        setLocalRound((r) => r + 1)
        setSelected(null)
        setTimeLeft(DUEL_SEC)
      }
    }, 1700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundResolved, phase, match])

  function responder(i: number) {
    if (!match || !question || iMoved) return
    setSelected(i)
    submitMove(match.id, localRound, i, i === question.correct)
  }

  function copiarCodigo() {
    if (!match) return
    navigator.clipboard?.writeText(
      `Te desafiei na Copa de Pênaltis do Encyclobol! Código da sala: ${match.code} · encyclobol.com.br`,
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mensagem de status quando não é a minha vez (assistindo) ou na revelação.
  let status = ''
  if (phase === 'play' && match) {
    if (roundResolved) {
      status = !shotMove?.correct ? 'Chutou pra fora!' : defMove?.correct ? 'Defendeu!' : 'GOL!'
    } else if (!shotMove) {
      status = amKicker ? '' : 'O adversário vai bater…'
    } else if (onTarget && !defMove) {
      status = amKicker ? 'No alvo! Vai que não defendem…' : ''
    }
  }

  const header = (
    <header className="sticky top-0 z-10 border-b-2 border-ink-900 bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/jogos/penaltis" className="flex items-center gap-2 text-ink-900">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto" />
          <span className="font-cond text-sm font-600 uppercase tracking-wider">← Pênaltis</span>
        </Link>
        <span className="font-cond text-xs font-500 uppercase tracking-[0.16em] text-ink-600">Duelo online</span>
      </div>
    </header>
  )

  if (!rankingEnabled) {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        {header}
        <main className="container-page flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="font-display text-3xl uppercase tracking-tight text-ink-900">Em breve</p>
          <p className="mt-2 max-w-sm font-serif italic text-ink-600">
            O duelo online precisa do servidor configurado. Volte logo.
          </p>
        </main>
      </div>
    )
  }

  const pairNo = Math.floor(localRound / 2) + 1

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {header}
      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Multiplayer · jogo 02</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Duelo de Pênaltis
        </h1>

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
            <button
              onClick={criar}
              disabled={busy}
              className="btn-stamp w-full bg-grass-600 px-6 py-3 text-paper hover:bg-grass-700 disabled:opacity-50"
            >
              Criar partida
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
                <button
                  onClick={entrar}
                  disabled={busy}
                  className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper disabled:opacity-50"
                >
                  Entrar
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
            <p className="mt-2 font-serif text-sm italic text-ink-600">
              Mande o código pro amigo. O jogo começa quando ele entrar.
            </p>
            <button onClick={copiarCodigo} className="btn-stamp mt-4 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600">
              {copied ? 'Copiado!' : 'Convidar amigo'}
            </button>
            <p className="mt-3 font-cond text-xs uppercase tracking-wider text-ink-500">Aguardando adversário…</p>
          </div>
        )}

        {phase === 'play' && match && match.guest_id && (
          <div className="mt-6 w-full max-w-md">
            {/* Placar */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { nm: myNick, sc: myScore, mine: true },
                { nm: oppNick, sc: oppScore, mine: false },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className={`border-2 px-3 py-2 text-center ${p.mine ? 'border-grass-700 bg-grass-600/10' : 'border-ink-900 bg-paper-100'}`}
                >
                  <div className="truncate font-cond text-xs font-700 uppercase tracking-wide text-ink-800">
                    {p.nm ?? '—'} {p.mine && <span className="text-grass-600">(você)</span>}
                  </div>
                  <div className="font-display text-4xl text-ink-900">{p.sc}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center font-cond text-xs font-600 uppercase tracking-[0.16em] text-ink-500">
              {completed >= match.rounds * 2 ? 'Morte súbita' : `Cobrança ${pairNo}/${match.rounds}`} ·{' '}
              <span className={amKicker ? 'text-grass-600' : 'text-ochre-600'}>
                {amKicker ? 'Você bate' : 'Você defende'}
              </span>
            </p>

            {/* Minha vez: pergunta */}
            {myTurn && question ? (
              <>
                <div className="mx-auto mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-paper-300">
                  <div
                    className={`h-full transition-[width] duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-ochre-500' : 'bg-grass-600'}`}
                    style={{ width: `${(timeLeft / DUEL_SEC) * 100}%` }}
                  />
                </div>
                <p className="mt-4 kicker text-ink-500">
                  {amKicker ? 'Sua cobrança' : 'Sua defesa (difícil)'} · {question.cat}
                </p>
                <h2 className="mt-1 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">{question.q}</h2>
                <div className="mt-3 grid gap-2">
                  {question.options.map((opt, i) => {
                    let cls = 'border-ink-900/25 bg-paper hover:border-ink-900 hover:bg-paper-100'
                    if (iMoved) {
                      if (i === question.correct) cls = 'border-grass-700 bg-grass-600 text-paper'
                      else if (i === selected) cls = 'border-ochre-600 bg-ochre-500 text-paper'
                      else cls = 'border-ink-900/15 bg-paper opacity-60'
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => responder(i)}
                        disabled={iMoved}
                        className={`flex items-center gap-3 border-2 px-4 py-2.5 text-left font-serif text-base transition-colors ${cls}`}
                      >
                        <span className="font-cond text-xs font-700">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              // Assistindo / revelação
              <div className="mt-8 flex min-h-[160px] flex-col items-center justify-center text-center">
                {status ? (
                  <span
                    className={`animate-pop rounded-sm px-5 py-2 font-display text-3xl uppercase tracking-tight text-paper ${
                      status === 'GOL!' ? 'bg-grass-600' : 'bg-ochre-500'
                    }`}
                  >
                    {status}
                  </span>
                ) : (
                  <p className="font-cond text-sm uppercase tracking-wider text-ink-500">
                    {amKicker ? 'Esperando a defesa…' : 'O adversário vai bater…'}
                  </p>
                )}
              </div>
            )}
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
            <button onClick={resetToLobby} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Jogar de novo
            </button>
            <Link
              to="/jogos/penaltis"
              className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
            >
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
    </div>
  )
}
