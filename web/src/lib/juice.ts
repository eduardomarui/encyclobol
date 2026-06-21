// Efeitos de "juice" sem dependências: confete e vibração.

const COLORS = ['#2c6e49', '#c9a227', '#c8472b', '#16130d', '#3e8c61']

export function confetti(amount = 70) {
  if (typeof document === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const layer = document.createElement('div')
  layer.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden'
  document.body.appendChild(layer)

  const h = window.innerHeight + 80
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement('div')
    const size = 6 + Math.random() * 8
    bit.style.cssText =
      `position:absolute;top:-24px;left:${Math.random() * 100}%;` +
      `width:${size}px;height:${size * 0.6}px;` +
      `background:${COLORS[i % COLORS.length]};opacity:0.95`
    layer.appendChild(bit)

    const dx = (Math.random() - 0.5) * 240
    const rot = Math.random() * 720 - 360
    const dur = 1500 + Math.random() * 1400
    const delay = Math.random() * 250
    bit.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${h}px) rotate(${rot}deg)`, opacity: 1 },
      ],
      { duration: dur, delay, easing: 'cubic-bezier(0.2,0.6,0.4,1)', fill: 'forwards' },
    ).onfinish = () => bit.remove()
  }
  setTimeout(() => layer.remove(), 3500)
}
