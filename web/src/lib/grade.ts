// Motor de "A Grade": gera uma grade 3x3 diária solúvel (seleção × posição/era),
// valida craques e calcula a pontuação de raridade.
import { players, type Player } from '../data/players'
import { fame } from '../data/fame'
import { seededShuffle } from './daily'

export type Crit = { id: string; label: string; test: (p: Player) => boolean }

function startYear(era: string): number {
  const m = era.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}
const decadeOf = (p: Player) => Math.floor(startYear(p.era) / 10) * 10

const POSITIONS = ['Goleiro', 'Zagueiro', 'Lateral', 'Meia', 'Ponta', 'Atacante']

function natCrit(n: string): Crit {
  return { id: `nat:${n}`, label: n, test: (p) => p.nat === n }
}
function posCrit(pos: string): Crit {
  return { id: `pos:${pos}`, label: pos, test: (p) => p.pos === pos }
}
function eraCrit(d: number): Crit {
  return { id: `era:${d}`, label: `Anos ${d}`, test: (p) => decadeOf(p) === d }
}

// Nacionalidades com pelo menos 3 craques (pra dar opção nas células).
const NAT_POOL: string[] = (() => {
  const count: Record<string, number> = {}
  for (const p of players) count[p.nat] = (count[p.nat] ?? 0) + 1
  return Object.keys(count).filter((n) => count[n] >= 3)
})()

const DECADES = [...new Set(players.map(decadeOf))].sort((a, b) => a - b)

const COL_POOL: Crit[] = [
  ...POSITIONS.map(posCrit),
  ...DECADES.map(eraCrit),
]

function cellHasAnswer(row: Crit, col: Crit): boolean {
  return players.some((p) => row.test(p) && col.test(p))
}

function combos3<T>(arr: T[]): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length - 2; i++)
    for (let j = i + 1; j < arr.length - 1; j++)
      for (let k = j + 1; k < arr.length; k++) out.push([arr[i], arr[j], arr[k]])
  return out
}

export type Grid = { rows: Crit[]; cols: Crit[] }

// Grade determinística para um seed: 3 nacionalidades (linhas) × 3 critérios
// de posição/era (colunas), garantindo que TODAS as 9 células têm resposta.
export function buildGrid(seed: number): Grid {
  const colCombos = seededShuffle(combos3(COL_POOL), seed)
  const natOrder = seededShuffle(NAT_POOL, seed * 31 + 7)

  for (const cols of colCombos) {
    const eligible = natOrder.filter((n) => {
      const r = natCrit(n)
      return cols.every((c) => cellHasAnswer(r, c))
    })
    if (eligible.length >= 3) {
      return { rows: eligible.slice(0, 3).map(natCrit), cols }
    }
  }
  // Fallback improvável: posições puras
  return {
    rows: ['Brasil', 'Itália', 'Argentina'].map(natCrit),
    cols: ['Goleiro', 'Zagueiro', 'Atacante'].map(posCrit),
  }
}

function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

function keysOf(p: Player): string[] {
  const tokens = p.display.split(/\s+/)
  return [norm(p.answer), norm(p.display), norm(tokens[tokens.length - 1])]
}

export function findPlayer(input: string): Player | null {
  const q = norm(input)
  if (q.length < 2) return null
  return players.find((p) => keysOf(p).includes(q)) ?? null
}

export function satisfies(p: Player, row: Crit, col: Crit): boolean {
  return row.test(p) && col.test(p)
}

// Pontos de raridade: craque óbvio (fama alta) vale pouco; garimpo vale mais.
export function rarityPoints(p: Player): number {
  const f = fame[p.answer] ?? 60
  return Math.max(5, 100 - f)
}
