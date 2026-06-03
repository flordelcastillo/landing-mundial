import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TARGET = new Date('2026-06-11T18:00:00Z')

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {/* Double-bezel countdown box */}
      <div
        className="rounded-xl px-5 py-4 min-w-[76px] md:min-w-[100px] text-center"
        style={{
          background: 'rgba(28,25,22,0.05)',
          boxShadow: '0 0 0 1px rgba(28,25,22,0.09), inset 0 1px 1px rgba(255,255,255,0.6)',
        }}
      >
        <div className="font-bold text-4xl md:text-6xl tabular-nums text-[#1C1916] leading-none">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#A09890]">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col items-center justify-center bg-[#FDFCF9] overflow-hidden"
    >
      {/* Warm ambient glow — top center */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,80,60,0.08) 0%, transparent 70%)' }}
      />

      {/* Grain overlay for paper feel */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none noise-bg bg-repeat"
        style={{ backgroundSize: '200px 200px' }}
        aria-hidden="true"
      />

      {/* Ghost "26" — rotated, ink at 4% opacity */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-[5vw]"
        aria-hidden="true"
      >
        <span
          className="text-[38vw] font-black leading-none text-transparent rotate-12"
          style={{ WebkitTextStroke: '1.5px rgba(28,25,22,0.045)' }}
        >
          26
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.4em] text-[#A09890] mb-6"
        >
          FIFA World Cup™
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-[#1C1916] leading-none mb-4"
        >
          2026
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4 text-xs font-medium text-[#A09890] uppercase tracking-[0.2em] mb-14"
        >
          <span>USA</span>
          <span className="w-1 h-1 rounded-full bg-[#1C1916]/15" />
          <span>Canadá</span>
          <span className="w-1 h-1 rounded-full bg-[#1C1916]/15" />
          <span>México</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-start gap-2.5 md:gap-4"
        >
          <Unit value={time.days}    label="Días" />
          <div className="text-[#1C1916]/15 text-3xl font-light mt-5">·</div>
          <Unit value={time.hours}   label="Horas" />
          <div className="text-[#1C1916]/15 text-3xl font-light mt-5">·</div>
          <Unit value={time.minutes} label="Min" />
          <div className="text-[#1C1916]/15 text-3xl font-light mt-5">·</div>
          <Unit value={time.seconds} label="Seg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <p className="text-[10px] text-[#A09890] uppercase tracking-[0.3em]">
            11 Jun — 19 Jul 2026
          </p>

          {/* Button-in-button pill CTA */}
          <a
            href="#fixture"
            className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-fifa-red text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#A50D25] active:scale-[0.98]"
            style={{ transition: 'all 0.4s cubic-bezier(0.32,0.72,0,1)' }}
          >
            Ver fixture
            <span
              className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px"
              style={{ transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-gradient-to-b from-[#1C1916]/15 to-transparent" />
        <span className="text-[9px] uppercase tracking-widest text-[#1C1916]/20">Scroll</span>
      </motion.div>
    </section>
  )
}
