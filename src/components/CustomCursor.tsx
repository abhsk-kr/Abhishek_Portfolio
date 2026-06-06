import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const enter = () => setVisible(true)
    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.documentElement.addEventListener("mouseenter", enter)
    document.documentElement.addEventListener("mouseleave", leave)

    const hoverEls = document.querySelectorAll("a, button, [data-cursor-hover]")
    const add = () => setHovering(true)
    const remove = () => setHovering(false)
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", add)
      el.addEventListener("mouseleave", remove)
    })

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.documentElement.removeEventListener("mouseenter", enter)
      document.documentElement.removeEventListener("mouseleave", leave)
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", add)
        el.removeEventListener("mouseleave", remove)
      })
    }
  }, [cursorX, cursorY])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 12 : hovering ? 32 : 8,
          height: clicking ? 12 : hovering ? 32 : 8,
          borderRadius: "50%",
          background: "#00d4ff",
          opacity: visible ? 1 : 0,
          boxShadow: hovering ? "0 0 20px rgba(0,212,255,0.5)" : "none",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.3)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  )
}
