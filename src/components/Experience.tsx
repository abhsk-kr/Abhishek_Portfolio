import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const experiences = [
  {
    role: "Web Development Intern",
    company: "GAO Tek Inc.",
    period: "Mar 2025 – Jun 2025",
    location: "Remote",
    highlights: [
      "Built and customized WooCommerce sites, managing products and payments",
      "Developed e-commerce platforms and resolved problems using WordPress",
      "Developed responsive mobile-friendly WordPress themes with HTML, CSS, and JavaScript",
      "Designed and modified custom WordPress themes and plugins to add features and tailor site behavior",
    ],
  },
  {
    role: "LLM Post Trainee",
    company: "Ethara.AI",
    period: "Mar 2026 – May 2026",
    location: "Remote",
    highlights: [
      "LLM post-training & evaluation workflows",
      "Model alignment with human intent",
      "Data pipelines & compliance",
      "Collaboration with Quality Leads",
    ],
    badge: "Latest Role",
    badgeColor: "#10b981",
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="experience" ref={ref}>
      <div className="section-wrapper" style={{ maxWidth: "900px" }}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Timeline</h2>
          <div className="divider" />
        </motion.div>

        <div className="relative w-full flex flex-col items-center">
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 rounded-full"
            style={{
              background: `linear-gradient(to bottom, #00d4ff, #7c3aed, transparent)`,
              opacity: inView ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              className="relative w-full flex justify-center"
              style={{ padding: "0 0 60px 0" }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                style={{
                  background: "#00d4ff",
                  boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                  marginTop: "24px",
                }}
              />

              <div
                className="p-6 rounded-2xl relative"
                style={{
                  width: "calc(50% - 40px)",
                  textAlign: "left",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  marginLeft: idx % 2 === 0 ? "calc(50% + 40px)" : "0",
                  marginRight: idx % 2 !== 0 ? "calc(50% + 40px)" : "0",
                }}
              >
                {exp.badge && (
                  <span
                    className="absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: exp.badgeColor,
                      color: "#fff",
                    }}
                  >
                    {exp.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold" style={{ color: "#00d4ff" }}>
                  {exp.role}
                </h3>
                <p className="text-sm text-white/40 mb-1">
                  {exp.company} · {exp.location}
                </p>
                <p className="text-xs text-white/30 mb-4">{exp.period}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: idx * 0.2 + 0.5 + i * 0.1 }}
                    >
                      <span style={{ color: "#00d4ff", flexShrink: 0 }}>✦</span>
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
