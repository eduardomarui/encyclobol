// Gera um card de resultado em imagem (canvas) com a identidade do Encyclobol
// e dispara o compartilhamento nativo (Web Share). Sem dependências.

export type Sq = 'g' | 'y' | 'o' | 'k'

export interface ShareOpts {
  game: string // ex: "Copa de Pênaltis"
  headline: string // número/destaque grande, ex: "820" ou "5 × 3"
  sub?: string // ex: "pontos hoje"
  lines?: string[] // linhas de estatística
  squares?: Sq[][] // grade opcional (estilo Wordle)
  edition?: string // ex: "Edição #123"
  text?: string // texto de acompanhamento no share nativo
}

export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'error'

const C = {
  paper: '#f2ecdd',
  paper2: '#e9e1cc',
  ink: '#16130d',
  ink2: '#4b4538',
  grass: '#346b32',
  ochre: '#c1452a',
  corn: '#d8a51f',
}
const SQ: Record<Sq, string> = { g: C.grass, y: C.corn, o: C.ochre, k: '#2a2620' }

const S = 1080

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  weight: string,
  maxSize: number,
  maxWidth: number,
): number {
  let size = maxSize
  do {
    ctx.font = `${weight} ${size}px ${family}`
    if (ctx.measureText(text).width <= maxWidth) break
    size -= 4
  } while (size > 24)
  return size
}

async function draw(o: ShareOpts): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  try {
    await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready
  } catch {
    /* segue com fallback */
  }

  // Fundo papel + leve textura de pontos
  ctx.fillStyle = C.paper
  ctx.fillRect(0, 0, S, S)
  ctx.fillStyle = 'rgba(22,19,13,0.04)'
  for (let y = 40; y < S; y += 26) {
    for (let x = 40; x < S; x += 26) {
      ctx.beginPath()
      ctx.arc(x, y, 1.4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Moldura editorial
  ctx.strokeStyle = C.ink
  ctx.lineWidth = 10
  ctx.strokeRect(46, 46, S - 92, S - 92)

  const cx = S / 2
  ctx.textAlign = 'center'

  // Kicker
  ctx.fillStyle = C.grass
  ctx.font = '600 30px Oswald, sans-serif'
  ctx.fillText('E N C Y C L O B O L', cx, 150)

  // Nome do jogo
  ctx.fillStyle = C.ink
  ctx.font = '500 44px Oswald, sans-serif'
  ctx.fillText(o.game.toUpperCase(), cx, 212)

  // Linha divisória
  ctx.strokeStyle = 'rgba(22,19,13,0.25)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(160, 250)
  ctx.lineTo(S - 160, 250)
  ctx.stroke()

  // Headline grande
  const hSize = fitFont(ctx, o.headline, 'Anton, sans-serif', '400', 280, S - 240)
  ctx.fillStyle = C.ink
  ctx.font = `400 ${hSize}px Anton, sans-serif`
  ctx.textBaseline = 'middle'
  const headY = o.squares?.length ? 400 : 470
  ctx.fillText(o.headline, cx, headY)
  ctx.textBaseline = 'alphabetic'

  // Subtítulo
  let y = headY + hSize / 2 + 56
  if (o.sub) {
    ctx.fillStyle = C.ink2
    ctx.font = '500 36px Oswald, sans-serif'
    ctx.fillText(o.sub.toUpperCase(), cx, y)
    y += 60
  }

  // Grade de quadrados (estilo Wordle)
  if (o.squares?.length) {
    const cols = Math.max(...o.squares.map((r) => r.length))
    const cell = Math.min(64, Math.floor((S - 320) / cols))
    const gap = 12
    const gridW = cols * cell + (cols - 1) * gap
    let gy = y + 6
    for (const row of o.squares) {
      let gx = cx - gridW / 2 + (cols - row.length) * (cell + gap) / 2
      for (const s of row) {
        ctx.fillStyle = SQ[s]
        roundRect(ctx, gx, gy, cell, cell, 8)
        ctx.fill()
        gx += cell + gap
      }
      gy += cell + gap
    }
    y = gy + 40
  }

  // Linhas de estatística
  if (o.lines?.length) {
    ctx.fillStyle = C.ink2
    ctx.font = '500 38px Oswald, sans-serif'
    for (const line of o.lines) {
      if (!line) continue
      ctx.fillText(line, cx, y)
      y += 56
    }
  }

  // Rodapé
  ctx.fillStyle = C.ink
  ctx.font = '600 34px Oswald, sans-serif'
  ctx.fillText('encyclobol.com.br', cx, S - 110)
  if (o.edition) {
    ctx.fillStyle = C.ink2
    ctx.font = '500 28px Oswald, sans-serif'
    ctx.fillText(o.edition, cx, S - 72)
  }

  return await new Promise((res) => canvas.toBlob((b) => res(b), 'image/png'))
}

export async function shareScoreImage(o: ShareOpts): Promise<ShareResult> {
  const blob = await draw(o)
  if (!blob) return 'error'
  const file = new File([blob], 'encyclobol.png', { type: 'image/png' })

  // 1) Compartilhamento nativo com arquivo (ideal no celular)
  const nav = navigator as Navigator & {
    canShare?: (d: ShareData & { files?: File[] }) => boolean
  }
  try {
    if (nav.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text: o.text } as ShareData & { files: File[] })
      return 'shared'
    }
  } catch {
    return 'error' // usuário cancelou ou falhou — não cai pro download
  }

  // 2) Copiar imagem pra área de transferência (desktop)
  try {
    const Item = (window as unknown as { ClipboardItem?: typeof ClipboardItem }).ClipboardItem
    if (Item && navigator.clipboard && 'write' in navigator.clipboard) {
      await navigator.clipboard.write([new Item({ 'image/png': blob })])
      return 'copied'
    }
  } catch {
    /* tenta baixar */
  }

  // 3) Baixar o PNG
  try {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'encyclobol.png'
    a.click()
    URL.revokeObjectURL(url)
    return 'downloaded'
  } catch {
    return 'error'
  }
}
