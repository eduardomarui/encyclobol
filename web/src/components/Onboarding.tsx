import { useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'encyclobol:onboarded'

const slides = [
  {
    kicker: 'Bem-vindo',
    title: 'Encyclobol',
    body: 'O almanaque jogável do futebol. Seis desafios diários sobre toda a história do futebol mundial.',
    logo: true,
  },
  {
    kicker: 'A regra de ouro',
    title: 'Sem chute, sem Google',
    body: 'Aqui vale só o que está guardado na memória. Cada jogo tem uma corrida diária e seus pontos somam num total que cresce a cada dia.',
    logo: false,
  },
  {
    kicker: 'Melhor com os amigos',
    title: 'Dispute a tabela',
    body: 'Ranking global e de amigos por código, conquistas e até duelo de pênaltis 1×1 em tempo real.',
    logo: false,
  },
]

export default function Onboarding() {
  const [show, setShow] = useState(() => {
    try {
      return !localStorage.getItem(KEY)
    } catch {
      return false
    }
  })
  const [i, setI] = useState(0)

  function done() {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null
  const s = slides[i]
  const last = i === slides.length - 1

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-paper">
      <div className="flex justify-end p-4">
        <button
          onClick={done}
          className="font-cond text-xs font-600 uppercase tracking-wider text-ink-500 hover:text-ink-900"
        >
          Pular
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {s.logo ? (
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Encyclobol"
            className="mb-6 h-40 w-auto drop-shadow-[0_6px_10px_rgba(22,19,13,0.18)]"
          />
        ) : (
          <div className="mb-6 flex h-40 items-center justify-center">
            <span className="font-display text-7xl text-grass-600/30">0{i + 1}</span>
          </div>
        )}
        <p className="kicker">{s.kicker}</p>
        <h2 className="mt-2 max-w-md font-display text-4xl uppercase leading-[1.02] tracking-tight text-ink-900 sm:text-5xl">
          {s.title}
        </h2>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic leading-relaxed text-ink-700">
          {s.body}
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 px-6 pb-12">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === i ? 'bg-grass-600' : 'bg-ink-900/20'}`}
            />
          ))}
        </div>
        {last ? (
          <Link
            to="/jogos"
            onClick={done}
            className="btn-stamp w-full max-w-xs bg-grass-600 px-8 py-3.5 text-center text-base text-paper hover:bg-grass-700"
          >
            Começar a jogar
          </Link>
        ) : (
          <button
            onClick={() => setI((n) => n + 1)}
            className="btn-stamp w-full max-w-xs bg-ink-900 px-8 py-3.5 text-base text-paper hover:bg-grass-600"
          >
            Próximo
          </button>
        )}
      </div>
    </div>
  )
}
