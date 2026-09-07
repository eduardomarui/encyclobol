import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { players, type Player } from '../data/players'
import { clubHint } from '../data/clubs'
import PlayerInput from '../components/PlayerInput'
import { dailyIndex, dayNumber } from '../lib/daily'
import {
  loadMystCareer,
  loadMystToday,
  recordMystCareer,
  type MystCareer,
} from '../lib/misteriosoStats'
import { confetti } from '../lib/juice'
import { shareScoreImage, type Sq } from '../lib/shareCard'
import { GameHeader, GameTitle, HelpModal, StatGrid } from '../components/GameShell'

const MAX_GUESSES = 8
const HINT_COST = 75
const HELP_KEY = 'encyclobol:misterioso:help'

const CONTINENT: Record<string, string> = {
  Brasil: 'América do Sul',
  Argentina: 'América do Sul',
  Uruguai: 'América do Sul',
  Chile: 'América do Sul',
  Colômbia: 'América do Sul',
  Peru: 'América do Sul',
  Paraguai: 'América do Sul',
  México: 'América do Norte',
  França: 'Europa',
  Holanda: 'Europa',
  Itália: 'Europa',
  Inglaterra: 'Europa',
  Espanha: 'Europa',
  Alemanha: 'Europa',
  Portugal: 'Europa',
  Croácia: 'Europa',
  Bélgica: 'Europa',
  'União Soviética': 'Europa',
  Ucrânia: 'Europa',
  Tchecoslováquia: 'Europa',
  'Rep. Tcheca': 'Europa',
  Suécia: 'Europa',
  Romênia: 'Europa',
  Polônia: 'Europa',
  'País de Gales': 'Europa',
  Noruega: 'Europa',
  Dinamarca: 'Europa',
  Bulgária: 'Europa',
  Hungria: 'Europa',
  Eslováquia: 'Europa',
  Sérvia: 'Europa',
  Bósnia: 'Europa',
  Geórgia: 'Europa',
  'Irlanda do Norte': 'Europa',
  Irlanda: 'Europa',
  Escócia: 'Europa',
  Nigéria: 'África',
  Camarões: 'África',
  Senegal: 'África',
  Marrocos: 'África',
  Libéria: 'África',
  Gabão: 'África',
  Egito: 'África',
  'Costa do Marfim': 'África',
  Argélia: 'África',
  Gana: 'África',
  Mali: 'África',
  Togo: 'África',
  'Coreia do Sul': 'Ásia',
  Japão: 'Ásia',
}
const continentOf = (nat: string) => CONTINENT[nat] ?? '—'
const contShort = (c: string) =>
  ({ 'América do Sul': 'A. Sul', 'América do Norte': 'A. Norte', Europa: 'Europa', África: 'África', Ásia: 'Ásia' })[c] ?? c

function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}
function startYear(era: string): number {
  const m = era.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}
function decadeTag(year: number): string {
  return `'${String(Math.floor(year / 10) * 10).slice(-2)}`
}

function keysOf(p: Player): string[] {
  const tokens = p.display.split(/\s+/)
  return [norm(p.answer), norm(p.display), norm(tokens[tokens.length - 1])]
}
function findPlayer(input: string): Player | null {
  const q = norm(input)
  if (q.length < 2) return null
  return players.find((p) => keysOf(p).includes(q)) ?? null
}

type Row = {
  player: Player
  natOk: boolean
  contOk: boolean
  posOk: boolean
  decadeOk: boolean
  close: boolean
  dir: 'up' | 'down' | 'same'
}

const today = loadMystToday()

