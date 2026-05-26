import { useState, useEffect, useRef } from 'react'
import './Nav.css'

interface NavProps {
  monogram: string
}

const SECTIONS = [
  { id: 'details', label: 'Details' },
  { id: 'venue', label: 'Venue' },
  { id: 'attire', label: 'Attire' },
  { id: 'faq', label: 'FAQ' },
  { id: 'plett', label: 'Plett' },
  { id: 'rsvp', label: 'RSVP' },
] as const

export default function Nav({ monogram }: NavProps) {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const visibilityObserver = useRef<IntersectionObserver | null>(null)
  const sectionObserver = useRef<IntersectionObserver | null>(null)

  // Show nav once the hero has scrolled away.
  useEffect(() => {
    const sentinel = document.querySelector('#hero-sentinel')
    if (!sentinel) return
    visibilityObserver.current = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    visibilityObserver.current.observe(sentinel)
    return () => visibilityObserver.current?.disconnect()
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    sectionObserver.current = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (inView) setActiveId(inView.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((s) => sectionObserver.current?.observe(s))
    return () => sectionObserver.current?.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav
      className={`nav ${visible ? 'nav--visible' : ''} ${menuOpen ? 'nav--open' : ''}`}
      aria-label="Primary"
    >
      <div className="nav__inner">
        <a href="#" className="nav__brand" aria-label="Back to top" onClick={closeMenu}>
          <span className="nav__brand-mark">{monogram}</span>
        </a>

        <ul className="nav__links" role="list">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={activeId === s.id ? 'nav__link nav__link--active' : 'nav__link'}
                onClick={closeMenu}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#rsvp" className="nav__cta" onClick={closeMenu}>
          RSVP
        </a>

        <button
          className="nav__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="nav-mobile" className="nav__mobile" aria-hidden={!menuOpen}>
        <ul className="nav__mobile-links" role="list">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={closeMenu}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
