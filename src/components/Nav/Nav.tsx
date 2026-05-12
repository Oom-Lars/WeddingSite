import { useState, useEffect, useRef } from 'react'
import './Nav.css'

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sentinel = document.querySelector('#hero-sentinel')
    if (!sentinel) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // When sentinel leaves viewport (not intersecting), show nav
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observerRef.current.observe(sentinel)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  function toggleMenu() {
    setMenuOpen((prev) => !prev)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className={`nav ${visible ? 'nav--visible' : ''}`} aria-label="Main navigation">
      <a href="#" className="nav__brand" aria-label="Back to top">R &amp; A</a>
      <button
        className="nav__hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`} role="list">
        <li><a href="#story" onClick={closeMenu}>Our Story</a></li>
        <li><a href="#details" onClick={closeMenu}>Details</a></li>
        <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
        <li><a href="#rsvp" onClick={closeMenu}>RSVP</a></li>
      </ul>
    </nav>
  )
}
