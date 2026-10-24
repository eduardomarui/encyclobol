// "O que liga os outros três?" com opções de verdade, no lugar das quatro
// categorias genéricas (Posição/Nacionalidade/Clube/Era).
//
// A opção certa vem do próprio puzzle (a primeira parte da regra, escrita à mão
// e conferida). As erradas são geradas da base de jogadores e só entram se os
// DADOS provarem que são falsas para os três — nunca uma opção errada que por
// acaso também é verdade.
import { players, type Player } from '../data/players'
import { famous } from '../data/famous'
import { seededShuffle } from './daily'

const POS_PL: Record<string, string> = {
  Atacante: 'atacantes',
  Goleiro: 'goleiros',
  Lateral: 'laterais',
  Meia: 'meias',
  Ponta: 'pontas',
  Zagueiro: 'zagueiros',
}

const NAT_PL: Record<string, string> = {
  Alemanha: 'alemães',
  Argentina: 'argentinos',
  Argélia: 'argelinos',
  Armênia: 'armênios',
  Austrália: 'australianos',
  Brasil: 'brasileiros',
  Bulgária: 'búlgaros',
  Bélgica: 'belgas',
  Bósnia: 'bósnios',
  Camarões: 'camaroneses',
  Canadá: 'canadenses',
  Chile: 'chilenos',
  Colômbia: 'colombianos',
  'Coreia do Sul': 'sul-coreanos',
  'Costa Rica': 'costa-riquenhos',
  'Costa do Marfim': 'marfinenses',
  Croácia: 'croatas',
  Dinamarca: 'dinamarqueses',
  Egito: 'egípcios',
  Equador: 'equatorianos',
  Escócia: 'escoceses',
  Eslováquia: 'eslovacos',
  Eslovênia: 'eslovenos',
  Espanha: 'espanhóis',
  'Estados Unidos': 'americanos',
  Finlândia: 'finlandeses',
  França: 'franceses',
  Gabão: 'gaboneses',
  Gana: 'ganeses',
  Geórgia: 'georgianos',
  Grécia: 'gregos',
  Holanda: 'holandeses',
  Hungria: 'húngaros',
  Inglaterra: 'ingleses',
  'Irlanda do Norte': 'norte-irlandeses',
  Irlanda: 'irlandeses',
  Irã: 'iranianos',
  Itália: 'italianos',
  Iugoslávia: 'iugoslavos',
  Japão: 'japoneses',
  Libéria: 'liberianos',
  Mali: 'malineses',
  Marrocos: 'marroquinos',
  México: 'mexicanos',
  Nigéria: 'nigerianos',
  Noruega: 'noruegueses',
  Paraguai: 'paraguaios',
  'País de Gales': 'galeses',
  Peru: 'peruanos',
  Polônia: 'poloneses',
  Portugal: 'portugueses',
  'Rep. Tcheca': 'tchecos',
  Romênia: 'romenos',
  Senegal: 'senegaleses',
  Suécia: 'suecos',
  Suíça: 'suíços',
  Sérvia: 'sérvios',
  Tchecoslováquia: 'tchecoslovacos',
  Togo: 'togoleses',
  Turquia: 'turcos',
  Ucrânia: 'ucranianos',
  'União Soviética': 'soviéticos',
  Uruguai: 'uruguaios',
  'África do Sul': 'sul-africanos',
  Áustria: 'austríacos',
}

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().replace(/[^A-Z]/g, '')

// Nome curto do puzzle ("Cafu", "Roberto Carlos") → jogador da base.
export function findPlayer(name: string): Player | null {
  const n = norm(name)
  return (
    players.find((x) => norm(x.display) === n) ??
    players.find((x) => x.answer === n) ??
    players.find((x) => norm(x.display).endsWith(n)) ??
    null
  )
}

const decadeOf = (p: Player) => Math.floor(parseInt(p.era.slice(0, 4), 10) / 10) * 10
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

// "Os outros são goleiros; Cannavaro é zagueiro." → "São goleiros"
export function eloFromRule(rule: string): string {
  const first = rule.split(';')[0].trim().replace(/^Os outros (três )?/i, '').replace(/\.$/, '')
  return cap(first)
}

