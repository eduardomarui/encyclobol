import Nav from '../components/landing/Nav'
import Hero from '../components/landing/Hero'
import Games from '../components/landing/Games'
import Sobre from '../components/landing/Sobre'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <Games />
        <Sobre />
      </main>
      <Footer />
    </div>
  )
}
