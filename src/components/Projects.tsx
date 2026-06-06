import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Project {
  title: string
  description: string
  lang: string
  date: string
  featured?: boolean
  tags?: string[]
  link?: string
}

const featured: Project[] = [
  {
    title: "AI B2B Proposal Generator",
    description: "LLM-powered proposal generation with budget constraints",
    lang: "JS",
    date: "Feb 2026",
    featured: true,
    tags: ["LLM", "OpenAI", "React"],
    link: "https://ai-b2b-proposal-generator-1.onrender.com/",
  },
  {
    title: "Taskmanager.ai",
    description: "Full-stack AI task management platform",
    lang: "TypeScript",
    date: "Jan 2026",
    featured: true,
    tags: ["AI", "Full-Stack", "Prisma"],
    link: "https://taskmanager-ethara.up.railway.app/login",
  },
  {
    title: "Order Management System",
    description: "Full-stack order processing system",
    lang: "JS",
    date: "Oct 2025",
    featured: true,
    tags: ["Node", "Mongo"],
    link: "https://inventory-frontend-woad-mu.vercel.app/",
  },
  {
    title: "AI Auto Category Tag Generator",
    description: "Automated content categorization",
    lang: "Python",
    date: "Jul 2025",
    featured: true,
    tags: ["NLP", "ML"],
    link: "https://ai-auto-category-tag-generator-1.onrender.com/",
  },
]

const standard: Project[] = [
  { title: "Black Friday Purchase Prediction", description: "500K+ rows · Random Forest / Extra Trees", lang: "Jupyter", date: "Dec 2025", tags: ["ML", "EDA", "Scikit-Learn"] },
  { title: "Binance Futures Trading Bot", description: "Algorithmic trading automation", lang: "Python", date: "Nov 2025", tags: ["Trading", "API", "Automation"] },
  { title: "Inventory Management System", description: "Real-time inventory tracking", lang: "JS", date: "Sep 2025", tags: ["React", "Express"] },
  { title: "EduStream AI", description: "AI-powered educational content platform", lang: "Python", date: "Aug 2025", tags: ["AI", "Django"] },
  { title: "FloraVision", description: "Plant species recognition using CNNs", lang: "Python", date: "Jun 2025", tags: ["CNN", "TensorFlow"] },
  { title: "House Price Prediction", description: "Regression analysis on housing data", lang: "Jupyter", date: "May 2025", tags: ["EDA", "ML"] },
  { title: "AI Blog Website", description: "Blog platform with AI content features", lang: "JS", date: "Apr 2025", tags: ["React", "Node"] },
  { title: "tkinter Calculator", description: "Desktop calculator application", lang: "Python", date: "Mar 2025", tags: ["GUI", "Desktop"] },
]

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.a
      href={project.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col w-full h-full"
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        scale: 1.03,
        translateZ: 20,
        borderColor: "rgba(0,212,255,0.3)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 30px rgba(0,212,255,0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-semibold text-sm group-hover:text-[#00d4ff] transition-colors"
            style={project.featured ? { fontSize: "1rem" } : {}}
          >
            {project.title}
          </h3>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(0,212,255,0.1)",
              color: "#00d4ff",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            {project.lang}
          </span>
        </div>

        <p className="text-xs text-white/50 mb-3 line-clamp-2 flex-1">{project.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-1.5 flex-wrap">
            {project.tags?.map((t) => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa" }}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-white/30">{project.date}</span>
        </div>

        <motion.span
          className="block mt-3 text-[11px] font-medium"
          style={{ color: "#00d4ff" }}
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          View on GitHub →
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Projects</h2>
          <div className="divider" />
          <p className="text-sm text-white/40 mt-3">Featured & personal projects</p>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-10">
          <div
            className="w-full max-w-[900px] mx-auto"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}
          >
            {featured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} inView={inView} />
            ))}
          </div>

          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              justifyItems: "center",
            }}
          >
            {standard.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + featured.length} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
