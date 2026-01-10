import React, { useEffect } from 'react'

export default function Resume() {
  useEffect(() => {
    // Reset hover state for the cursor when page loads
    window.__UI_HOVERING__ = false
  }, [])

  return (
    <div className="page resume-page">
      <h2>resume</h2>

      <p>View my resume in a new tab.</p>

      <div className="buttons">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
        >
          view resume
        </a>
      </div>
    </div>
  )
}
