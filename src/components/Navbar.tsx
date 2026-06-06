import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sections = ["Home", "About", "Skills", "Experience", "Projects", "Achievements", "Contact"]

export default function Navbar() {
  const [active, setActive] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sectionElements = sections.map((s) => document.getElementById(s.toLowerCase()))
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActive(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-40 px-6 py-3 rounded-2xl flex items-center justify-between max-w-3xl w-[calc(100%-2rem)]"
      style={{
        transform: "translateX(-50%)",
        background: scrolled ? "rgba(10, 10, 15, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        border: scrolled ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2 }}
    >
      <span
        className="text-lg font-bold tracking-wider cursor-pointer"
        style={{ color: "#00d4ff", fontFamily: "var(--font-syne)" }}
        onClick={() => scrollTo("home")}
      >
        AK<span style={{ color: "#7c3aed" }}>.</span>
      </span>

      <div className="hidden md:flex items-center gap-1">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="relative px-3 py-1.5 text-sm rounded-lg transition-colors"
            style={{
              color: active === s ? "#00d4ff" : "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-space)",
            }}
          >
            {s}
            {active === s && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-lg"
                style={{ background: "rgba(0, 212, 255, 0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <button
        className="md:hidden relative w-6 h-5 flex flex-col justify-between"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <motion.span
          className="block h-0.5 w-full rounded"
          style={{ background: "#00d4ff" }}
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="block h-0.5 w-full rounded"
          style={{ background: "#00d4ff" }}
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="block h-0.5 w-full rounded"
          style={{ background: "#00d4ff" }}
          animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl"
            style={{
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm"
                style={{
                  color: active === s ? "#00d4ff" : "rgba(255,255,255,0.5)",
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
