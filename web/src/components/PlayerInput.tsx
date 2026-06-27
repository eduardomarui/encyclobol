import { useMemo, useState } from 'react'

type Opt = { display: string }

function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

// Autocomplete editorial próprio: filtra a lista enquanto digita, com
// navegação por teclado e toque. Substitui o <datalist> nativo.
export default function PlayerInput({
  options,
  onGuess,
  placeholder = 'Nome do craque…',
}: {
  options: Opt[]
  onGuess: (text: string) => void
  placeholder?: string
}) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(0)

  const matches = useMemo(() => {
    const nq = norm(q)
    if (nq.length < 1) return []
    const starts: Opt[] = []
    const incl: Opt[] = []
    for (const o of options) {
      const nd = norm(o.display)
      if (nd.startsWith(nq)) starts.push(o)
      else if (nd.includes(nq)) incl.push(o)
    }
    return [...starts, ...incl].slice(0, 6)
  }, [q, options])

  function choose(text: string) {
    onGuess(text)
    setQ('')
    setOpen(false)
    setHi(0)
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHi((h) => Math.min(h + 1, matches.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHi((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && matches[hi]) choose(matches[hi].display)
      else if (q.trim()) choose(q)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
            setHi(0)
          }}
          onKeyDown={onKey}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={placeholder}
          autoFocus
          autoComplete="off"
          className="flex-1 border-2 border-white/20 bg-paper px-4 py-3 font-serif text-base text-ink-900 outline-none placeholder:text-ink-500 focus:bg-paper-100"
        />
        <button
          type="button"
          onClick={() => q.trim() && choose(q)}
          className="btn-stamp bg-grass-600 px-6 text-ink-900 hover:bg-grass-700"
        >
          Chutar
        </button>
      </div>

      {open && matches.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-auto border-2 border-white/20 bg-paper shadow-lg">
          {matches.map((o, i) => (
            <li key={o.display}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  choose(o.display)
                }}
                onMouseEnter={() => setHi(i)}
                className={`block w-full px-4 py-2.5 text-left font-serif text-base transition-colors ${
                  i === hi ? 'bg-grass-600 text-ink-900' : 'text-ink-900 hover:bg-paper-200'
                }`}
              >
                {o.display}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
