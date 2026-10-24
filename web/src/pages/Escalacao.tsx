import { useEffect, useMemo, useRef, useState } from 'react'
import { ESCALACOES, type Escalacao as Esc, type Jogador } from '../data/escalacoes'
import { GameHeader, GameTitle, HelpModal, NextUp, TimeBar } from '../components/GameShell'
import { Bandeira } from '../components/Bandeira'
import { siteLink } from '../lib/site'
import { dailyPick, dayNumber } from '../lib/daily'
import { clearRun, loadRun, saveRun } from '../lib/runSave'
import { loadEscToday, recordEscalacao } from '../lib/escalacaoStats'
import { treinosRestantes, usarTreino } from '../lib/treino'
import { confetti } from '../lib/juice'
import { buzz, sfx } from '../lib/sfx'

// Escalação (beta): a "foto oficial" do elenco, desenhada — 6 em pé, 5
// agachados. Digite os nomes; cada acerto acende o jogador. 3 minutos.
const TEMPO = 180
const HELP_KEY = 'encyclobol:escalacao:help'
const BEST_KEY = 'encyclobol:escalacao:best'
// Elenco do dia: igual pra todos, por permutação fixa da lista.
const DAILY_IDX = dailyPick(ESCALACOES.length, 7711, -1)
// Pontos: 100 por jogador, −30 por dica; os 11 somam os segundos que sobraram.
const pontosDe = (found: number, total: number, dicas: number, left: number) =>
  Math.max(0, found * 100 - dicas * 30 + (found === total ? left : 0))

// Treino: elenco sorteado (sem escolher), 3 por dia (lib/treino), sem repetir
// no dia e nunca o do dia nem os das próximas duas semanas — senão o treino
// gastava as edições.
const TREINO_KEY = 'encyclobol:escalacao:treinos'
const RESERVADOS = new Set(
  Array.from({ length: 15 }, (_, k) => dailyPick(ESCALACOES.length, 7711, -1, new Date(Date.now() + k * 864e5))),
)
function treinosHoje(): string[] {
  try {
    const t = JSON.parse(localStorage.getItem(TREINO_KEY) ?? 'null') as { day: number; ids: string[] } | null
    return t && t.day === dayNumber() ? t.ids : []
  } catch {
    return []
  }
}
function marcarTreino(id: string) {
  try {
    localStorage.setItem(TREINO_KEY, JSON.stringify({ day: dayNumber(), ids: [...treinosHoje(), id] }))
  } catch {
    /* ignore */
  }
}
function sortearTreino(): number | null {
  const usados = treinosHoje()
  if (!treinosRestantes('escalacao')) return null
  const pool = ESCALACOES.map((_, i) => i).filter((i) => !RESERVADOS.has(i) && !usados.includes(ESCALACOES[i].id))
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null
}

type EscRun = { id: string; achados: number[]; dicas: number[]; left: number }

const norm = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()

function lev(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

// Formas aceitas: nome, apelidos e o sobrenome (última palavra, se tiver 4+ letras).
function formas(p: Jogador): string[] {
  const all = [p.nome, ...p.alias].map(norm)
  const sob = norm(p.nome).split(' ')
  if (sob.length > 1 && sob[sob.length - 1].length >= 4) all.push(sob[sob.length - 1])
  return [...new Set(all)]
}
// Digitando, só o nome exato acende (senão "alisso" já valeria e o "n"
// sobraria no campo). No Enter, um erro de digitação passa em nomes de 6+ letras.
function bate(txt: string, p: Jogador, tolera = false): boolean {
  const t = norm(txt)
  if (t.length < 3) return false
  return formas(p).some((f) => f === t || (tolera && f.length >= 6 && Math.abs(f.length - t.length) <= 1 && lev(f, t) <= 1))
}

function loadBest(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY) ?? '{}')
  } catch {
    return {}
  }
}

