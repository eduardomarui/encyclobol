import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { players, type Player } from '../data/players'
import { clubHint } from '../data/clubs'
import { dailyIndex, dayNumber } from '../lib/daily'
import {
  loadMystDaily,
  loadMystStats,
  recordMyst,
  saveMystDaily,
  type MystStats,
} from '../lib/misteriosoStats'
import { BallMark } from '../components/landing/Icons'
import { confetti } from '../lib/juice'

const MAX_GUESSES = 8

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

function decadeLabel(year: number): string {
  return `Anos ${Math.floor(year / 10) * 10}`
}

// Chaves de busca por jogador (sobrenome, nome completo, último token).
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
  posOk: boolean
  decadeOk: boolean
  dir: 'up' | 'down' | 'same'
}

const saved = loadMystDaily()

export default function Misterioso() {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily')
  const [secret, setSecret] = useState<Player>(() => players[dailyIndex(players.length)])
  const secretYear = useMemo(() => startYear(secret.era), [secret])

  const [rows, setRows] = useState<Row[]>([])
  const [input, setInput] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>(
    saved ? (saved.won ? 'won' : 'lost') : 'playing',
  )
  const [shareRows, setShareRows] = useState<string[][]>(saved?.rows ?? [])
  const [recorded, setRecorded] = useState(!!saved)
  const [stats, setStats] = useState<MystStats>(() => loadMystStats())
  const [copied, setCopied] = useState(false)

  const over = status !== 'playing'
  const guessesLeft = MAX_GUESSES - rows.length

  function finish(won: boolean, finalShare: string[][]) {
    setStatus(won ? 'won' : 'lost')
    if (won) {
      confetti()
    }
    if (mode === 'daily' && !recorded) {
      setStats(recordMyst(won))
      saveMystDaily({ day: dayNumber(), won, guesses: finalShare.length, rows: finalShare })
      setRecorded(true)
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (over) return
    const p = findPlayer(input)
    if (!p) {
      setNote('Não achei esse craque na enciclopédia.')
      return
    }
    if (rows.some((r) => r.player.answer === p.answer)) {
      setNote('Você já chutou esse.')
      return
    }
    setNote('')
    setInput('')

    const gy = startYear(p.era)
    const row: Row = {
      player: p,
      natOk: p.nat === secret.nat,
      posOk: p.pos === secret.pos,
      decadeOk: Math.floor(gy / 10) === Math.floor(secretYear / 10),
      dir: secretYear > gy ? 'up' : secretYear < gy ? 'down' : 'same',
    }
    const nextRows = [...rows, row]
    setRows(nextRows)

    const sq = `${row.natOk ? '🟩' : '⬛'}${row.posOk ? '🟩' : '⬛'}${row.decadeOk ? '🟩' : '⬛'}`
    const nextShare = [...shareRows, [sq]]
    setShareRows(nextShare)

    if (p.answer === secret.answer) finish(true, nextShare)
    else if (nextRows.length >= MAX_GUESSES) finish(false, nextShare)
  }

  function praticar() {
    let next = secret
    while (next === secret && players.length > 1)
      next = players[Math.floor(Math.random() * players.length)]
    setMode('practice')
    setSecret(next)
    setRows([])
    setInput('')
    setNote('')
    setShareRows([])
    setStatus('playing')
  }

  function compartilhar() {
    const head = `Encyclobol · Craque Misterioso #${dayNumber()} — ${
      status === 'won' ? `${shareRows.length}/${MAX_GUESSES}` : 'X'
    }`
    const grid = shareRows.map((r) => r[0]).join('\n')
    const text = `${head}\n${grid}\nencyclobol.com.br`
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }

  const cellOk = 'bg-grass-600 text-paper border-grass-700'
  const cellNo = 'bg-paper text-ink-700 border-ink-900/20'

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
            {mode === 'daily' ? 'Edição diária' : 'Modo treino'}
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center py-8">
        <p className="kicker">Detetive · jogo 06</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          Craque Misterioso
        </h1>
        <p className="mt-3 max-w-md text-center font-serif text-base italic text-ink-600">
          Chute um craque e use as pistas: seleção, posição e época. Verde acertou;
          a seta diz se o craque secreto é mais antigo ou mais recente.
        </p>

        {/* Dica inicial */}
        <div className="mt-5 border border-ink-900/20 bg-paper-100 px-4 py-1.5 font-cond text-xs font-500 uppercase tracking-wider text-ink-700">
          Dica: posição — <span className="text-ochre-600">{secret.pos}</span>
        </div>

        {/* Dica extra após alguns chutes */}
        {!over && rows.length >= 3 && (
          <div className="mt-2 border border-ink-900/20 bg-paper-100 px-4 py-1.5 font-cond text-xs font-500 uppercase tracking-wider text-ink-700">
            Dica extra —{' '}
            <span className="text-ochre-600">
              {clubHint[secret.answer]
                ? `jogou no ${clubHint[secret.answer]}`
                : `estreou na década de ${Math.floor(secretYear / 10) * 10}`}
            </span>
          </div>
        )}

        <div className="mt-6 w-full max-w-xl">
          {/* Cabeçalho da tabela */}
          {rows.length > 0 && (
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-1.5 px-1 pb-1 font-cond text-[10px] font-600 uppercase tracking-wide text-ink-500">
              <span>Craque</span>
              <span className="w-20 text-center">Seleção</span>
              <span className="w-20 text-center">Posição</span>
              <span className="w-20 text-center">Época</span>
            </div>
          )}

          {/* Linhas de palpite */}
          <div className="space-y-1.5">
            {rows.map((r, i) => (
              <div key={i} className="animate-rise grid grid-cols-[1fr_auto_auto_auto] gap-1.5">
                <div className="flex items-center border-2 border-ink-900/20 bg-paper px-3 font-cond text-sm font-600 uppercase text-ink-900">
                  {r.player.display}
                </div>
                <div className={`flex w-20 items-center justify-center border-2 px-1 py-2 text-center font-cond text-[11px] font-600 uppercase ${r.natOk ? cellOk : cellNo}`}>
                  {r.player.nat}
                </div>
                <div className={`flex w-20 items-center justify-center border-2 px-1 py-2 text-center font-cond text-[11px] font-600 uppercase ${r.posOk ? cellOk : cellNo}`}>
                  {r.player.pos}
                </div>
                <div className={`flex w-20 items-center justify-center gap-1 border-2 px-1 py-2 text-center font-cond text-[11px] font-600 uppercase ${r.decadeOk ? cellOk : cellNo}`}>
                  {decadeLabel(startYear(r.player.era)).replace('Anos ', "'")}
                  {!r.decadeOk && <span>{r.dir === 'up' ? '↑' : '↓'}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Entrada */}
          {!over && (
            <form onSubmit={submit} className="mt-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite o nome de um craque…"
                  autoFocus
                  list="craques"
                  autoComplete="off"
                  className="flex-1 border-2 border-ink-900 bg-paper px-4 py-3 font-serif text-base text-ink-900 outline-none placeholder:text-ink-500 focus:bg-paper-100"
                />
                <datalist id="craques">
                  {players.map((p) => (
                    <option key={p.answer} value={p.display} />
                  ))}
                </datalist>
                <button
                  type="submit"
                  className="btn-stamp bg-grass-600 px-6 text-paper hover:bg-grass-700"
                >
                  Chutar
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-cond text-xs font-500 uppercase tracking-wider text-ink-600">
                  {guessesLeft} {guessesLeft === 1 ? 'tentativa' : 'tentativas'}
                </span>
                {note && (
                  <span className="font-cond text-xs font-600 uppercase tracking-wider text-ochre-600">
                    {note}
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Fim de jogo */}
          {over && (
            <div className="mt-5 border-2 border-ink-900 bg-paper-100 p-6 text-center">
              <p className="kicker">{status === 'won' ? 'Desvendado!' : 'O mistério venceu'}</p>
              <p className="mt-1 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900">
                {secret.display}
              </p>
              <p className="mt-1 font-serif text-sm italic text-ink-600">
                {secret.nat} · {secret.pos} · {secret.era}
              </p>

              {mode === 'daily' && (
                <>
                  <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden border-2 border-ink-900 bg-ink-900/15">
                    {[
                      ['Jogos', stats.played],
                      ['Vitórias', stats.wins],
                      ['Sequência', stats.currentStreak],
                      ['Melhor', stats.maxStreak],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-paper-100 px-1 py-2">
                        <div className="font-display text-2xl text-ink-900">{v}</div>
                        <div className="font-cond text-[9px] font-500 uppercase tracking-wide text-ink-600">
                          {k}
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
                onClick={praticar}
                className="btn-stamp mt-2 w-full bg-grass-600 px-6 py-2.5 text-paper hover:bg-grass-700"
              >
                Treinar com outro
              </button>
              <Link
                to="/"
                className="btn-stamp mt-2 block border-2 border-ink-900 px-6 py-2.5 text-ink-900 hover:bg-ink-900 hover:text-paper"
              >
                Voltar pro almanaque
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