export default function Misterioso() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [secret, setSecret] = useState<Player>(() => players[dailyIndex(players.length)])
  const secretYear = useMemo(() => startYear(secret.era), [secret])

  const [rows, setRows] = useState<Row[]>([])
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>(
    today ? (today.won ? 'won' : 'lost') : 'playing',
  )
  const [shareRows, setShareRows] = useState<string[][]>(today?.rows ?? [])
  const [points, setPoints] = useState(today?.points ?? 0)
  const [hints, setHints] = useState<string[]>([])
  const [career, setCareer] = useState<MystCareer>(() => loadMystCareer())
  const [prevBest] = useState(() => loadMystCareer().best)
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
  const over = status !== 'playing'
  const won = status === 'won'
  const guessesLeft = MAX_GUESSES - rows.length
  const newRecord = over && won && daily && points > prevBest

  // Dicas progressivas (cada uma custa pontos).
  const hintPool = useMemo(() => {
    const dec = Math.floor(secretYear / 10) * 10
    const first = secret.display.replace(/[^A-Za-zÀ-ÿ]/g, '')[0]?.toUpperCase() ?? '?'
    return [
      `Posição: ${secret.pos}`,
      `Continente: ${continentOf(secret.nat)}`,
      clubHint[secret.answer] ? `Jogou no ${clubHint[secret.answer]}` : `Estreou nos anos ${dec}`,
      `O nome começa com "${first}"`,
    ]
  }, [secret, secretYear])

  function pedirDica() {
    if (over || hints.length >= hintPool.length) return
    setHints((h) => [...h, hintPool[h.length]])
  }

  function calcPoints(didWin: boolean, guesses: number, usedHints: number): number {
    if (!didWin) return 0
    return Math.max(50, 800 - (guesses - 1) * 90 - usedHints * HINT_COST)
  }

  function finish(didWin: boolean, finalShare: string[][], guesses: number) {
    setStatus(didWin ? 'won' : 'lost')
    const pts = calcPoints(didWin, guesses, hints.length)
    setPoints(pts)
    if (didWin) confetti()
    if (daily && !recorded) {
      setCareer(recordMystCareer({ won: didWin, guesses, points: pts, rows: finalShare }))
      setRecorded(true)
    }
  }

  function tryGuess(text: string) {
    if (over) return
    const p = findPlayer(text)
    if (!p) {
      setNote('Não achei esse craque na enciclopédia.')
      return
    }
    if (rows.some((r) => r.player.answer === p.answer)) {
      setNote('Você já chutou esse.')
      return
    }
    setNote('')

    const gy = startYear(p.era)
    const decadeOk = Math.floor(gy / 10) === Math.floor(secretYear / 10)
    const row: Row = {
      player: p,
      natOk: p.nat === secret.nat,
      contOk: continentOf(p.nat) === continentOf(secret.nat),
      posOk: p.pos === secret.pos,
      decadeOk,
      close: !decadeOk && Math.abs(secretYear - gy) <= 10,
      dir: secretYear > gy ? 'up' : secretYear < gy ? 'down' : 'same',
    }
    const nextRows = [...rows, row]
    setRows(nextRows)

    const sq = `${row.natOk ? '🟩' : '⬛'}${row.contOk ? '🟩' : '⬛'}${row.posOk ? '🟩' : '⬛'}${
      row.decadeOk ? '🟩' : row.close ? '🟨' : '⬛'
    }`
    const nextShare = [...shareRows, [sq]]
    setShareRows(nextShare)

    if (p.answer === secret.answer) finish(true, nextShare, nextRows.length)
    else if (nextRows.length >= MAX_GUESSES) finish(false, nextShare, nextRows.length)
  }

  function praticar() {
    let next = secret
    while (next === secret && players.length > 1)
      next = players[Math.floor(Math.random() * players.length)]
    setMode('practice')
    setSecret(next)
    setRows([])
    setNote('')
    setShareRows([])
    setHints([])
    setPoints(0)
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
    const squares: Sq[][] = rows.map((r) => [
      r.natOk ? 'g' : 'k',
      r.contOk ? 'g' : 'k',
      r.posOk ? 'g' : 'k',
      r.decadeOk ? 'g' : r.close ? 'y' : 'k',
    ])
    const res = await shareScoreImage({
      game: 'Craque Misterioso',
      headline: won ? String(points) : 'X',
      sub: won ? `${shareRows.length}/${MAX_GUESSES} chutes` : 'não desvendou',
      squares,
      lines: [`Total ${career.total} pts`],
      edition: `Edição #${dayNumber()}`,
      text: `Encyclobol · Craque Misterioso #${dayNumber()} — ${won ? points + ' pts' : 'X'} · encyclobol.com.br`,
    })
    if (res !== 'error') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // O que já dá pra afirmar com os chutes feitos (caderno do detetive).
  const clues = useMemo(() => {
    const yes: string[] = []
    const no: string[] = []
    const seen = new Set<string>()
    const push = (arr: string[], v: string) => {
      if (!seen.has(v)) {
        seen.add(v)
        arr.push(v)
      }
    }
    let after = -Infinity
    let before = Infinity
    for (const r of rows) {
      const gy = startYear(r.player.era)
      if (r.natOk) push(yes, r.player.nat)
      else push(no, r.player.nat)
      if (r.contOk) push(yes, continentOf(r.player.nat))
      else push(no, continentOf(r.player.nat))
      if (r.posOk) push(yes, r.player.pos)
      else push(no, r.player.pos)
      if (r.dir === 'up') after = Math.max(after, gy)
      else if (r.dir === 'down') before = Math.min(before, gy)
    }
    // Se a seleção bateu, o continente é redundante; se o continente falhou, as seleções dele também.
    const isCont = (v: string) => Object.values(CONTINENT).includes(v)
    const yesF = yes.filter((v) => !isCont(v) || !yes.some((n) => CONTINENT[n] === v))
    const noF = no.filter((v) => !(CONTINENT[v] && no.includes(CONTINENT[v])))
    let epoch = ''
    if (after > -Infinity && before < Infinity) epoch = `estreou entre ${after + 1} e ${before - 1}`
    else if (after > -Infinity) epoch = `estreou depois de ${after}`
    else if (before < Infinity) epoch = `estreou antes de ${before}`
    return { yes: yesF, no: noF, epoch }
  }, [rows])

  const cellOk = 'bg-grass-600 text-ink-900 border-grass-700'
  const cellClose = 'bg-paper text-ochre-700 border-ochre-500'
  const cellNo = 'bg-paper text-ink-700 border-ink-900/20'
  const col = 'w-[3.4rem] sm:w-16'

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <GameHeader label={daily ? 'Mistério do dia' : 'Modo treino'} onHelp={() => setShowHelp(true)} />

      <main className="container-page flex flex-1 flex-col items-center py-5">
        <GameTitle
          kicker="Detetive · jogo 06"
          title="Craque Misterioso"
          blurb="Chute craques e leia as pistas: seleção, continente, posição e época. Verde acertou; amarelo na época é quente. Menos chutes valem mais pontos."
        />

        {!over && (
          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-1" aria-label={`${guessesLeft} chutes restantes`}>
              {Array.from({ length: MAX_GUESSES }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i < rows.length ? 'bg-ink-900/25' : 'bg-corn-500'}`}
                />
              ))}
            </span>
            <span className="font-cond text-xs font-600 uppercase tracking-wider text-ink-500">
              {guessesLeft} {guessesLeft === 1 ? 'chute' : 'chutes'}
              {daily && <> · recorde {prevBest}</>}
            </span>
          </div>
        )}

        {/* Caderno do detetive: o que já está confirmado e o que já caiu */}
        {!over && rows.length > 0 && (clues.yes.length > 0 || clues.no.length > 0 || clues.epoch) && (
          <div className="mt-3 flex w-full max-w-xl flex-wrap items-center justify-center gap-1.5">
            {clues.yes.map((v) => (
              <span key={`y${v}`} className="border border-grass-600 bg-grass-700/50 px-2 py-0.5 font-cond text-[10px] font-700 uppercase tracking-wide text-ink-900">
                {v}
              </span>
            ))}
            {clues.epoch && (
              <span className="border border-corn-500/60 bg-corn-500/10 px-2 py-0.5 font-cond text-[10px] font-700 uppercase tracking-wide text-corn-400">
                {clues.epoch}
              </span>
            )}
            {clues.no.map((v) => (
              <span key={`n${v}`} className="border border-white/10 px-2 py-0.5 font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500 line-through decoration-ochre-500/70">
                {v}
              </span>
            ))}
          </div>
        )}

        {/* Dicas reveladas */}
        {hints.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {hints.map((h, i) => (
              <span
                key={i}
                className="border border-ink-900/20 bg-paper-100 px-3 py-1 font-cond text-[11px] font-600 uppercase tracking-wide text-ink-700"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 w-full max-w-xl">
          {/* Cabeçalho da tabela */}
          {rows.length > 0 && (
            <div className="flex gap-1 px-1 pb-1 font-cond text-[10px] font-600 uppercase tracking-wide text-ink-500">
              <span className="flex-1">Craque</span>
              <span className={`${col} text-center`}>Seleção</span>
              <span className={`${col} text-center`}>Cont.</span>
              <span className={`${col} text-center`}>Posição</span>
              <span className={`${col} text-center`}>Época</span>
            </div>
          )}

          {/* Linhas de palpite */}
          <div className="space-y-1.5">
            {rows.map((r, i) => (
              <div key={i} className="animate-rise flex gap-1">
                <div className="flex flex-1 items-center border-2 border-ink-900/20 bg-paper px-2 font-cond text-xs font-600 uppercase text-ink-900 sm:text-sm">
                  {r.player.display}
                </div>
                <div className={`flex ${col} items-center justify-center border-2 px-0.5 py-2 text-center font-cond text-[10px] font-600 uppercase leading-tight ${r.natOk ? cellOk : cellNo}`}>
                  {r.player.nat}
                </div>
                <div className={`flex ${col} items-center justify-center border-2 px-0.5 py-2 text-center font-cond text-[10px] font-600 uppercase leading-tight ${r.contOk ? cellOk : cellNo}`}>
                  {contShort(continentOf(r.player.nat))}
                </div>
                <div className={`flex ${col} items-center justify-center border-2 px-0.5 py-2 text-center font-cond text-[10px] font-600 uppercase leading-tight ${r.posOk ? cellOk : cellNo}`}>
                  {r.player.pos}
                </div>
                <div className={`flex ${col} items-center justify-center gap-0.5 border-2 px-0.5 py-2 text-center font-cond text-[11px] font-600 uppercase ${r.decadeOk ? cellOk : r.close ? cellClose : cellNo}`}>
                  {decadeTag(startYear(r.player.era))}
                  {!r.decadeOk && <span>{r.dir === 'up' ? '↑' : '↓'}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Entrada */}
          {!over && (
            <div className="mt-4">
              <PlayerInput options={players} onGuess={tryGuess} placeholder="Digite o nome de um craque…" />
              <div className="mt-2 flex items-center justify-between gap-2">
                {note ? (
                  <span className="font-cond text-xs font-600 uppercase tracking-wider text-ochre-500">{note}</span>
                ) : (
                  <span className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                    {rows.length === 0 ? 'Comece por um craque famoso' : 'Leia as pistas e afine o chute'}
                  </span>
                )}
                <button
                  onClick={pedirDica}
                  disabled={hints.length >= hintPool.length}
                  className="ml-auto btn-stamp border-2 border-white/20 px-3 py-1.5 text-xs text-ink-900 hover:bg-grass-700 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {hints.length >= hintPool.length ? 'Sem mais dicas' : `Pedir dica (−${HINT_COST})`}
                </button>
              </div>
            </div>
          )}

          {/* Fim de jogo */}
          {over && (
            <div className="mt-5 border-2 border-white/20 bg-paper-100 p-6 text-center">
              {newRecord && (
                <p className="animate-pop font-display text-xl uppercase tracking-tight text-grass-600">Novo recorde!</p>
              )}
              <p className="kicker mt-1">{won ? 'Desvendado!' : 'O mistério venceu'}</p>
              <p className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
                {secret.display}
              </p>
              <p className="mt-1 font-serif text-sm italic text-ink-600">
                {secret.nat} · {secret.pos} · {secret.era}
              </p>
              <p className="mt-2 font-display text-5xl text-ink-900">{points}</p>
              <p className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                pontos{won ? ` · ${shareRows.length}/${MAX_GUESSES} chutes` : ''}
                {hints.length > 0 ? ` · ${hints.length} dica${hints.length === 1 ? '' : 's'}` : ''}
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
                    className="btn-stamp mt-4 w-full bg-grass-700 px-6 py-2.5 text-ink-900 hover:bg-grass-600"
                  >
                    {copied ? 'Imagem pronta!' : 'Compartilhar imagem'}
                  </button>
                </>
              )}

              <button
                onClick={praticar}
                className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700"
              >
                {daily ? 'Treinar (sem pontos)' : 'Outro mistério'}
              </button>
              <Link
                to="/"
                className="btn-stamp mt-2 block border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
              >
                Voltar pro almanaque
              </Link>
            </div>
          )}
        </div>
      </main>

      {showHelp && (
        <HelpModal title="Craque Misterioso" onClose={closeHelp}>
              <li>
                Há um craque secreto. Chute nomes; cada chute compara{' '}
                <strong>seleção, continente, posição e época</strong>.
              </li>
              <li>
                <span className="inline-block h-3 w-3 translate-y-0.5 bg-grass-600" /> verde acertou. Na
                época, <span className="inline-block h-3 w-3 translate-y-0.5 bg-paper border border-ochre-500" />{' '}
                <span className="text-ochre-700">amarelo</span> é quente (perto), e a seta diz se o
                secreto é mais <strong>antigo (↓)</strong> ou <strong>recente (↑)</strong>.
              </li>
              <li>
                São {MAX_GUESSES} chutes. <strong>Menos chutes = mais pontos.</strong> Travou? Peça uma{' '}
                <strong>dica</strong> — mas ela <strong>custa {HINT_COST} pts</strong>.
              </li>
              <li>
                Os pontos do dia somam num <strong>total</strong> que cresce a cada dia. Acerte dias
                seguidos pra manter a ofensiva.
              </li>
              <li>
                O <strong>caderno</strong> acima da tabela resume o que você já sabe: em verde o que
                está confirmado, riscado o que já caiu, em dourado a janela de época.
              </li>
        </HelpModal>
      )}
    </div>
  )
}