// Jogador desenhado: silhueta sem rosto, camisa nas cores do time e número.
function Figura({ p, esc, achou, revelar, agachado, dica, onDica }: {
  p: Jogador; esc: Esc; achou: boolean; revelar: boolean; agachado: boolean; dica: boolean; onDica: () => void
}) {
  const gk = p.pos === 'GOL'
  const shirt = gk ? esc.goleiro.cor : esc.camisa.cor
  const num = gk ? esc.goleiro.numero : esc.camisa.numero
  const h = agachado ? 78 : 104
  return (
    <button
      type="button"
      onClick={onDica}
      disabled={achou || revelar}
      className={`group flex min-w-0 flex-1 flex-col items-center transition-opacity duration-300 ${achou ? 'opacity-100' : revelar ? 'opacity-80' : 'opacity-60 hover:opacity-80'}`}
      aria-label={achou ? p.nome : `Camisa ${p.num}, ${p.pos}`}
    >
      <svg viewBox={`0 0 60 ${h}`} className={`w-full max-w-[64px] ${achou ? 'animate-pop' : ''}`} aria-hidden>
        {/* cabeça e pescoço, sem rosto */}
        <circle cx="30" cy="11" r="9" fill="#a9b5af" />
        <rect x="26" y="18" width="8" height="5" fill="#a9b5af" />
        {/* camisa */}
        <path d="M12 26 L22 21 H38 L48 26 L54 40 L46 44 L44 36 V58 H16 V36 L14 44 L6 40 Z" fill={shirt} />
        {!gk && <path d="M22 21 H38 L35 26 H25 Z" fill={esc.camisa.detalhe} />}
        {!gk && <path d="M6 40 L8 37 M54 40 L52 37" stroke={esc.camisa.detalhe} strokeWidth="3" />}
        <text x="30" y="49" textAnchor="middle" fontFamily="Oswald, Impact, sans-serif" fontWeight="700" fontSize="17" fill={num}>
          {p.num}
        </text>
        {agachado ? (
          <>
            {/* agachado: coxas pra frente, joelhos dobrados */}
            <rect x="16" y="58" width="28" height="9" rx="2" fill={esc.camisa.calcao} />
            <path d="M18 67 H28 V77 H18 Z M32 67 H42 V77 H32 Z" fill="#f2f2f2" />
          </>
        ) : (
          <>
            <path d="M16 58 H44 L45 72 H31 L30 66 L29 72 H15 Z" fill={esc.camisa.calcao} />
            <path d="M17 72 H27 V100 H17 Z M33 72 H43 V100 H33 Z" fill="#f2f2f2" />
            <path d="M15 100 H28 V104 H15 Z M32 100 H45 V104 H32 Z" fill="#1b1b1b" />
          </>
        )}
      </svg>
      <span
        className={`mt-0.5 w-full truncate text-center font-cond text-[10px] font-700 uppercase leading-tight ${
          achou ? 'text-corn-400' : revelar ? 'text-ochre-400' : 'text-ink-500'
        }`}
      >
        {achou || revelar ? p.nome : dica ? `${p.nome[0]}…` : p.pos}
      </span>
      <span className="mt-0.5 flex items-center gap-1 font-cond text-[9px] font-600 uppercase tracking-wide text-ink-600">
        <Bandeira code={p.nat} />
        {p.nat}
      </span>
    </button>
  )
}

