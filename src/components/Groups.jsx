import { motion } from 'framer-motion'
import groups from '../data/groups.json'
import Flag from './Flag'

function GroupCard({ group, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.32, 0.72, 0, 1] }}
      className="card p-5 flex flex-col gap-3 relative overflow-hidden hover:-translate-y-0.5"
      style={{ transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1)' }}
    >
      {/* Group letter watermark */}
      <span
        className="absolute -right-1 -bottom-3 text-[72px] font-black leading-none select-none pointer-events-none"
        style={{ color: 'rgba(28,25,22,0.05)' }}
        aria-hidden="true"
      >
        {group.id}
      </span>

      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: '#A09890' }}
        >
          Grupo
        </span>
        <span className="text-lg font-black text-fifa-red">{group.id}</span>
      </div>

      <ul className="flex flex-col gap-2.5">
        {group.teams.map(team => (
          <li key={team.code} className="flex items-center gap-2.5">
            <Flag code={team.code} className="w-5 flex-shrink-0" />
            <span className="text-sm font-medium text-[#1C1916] truncate">{team.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Groups() {
  return (
    <section id="grupos" className="py-28 px-6 bg-[#F4F0EA]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: '#A09890' }}>
            48 selecciones
          </p>
          <h2 className="section-title text-[#1C1916]">Grupos</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {groups.map((group, i) => (
            <GroupCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
