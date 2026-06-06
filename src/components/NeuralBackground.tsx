import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function generateRandomPositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30
  }
  return pos
}

function ParticleField({ count = 600 }) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(generateRandomPositions(count), 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.08} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <torusKnotGeometry args={[2, 0.6, 128, 16]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} wireframe />
    </mesh>
  )
}

function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&^%$#@!"

    function draw() {
      if (!ctx || !canvas) return
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#00d4ff"
      ctx.font = "14px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = `rgba(0, 212, 255, ${0.03 + Math.random() * 0.05})`
        ctx.fillText(text, i * 20, drops[i] * 20)
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.15 }}
    />
  )
}

export default function NeuralBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <ParticleField />
          <TorusKnot />
        </Canvas>
      </div>
      <CodeRain />
    </>
  )
}
