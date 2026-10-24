// Sons curtos sintetizados com WebAudio (nenhum arquivo de áudio) + vibração.
// Um botão só ("Som e vibração") liga/desliga os dois; padrão ligado.
// No Safari, audioSession 'ambient' respeita a chave de silencioso do iPhone e
// não pausa a música que a pessoa estiver ouvindo.

const KEY = 'encyclobol:som'
const listeners = new Set<() => void>()

export function soundOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== '0'
  } catch {
    return true
  }
}
export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* ignore */
  }
  listeners.forEach((f) => f())
}
export function subscribeSound(f: () => void): () => void {
  listeners.add(f)
  return () => listeners.delete(f)
}

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined' || !soundOn()) return null
  try {
    if (!ctx) {
      const nav = navigator as Navigator & { audioSession?: { type: string } }
      if (nav.audioSession) nav.audioSession.type = 'ambient'
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx = new AC()
      master = ctx.createGain()
      master.gain.value = 0.18
      master.connect(ctx.destination)
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
      const d = noise.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

// O navegador só deixa tocar som depois de um gesto do usuário.
if (typeof window !== 'undefined') {
  const unlock = () => {
    audio()
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)
}

function env(g: GainNode, t: number, peak: number, dur: number) {
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + 0.004)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
}

function tone(type: OscillatorType, f0: number, f1: number, dur: number, gain: number, delay = 0) {
  const a = audio()
  if (!a || !master) return
  const t = a.currentTime + delay
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = type
  o.frequency.setValueAtTime(f0, t)
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur)
  env(g, t, gain, dur)
  o.connect(g).connect(master)
  o.start(t)
  o.stop(t + dur + 0.02)
}

function hiss(filter: BiquadFilterType, freq: number, q: number, dur: number, gain: number, delay = 0, attack = 0.004) {
  const a = audio()
  if (!a || !master || !noise) return
  const t = a.currentTime + delay
  const src = a.createBufferSource()
  src.buffer = noise
  const f = a.createBiquadFilter()
  f.type = filter
  f.frequency.value = freq
  f.Q.value = q
  const g = a.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(f).connect(g).connect(master)
  src.start(t)
  src.stop(t + dur + 0.02)
}

export const sfx = {
  tap: () => tone('triangle', 880, 660, 0.04, 0.1),
  key: () => hiss('bandpass', 3200, 1.2, 0.022, 0.06),
  tile: (s: 'correct' | 'present' | 'absent', delay = 0) =>
    tone('triangle', s === 'correct' ? 784 : s === 'present' ? 587 : 196, s === 'correct' ? 784 : s === 'present' ? 587 : 196, 0.06, 0.08, delay),
  ok: (combo = 0) => {
    const f = 523 * 2 ** (Math.min(combo, 12) / 12)
    tone('triangle', f, f, 0.07, 0.14)
    tone('triangle', f * 1.5, f * 1.5, 0.12, 0.14, 0.07)
  },
  nearMiss: () => tone('sine', 660, 622, 0.14, 0.1),
  err: () => tone('sine', 170, 85, 0.18, 0.22),
  lifeLost: () => tone('triangle', 392, 262, 0.26, 0.14),
  tick: () => tone('sine', 1000, 1000, 0.03, 0.05),
  tickHot: () => tone('sine', 1320, 1320, 0.03, 0.07),
  kick: () => {
    tone('sine', 120, 50, 0.09, 0.3)
    hiss('lowpass', 400, 0.7, 0.06, 0.2)
  },
  net: () => hiss('bandpass', 1800, 2, 0.12, 0.12),
  crowd: () => hiss('bandpass', 800, 0.7, 1.4, 0.22, 0, 0.12),
  glove: () => {
    hiss('bandpass', 1500, 1, 0.04, 0.25)
    tone('sine', 220, 110, 0.12, 0.2)
  },
  groan: () => hiss('lowpass', 500, 0.7, 0.7, 0.12, 0, 0.08),
  whistle: () => {
    tone('sine', 2900, 2900, 0.18, 0.1)
    tone('sine', 2900, 2900, 0.18, 0.1, 0.27)
    tone('sine', 2900, 2900, 0.5, 0.1, 0.54)
  },
  stamp: () => {
    tone('sine', 90, 90, 0.1, 0.28)
    hiss('lowpass', 1200, 0.7, 0.03, 0.2)
  },
  fanfare: () => {
    ;[523, 659, 784].forEach((f, i) => tone('triangle', f, f, 0.09, 0.14, i * 0.09))
    tone('triangle', 1047, 1047, 0.42, 0.14, 0.27)
    hiss('bandpass', 800, 0.7, 1.2, 0.16, 0.3, 0.12)
  },
}

// Vibração (Android; o iOS ignora, e o som cobre). Desliga com o mudo e com
// "reduzir movimento".
export function haptic(pattern: number | number[]) {
  if (!soundOn() || typeof navigator === 'undefined' || !('vibrate' in navigator)) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  try {
    navigator.vibrate(pattern)
  } catch {
    /* ignore */
  }
}

export const buzz = {
  ok: () => haptic(12),
  err: () => haptic([30, 40, 30]),
  life: () => haptic(80),
  goal: () => haptic([20, 30, 60]),
  save: () => haptic(40),
  win: () => haptic([15, 40, 15, 40, 120]),
}
