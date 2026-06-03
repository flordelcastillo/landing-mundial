import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fixtures from '../data/fixtures.json'
import Flag from './Flag'

/* ─────────────────────────────────────────── */
/* CONFIG                                      */
/* ─────────────────────────────────────────── */

const PHASES = [
  { key: 'Grupos',           label: 'Grupos'   },
  { key: 'Dieciseisavos',    label: '1/16'     },
  { key: 'Octavos de Final', label: 'Octavos'  },
  { key: 'Cuartos de Final', label: 'Cuartos'  },
  { key: 'Semifinal',        label: 'Semis'    },
  { key: 'Tercer Puesto',    label: '3° Puesto'},
  { key: 'Final',            label: 'Final'    },
]

const COUNTS = Object.fromEntries(
  PHASES.map(p => [p.key, fixtures.filter(f => f.phase === p.key).length])
)

const ALL_GROUP_TEAMS = [
  'Argentina',
  ...fixtures
    .filter(f => f.phase === 'Grupos')
    .flatMap(f => [f.home.name, f.away.name])
    .filter((v, i, a) => a.indexOf(v) === i && v !== 'Argentina')
    .sort(),
]

const TEAM_CODE = Object.fromEntries(
  fixtures
    .filter(f => f.phase === 'Grupos')
    .flatMap(f => [[f.home.name, f.home.code], [f.away.name, f.away.code]])
)

/* ─────────────────────────────────────────── */
/* HELPERS                                     */
/* ─────────────────────────────────────────── */

function dayLabel(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function groupByDate(matches) {
  const map = new Map()
  for (const m of matches) {
    if (!map.has(m.date)) map.set(m.date, [])
    map.get(m.date).push(m)
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
}

/* Inline pin icon — avoids Lucide import */
function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M6 1C4.34 1 3 2.34 3 4c0 2.5 3 6.5 3 6.5S9 6.5 9 4c0-1.66-1.34-3-3-3z" />
      <circle cx="6" cy="4" r="1.2" />
    </svg>
  )
}

/* ─────────────────────────────────────────── */
/* GROUP MATCH CARD (compact)                  */
/* ─────────────────────────────────────────── */

