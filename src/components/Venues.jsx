import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { Users } from 'lucide-react'
import venues from '../data/venues.json'
import Flag from './Flag'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const HOST_NAMES = new Set(['United States of America', 'Canada', 'Mexico'])
const MAX_CAPACITY = Math.max(...venues.map(v => v.capacity))

const MAP_BG    = '#E8E2D6'
const MAP_HOST  = '#C8C0B0'
const MAP_OTHER = '#D4CEC4'
const MAP_STROKE_HOST  = '#B8B0A4'
const MAP_STROKE_OTHER = '#C8C2B8'

export default function Venues() {
  const [selected, setSelected] = useState(venues[2])
  const listRef = useRef(null)

  function select(venue) {
    setSelected(venue)
    if (listRef.current) {
      const btn = listRef.current.querySelector(`[data-city="${venue.city}"]`)
      btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  return (
    <section id="sedes" className="py-32 bg-[#F4F0EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: '#A09890' }}>
            USA · Canadá · México
          </p>
          <h2 className="section-title text-[#1C1916]">Sedes</h2>
          <p className="mt-3 text-sm max-w-sm" style={{ color: '#6B6360' }}>
            Selecciona una sede en el mapa para ver el estadio.
          </p>
        </motion.div>

        {/* Map + Panel split */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[620px]">

          {/* ── MAP PANEL ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-0"
            style={{
              background: MAP_BG,
              boxShadow: '0 0 0 1px rgba(28,25,22,0.08), 0 8px 32px rgba(28,25,22,0.08)',
            }}
          >
            {/* Dot grid texture */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(28,25,22,0.07) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, ${MAP_BG} 100%)`,
              }}
            />

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [-97, 36], scale: 500 }}
              width={800}
              height={500}
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => geo.properties.name !== 'Antarctica')
                    .map(geo => {
                      const isHost = HOST_NAMES.has(geo.properties.name)
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill:        isHost ? MAP_HOST  : MAP_OTHER,
                              stroke:      isHost ? MAP_STROKE_HOST : MAP_STROKE_OTHER,
                              strokeWidth: isHost ? 0.6 : 0.4,
                              outline:     'none',
                            },
                            hover: {
                              fill:    isHost ? '#B8B0A0' : '#CAC4BA',
                              outline: 'none',
                            },
                            pressed: { outline: 'none' },
                          }}
                        />
                      )
                    })
                }
              </Geographies>

              {venues.map((venue) => {
                const isActive = selected?.city === venue.city
                return (
                  <Marker
                    key={venue.city}
                    coordinates={[venue.lng, venue.lat]}
                    onClick={() => select(venue)}
                  >
                    <g style={{ cursor: 'pointer' }}>
                      {isActive && (
                        <>
                          <circle r={6} fill="none" stroke="#C8102E" strokeWidth={1.5}>
                            <animate attributeName="r"       values="6;18;18" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.7;0;0"  dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle r={6} fill="none" stroke="#C8102E" strokeWidth={1}>
                            <animate attributeName="r"       values="6;24;24" dur="2s" begin="0.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0;0"  dur="2s" begin="0.5s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      <circle
                        r={isActive ? 6 : 4.5}
                        fill="#C8102E"
                        fillOpacity={isActive ? 1 : 0.85}
                        stroke={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(200,16,46,0.2)'}
                        strokeWidth={isActive ? 2 : 0.8}
                        style={{ transition: 'r 0.2s ease' }}
                      />
                      {isActive && (
                        <text
                          textAnchor="middle"
                          y={-10}
                          style={{
                            fontFamily: 'Outfit, system-ui, sans-serif',
                            fontSize: 7.5,
                            fontWeight: 700,
                            fill: '#1C1916',
                            letterSpacing: '0.06em',
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                          }}
                        >
                          {venue.city}
                        </text>
                      )}
                    </g>
                  </Marker>
                )
              })}
            </ComposableMap>
          </motion.div>

          {/* ── DETAIL + LIST PANEL ────────────────────────── */}
          <div className="lg:w-72 flex flex-col gap-3 lg:h-full">

            {/* Selected venue detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.city}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="rounded-2xl overflow-hidden shrink-0"
                style={{
                  background: '#fff',
                  boxShadow: '0 0 0 1px rgba(28,25,22,0.07), 0 4px 20px rgba(28,25,22,0.08)',
                }}
              >
                {/* Stadium image — keep dark overlay for legibility */}
                <div className="relative h-[260px] overflow-hidden bg-[#D4CDC4]">
                  <img
                    src={selected?.image}
                    alt={selected?.stadium}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.45) saturate(0.5) contrast(1.15)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(28,25,22,0.75) 0%, rgba(28,25,22,0.1) 55%, transparent 100%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-0.5">
                      {selected?.country}
                    </p>
                    <h3 className="text-[17px] font-bold text-white leading-tight">
                      {selected?.city}
                    </h3>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 py-3 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs leading-snug" style={{ color: '#6B6360' }}>
                      {selected?.stadium}
                    </p>
                    <Flag code={selected?.code} className="w-6 flex-shrink-0 mt-0.5" />
                  </div>

                  {/* Capacity bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#A09890' }}>
                        Aforo
                      </span>
                      <span className="text-xs font-bold text-[#1C1916] tabular-nums">
                        {selected?.capacity.toLocaleString('es-ES')}
                      </span>
                    </div>
                    <div className="h-[2px] rounded-full overflow-hidden" style={{ background: '#EAE5DC' }}>
                      <motion.div
                        key={selected?.city + 'bar'}
                        initial={{ width: 0 }}
                        animate={{ width: `${((selected?.capacity ?? 0) / MAX_CAPACITY) * 100}%` }}
                        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-fifa-red rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#A09890' }}>
                    <Users size={11} />
                    <span>{selected?.capacity.toLocaleString('es-ES')} espectadores</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scrollable venue list */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto rounded-2xl min-h-0"
              style={{
                background: '#fff',
                boxShadow: '0 0 0 1px rgba(28,25,22,0.07), 0 4px 20px rgba(28,25,22,0.08)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="p-2 flex flex-col gap-0.5">
                {venues.map((venue, i) => {
                  const isActive = selected?.city === venue.city
                  return (
                    <motion.button
                      key={venue.city}
                      data-city={venue.city}
                      onClick={() => select(venue)}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 ${
                        isActive ? '' : ''
                      }`}
                      style={{
                        background: isActive ? 'rgba(28,25,22,0.05)' : 'transparent',
                        color: isActive ? '#1C1916' : '#6B6360',
                        transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(28,25,22,0.03)' }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <Flag code={venue.code} className="w-4 flex-shrink-0 opacity-80" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate leading-tight">
                          {venue.city}
                        </p>
                        <p className="text-[10px] truncate mt-0.5" style={{ color: '#A09890' }}>
                          {venue.stadium}
                        </p>
                      </div>
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-fifa-red flex-shrink-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-8"
        >
          {[
            { label: 'Total sedes', value: venues.length },
            { label: 'Mayor aforo', value: MAX_CAPACITY.toLocaleString('es-ES') },
            { label: 'Países sede', value: 3 },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#A09890' }}>
                {label}
              </span>
              <span className="text-sm font-bold text-[#1C1916] tabular-nums">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
