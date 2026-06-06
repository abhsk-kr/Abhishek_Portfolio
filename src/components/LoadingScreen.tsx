import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onFinished: () => void
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return p + Math.floor(Math.random() * 8) + 1
      })
    }, 120)
    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onFinished, 600)
      return () => clearTimeout(timeout)
    }
  }, [progress, onFinished])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="relative mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "#00d4ff" : "#7c3aed",
                top: 0,
                left: 0,
              }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 40,
                y: Math.sin((i / 8) * Math.PI * 2) * 40,
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.div
            className="w-16 h-16 border-2 rounded-full"
            style={{
              borderColor: "#00d4ff",
              borderTopColor: "transparent",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.p
          className="text-lg tracking-widest"
          style={{ fontFamily: "var(--font-syne)", color: "#00d4ff" }}
        >
          LOADING ABHISHEK.AI{dots}
        </motion.p>

        <div className="mt-6 w-48 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="mt-2 text-sm text-white/40 font-mono">{Math.min(progress, 100)}%</p>

        <motion.p
          className="mt-12 text-xs text-white/20 font-mono"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Initializing neural networks...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
