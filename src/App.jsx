import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Groups from './components/Groups'
import Fixtures from './components/Fixtures'
import Venues from './components/Venues'

function Footer() {
  return (
    <footer className="py-8 px-6 bg-[#0a0a0a] border-t border-[#111]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs text-white/20 uppercase tracking-widest">
          FIFA World Cup 2026™
        </span>
        <span className="text-xs text-white/20">
          USA · Canadá · México · 11 Jun – 19 Jul 2026
        </span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Groups />
        <Fixtures />
        <Venues />
      </main>
      <Footer />
    </>
  )
}
