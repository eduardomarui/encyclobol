import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { syncToday } from './lib/ranking'
import Landing from './pages/Landing'
import Jogos from './pages/Jogos'
import QuemSouEle from './pages/QuemSouEle'
import Penaltis from './pages/Penaltis'
import Conexoes from './pages/Conexoes'
import LinhaDoTempo from './pages/LinhaDoTempo'
import Intruso from './pages/Intruso'
import Misterioso from './pages/Misterioso'
import Ranking from './pages/Ranking'
import Duelo from './pages/Duelo'
import Perfil from './pages/Perfil'
import Privacidade from './pages/Privacidade'
import Termos from './pages/Termos'
import NaoEncontrado from './pages/NaoEncontrado'
import Onboarding from './components/Onboarding'

// Manda os pontos do dia pro ranking sempre que a pessoa muda de tela ou sai
// do app — antes só ia quando ela abria /ranking, e muita pontuação se perdia.
function ScoreSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    syncToday().catch(() => {})
  }, [pathname])
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') syncToday().catch(() => {})
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Onboarding />
      <ScoreSync />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="*" element={<NaoEncontrado />} />
        <Route path="/jogos/quem-sou-ele" element={<QuemSouEle />} />
        <Route path="/jogos/penaltis" element={<Penaltis />} />
        <Route path="/jogos/penaltis/online" element={<Duelo />} />
        <Route path="/jogos/conexoes" element={<Conexoes />} />
        <Route path="/jogos/linha-do-tempo" element={<LinhaDoTempo />} />
        <Route path="/jogos/o-intruso" element={<Intruso />} />
        <Route path="/jogos/craque-misterioso" element={<Misterioso />} />
      </Routes>
    </BrowserRouter>
  )
}