type Kind = 'pos' | 'nat' | 'dec'
// `hits`: quantos dos três batem com a afirmação (3 = verdadeira pra todos).
type Fact = { text: string; kind: Kind; hits: number }

function factsFor(trio: Player[], all: Player[]): Fact[] {
  const facts: Fact[] = []
  const seen = new Set<string>()
  const add = (text: string, kind: Kind, hits: number) => {
    if (!seen.has(text)) {
      seen.add(text)
      facts.push({ text, kind, hits })
    }
  }
  for (const p of all) {
    if (POS_PL[p.pos]) add(`São ${POS_PL[p.pos]}`, 'pos', trio.filter((t) => t.pos === p.pos).length)
    if (NAT_PL[p.nat]) add(`São ${NAT_PL[p.nat]}`, 'nat', trio.filter((t) => t.nat === p.nat).length)
    const d = decadeOf(p)
    add(`Estrearam nos anos ${d}`, 'dec', trio.filter((t) => decadeOf(t) === d).length)
  }
  // Décadas vizinhas como reserva (falsas se não forem a de todos).
  for (const t of trio) {
    for (const d of [decadeOf(t) - 10, decadeOf(t) + 10]) add(`Estrearam nos anos ${d}`, 'dec', trio.filter((x) => decadeOf(x) === d).length)
  }
  return facts
}

// Iscas boas primeiro: as que valem pra dois dos três (quase certas).
function rankFalse(falses: Fact[], seed: number): Fact[] {
  const order = seededShuffle(falses, seed)
  return order.sort((x, y) => y.hits - x.hits)
}

export type EloOptions = { options: string[]; correct: number }

// Três opções: o elo certo + duas afirmações que os dados provam falsas.
// Devolve null se algum nome não estiver na base (aí o jogo usa as categorias).
export function buildElos(names: string[], intruderIdx: number, rule: string, seed: number): EloOptions | null {
  const four = names.map(findPlayer)
  if (four.some((p) => !p)) return null
  const all = four as Player[]
  const trio = all.filter((_, i) => i !== intruderIdx)
  // "Eram meias" → "São meias": o tempo verbal não pode entregar a resposta.
  const right = eloFromRule(rule).replace(/^Eram /, 'São ')
  const facts = factsFor(trio, all)
  const same = (a: string) => a.toLowerCase() === right.toLowerCase()
  const falses = rankFalse(facts.filter((f) => f.hits < 3 && !same(f.text)), seed)
  const trues = facts.filter((f) => f.hits === 3)
  // Elo composto ("São pontas e jogaram no Chelsea"): as iscas também vêm
  // compostas — uma parte verdadeira + uma falsa, de tipos diferentes —, pra
  // não entregar a certa pelo tamanho do texto.
  const compound = / e | que /.test(right)
  const pool: string[] = []
  if (compound && trues.length) {
    for (const f of falses) {
      const t = trues.find((x) => x.kind !== f.kind)
      if (!t) continue
      const txt = `${t.text} e ${low(f.text)}`
      if (!same(txt) && !pool.includes(txt)) pool.push(txt)
      if (pool.length >= 2) break
    }
  }
  for (const f of falses) {
    if (pool.length >= 2) break
    if (!pool.includes(f.text)) pool.push(f.text)
  }
  if (pool.length < 2) return null
  const options = seededShuffle([right, ...pool.slice(0, 2)], seed + 11)
  return { options, correct: options.indexOf(right) }
}

// Dificuldade do puzzle: posição e seleção são as mais diretas; época pede
// mais memória; clube é o mais traiçoeiro. Craque pouco conhecido soma um nível.
export function tierOf(cat: string, names: string[]): 1 | 2 | 3 {
  let t = cat === 'Clube' ? 3 : cat === 'Era' ? 2 : 1
  const obscure = names.some((n) => {
    const p = findPlayer(n)
    return !p || !famous.has(p.answer)
  })
  if (obscure) t += 1
  return Math.min(3, t) as 1 | 2 | 3
}
