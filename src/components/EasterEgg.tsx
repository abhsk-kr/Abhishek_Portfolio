import { useEffect, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const COLORS = ["#00d4ff", "#7c3aed", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
}

export default function EasterEgg() {
  const [particles, setParticles] = useState<Particle[]>([])

  const fire = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 720,
      scale: 0.3 + Math.random() * 0.7,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const active = document.activeElement
        if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
          const val = active.value.toLowerCase()
          if (val.includes("hire me")) {
            fire()
            active.value = ""
          }
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [fire])

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: "50%",
            top: "50%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: p.scale,
            rotate: p.rotation,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  )
}
