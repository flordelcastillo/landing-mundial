import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import venues from '../data/venues.json'
import Flag from './Flag'

const countryColor = {
  USA:    'bg-blue-500/10 text-blue-500',
  Canadá: 'bg-red-500/10 text-red-500',
  México: 'bg-green-600/10 text-green-600',
}

function VenueCard({ venue, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="card p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-black dark:text-white text-base leading-tight">{venue.city}</h3>
          <p className="text-xs text-[#888] mt-0.5">{venue.stadium}</p>
        </div>
        <Flag code={venue.code} className="w-7" />
      </div>

      <div className="h-px bg-[#e5e5e5] dark:bg-[#222]" />

      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${countryColor[venue.country]}`}>
          {venue.country}
        </span>
        <div className="flex items-center gap-1 text-xs text-[#888]">
          <Users size={12} />
          <span>{venue.capacity.toLocaleString('es-ES')}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Venues() {
  return (
    <section id="sedes" className="py-24 px-6 bg-[#f5f5f5] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#888] mb-2">USA · Canadá · México</p>
          <h2 className="section-title text-black dark:text-white">Sedes</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {venues.map((venue, i) => (
            <VenueCard key={venue.city} venue={venue} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
