import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Onboarding />
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
