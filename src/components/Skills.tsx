import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skillCategories = [
  {
    title: "AI & ML",
    icon: "🧠",
    glow: "#7c3aed",
    items: ["LLM", "Predictive Modeling", "EDA", "TensorFlow", "Scikit-Learn", "Pandas"],
    proficiencies: [95, 90, 88, 85, 90, 92],
  },
  {
    title: "Programming",
    icon: "</>",
    glow: "#00d4ff",
    items: ["Python", "JavaScript (ES6+)", "SQL", "TypeScript"],
    proficiencies: [95, 85, 80, 75],
  },
  {
    title: "Frameworks",
    icon: "⚛️",
    glow: "#10b981",
    items: ["ReactJS", "Node.js", "Express"],
    proficiencies: [85, 80, 78],
  },
  {
    title: "Databases & Cloud",
    icon: "☁️",
    glow: "#3b82f6",
    items: ["MongoDB", "MySQL", "AWS", "GCP"],
    proficiencies: [75, 78, 72, 65],
  },
  {
    title: "Dev Tools",
    icon: "💻",
    glow: "#fff",
    items: ["Git", "GitHub", "VS Code", "Jupyter", "Google Colab"],
    proficiencies: [90, 90, 95, 88, 85],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="skills" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Tech Stack</h2>
          <div className="divider" />
        </motion.div>

        <div
          className="flex flex-wrap justify-center w-full"
          style={{ gap: "24px" }}
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="group relative rounded-2xl overflow-hidden flex flex-col items-center text-center"
              style={{
                flex: "0 1 220px",
                minWidth: "180px",
                padding: "32px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.03,
                borderColor: cat.glow + "40",
                boxShadow: `0 0 40px ${cat.glow}15`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cat.glow}10, transparent 70%)`,
                }}
              />

              <div className="relative z-10 w-full">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="text-lg font-semibold" style={{ color: cat.glow }}>
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={item}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{item}</span>
                        <span className="text-white/40">{cat.proficiencies[i]}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${cat.glow}, ${cat.glow}88)` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${cat.proficiencies[i]}%` } : {}}
                          transition={{ duration: 1, delay: idx * 0.1 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
