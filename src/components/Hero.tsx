import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import * as THREE from "three"

function generateSphereData(count: number) {
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 0.5
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.cos(phi)
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.8, 0.5)
    col[i * 3] = c.r
    col[i * 3 + 1] = c.g
    col[i * 3 + 2] = c.b
  }
  return { pos, col }
}

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const { pos, col } = generateSphereData(1200)
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <ParticleSphere />
    </Canvas>
  )
}

const statItems = [
  { value: "12+", label: "Projects" },
  { value: "500K+", label: "Rows Analyzed" },
  { value: "LLM", label: "Post-Training @ Ethara.AI" },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: "0 24px" }}
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl w-full gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space)", margin: "0 auto", textAlign: "center" }}
            animate={{
              textShadow: [
                "0 0 20px rgba(0,212,255,0.3)",
                "0 0 40px rgba(0,212,255,0.5)",
                "0 0 20px rgba(0,212,255,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span style={{ color: "#00d4ff" }}>ABHISHEK</span>{" "}
            <span style={{ color: "#7c3aed" }}>KUMAR</span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-white/60 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          style={{ fontFamily: "var(--font-space)", textAlign: "center" }}
        >
          AI & ML Engineer · Full-Stack Builder · LLM Specialist
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center"
          style={{ gap: "40px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        >
          {statItems.map((item) => (
            <motion.div
              key={item.label}
              className="text-center px-4 py-2 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,212,255,0.3)" }}
            >
              <p className="text-2xl font-bold" style={{ color: "#00d4ff" }}>
                {item.value}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center"
          style={{ gap: "16px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
        >
          <motion.a
            href="#projects"
            className="relative px-8 py-3 rounded-full font-semibold text-sm tracking-wider cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              color: "#fff",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.a>
          <motion.a
            href="#"
            className="relative px-8 py-3 rounded-full font-semibold text-sm tracking-wider cursor-pointer"
            style={{
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00d4ff",
              background: "rgba(0,212,255,0.05)",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "#00d4ff",
              boxShadow: "0 0 20px rgba(0,212,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              window.open("/resume.pdf", "_blank")
            }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "#00d4ff" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