export default function Escalacao() {
  // Elenco do dia (uma tentativa, vale ranking) ou treino com os outros.
  // ?e=<id> de outro elenco abre no treino, direto no elenco do desafio.
  const [today] = useState(loadEscToday)
  const [run] = useState(() => (today ? null : loadRun<EscRun>('escalacao')))
  const [modo, setModo] = useState<'dia' | 'treino'>(() => {
    const id = new URLSearchParams(window.location.search).get('e')
    const i = ESCALACOES.findIndex((x) => x.id === id)
    // Desafio de treino abre no elenco; edições futuras ficam guardadas.
    return i >= 0 && i !== DAILY_IDX && !RESERVADOS.has(i) ? 'treino' : 'dia'
  })
  const [idx, setIdx] = useState(() => {
    if (modo === 'treino') {
      const id = new URLSearchParams(window.location.search).get('e')
      return Math.max(0, ESCALACOES.findIndex((x) => x.id === id))
    }
    const id = today?.id ?? run?.id
    const i = ESCALACOES.findIndex((x) => x.id === id)
    return i >= 0 ? i : DAILY_IDX
  })
  const esc = ESCALACOES[idx]
  const todos = useMemo(() => [...esc.atras, ...esc.frente], [esc])
  const dia = modo === 'dia'
  const [fase, setFase] = useState<'pronto' | 'jogando' | 'fim'>(() => (dia && today ? 'fim' : dia && run ? 'jogando' : 'pronto'))
  const [achados, setAchados] = useState<number[]>(() =>
    dia && today ? today.marks.flatMap((m, k) => (m ? [k] : [])) : dia && run ? run.achados : [],
  )
  const [dicas, setDicas] = useState<number[]>(() => (dia && run ? run.dicas : []))
  const [txt, setTxt] = useState('')
  const [left, setLeft] = useState(() => (dia && run ? run.left : TEMPO))
  const [pontos, setPontos] = useState(today?.points ?? 0)
  const [recorded, setRecorded] = useState(!!today)
  const [flash, setFlash] = useState('')
  const [best, setBest] = useState(loadBest)
  const [copied, setCopied] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const [showHelp, setShowHelp] = useState(() => {
    try {
      return !localStorage.getItem(HELP_KEY)
    } catch {
      return false
    }
  })

  const total = todos.length
  const mago = achados.length === total

  // Partida do dia salva a cada acerto/segundo: F5 volta de onde parou.
  useEffect(() => {
    if (!dia || recorded || fase !== 'jogando') return
    saveRun<EscRun>('escalacao', { id: esc.id, achados, dicas, left })
  }, [dia, recorded, fase, esc.id, achados, dicas, left])

  // Relógio único da partida.
  useEffect(() => {
    if (fase !== 'jogando' || showHelp) return
    if (left <= 0) {
      encerrar()
      return
    }
    if (left <= 10) sfx.tickHot()
    const t = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, fase, showHelp])

  const [restam, setRestam] = useState(() => treinosRestantes('escalacao'))
  function treinar() {
    const i = sortearTreino()
    if (i === null) return
    escolher(i)
  }

  function escolher(i: number) {
    setModo('treino')
    setIdx(i)
    setFase('pronto')
    setAchados([])
    setDicas([])
    setTxt('')
    setLeft(TEMPO)
  }

  function comecar() {
    if (!dia) {
      if (!usarTreino('escalacao')) return
      marcarTreino(esc.id)
      setRestam(treinosRestantes('escalacao'))
    }
    sfx.whistle()
    setAchados([])
    setDicas([])
    setTxt('')
    setLeft(TEMPO)
    setFase('jogando')
    setTimeout(() => input.current?.focus(), 50)
  }

  function encerrar(found = achados) {
    setFase('fim')
    const n = found.length
    const pts = pontosDe(n, total, dicas.length, left)
    setPontos(pts)
    if (dia && !recorded) {
      recordEscalacao(esc.id, pts, todos.map((_, k) => found.includes(k)))
      setRecorded(true)
      clearRun('escalacao')
    }
    if (n > (best[esc.id] ?? -1)) {
      const nb = { ...best, [esc.id]: n }
      setBest(nb)
      try {
        localStorage.setItem(BEST_KEY, JSON.stringify(nb))
      } catch {
        /* ignore */
      }
    }
    if (n === total) {
      confetti(220)
      setTimeout(() => confetti(160), 450)
      sfx.fanfare()
      buzz.win()
    } else if (n >= total - 3) confetti()
  }

  // Confere a cada letra: acertou, acende na hora (sem precisar de Enter).
  function digitar(v: string) {
    setTxt(v)
    if (fase !== 'jogando') return
    acender(v, false)
  }

  function acender(v: string, tolera: boolean): boolean {
    const i = todos.findIndex((p, k) => !achados.includes(k) && bate(v, p, tolera))
    if (i === -1) return false
    const novos = [...achados, i]
    setAchados(novos)
    setTxt('')
    setFlash(todos[i].nome)
    setTimeout(() => setFlash(''), 900)
    sfx.ok(Math.min(8, novos.length))
    buzz.ok()
    if (novos.length === total) encerrar(novos)
    return true
  }

  function enviar() {
    if (!txt.trim() || acender(txt, true)) return
    const jaFoi = todos.some((p, k) => achados.includes(k) && bate(txt, p))
    setFlash(jaFoi ? 'Esse já está na foto' : 'Não está nessa escalação')
    setTimeout(() => setFlash(''), 1100)
    sfx.err()
    buzz.err()
    setTxt('')
  }

  function pedirDica(k: number) {
    if (fase !== 'jogando' || dicas.includes(k)) return
    setDicas((d) => [...d, k])
    sfx.tap()
  }

  async function compartilhar() {
    const linha = (arr: Jogador[], off: number) => arr.map((_, k) => (achados.includes(k + off) ? '✅' : '⬜')).join('')
    const text = `Encyclobol · Escalação\n${esc.jogo} (${esc.quando})\n${linha(esc.atras, 0)}\n ${linha(esc.frente, esc.atras.length)}\n${mago ? 'MAGO 🧙 11/11' : `${achados.length}/${total}`}${dia ? ` · ${pontos} pts · Escalação #${dayNumber()}` : ''} · quem sabe todos é mago\nE você? ${siteLink(`/jogos/escalacao?e=${esc.id}`)}`
    try {
      if (navigator.share) await navigator.share({ text })
      else await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* cancelou */
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

  const revelar = fase === 'fim'

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <GameHeader label={dia ? 'Escalação do dia' : 'Escalação · treino'} onHelp={() => setShowHelp(true)} />
      <main className="container-page flex flex-1 flex-col items-center py-3 sm:py-5">
        <GameTitle kicker={dia ? `Memória · jogo 07 · #${dayNumber()}` : 'Escalação · treino'} title="Quem sabe todos é mago" />


        {/* A "foto oficial" */}
        <div className="mt-4 w-full max-w-md">
          <div className="flex items-baseline justify-between">
            <p className="font-cond text-xs font-700 uppercase tracking-wider text-ink-900">{esc.jogo}</p>
            <p className="font-cond text-[11px] font-600 uppercase tracking-wider text-ink-500">{esc.quando}</p>
          </div>
          <div className="relative mt-1.5 overflow-hidden border-2 border-white/20 bg-gradient-to-b from-[#0b1f14] via-[#123222] to-[#1d4a30] px-2 pb-2 pt-4">
            {/* listras do gramado ao fundo */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_28px,transparent_28px_56px)]" />
            <div className="relative flex items-end gap-1">
              {esc.atras.map((p, k) => (
                <Figura key={p.num} p={p} esc={esc} achou={achados.includes(k)} revelar={revelar && !achados.includes(k)} agachado={false} dica={dicas.includes(k)} onDica={() => pedirDica(k)} />
              ))}
            </div>
            <div className="relative mt-1 flex items-end gap-1 px-4">
              {esc.frente.map((p, k) => {
                const id = k + esc.atras.length
                return (
                  <Figura key={p.num} p={p} esc={esc} achou={achados.includes(id)} revelar={revelar && !achados.includes(id)} agachado dica={dicas.includes(id)} onDica={() => pedirDica(id)} />
                )
              })}
            </div>
            {flash && (
              <p className="pointer-events-none absolute inset-x-0 top-1 animate-pop text-center font-display text-lg uppercase tracking-tight text-corn-400 drop-shadow">
                {flash}
              </p>
            )}
          </div>
        </div>

        {fase === 'pronto' && (
          <div className="mt-4 w-full max-w-md text-center">
            <p className="font-serif text-sm italic text-ink-600">
              {dia ? 'A escalação de hoje é igual pra todo mundo. ' : 'Treino: não vale pontos. '}
              11 titulares, 3 minutos. Número, posição e seleção de cada um já estão na foto.
              {best[esc.id] !== undefined && <> Seu recorde aqui: {best[esc.id]}/{total}.</>}
            </p>
            <button
              onClick={comecar}
              disabled={!dia && restam <= 0}
              className="btn-stamp mt-3 w-full bg-grass-600 px-6 py-3 text-ink-900 hover:bg-grass-700 disabled:opacity-40"
            >
              {!dia && restam <= 0 ? 'Treinos de hoje esgotados' : 'Começar →'}
            </button>
          </div>
        )}

        {fase === 'jogando' && (
          <div className="mt-4 w-full max-w-md">
            <div className="mb-1.5 flex items-center gap-2">
              <TimeBar left={left} total={TEMPO} danger={20} />
              <span className={`w-12 text-right font-display text-base tabular-nums ${left <= 20 ? 'animate-pulse text-ochre-400' : 'text-ink-700'}`}>
                {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                enviar()
              }}
              className="flex gap-2"
            >
              <input
                ref={input}
                value={txt}
                onChange={(e) => digitar(e.target.value)}
                placeholder="Digite um jogador…"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 border-2 border-white/20 bg-paper px-3 py-2.5 font-serif text-ink-900 outline-none focus:border-corn-500"
              />
              <span className="flex items-center font-display text-2xl text-ink-900">
                {achados.length}<span className="text-ink-500">/{total}</span>
              </span>
            </form>
            <div className="mt-2 flex justify-between font-cond text-[11px] font-600 uppercase tracking-wider text-ink-500">
              <span>Toque num jogador pra ver a inicial</span>
              <button onClick={() => encerrar()} className="hover:text-ochre-400">Desistir</button>
            </div>
          </div>
        )}

        {fase === 'fim' && (
          <div className="mt-4 w-full max-w-md border-2 border-white/20 bg-paper-100 p-5 text-center">
            {mago ? (
              <p className="animate-pop font-display text-4xl uppercase tracking-tight text-corn-400">Mago 🧙</p>
            ) : (
              <p className="kicker">{achados.length >= total - 3 ? 'Quase mago!' : left <= 0 ? 'Acabou o tempo' : 'Fim'}</p>
            )}
            <p className="mt-1 font-display text-6xl leading-none text-ink-900">
              {achados.length}
              <span className="text-ink-500">/{total}</span>
            </p>
            <p className="mt-1 font-cond text-[11px] font-600 uppercase tracking-wider text-ink-500">
              {dia ? `${pontos} pts · ` : 'treino · '}
              {dicas.length ? `${dicas.length} dica${dicas.length > 1 ? 's' : ''} · ` : ''}
              {esc.esquema}
            </p>
            <button onClick={compartilhar} className="btn-stamp mt-4 w-full bg-corn-500 px-6 py-3 text-paper hover:bg-corn-400">
              {copied ? 'Copiado!' : 'Desafiar no grupo'}
            </button>
            {restam > 0 ? (
              <button onClick={treinar} className="btn-stamp mt-2 w-full border-2 border-white/20 px-6 py-2.5 text-ink-900 hover:bg-grass-700">
                Treino surpresa · {restam} {restam === 1 ? 'restante' : 'restantes'} hoje
              </button>
            ) : (
              <p className="mt-2 font-cond text-xs font-600 uppercase tracking-wider text-ink-500">Treinos de hoje esgotados · amanhã tem mais</p>
            )}
            <NextUp current="escalacao" />
          </div>
        )}
      </main>

      {showHelp && (
        <HelpModal title="Escalação" cta="Bora escalar" onClose={closeHelp}>
          <li>A foto oficial de um time marcante, sem os nomes. <strong>Escale os 11 titulares de memória.</strong></li>
          <li>Cada camisa mostra o <strong>número</strong>, a <strong>posição</strong> e a <strong>seleção</strong>. Digite o nome: acertou, o jogador acende na hora.</li>
          <li>Vale o sobrenome ou o apelido, e um erro de digitação passa. Travou? Toque no jogador pra ver a inicial.</li>
          <li>Você tem <strong>3 minutos</strong>. Os 11? Você é <strong>mago</strong>.</li>
        </HelpModal>
      )}
    </div>
  )
}
