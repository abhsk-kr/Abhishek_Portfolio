import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const terminalLines = [
  "> INITIALIZING CONTACT PROTOCOL...",
  "> TARGET: meabhsk@gmail.com",
  "> LOCATION: Greater Noida, India",
  "> STATUS: Open to Opportunities ✓",
]

const links = [
  { label: "Email Me", href: "mailto:meabhsk@gmail.com", icon: "✉" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-kumar-378039214/", icon: "🔗" },
  { label: "GitHub", href: "https://github.com/meabhk", icon: "🐙" },
  { label: "LeetCode", href: "https://leetcode.com/u/meabhk/", icon: "⚡" },
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= terminalLines.length) {
          clearInterval(timer)
          return v
        }
        return v + 1
      })
    }, 600)
    return () => clearInterval(timer)
  }, [inView])

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((c) => !c)
    }, 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <section id="contact" ref={ref}>
      <div className="section-wrapper" style={{ maxWidth: "800px" }}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Contact</h2>
          <div className="divider" />
        </motion.div>

        <div className="w-full max-w-[600px] mx-auto flex flex-col items-center gap-10">
          <motion.div
            className="w-full rounded-2xl p-6 md:p-8 text-left"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(0,212,255,0.15)",
              fontFamily: "var(--font-syne)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-2 mb-8">
              {terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  className="text-sm md:text-base"
                  style={{
                    color: i === terminalLines.length - 1 ? "#10b981" : "#00d4ff",
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    inView && i < visibleLines
                      ? { opacity: 1, x: 0 }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  {line}
                </motion.p>
              ))}
              <motion.p
                className="text-sm"
                style={{ color: "#00d4ff" }}
                animate={{ opacity: visibleLines >= terminalLines.length ? 1 : 0 }}
              >
                {"> "}
                {cursorVisible ? "▊" : " "}
              </motion.p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2"
                  style={{
                    background: "rgba(0,212,255,0.05)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00d4ff",
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: "rgba(0,212,255,0.1)",
                    borderColor: "#00d4ff",
                    boxShadow: "0 0 20px rgba(0,212,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-[560px] mx-auto p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xs text-white/30 text-center font-mono mb-4">or send a message directly</p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const data = new FormData(form)
                window.location.href = `mailto:meabhsk@gmail.com?subject=${encodeURIComponent(data.get("subject") as string || "Portfolio Inquiry")}&body=${encodeURIComponent(data.get("message") as string || "")}`
              }}
            >
              <input
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  color: "#e2e8f0",
                  fontFamily: "var(--font-space)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00d4ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.1)")}
              />
              <textarea
                name="message"
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-colors"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  color: "#e2e8f0",
                  fontFamily: "var(--font-space)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00d4ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.1)")}
              />
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wider cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  color: "#fff",
                  border: "none",
                  alignSelf: "center",
                  minWidth: "180px",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Transmission
              </motion.button>
            </form>
          </motion.div>

          <motion.p
            className="text-center text-xs text-white/20 font-mono"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            © {new Date().getFullYear()} Abhishek Kumar · Built with React + Three.js
          </motion.p>
        </div>
      </div>
    </section>
  )
}
