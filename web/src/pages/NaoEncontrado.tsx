import { Link } from 'react-router-dom'

export default function NaoEncontrado() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Encyclobol"
        className="h-32 w-auto opacity-90 drop-shadow-[0_6px_10px_rgba(22,19,13,0.18)]"
      />
      <p className="kicker mt-6">Bola fora</p>
      <h1 className="mt-2 font-display text-6xl uppercase leading-none tracking-tight text-ink-900">404</h1>
      <p className="mt-3 max-w-sm font-serif text-lg italic text-ink-600">
        Essa página chutou pra fora. Nada por aqui — bora voltar pro jogo?
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link to="/jogos" className="btn-stamp bg-grass-600 px-7 py-3 text-ink-900 hover:bg-grass-700">
          Ver os jogos
        </Link>
        <Link
          to="/"
          className="btn-stamp border-2 border-white/20 px-7 py-3 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
