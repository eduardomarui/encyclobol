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

// Embaralhamento determinístico (Fisher–Yates com LCG semeado).
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice()
  let s = (seed >>> 0) || 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// `count` índices distintos escolhidos de forma determinística para o dia.
export function dailySequence(length: number, count: number, date = new Date()): number[] {
  if (length <= 0) return []
  const seed = (dayNumber(date) + 1) * 2654435761
  const idx = Array.from({ length }, (_, i) => i)
  return seededShuffle(idx, seed).slice(0, Math.min(count, length))
}

// Edição do dia por permutação fixa: cada item sai uma vez por ciclo, em ordem
// imprevisível (antes era `dia % n`, que andava pelo arquivo na ordem em que os
// itens foram escritos — o Craque Misterioso seguia país por país).
// Até `legacyUntil` mantém a regra antiga, pra não trocar a edição de quem já jogou hoje.
export function dailyPick(length: number, salt: number, legacyUntil = 295, date = new Date()): number {
  if (length <= 0) return 0
  const n = dayNumber(date)
  if (n <= legacyUntil) return ((n % length) + length) % length
  const perm = seededShuffle(Array.from({ length }, (_, i) => i), salt)
  return perm[((n % length) + length) % length]
}
