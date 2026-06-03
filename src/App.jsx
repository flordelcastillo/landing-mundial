import { Trophy } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Groups from './components/Groups'
import Fixtures from './components/Fixtures'
import Venues from './components/Venues'

function Footer() {
  return (
    <footer className="py-10 px-6 bg-[#EDE8DF] border-t border-[#1C1916]/[0.07]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-fifa-red" />
          <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#A09890' }}>
            FIFA World Cup 2026™
          </span>
        </div>
        <span className="text-xs" style={{ color: '#C0B8B0' }}>
          USA · Canadá · México · 11 Jun – 19 Jul 2026
        </span>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-xs"
            style={{ color: '#A09890', transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1C1916' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A09890' }}
          >
            Privacidad
          </a>
          <a
            href="#"
            className="text-xs"
            style={{ color: '#A09890', transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1C1916' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A09890' }}
          >
            Términos
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <Hero />
        <Groups />
        <Fixtures />
        <Venues />
      </main>
      <Footer />
    </>
  )
}
