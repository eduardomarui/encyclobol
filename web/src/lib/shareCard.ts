import { SITE_LABEL } from './site'
import { myTeam } from './team'
import { doClube } from '../data/clubes'
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
  stamp?: string // selo opcional no canto: "RECORDE", "CAMPEÃO"
}

export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'error'

// Mesmos tokens do app (tema "estádio à noite"). Antes era creme com
// vermelho alaranjado — a cara do 7a0, e não a nossa.
const C = {
  paper: '#0b241c',
  chalk: '#eef5f1',
  ink2: '#9bb6ab',
  ink3: '#bfd2c9',
  grass: '#2c7d4f',
  ochre: '#d24a3a',
  corn: '#d8a72e',
  cornHi: '#e6b73e',
}
const SQ: Record<Sq, string> = { g: C.grass, y: C.corn, o: C.ochre, k: '#3b4a44' }

const S = 1080

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = () => res(null)
    img.src = src
  })
}

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

  // Gramado à noite + dois refletores + trama de meio-tom
  ctx.fillStyle = C.paper
  ctx.fillRect(0, 0, S, S)
  for (const lx of [150, S - 150]) {
    const g = ctx.createRadialGradient(lx, -80, 0, lx, -80, 700)
    g.addColorStop(0, 'rgba(238,245,241,0.12)')
    g.addColorStop(1, 'rgba(238,245,241,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, S, S)
  }
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  for (let y = 40; y < S; y += 26) {
    for (let x = 40; x < S; x += 26) {
      ctx.beginPath()
      ctx.arc(x, y, 1.4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Moldura de giz (dupla, como a régua do almanaque)
  ctx.strokeStyle = 'rgba(238,245,241,0.35)'
  ctx.lineWidth = 6
  ctx.strokeRect(46, 46, S - 92, S - 92)
  ctx.lineWidth = 2
  ctx.strokeRect(62, 62, S - 124, S - 124)

  const cx = S / 2
  ctx.textAlign = 'center'

  // Logo (taça)
  const logo = await loadImage(`${import.meta.env.BASE_URL}logo.png`)
  if (logo && logo.height) {
    const lh = 104
    const lw = (logo.width * lh) / logo.height
    ctx.drawImage(logo, cx - lw / 2, 84, lw, lh)
  }

  // Kicker + nome do jogo + régua
  ctx.fillStyle = C.corn
  ctx.font = '600 28px Oswald, sans-serif'
  ctx.fillText('E N C Y C L O B O L', cx, 222)
  ctx.fillStyle = C.ink3
  ctx.font = '500 42px Oswald, sans-serif'
  ctx.fillText(o.game.toUpperCase(), cx, 270)
  ctx.strokeStyle = 'rgba(238,245,241,0.2)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(160, 300)
  ctx.lineTo(S - 160, 300)
  ctx.stroke()

  // Espaço útil entre a régua (300) e o rodapé (~S-160). Tudo é medido antes
  // de desenhar, pra nada se sobrepor — com ou sem grade, com 1 ou 8 linhas.
  const top = 330
  const bottom = S - 165
  const rows = o.squares?.length ?? 0
  const lines = (o.lines ?? []).filter(Boolean)
  const linesH = lines.length * 52
  const subH = o.sub ? 56 : 0
  const gap = 12
  const cols = rows ? Math.max(...o.squares!.map((r) => r.length)) : 0
  const hMax = rows ? 170 : 260
  const hSize = fitFont(ctx, o.headline, 'Anton, sans-serif', '400', hMax, S - 260)
  const free = bottom - top - hSize - subH - linesH - (rows ? 36 : 0)
  const cell = rows ? Math.max(22, Math.min(60, Math.floor((free - gap * (rows - 1)) / rows), Math.floor((S - 360) / cols))) : 0
  const gridH = rows ? rows * cell + (rows - 1) * gap : 0
  const block = hSize + subH + (rows ? gridH + 36 : 0) + linesH
  let y = top + Math.max(0, (bottom - top - block) / 2)

  // Headline com brilho de placar eletrônico
  ctx.fillStyle = C.chalk
  ctx.font = `400 ${hSize}px Anton, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(230,183,62,0.35)'
  ctx.shadowBlur = 24
  ctx.fillText(o.headline, cx, y + hSize / 2)
  ctx.shadowBlur = 0
  ctx.shadowColor = 'transparent'
  ctx.textBaseline = 'alphabetic'
  y += hSize

  if (o.sub) {
    ctx.fillStyle = C.ink2
    ctx.font = '500 34px Oswald, sans-serif'
    ctx.fillText(o.sub.toUpperCase(), cx, y + 44)
    y += subH
  }

  // Grade (estilo Wordle)
  if (rows) {
    const gridW = cols * cell + (cols - 1) * gap
    let gy = y + 24
    for (const row of o.squares!) {
      let gx = cx - gridW / 2 + ((cols - row.length) * (cell + gap)) / 2
      for (const sq of row) {
        ctx.fillStyle = SQ[sq]
        roundRect(ctx, gx, gy, cell, cell, Math.max(4, cell / 8))
        ctx.fill()
        gx += cell + gap
      }
      gy += cell + gap
    }
    y = gy - gap + 12
  }

  // Linhas de estatística
  if (lines.length) {
    ctx.fillStyle = C.ink2
    ctx.font = '500 36px Oswald, sans-serif'
    for (const line of lines) {
      y += 52
      ctx.fillText(line, cx, y - 12)
    }
  }

  // Selo (recorde, campeão)
  if (o.stamp) {
    ctx.save()
    ctx.translate(S - 210, 150)
    ctx.rotate(-0.1)
    ctx.font = '700 34px Oswald, sans-serif'
    const w = ctx.measureText(o.stamp.toUpperCase()).width + 44
    ctx.fillStyle = C.cornHi
    roundRect(ctx, -w / 2, -32, w, 64, 6)
    ctx.fill()
    ctx.fillStyle = C.paper
    ctx.textBaseline = 'middle'
    ctx.fillText(o.stamp.toUpperCase(), 0, 2)
    ctx.restore()
    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'center'
  }

  // Torcida (quando o jogador já escolheu o time)
  const team = myTeam()
  if (team) {
    ctx.fillStyle = C.corn
    ctx.font = '600 26px Oswald, sans-serif'
    ctx.fillText(`TORCEDOR ${doClube(team).toUpperCase()}`, cx, S - 150)
  }

  // Rodapé
  ctx.fillStyle = C.chalk
  ctx.font = '600 34px Oswald, sans-serif'
  ctx.fillText(SITE_LABEL, cx, S - 110)
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
