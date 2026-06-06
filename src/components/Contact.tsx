import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const terminalLines = [
  "> INITIALIZING CONTACT PROTOCOL...",
  "> TARGET: meabhsk@gmail.com",
  "> LOCATION: Greater Noida, India",
  "> STATUS: Open to Opportunities ✓",
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [copied, setCopied] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

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

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText("meabhsk@gmail.com")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
    window.location.href = "mailto:meabhsk@gmail.com"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    try {
      window.location.href = `mailto:meabhsk@gmail.com?subject=${encodeURIComponent(data.get("from_name") as string + " - " + (data.get("from_email") as string) || "Portfolio Inquiry")}&body=${encodeURIComponent(data.get("message") as string || "")}`
      setFormStatus("success")
      form.reset()
      setTimeout(() => setFormStatus("idle"), 4000)
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 4000)
    }
  }

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
              <a
                href="mailto:meabhsk@gmail.com"
                className="social-btn email-btn"
                aria-label="Send email to Abhishek"
                onClick={handleEmailClick}
              >
                <span className="social-icon">✉</span>
                <span className="social-label">{copied ? "✓ Copied!" : "meabhsk@gmail.com"}</span>
                <span className="social-arrow">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-kumar-3b288a2b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin-btn"
                aria-label="Visit Abhishek's LinkedIn Profile"
              >
                <span className="social-icon">🔗</span>
                <span className="social-label">LinkedIn</span>
                <span className="social-arrow">↗</span>
              </a>
              <a
                href="https://github.com/abhsk-kr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn github-btn"
                aria-label="Visit Abhishek's GitHub Profile"
              >
                <span className="social-icon">🐙</span>
                <span className="social-label">GitHub</span>
                <span className="social-arrow">↗</span>
              </a>
              <a
                href="https://leetcode.com/u/abhsk_kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn leetcode-btn"
                aria-label="Visit Abhishek's LeetCode Profile"
              >
                <span className="social-icon">⚡</span>
                <span className="social-label">LeetCode</span>
                <span className="social-arrow">↗</span>
              </a>
              <a
                href="tel:+919773582546"
                className="social-btn phone-btn"
                aria-label="Call Abhishek"
              >
                <span className="social-icon">📞</span>
                <span className="social-label">+91 9773582546</span>
                <span className="social-arrow">↗</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="w-full rounded-2xl p-6 md:p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xs text-white/30 text-center font-mono mb-6">or send a message directly</p>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="from_name" placeholder="Your name" required autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="from_email" placeholder="your@email.com" required autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or opportunity..." required />
              </div>
              <button type="submit" className="submit-btn" id="submit-btn" disabled={formStatus === "sending"}>
                <span className="btn-text">{formStatus === "sending" ? "Sending..." : "Send Message"}</span>
                <span className="btn-icon">→</span>
              </button>
              {formStatus === "success" && (
                <div className="form-status success">
                  ✅ Message sent! I'll get back to you within 24 hours.
                </div>
              )}
              {formStatus === "error" && (
                <div className="form-status error">
                  ❌ Something went wrong. Please email me directly at meabhsk@gmail.com
                </div>
              )}
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
