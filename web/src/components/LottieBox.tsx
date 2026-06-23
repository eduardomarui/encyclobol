import { useEffect, useRef, useState, type ReactNode } from 'react'
import lottie, { type AnimationItem } from 'lottie-web'

// Carrega uma animação Lottie de um caminho (public/) em runtime.
// Se o arquivo não existir ou falhar, renderiza o `fallback` — então a
// página nunca quebra por falta do asset.
export default function LottieBox({
  path,
  className,
  fallback = null,
  loop = true,
  autoplay = true,
}: {
  path: string
  className?: string
  fallback?: ReactNode
  loop?: boolean
  autoplay?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<unknown | null>(null)
  const [fail, setFail] = useState(false)

  useEffect(() => {
    let alive = true
    setData(null)
    setFail(false)
    fetch(path)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('404'))))
      .then((j) => alive && setData(j))
      .catch(() => alive && setFail(true))
    return () => {
      alive = false
    }
  }, [path])

  useEffect(() => {
    if (!data || !ref.current) return
    let anim: AnimationItem | null = null
    try {
      anim = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData: data,
      })
    } catch {
      setFail(true)
    }
    return () => anim?.destroy()
  }, [data, loop, autoplay])

  if (fail || !data) return <>{fallback}</>
  return <div ref={ref} className={className} />
}
