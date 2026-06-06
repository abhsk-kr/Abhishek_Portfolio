import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NeuralBackground from "./components/NeuralBackground"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Achievements from "./components/Achievements"
import Contact from "./components/Contact"
import CustomCursor from "./components/CustomCursor"
import EasterEgg from "./components/EasterEgg"

function App() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingFinished = useCallback(() => {
    setLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }, [])

  useEffect(() => {
    if (showContent) {
      document.body.style.overflow = ""
    } else {
      document.body.style.overflow = "hidden"
    }
  }, [showContent])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onFinished={handleLoadingFinished} key="loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <NeuralBackground />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
            <CustomCursor />
            <EasterEgg />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
