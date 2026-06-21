// Índice determinístico baseado na data: todo mundo recebe a mesma
// "edição de hoje" no mesmo dia, sem precisar de servidor.

const EPOCH = Date.UTC(2026, 0, 1) // 1 de janeiro de 2026

export function dayNumber(date = new Date()): number {
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.floor((today - EPOCH) / 86_400_000)
}

export function dailyIndex(length: number, date = new Date()): number {
  if (length <= 0) return 0
  const n = dayNumber(date)
  return ((n % length) + length) % length
}
