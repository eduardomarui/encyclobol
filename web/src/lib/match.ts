// Elegibilidade por posição e motor de simulação da Escalação Rápida.
import type { Player } from '../data/players'

export type SlotType = 'GOL' | 'DEF' | 'MEI' | 'ATA'

// Quais posições do banco podem ocupar cada tipo de vaga no 4-4-2.
export function eligible(pos: string, slot: SlotType): boolean {
  switch (slot) {
    case 'GOL':
      return pos === 'Goleiro'
    case 'DEF':
      return pos === 'Zagueiro' || pos === 'Lateral'
    case 'MEI':
      return pos === 'Meia' || pos === 'Ponta'
    case 'ATA':
      return pos === 'Atacante' || pos === 'Ponta'
  }
}

const attackPower: Record<string, number> = {
  Atacante: 3,
  Ponta: 2.5,
  Meia: 2,
  Lateral: 1,
  Zagueiro: 0.6,
  Goleiro: 0.2,
}

const defensePower: Record<string, number> = {
  Goleiro: 3,
  Zagueiro: 2.5,
  Lateral: 1.5,
  Meia: 1,
  Ponta: 0.5,
  Atacante: 0.3,
}

const scorerWeight: Record<string, number> = {
  Atacante: 5,
  Ponta: 3,
  Meia: 2,
  Lateral: 0.5,
  Zagueiro: 0.5,
  Goleiro: 0,
}

// Número de gols via processo de Poisson (Knuth), com teto de sanidade.
function poisson(lambda: number): number {
  const L = Math.exp(-lambda)
  let k = 0
  let p = 1
  do {
    k++
    p *= Math.random()
  } while (p > L)
  return Math.min(k - 1, 7)
}

function pickScorer(team: Player[]): Player {
  const total = team.reduce((s, p) => s + (scorerWeight[p.pos] ?? 0), 0)
  let r = Math.random() * total
  for (const p of team) {
    r -= scorerWeight[p.pos] ?? 0
    if (r <= 0) return p
  }
  return team[team.length - 1]
}

export type MatchResult = {
  rival: string
  gf: number
  ga: number
  scorers: { name: string; goals: number }[]
  verdict: 'Vitória' | 'Empate' | 'Derrota'
}

const RIVALS = [
  'Resto do Mundo',
  'Combinado das Estrelas',
  'Os Imortais',
  'Seleção Mundial',
]

export function simulate(team: Player[]): MatchResult {
  const atk = team.reduce((s, p) => s + (attackPower[p.pos] ?? 0), 0)
  const def = team.reduce((s, p) => s + (defensePower[p.pos] ?? 0), 0)

  // Adversário de força fixa, calibrado para um time equilibrado.
  const oppAtk = 14
  const oppDef = 16

  const gf = poisson(Math.max(0.25, (atk / oppDef) * 1.5))
  const ga = poisson(Math.max(0.2, (oppAtk / def) * 1.4))

  const tally: Record<string, number> = {}
  for (let i = 0; i < gf; i++) {
    const s = pickScorer(team)
    tally[s.display] = (tally[s.display] ?? 0) + 1
  }
  const scorers = Object.entries(tally)
    .map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals)

  const verdict = gf > ga ? 'Vitória' : gf < ga ? 'Derrota' : 'Empate'
  const rival = RIVALS[Math.floor(Math.random() * RIVALS.length)]

  return { rival, gf, ga, scorers, verdict }
}
