import { useEffect, useState } from 'react'
import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'
import {
  rankingEnabled,
  ensureSession,
  syncToday,
  getProfile,
  setNick as apiSetNick,
  addFriend as apiAddFriend,
  globalBoard,
  friendsBoard,
  sinceForPeriod,
  GAMES,
  type Period,
  type Profile,
  type BoardRow,
} from '../lib/ranking'

export default function Ranking() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [nick, setNick] = useState('')
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'global' | 'friends'>('global')
  const [global, setGlobal] = useState<BoardRow[]>([])
  const [friends, setFriends] = useState<BoardRow[]>([])
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [period, setPeriod] = useState<Period>('all')
  const [gameFilter, setGameFilter] = useState<string | null>(null)

  async function refreshBoards(g: string | null = gameFilter, p: Period = period) {
    const since = sinceForPeriod(p)
    setGlobal(await globalBoard(g, since))
    setFriends(await friendsBoard(g, since))
  }

  function changePeriod(p: Period) {
    setPeriod(p)
    refreshBoards(gameFilter, p)
  }
  function changeGame(g: string | null) {
    setGameFilter(g)
    refreshBoards(g, period)
  }

  useEffect(() => {
    let alive = true
    ;(async () => {
      if (!rankingEnabled) {
        setLoading(false)
        return
      }
      try {
        await ensureSession()
        await syncToday()
        const p = await getProfile()
        if (!alive) return
        setProfile(p)
        await refreshBoards()
      } catch {
        /* mostra o que der */
      }
      if (alive) setLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [])

  async function salvarApelido() {
    const n = nick.trim()
    if (n.length < 2) {
      setMsg('Escolha um apelido com pelo menos 2 letras.')
      return
    }
    setSaving(true)
    setMsg('')
    try {
      const p = await apiSetNick(n)
      setProfile(p)
      await syncToday()
      await refreshBoards()
    } catch (e) {
      setMsg((e as Error).message || 'Não deu pra salvar.')
    }
    setSaving(false)
  }

  async function adicionarAmigo() {
    const c = code.trim().toUpperCase()
    if (c.length < 4) {
      setMsg('Digite o código do amigo.')
      return
    }
    setMsg('')
    try {
      const fr = await apiAddFriend(c)
      setCode('')
      setMsg(`Adicionou ${fr.nick}!`)
      setTab('friends')
      await refreshBoards()
    } catch (e) {
      const m = (e as Error).message
      setMsg(m.includes('nao encontrado') ? 'Código não encontrado.' : 'Não deu pra adicionar.')
    }
  }

  function copiarCodigo() {
    if (!profile) return
    navigator.clipboard?.writeText(`Joga Encyclobol comigo! Meu código de amigo é ${profile.friend_code} · encyclobol.com.br`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rows = tab === 'global' ? global : friends

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />
      <main className="container-page flex-1 py-12 sm:py-16">
        <header className="border-b-2 border-ink-900 pb-5">
          <p className="kicker">A tabela do campeonato</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
            Ranking
          </h1>
          <p className="mt-3 font-serif text-lg italic text-ink-600">
            A soma dos seus pontos nos seis jogos, todo dia. Suba na tabela e desafie os amigos.
          </p>
        </header>

        {/* Sem backend configurado */}
        {!rankingEnabled && (
          <div className="mt-8 border-2 border-ink-900 bg-paper-100 p-8 text-center">
            <p className="font-display text-3xl uppercase tracking-tight text-ink-900">Em breve</p>
            <p className="mx-auto mt-2 max-w-md font-serif text-base italic text-ink-600">
              O ranking global e de amigos está chegando. Continue somando pontos — quando ligar, seu
              progresso de hoje já entra na conta.
            </p>
          </div>
        )}

        {rankingEnabled && loading && (
          <p className="mt-10 text-center font-cond text-sm uppercase tracking-wider text-ink-500">
            Carregando a tabela…
          </p>
        )}

        {/* Definir apelido */}
        {rankingEnabled && !loading && !profile && (
          <div className="mt-8 border-2 border-ink-900 bg-paper-100 p-6">
            <p className="kicker">Entre no ranking</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink-900">
              Escolha seu apelido
            </h2>
            <p className="mt-1 font-serif text-sm italic text-ink-600">
              É como você aparece na tabela. Você ganha um código pra trocar com os amigos.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                value={nick}
                onChange={(e) => setNick(e.target.value.slice(0, 20))}
                placeholder="Seu apelido"
                className="flex-1 border-2 border-ink-900 bg-paper px-4 py-2.5 font-cond text-base uppercase tracking-wide text-ink-900 outline-none placeholder:text-ink-500"
              />
              <button
                onClick={salvarApelido}
                disabled={saving}
                className="btn-stamp bg-grass-600 px-6 py-2.5 text-ink-900 hover:bg-grass-700 disabled:opacity-50"
              >
                {saving ? '…' : 'Entrar'}
              </button>
            </div>
            {msg && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-600">{msg}</p>}
          </div>
        )}

        {/* Logado */}
        {rankingEnabled && !loading && profile && (
          <>
            {/* Cartão do jogador */}
            <div className="mt-6 flex flex-col gap-3 border-2 border-ink-900 bg-paper-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="kicker text-ink-500">Você</p>
                <p className="font-display text-2xl uppercase tracking-tight text-ink-900">{profile.nick}</p>
                <p className="mt-0.5 font-cond text-xs font-600 uppercase tracking-wider text-ink-600">
                  Código: <span className="text-grass-600">{profile.friend_code}</span>
                </p>
              </div>
              <button
                onClick={copiarCodigo}
                className="btn-stamp bg-grass-700 px-5 py-2.5 text-ink-900 hover:bg-grass-600"
              >
                {copied ? 'Copiado!' : 'Convidar amigo'}
              </button>
            </div>

            {/* Adicionar amigo */}
            <div className="mt-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
                placeholder="Código do amigo"
                className="flex-1 border-2 border-ink-900 bg-paper px-4 py-2.5 font-cond text-base uppercase tracking-[0.2em] text-ink-900 outline-none placeholder:tracking-wider placeholder:text-ink-500"
              />
              <button
                onClick={adicionarAmigo}
                className="btn-stamp border-2 border-ink-900 px-5 py-2.5 text-ink-900 hover:bg-grass-700 hover:text-ink-900"
              >
                Adicionar
              </button>
            </div>
            {msg && <p className="mt-2 font-cond text-xs uppercase tracking-wider text-ochre-600">{msg}</p>}

            {/* Filtros: período */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {([['all', 'Sempre'], ['week', 'Semana'], ['month', 'Mês']] as const).map(([p, label]) => (
                <button
                  key={p}
                  onClick={() => changePeriod(p)}
                  className={`border-2 px-3 py-1.5 font-cond text-xs font-700 uppercase tracking-wide transition-colors ${
                    period === p ? 'border-ink-900 bg-grass-700 text-ink-900' : 'border-ink-900/30 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Filtros: jogo */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button
                onClick={() => changeGame(null)}
                className={`border-2 px-3 py-1.5 font-cond text-xs font-600 uppercase tracking-wide transition-colors ${
                  gameFilter === null ? 'border-grass-700 bg-grass-600 text-ink-900' : 'border-ink-900/30 text-ink-700 hover:border-ink-900'
                }`}
              >
                Geral
              </button>
              {GAMES.map((g) => (
                <button
                  key={g}
                  onClick={() => changeGame(g)}
                  className={`border-2 px-3 py-1.5 font-cond text-xs font-600 uppercase tracking-wide transition-colors ${
                    gameFilter === g ? 'border-grass-700 bg-grass-600 text-ink-900' : 'border-ink-900/30 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Abas */}
            <div className="mt-4 flex border-b-2 border-ink-900">
              {(['global', 'friends'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`-mb-0.5 border-b-4 px-5 py-2.5 font-cond text-sm font-700 uppercase tracking-wider ${
                    tab === t ? 'border-grass-600 text-ink-900' : 'border-transparent text-ink-500'
                  }`}
                >
                  {t === 'global' ? 'Global' : 'Amigos'}
                </button>
              ))}
            </div>

            {/* Tabela */}
            <div className="mt-3 overflow-hidden border-2 border-ink-900">
              {rows.length === 0 && (
                <p className="bg-paper-100 px-4 py-6 text-center font-serif text-sm italic text-ink-600">
                  {tab === 'friends'
                    ? 'Adicione amigos pelo código pra ver a disputa.'
                    : 'Ninguém pontuou ainda. Seja o primeiro!'}
                </p>
              )}
              {rows.map((r, i) => (
                <div
                  key={`${r.nick}-${i}`}
                  className={`flex items-center gap-3 border-b border-ink-900/10 px-4 py-3 last:border-b-0 ${
                    r.is_me ? 'bg-grass-600/10' : i % 2 ? 'bg-paper-100' : 'bg-paper'
                  }`}
                >
                  <span className="w-8 font-display text-xl text-ink-900/40">{r.rank}</span>
                  <span className="flex-1 font-cond text-base font-600 uppercase tracking-wide text-ink-900">
                    {r.nick}
                    {r.is_me && <span className="ml-2 text-xs text-grass-600">(você)</span>}
                  </span>
                  <span className="font-display text-xl text-ink-900">{r.total}</span>
                  <span className="font-cond text-[10px] font-500 uppercase tracking-wide text-ink-500">pts</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