function GroupCard({ match, index }) {
  const tbd = match.home.code === 'xx'
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.02, 0.32), ease: [0.32, 0.72, 0, 1] }}
      className="bg-white rounded-2xl px-5 py-4"
      style={{
        boxShadow:
          '0 0 0 1px rgba(28,25,22,0.06), 0 1px 3px rgba(28,25,22,0.03), 0 4px 14px rgba(28,25,22,0.05)',
      }}
      whileHover={{ y: -2, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}
    >
      {/* Row 1: group badge + time */}
      <div className="flex items-center justify-between mb-3.5">
        {match.group ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-fifa-red bg-[#C8102E]/10 px-2 py-0.5 rounded">
            Gr. {match.group}
          </span>
        ) : (
          <span className="text-[10px] text-[#A09890]">
            {match.matchday ? `Jornada ${match.matchday}` : ''}
          </span>
        )}
        <span className="text-xs font-semibold tabular-nums" style={{ color: '#A09890' }}>
          {match.time}
        </span>
      </div>

      {/* Row 2: teams */}
      <div className="flex items-center gap-2">
        {/* Home */}
        <div className="flex items-center gap-2.5 flex-1 justify-end min-w-0">
          <span
            className="text-sm font-semibold text-right leading-tight truncate"
            style={{ color: tbd ? '#B0A89E' : '#1C1916', fontStyle: tbd ? 'italic' : 'normal' }}
          >
            {match.home.name}
          </span>
          <Flag code={match.home.code} className="w-8 flex-shrink-0" />
        </div>

        {/* VS badge */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#F4F0EA' }}
        >
          <span
            className="text-[8px] font-black uppercase tracking-widest"
            style={{ color: '#C0B8B0' }}
          >
            vs
          </span>
        </div>

        {/* Away */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Flag code={match.away.code} className="w-8 flex-shrink-0" />
          <span
            className="text-sm font-semibold leading-tight truncate"
            style={{ color: tbd ? '#B0A89E' : '#1C1916', fontStyle: tbd ? 'italic' : 'normal' }}
          >
            {match.away.name}
          </span>
        </div>
      </div>

      {/* Row 3: venue */}
      <div
        className="mt-3.5 pt-3.5 border-t flex items-center gap-1.5 text-[11px]"
        style={{ borderColor: '#F0EBE3', color: '#B0A89E' }}
      >
        <PinIcon />
        <span className="truncate">{match.venue}</span>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────── */
/* KNOCKOUT CARD (premium)                     */
/* ─────────────────────────────────────────── */

function KnockoutCard({ match, index }) {
  const tbd = match.home.code === 'xx'
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.055, 0.5), ease: [0.32, 0.72, 0, 1] }}
      className="bg-white rounded-2xl px-6 py-6"
      style={{
        boxShadow:
          '0 0 0 1px rgba(28,25,22,0.07), 0 2px 8px rgba(28,25,22,0.05), 0 10px 28px rgba(28,25,22,0.08)',
      }}
      whileHover={{ y: -3, transition: { duration: 0.22 } }}
    >
      {/* Header: time + venue */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{ color: '#A09890' }}
        >
          {match.time}
        </span>
        <div
          className="flex items-center gap-1.5 text-[11px] min-w-0 max-w-[56%]"
          style={{ color: '#B0A89E' }}
        >
          <PinIcon />
          <span className="truncate">{match.venue}</span>
        </div>
      </div>

      {/* Teams: vertical centering */}
      <div className="flex items-center justify-center gap-5">
        {/* Home */}
        <div className="flex flex-col items-center gap-3 flex-1 min-w-0">
          <Flag code={match.home.code} className="w-12" />
          <span
            className="text-sm font-semibold text-center leading-tight"
            style={{ color: tbd ? '#B0A89E' : '#1C1916', fontStyle: tbd ? 'italic' : 'normal' }}
          >
            {match.home.name}
          </span>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pb-6">
          <div className="h-px w-8 bg-[#EAE5DC]" />
          <span
            className="text-[8px] font-black uppercase tracking-[0.35em]"
            style={{ color: '#C8BEB8' }}
          >
            vs
          </span>
          <div className="h-px w-8 bg-[#EAE5DC]" />
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-3 flex-1 min-w-0">
          <Flag code={match.away.code} className="w-12" />
          <span
            className="text-sm font-semibold text-center leading-tight"
            style={{ color: tbd ? '#B0A89E' : '#1C1916', fontStyle: tbd ? 'italic' : 'normal' }}
          >
            {match.away.name}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────── */
/* FINAL CARD (dark, cinematic)                */
/* ─────────────────────────────────────────── */

function FinalCard({ match }) {
  const tbd = match.home.code === 'xx'
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: '#1C1916',
        boxShadow:
          '0 0 0 1px rgba(28,25,22,0.2), 0 8px 32px rgba(28,25,22,0.18), 0 24px 64px rgba(28,25,22,0.14)',
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 noise-bg bg-repeat pointer-events-none"
        style={{ backgroundSize: '200px 200px', opacity: 0.03 }}
        aria-hidden="true"
      />

      <div className="relative px-10 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-fifa-red" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] font-semibold"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Gran Final · 19 Jul 2026
            </span>
          </div>
          <span
            className="text-xs tabular-nums font-medium"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {match.time}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-center gap-12 mb-10">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div
              className="rounded-xl p-1.5"
              style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }}
            >
              <Flag code={match.home.code} className="w-14" />
            </div>
            <span
              className="text-base font-bold text-center leading-tight"
              style={{
                color: tbd ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.9)',
                fontStyle: tbd ? 'italic' : 'normal',
              }}
            >
              {match.home.name}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-shrink-0 pb-8">
            <div className="h-px w-10 bg-white/10" />
            <span
              className="text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              vs
            </span>
            <div className="h-px w-10 bg-white/10" />
          </div>

          <div className="flex flex-col items-center gap-4 flex-1">
            <div
              className="rounded-xl p-1.5"
              style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }}
            >
              <Flag code={match.away.code} className="w-14" />
            </div>
            <span
              className="text-base font-bold text-center leading-tight"
              style={{
                color: tbd ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.9)',
                fontStyle: tbd ? 'italic' : 'normal',
              }}
            >
              {match.away.name}
            </span>
          </div>
        </div>

        {/* Venue footer */}
        <div
          className="pt-6 border-t flex items-center justify-center gap-1.5 text-[11px]"
          style={{ borderColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.22)' }}
        >
          <PinIcon />
          <span>{match.venue}</span>
        </div>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────── */
/* DATE DIVIDER                                */
/* ─────────────────────────────────────────── */

function DateDivider({ date, count }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-xs font-semibold capitalize whitespace-nowrap"
        style={{ color: '#1C1916' }}
      >
        {dayLabel(date)}
      </span>
      <div className="flex-1 h-px bg-[#EAE5DC]" />
      <span
        className="text-[10px] flex-shrink-0 tabular-nums"
        style={{ color: '#A09890' }}
      >
        {count} {count === 1 ? 'partido' : 'partidos'}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* MAIN SECTION                                */
/* ─────────────────────────────────────────── */

const USE_GRID = new Set(['Dieciseisavos', 'Octavos de Final', 'Cuartos de Final'])

export default function Fixtures() {
  const [phase, setPhase]       = useState('Grupos')
  const [matchday, setMatchday] = useState(null)
  const [team, setTeam]         = useState(null)

  const isGroups   = phase === 'Grupos'
  const isFinal    = phase === 'Final'
  const isKnockout = !isGroups
  const useGrid    = USE_GRID.has(phase)

  let filtered = fixtures.filter(m => m.phase === phase)
  if (isGroups && matchday !== null) {
    filtered = filtered.filter(m => m.matchday === matchday)
  }
  if (isGroups && team !== null) {
    filtered = filtered.filter(m => m.home.name === team || m.away.name === team)
  }

  const grouped = groupByDate(filtered)

  return (
    <section id="fixture" className="py-28 px-6 bg-[#FDFCF9]">
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-3"
            style={{ color: '#A09890' }}
          >
            Calendario oficial
          </p>
          <h2 className="section-title text-[#1C1916]">Fixture</h2>
        </motion.div>

        {/* ── PHASE PILLS ────────────────────── */}
        <div className="overflow-x-auto -mx-6 px-6 mb-5" style={{ scrollbarWidth: 'none' }}>
          <div
            className="flex gap-1 p-1.5 rounded-2xl w-max"
            style={{ background: '#EDE8DF' }}
          >
            {PHASES.map(p => (
              <button
                key={p.key}
                onClick={() => { setPhase(p.key); setMatchday(null); setTeam(null) }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  color: phase === p.key ? '#1C1916' : '#A09890',
                  transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)',
                }}
              >
                {phase === p.key && (
                  <motion.span
                    layoutId="phase-pill"
                    className="absolute inset-0 rounded-xl bg-white"
                    style={{
                      boxShadow:
                        '0 1px 4px rgba(28,25,22,0.08), 0 4px 12px rgba(28,25,22,0.06)',
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{p.label}</span>
                <span
                  className="relative z-10 text-[10px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums"
                  style={{
                    background: phase === p.key ? '#F4F0EA' : 'rgba(28,25,22,0.06)',
                    color: phase === p.key ? '#A09890' : '#C0B8B0',
                  }}
                >
                  {COUNTS[p.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── JORNADA SUB-FILTER (grupos only) ─ */}
        <AnimatePresence initial={false}>
          {isGroups && (
            <motion.div
              key="jornada-filter"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 28 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 pt-1">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                  style={{ color: '#A09890' }}
                >
                  Jornada
                </span>
                <div className="flex gap-1.5">
                  {[null, 1, 2, 3].map(j => (
                    <button
                      key={j ?? 'all'}
                      onClick={() => setMatchday(j)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        background: matchday === j ? '#1C1916' : '#EDE8DF',
                        color: matchday === j ? '#fff' : '#A09890',
                        transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
                      }}
                    >
                      {j === null ? 'Todas' : `J${j}`}
                    </button>
                  ))}
                </div>
                <span
                  className="text-[10px] tabular-nums"
                  style={{ color: '#C0B8B0' }}
                >
                  {filtered.length} partidos
                </span>
              </div>

              {/* ── FILTRO POR PAÍS ── */}
              <div className="flex items-center gap-3 mt-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] flex-shrink-0"
                  style={{ color: '#A09890' }}
                >
                  País
                </span>
                <div className="flex gap-1.5 flex-nowrap">
                  <button
                    onClick={() => setTeam(null)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0"
                    style={{
                      background: team === null ? '#1C1916' : '#EDE8DF',
                      color: team === null ? '#fff' : '#A09890',
                      transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
                    }}
                  >
                    Todos
                  </button>
                  {ALL_GROUP_TEAMS.map(t => (
                    <button
                      key={t}
                      onClick={() => setTeam(team === t ? null : t)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 flex items-center gap-1.5"
                      style={{
                        background: team === t ? '#C8102E' : '#EDE8DF',
                        color: team === t ? '#fff' : '#A09890',
                        transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
                      }}
                    >
                      <Flag code={TEAM_CODE[t]} className="w-3.5 flex-shrink-0" />
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MATCH LIST ─────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase + (matchday ?? 'all')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >

            {/* FINAL */}
            {isFinal && (
              <div className="max-w-lg mx-auto">
                {filtered.map((m, i) => <FinalCard key={i} match={m} />)}
              </div>
            )}

            {/* KNOCKOUT (non-final) */}
            {isKnockout && !isFinal && (
              <div className="flex flex-col gap-10">
                {grouped.map(([date, matches]) => (
                  <div key={date}>
                    <DateDivider date={date} count={matches.length} />
                    <div
                      className={
                        useGrid
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                          : 'flex flex-col gap-4 max-w-lg mx-auto'
                      }
                    >
                      {matches.map((m, i) => (
                        <KnockoutCard key={i} match={m} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GROUPS */}
            {isGroups && (
              <div className="flex flex-col gap-10">
                {grouped.length === 0 && (
                  <div
                    className="text-center py-20 text-sm"
                    style={{ color: '#A09890' }}
                  >
                    No hay partidos para esta jornada
                  </div>
                )}
                {grouped.map(([date, matches]) => (
                  <div key={date}>
                    <DateDivider date={date} count={matches.length} />
                    <div className="flex flex-col gap-2.5">
                      {matches.map((m, i) => (
                        <GroupCard key={i} match={m} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
