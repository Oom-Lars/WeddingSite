import { useEffect, useRef } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import { images } from '../../data/images'
import './VenueSketchSection.css'

interface VenueSectionProps {
  venueName: string
  venueLocation: string
  venueTagline: string
}

export default function VenueSketchSection({
  venueName,
  venueLocation,
  venueTagline,
}: VenueSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const panelRef = useScrollReveal<HTMLDivElement>({ threshold: 0.25 })

  // Subtle parallax: image moves slower than the section as it scrolls past.
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !imageRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        const viewH = window.innerHeight
        if (rect.bottom < 0 || rect.top > viewH) return
        const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH
        const y = Math.max(-40, Math.min(40, progress * -50))
        imageRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section id="venue" className="venue" ref={sectionRef} aria-label="The venue">
      <div className="venue__media" aria-hidden="true">
        <div className="venue__image" ref={imageRef}>
          <img
            src={images.venue}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="venue__veil" />
      </div>

      <div className="venue__inner">
        <div className="venue__panel reveal" ref={panelRef}>
          <span className="venue__eyebrow">The Venue</span>
          <h2 className="venue__name">{venueName}</h2>
          <p className="venue__location">{venueLocation}</p>
          <span className="venue__rule" aria-hidden="true" />
          <p className="venue__tagline">{venueTagline}</p>
        </div>
      </div>
    </section>
  )
}
