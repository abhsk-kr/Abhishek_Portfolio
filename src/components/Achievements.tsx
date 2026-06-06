import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const achievements = [
  {
    icon: "🥇",
    title: "NPTEL Software Engineering Certification",
    description: "Academic excellence in core engineering fundamentals",
  },
  {
    icon: "🥈",
    title: "Research Paper — ICRACS 2026",
    description: "Narrative-Preserving Video Summarization via Transformer-Guided Masked Autoencoding",
    meta: "Paper ID: 563",
  },
  {
    icon: "🥉",
    title: "Startup Bug Hunter",
    description: "Identified critical mobile bugs → improved app stability & UX",
  },
]

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="achievements" ref={ref}>
      <div className="section-wrapper" style={{ maxWidth: "1000px" }}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Achievements</h2>
          <div className="divider" />
        </motion.div>

        <div className="flex justify-center flex-wrap w-full" style={{ gap: "28px" }}>
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.title}
              className="relative rounded-2xl overflow-hidden flex flex-col items-center text-center"
              style={{
                flex: "0 1 280px",
                padding: "40px 28px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(0,212,255,0.3)",
                boxShadow: "0 0 40px rgba(0,212,255,0.1)",
              }}
            >
              <motion.div
                className="text-4xl mb-4"
                style={{ margin: "0 auto 16px auto" }}
                animate={inView ? { scale: [0.5, 1.2, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 + 0.3 }}
              >
                {ach.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2 w-full text-center" style={{ color: "#00d4ff" }}>
                {ach.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed w-full text-center">{ach.description}</p>
              {ach.meta && (
                <p className="mt-2 text-xs w-full text-center" style={{ color: "#7c3aed" }}>
                  {ach.meta}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
