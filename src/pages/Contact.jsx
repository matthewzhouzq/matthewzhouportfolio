export default function Contact() {
  return (
    <div className="page contact-page">
      <h2>contact me</h2>

      <p>
        email:{'matthewzhou.contacts@gmail.com'}
        <a
          href="mailto:matthewzhou.contacts@gmail.com"
          className="link highlight"
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
        >
          matthewzhou.contacts@gmail.com
        </a>
      </p>

      <p>
        github:{' '}
        <a
          href="https://github.com/matthewzhouzq"
          target="_blank"
          rel="noopener noreferrer"
          className="link highlight"
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
        >
          github.com/matthewzhouzq
        </a>
      </p>

      <p>
        linkedin:{' '}
        <a
          href="https://www.linkedin.com/in/matthewzhouzq/"
          target="_blank"
          rel="noopener noreferrer"
          className="link highlight"
          onMouseEnter={() => (window.__UI_HOVERING__ = true)}
          onMouseLeave={() => (window.__UI_HOVERING__ = false)}
        >
          linkedin.com/in/matthewzhouzq
        </a>
      </p>
    </div>
  )
}
