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
    <div className="flex flex-col items-center gap-1">
      <div className="font-extrabold text-4xl md:text-6xl tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fifa-red/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-fifa-blue/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4"
        >
          FIFA World Cup™
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-9xl font-extrabold uppercase tracking-tighter text-white leading-none mb-2"
        >
          2026
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 text-sm font-medium text-white/50 uppercase tracking-widest mb-16"
        >
          <span>USA</span>
          <span className="w-1 h-1 rounded-full bg-fifa-red" />
          <span>Canadá</span>
          <span className="w-1 h-1 rounded-full bg-fifa-red" />
          <span>México</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-start gap-6 md:gap-10"
        >
          <Unit value={time.days}    label="Días" />
          <div className="text-white/20 text-4xl md:text-6xl font-thin mt-1">:</div>
          <Unit value={time.hours}   label="Horas" />
          <div className="text-white/20 text-4xl md:text-6xl font-thin mt-1">:</div>
          <Unit value={time.minutes} label="Min" />
          <div className="text-white/20 text-4xl md:text-6xl font-thin mt-1">:</div>
          <Unit value={time.seconds} label="Seg" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-xs text-white/25 uppercase tracking-widest"
        >
          11 Jun — 19 Jul 2026
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-[10px] uppercase tracking-widest text-white/20">Scroll</span>
      </motion.div>
    </section>
  )
}
