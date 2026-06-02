import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import fixtures from '../data/fixtures.json'
import Flag from './Flag'

const PHASES = ['Grupos', 'Dieciseisavos', 'Cuartos de Final', 'Semifinal', 'Tercer Puesto', 'Final']

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function MatchCard({ match, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="card px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
    >
      {match.group && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-fifa-red bg-fifa-red/10 px-2 py-0.5 rounded w-fit shrink-0">
          Grupo {match.group}
        </span>
      )}

      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-sm font-semibold text-black dark:text-white text-right leading-tight">
            {match.home.name}
          </span>
          <Flag code={match.home.code} className="w-7" />
        </div>

        <span className="text-xs font-bold text-[#aaa] shrink-0">VS</span>

        <div className="flex items-center gap-2 flex-1">
          <Flag code={match.away.code} className="w-7" />
          <span className="text-sm font-semibold text-black dark:text-white leading-tight">
            {match.away.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0 text-right min-w-[160px]">
        <div className="flex items-center gap-1 text-xs text-[#888]">
          <Clock size={11} />
          <span>{formatDate(match.date)} · {match.time}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#888]">
          <MapPin size={11} />
          <span className="max-w-[200px] truncate">{match.venue}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Fixtures() {
  const [phase, setPhase] = useState('Grupos')
  const filtered = fixtures.filter(m => m.phase === phase)

  return (
    <section id="fixture" className="py-24 px-6 bg-white dark:bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#888] mb-2">Calendario oficial</p>
          <h2 className="section-title text-black dark:text-white">Fixture</h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {PHASES.map(p => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                phase === p
                  ? 'bg-fifa-red text-white'
                  : 'border border-[#e5e5e5] dark:border-[#333] text-[#888] hover:border-fifa-red hover:text-black dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {filtered.length > 0
              ? filtered.map((match, i) => <MatchCard key={i} match={match} index={i} />)
              : (
                <div className="text-center py-16 text-[#888] text-sm">
                  Partidos por definir
                </div>
              )
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
