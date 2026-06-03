import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Grupos',  href: '#grupos',  id: 'grupos'  },
  { label: 'Fixture', href: '#fixture', id: 'fixture' },
  { label: 'Sedes',   href: '#sedes',   id: 'sedes'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const ids = ['grupos', 'fixture', 'sedes']
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FDFCF9]/95 backdrop-blur-md border-b border-[#1C1916]/[0.07]'
          : 'bg-transparent'
      }`}
      style={{ transition: 'background 0.5s cubic-bezier(0.32,0.72,0,1), border-color 0.5s cubic-bezier(0.32,0.72,0,1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <Trophy size={17} className="text-fifa-red" />
          <span className="font-bold text-sm uppercase tracking-widest text-[#1C1916]">
            World Cup <span className="text-fifa-red">26</span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden md:flex gap-0.5">
            {links.map(({ label, href, id }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 block ${
                    activeSection === id
                      ? 'text-[#1C1916]'
                      : 'text-[#A09890] hover:text-[#1C1916]'
                  }`}
                  style={{ transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)' }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-fifa-red rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
