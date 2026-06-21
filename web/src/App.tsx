import Nav from './components/landing/Nav'
import Hero from './components/landing/Hero'
import Games from './components/landing/Games'
import HowItWorks from './components/landing/HowItWorks'
import Pricing from './components/landing/Pricing'
import Footer from './components/landing/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900">
      <Nav />
      <main>
        <Hero />
        <Games />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
