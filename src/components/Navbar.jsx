import { useEffect, useState } from 'react'
import { Moon, Sun, Trophy } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Grupos',  href: '#grupos'  },
  { label: 'Fixture', href: '#fixture' },
  { label: 'Sedes',   href: '#sedes'   },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#222]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <Trophy size={20} className="text-fifa-red" />
          <span className="font-extrabold text-sm uppercase tracking-widest text-black dark:text-white">
            World Cup <span className="text-fifa-red">2026</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-medium text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-[#111] hover:border-fifa-red transition-colors"
            aria-label="Toggle theme"
          >
            {dark
              ? <Sun size={15} className="text-[#888]" />
              : <Moon size={15} className="text-[#666]" />
            }
          </button>
        </div>
      </div>
    </nav>
  )
}
