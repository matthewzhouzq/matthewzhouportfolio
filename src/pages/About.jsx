import { useEffect, useState } from 'react'
import './About.css'

const WORDS = ['opportunity', 'design', 'quant', 'artificial intelligence', 'machine learning', 'internships', 'startups', 'technology', 'new tech']

export default function About() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

useEffect(() => {
  window.__UI_HOVERING__ = false
  const currentWord = WORDS[wordIndex]

  const typingSpeed = 50
  const deletingSpeed = 50
  const pauseAfterType = 1200

  let timeout

  if (!isDeleting) {
    // Typing
    if (text.length < currentWord.length) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1))
      }, typingSpeed)
    } else {
      // Pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseAfterType)
    }
  } else {
    // Deleting
    if (text.length > 0) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1))
      }, deletingSpeed)
    } else {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % WORDS.length)
    }
  }

  return () => clearTimeout(timeout)
}, [text, isDeleting, wordIndex])


  return (
    <div className="page about-page">
      <h2>
       about me
      </h2>
      <p>
         Hi, I’m <span className="name-highlight">Matthew</span>. 
        <br />
        I'm passionate about {' '}
        <br />
        <span className="typewriter">
            {text}
            <span className="cursor">|</span>
        </span>
    </p>
    </div>
  )
}
