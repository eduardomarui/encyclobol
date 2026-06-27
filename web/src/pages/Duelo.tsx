import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { rankingEnabled, ensureSession, getProfile, setNick as apiSetNick } from '../lib/ranking'
import {
  createMatch,
  joinMatch,
  getMatch,
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
type Kind = 'goal' | 'save' | 'out'

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

// ---------- Cena animada ----------
function Scene({ kind, dir }: { kind: Kind; dir: 0 | 1 | 2 }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 60)
    return () => clearTimeout(t)
  }, [])
  const sideX = [22, 50, 78][dir]
  // bola: 'out' vai por cima; 'goal'/'save' vão pro canto
  const ballX = kind === 'out' ? sideX : sideX
  const ballY = kind === 'out' ? 4 : 30
  // goleiro: defende = no canto da bola; gol = canto oposto; fora = chuta a esmo
  const keeperX = kind === 'save' ? sideX : kind === 'goal' ? [78, 50, 22][dir] : [50, 22, 78][dir]
  const label = kind === 'goal' ? 'GOL!' : kind === 'save' ? 'DEFENDEU!' : 'PRA FORA!'
  return (
    <div className={`relative mx-auto h-52 w-full max-w-sm overflow-hidden rounded-sm border-2 border-ink-900 ${go && kind !== 'out' ? 'animate-shake' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#9ec7d8] via-[#86b98f] to-grass-700" />
      {/* gol */}
      <div className="absolute left-[10%] top-[14%] w-[80%]">
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="h-24 w-full">
          <g stroke="#f2eee2" strokeWidth="0.4" opacity="0.5">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={i} x1={4 + i * 9.2} y1="4" x2={4 + i * 9.2} y2="42" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="4" y1={4 + i * 8} x2="96" y2={4 + i * 8} />
            ))}
          </g>
          <path d="M4 42 V4 H96 V42" fill="none" stroke="#f2eee2" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>
      {/* goleiro */}
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${go ? keeperX : 50}%`, top: '42%', transition: 'left .5s cubic-bezier(.3,1.2,.5,1)' }}
      >
        <svg viewBox="0 0 40 44" className="h-20 w-20">
          <circle cx="20" cy="9" r="5" fill="#e8c39e" />
          <path d="M13 16 Q20 12 27 16 L26 32 Q20 35 14 32 Z" fill="#caa83a" />
          <path d="M20 18 L6 14" stroke="#caa83a" strokeWidth="5" strokeLinecap="round" />
          <path d="M20 18 L34 14" stroke="#caa83a" strokeWidth="5" strokeLinecap="round" />
          <circle cx="6" cy="14" r="4" fill="#f2eee2" stroke="#16130d" strokeWidth="1" />
          <circle cx="34" cy="14" r="4" fill="#f2eee2" stroke="#16130d" strokeWidth="1" />
        </svg>
      </div>
      {/* bola */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${go ? ballX : 50}%`,
          top: `${go ? ballY : 86}%`,
          transition: 'left .6s ease-out, top .6s ease-out',
        }}
      >
        <div style={{ animation: go ? 'ballspin .4s linear infinite' : 'none' }}>
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-paper drop-shadow">
            <circle cx="12" cy="12" r="10" fill="currentColor" stroke="#16130d" strokeWidth="1.5" />
            <path d="M12 6l3 2-1 3h-4l-1-3z" fill="#16130d" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center">
        <span className={`animate-pop rounded-sm px-4 py-1.5 font-display text-2xl uppercase tracking-tight text-paper ${kind === 'goal' ? 'bg-grass-600' : 'bg-ochre-500'}`}>
          {label}
        </span>
      </div>
    </div>
  )
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
  const [timeLeft, setTimeLeft] = useState(DUEL_SEC)
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const cleanup = useRef<(() => void) | null>(null)
  const matchId = match?.id

  // Rede de segurança: revalida jogadas/estado periodicamente e ao voltar pra aba
  // (cobre Realtime perdido quando o navegador suspende a aba em segundo plano).
  useEffect(() => {
    if (!matchId || (phase !== 'play' && phase !== 'waiting')) return
    const tick = async () => {
      mergeMoves(await getMoves(matchId))
      const m = await getMatch(matchId)
      if (m) {
        setMatch(m)
        if (m.status === 'playing') setPhase((ph) => (ph === 'waiting' ? 'play' : ph))
      }
    }
    const iv = setInterval(tick, 2500)
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
    cleanup.current = subscribeMatch(
      id,
      (m) => {
        setMatch(m)
        if (m.status === 'playing') setPhase((ph) => (ph === 'waiting' ? 'play' : ph))
      },
      mergeMove,
    )
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
      const m = await createMatch(5)
      setMatch(m)
      setMoves([])
      setShown(0)
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
      const mv = await getMoves(m.id)
      setMatch(m)
      setMoves(mv)
      setShown(resolvedCount(mv, m))
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
    setShown(0)
    setRevealing(false)
    setTimeLeft(DUEL_SEC)
    setMsg('')
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
  useEffect(() => {
    if (phase !== 'play' || !match || revealing) return
    if (resolved > shown) {
      setRevealing(true)
      const t = setTimeout(() => {
        setRevealing(false)
        setTimeLeft(DUEL_SEC)
        setShown((s) => s + 1)
      }, 2100)
      return () => clearTimeout(t)
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
          <p className="mt-2 max-w-sm font-serif italic text-ink-600">O duelo online precisa do servidor configurado.</p>
        </main>
      </div>
    )
  }

  const pairNo = Math.floor(shown / 2) + 1
  const sceneKind = match ? outcomeOf(moves, match, shown) : 'out'
  const sceneDir = match ? ((match.seed + shown * 7) % 3) as 0 | 1 | 2 : 1

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
            <button onClick={criar} disabled={busy} className="btn-stamp w-full bg-grass-600 px-6 py-3 text-paper hover:bg-grass-700 disabled:opacity-50">
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
                <button onClick={entrar} disabled={busy} className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper disabled:opacity-50">
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
            <p className="mt-2 font-serif text-sm italic text-ink-600">Mande o código pro amigo. Começa quando ele entrar.</p>
            <button onClick={convidar} className="btn-stamp mt-4 w-full bg-ink-900 px-6 py-2.5 text-paper hover:bg-grass-600">
              {copied ? 'Copiado!' : 'Convidar amigo'}
            </button>
            <p className="mt-3 font-cond text-xs uppercase tracking-wider text-ink-500">Aguardando adversário…</p>
          </div>
        )}

        {phase === 'play' && match && match.guest_id && (
          <div className="mt-6 w-full max-w-md">
            <div className="grid grid-cols-2 gap-2">
              {[
                { nm: myNick, sc: myScore, mine: true },
                { nm: oppNick, sc: oppScore, mine: false },
              ].map((p, idx) => (
                <div key={idx} className={`border-2 px-3 py-2 text-center ${p.mine ? 'border-grass-700 bg-grass-600/10' : 'border-ink-900 bg-paper-100'}`}>
                  <div className="truncate font-cond text-xs font-700 uppercase tracking-wide text-ink-800">
                    {p.nm ?? '—'} {p.mine && <span className="text-grass-600">(você)</span>}
                  </div>
                  <div className="font-display text-4xl text-ink-900">{p.sc}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center font-cond text-xs font-600 uppercase tracking-[0.16em] text-ink-500">
              {shown >= match.rounds * 2 ? 'Morte súbita' : `Cobrança ${pairNo}/${match.rounds}`} ·{' '}
              <span className={amKicker ? 'text-grass-600' : 'text-ochre-600'}>{amKicker ? 'Você bate' : 'Você defende'}</span>
            </p>

            {revealing ? (
              <div className="mt-3">
                <Scene kind={sceneKind} dir={sceneDir} />
              </div>
            ) : iMoved ? (
              <div className="mt-8 flex min-h-[140px] flex-col items-center justify-center text-center">
                <p className="font-cond text-sm uppercase tracking-wider text-ink-500">Respondido! Aguardando o adversário…</p>
              </div>
            ) : question ? (
              <>
                <div className="mx-auto mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-paper-300">
                  <div className={`h-full transition-[width] duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-ochre-500' : 'bg-grass-600'}`} style={{ width: `${(timeLeft / DUEL_SEC) * 100}%` }} />
                </div>
                <p className="mt-4 kicker text-ink-500">{amKicker ? 'Sua cobrança' : 'Sua defesa (difícil)'} · {question.cat}</p>
                <h2 className="mt-1 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">{question.q}</h2>
                <div className="mt-3 grid gap-2">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => responder(i)}
                      className="flex items-center gap-3 border-2 border-ink-900/25 bg-paper px-4 py-2.5 text-left font-serif text-base transition-colors hover:border-ink-900 hover:bg-paper-100"
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
            <button onClick={resetToLobby} className="btn-stamp mt-5 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700">
              Jogar de novo
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
    </div>
  )
}
