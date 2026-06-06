import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as THREE from "three"

const skills = [
  "LLM Integration", "Predictive Modeling", "AI Pipelines",
  "Full-Stack AI", "Feature Engineering", "Model Alignment",
  "Problem Solving", "Data Visualization",
]

function OrbitingIcons() {
  const groupRef = useRef<THREE.Group>(null)
  const icons = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      label: ["Python", "React", "TensorFlow", "AWS", "JS", "TS", "Node", "Mongo"][i],
      color: i % 2 === 0 ? "#00d4ff" : "#7c3aed",
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(icon.angle) * 1.8,
            Math.sin(icon.angle) * 1.8,
            0,
          ]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={icon.color} />
        </mesh>
      ))}
    </group>
  )
}

function HolographicAvatar() {
  const hexRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (hexRef.current) {
      hexRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group>
      <mesh ref={hexRef}>
        <cylinderGeometry args={[1.4, 1.4, 0.05, 6]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} wireframe={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[1.5, 1.5, 0.02, 6]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} wireframe />
      </mesh>
      <OrbitingIcons />
    </group>
  )
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>{"<About />"}</h2>
          <div className="divider" />
        </motion.div>

        <div
          className="w-full flex items-center justify-center gap-[60px] flex-wrap"
        >
          <div className="flex-[0_0_auto] flex flex-col items-center justify-center">
            <motion.div
              className="h-[400px] md:h-[500px] w-[300px] md:w-[400px] relative"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
                <HolographicAvatar />
              </Canvas>
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#00d4ff",
                }}
              >
                <span className="animate-pulse">📍</span> Greater Noida, India
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 min-w-[280px] flex flex-col items-start gap-5"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-base md:text-lg leading-relaxed text-white/70 text-left">
              AI & ML Engineer passionate about building intelligent systems that solve real-world problems.
              Experienced in LLM post-training, predictive modeling, and full-stack AI development.
              I turn complex data into actionable insights and scalable AI solutions.
            </p>

            <div className="flex flex-wrap gap-3 justify-start">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-default"
                  style={{
                    background: "rgba(0,212,255,0.05)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    color: "#94a3b8",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                  whileHover={{
                    color: "#00d4ff",
                    borderColor: "#00d4ff",
                    background: "rgba(0,212,255,0.1)",
                    scale: 1.05,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
