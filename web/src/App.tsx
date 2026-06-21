import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import QuemSouEle from './pages/QuemSouEle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jogos/quem-sou-ele" element={<QuemSouEle />} />
      </Routes>
    </BrowserRouter>
  )
}
