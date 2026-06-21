import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import QuemSouEle from './pages/QuemSouEle'
import QuizRelampago from './pages/QuizRelampago'
import Conexoes from './pages/Conexoes'
import LinhaDoTempo from './pages/LinhaDoTempo'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jogos/quem-sou-ele" element={<QuemSouEle />} />
        <Route path="/jogos/quiz-relampago" element={<QuizRelampago />} />
        <Route path="/jogos/conexoes" element={<Conexoes />} />
        <Route path="/jogos/linha-do-tempo" element={<LinhaDoTempo />} />
      </Routes>
    </BrowserRouter>
  )
}
