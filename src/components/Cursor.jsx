import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef()
  const [hoveringUI, setHoveringUI] = useState(false)

  useEffect(() => {
    // Track all buttons
    const buttons = document.querySelectorAll('button')
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => setHoveringUI(true))
      btn.addEventListener('mouseleave', () => setHoveringUI(false))
    })

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('mouseenter', () => setHoveringUI(true))
        btn.removeEventListener('mouseleave', () => setHoveringUI(false))
      })
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        background: hoveringUI ? 'transparent' : 'white',
        border: hoveringUI ? '1.5px solid white' : 'none',
        width: hoveringUI ? '16px' : '12px',
        height: hoveringUI ? '16px' : '12px',
      }}
    />
  )
}
