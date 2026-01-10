import { Canvas } from '@react-three/fiber'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import CubeField from './components/CubeField'
import Name from './components/Name'
import Cursor from './components/Cursor'
import BackButton from './components/BackButton'

// Pages
import About from './pages/About'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

export default function App() {
  useEffect(() => {
    window.__UI_HOVERING__ = false
  }, [])

  const location = useLocation()

  const isHome = location.pathname === '/'

  return (
    <div className="app">
      <Cursor />

      <Canvas
        className="canvas"
        camera={{ position: [45, 90, 45], fov: 20 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} />
        <CubeField />
      </Canvas>

      <div className="overlay">
        {!isHome && <BackButton />}

        <Routes>
          <Route path="/" element={<Name />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}
