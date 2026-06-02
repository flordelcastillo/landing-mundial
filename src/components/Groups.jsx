import { motion } from 'framer-motion'
import groups from '../data/groups.json'
import Flag from './Flag'

function GroupCard({ group, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Grupo</span>
        <span className="text-xl font-extrabold text-fifa-red">{group.id}</span>
      </div>

      <div className="h-px bg-[#e5e5e5] dark:bg-[#222]" />

      <ul className="flex flex-col gap-2">
        {group.teams.map(team => (
          <li key={team.code} className="flex items-center gap-2.5">
            <Flag code={team.code} className="w-5" />
            <span className="text-sm font-medium text-black dark:text-white">{team.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Groups() {
  return (
    <section id="grupos" className="py-24 px-6 bg-[#f5f5f5] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#888] mb-2">48 Selecciones</p>
          <h2 className="section-title text-black dark:text-white">Grupos</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {groups.map((group, i) => (
            <GroupCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
