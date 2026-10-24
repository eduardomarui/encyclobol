// Treino: 3 por dia em cada jogo. Sem limite, o treino virava decoreba do
// banco e esvaziava a edição do dia.
import { dayNumber } from './daily'

export const TREINOS_DIA = 3
const key = (game: string) => `encyclobol:treinos:${game}`

function usados(game: string): number {
  try {
    const t = JSON.parse(localStorage.getItem(key(game)) ?? 'null') as { day: number; n: number } | null
    return t && t.day === dayNumber() ? t.n : 0
  } catch {
    return 0
  }
}

export const treinosRestantes = (game: string) => Math.max(0, TREINOS_DIA - usados(game))

// Gasta um treino; devolve false se os de hoje já acabaram.
export function usarTreino(game: string): boolean {
  const n = usados(game)
  if (n >= TREINOS_DIA) return false
  try {
    localStorage.setItem(key(game), JSON.stringify({ day: dayNumber(), n: n + 1 }))
  } catch {
    /* sem armazenamento: não limita */
  }
  return true
}
