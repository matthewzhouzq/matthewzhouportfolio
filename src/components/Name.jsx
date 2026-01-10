import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Name() {
  const containerRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const letters = [...containerRef.current.querySelectorAll('.letter')]

    const onMouseMove = (e) => {
      const mx = e.clientX
      const my = e.clientY

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect()
        const lx = rect.left + rect.width / 2
        const ly = rect.top + rect.height / 2

        const dx = mx - lx
        const dy = my - ly
        const dist = Math.sqrt(dx * dx + dy * dy)

        const maxDist = 160
        const strength = Math.max(0, 1 - dist / maxDist)

        const moveX = dx * strength * 0.06
        const moveY = dy * strength * 0.06

        letter.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    const reset = () => {
      letters.forEach((l) => {
        l.style.transform = 'translate(0px, 0px)'
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', reset)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <div className="name-wrapper">
      {/* Status ABOVE name */}
      <div className="status-pill"
            onMouseEnter={() => (window.__UI_HOVERING__ = true)}
            onMouseLeave={() => (window.__UI_HOVERING__ = false)}>
        STATUS: looking for <span>summer 2026 co-op / internships</span>
      </div>

      <h1
        ref={containerRef}
        className="name"
        onMouseEnter={() => (window.__UI_HOVERING__ = true)}
        onMouseLeave={() => (window.__UI_HOVERING__ = false)}
      >
        {'matthew zhou'.split('').map((char, i) => (
          <span key={i} className="letter">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      <div className="buttons">
        <button 
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
          onClick={() => navigate('/about')}>About</button>
        <button 
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
          onClick={() => navigate('/projects')}>Projects</button>
        <button 
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
          onClick={() => navigate('/resume')}>Resume</button>
        <button 
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
          onClick={() => navigate('/contact')}>Contact</button>
      </div>
    </div>
  )

}
