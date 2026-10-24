// Corrida do dia salva a cada jogada. Recarregar a página (ou sair e voltar)
// retoma de onde parou, em vez de devolver vidas/erros/chutes — o que antes
// permitia rejogar o dia até acertar.
import { dayNumber } from './daily'

const key = (game: string) => `encyclobol:run:${game}`

export function loadRun<T>(game: string): T | null {
  try {
    const raw = localStorage.getItem(key(game))
    if (!raw) return null
    const obj = JSON.parse(raw) as { day: number; state: T }
    return obj.day === dayNumber() ? obj.state : null
  } catch {
    return null
  }
}

export function saveRun<T>(game: string, state: T) {
  try {
    localStorage.setItem(key(game), JSON.stringify({ day: dayNumber(), state }))
  } catch {
    /* sem armazenamento: segue sem salvar */
  }
}

export function clearRun(game: string) {
  try {
    localStorage.removeItem(key(game))
  } catch {
    /* ignore */
  }
}
