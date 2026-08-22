import { useEffect, useRef } from 'react'
import { images } from '../../data/images'
import './HeroSection.css'

interface HeroSectionProps {
  coupleNames: string
  weddingDate: Date
  venueName: string
  venueLocation: string
}

export default function HeroSection({
  coupleNames,
  weddingDate,
  venueName,
  venueLocation,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Slow Ken Burns + subtle parallax tied to scroll.
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!heroRef.current || !imageRef.current) return
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom < 0) return
        const offset = Math.min(rect.top * -0.15, 120)
        imageRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.02)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const [first, second] = coupleNames.split(/\s*&\s*/)

  const dateLine = weddingDate
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()

  return (
    <section className="hero" ref={heroRef} aria-label="Welcome">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__image" ref={imageRef}>
          <img
            src={images.heroCover.fallback}
            srcSet={images.heroCover.srcSet}
            // The cover always spans the full viewport width.
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="hero__veil" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__inner">
        <div className="hero__top">
          <span className="hero__monogram" aria-hidden="true">
            {first?.[0]}
            <span className="hero__monogram-amp">&amp;</span>
            {second?.[0]}
          </span>
        </div>

        {/* Everything readable lives on one frosted card. Over a busy
            watercolour, glow and a lightened veil were not enough — the small
            tracked-out lines kept sinking into the foliage. A real surface makes
            legibility independent of whatever sits behind it, and it lets the
            painting stay rich everywhere else instead of being washed pale to
            support the type. The date line moved up here from the foot of the
            hero for the same reason. */}
        <div className="hero__center">
          <div className="hero__card">
            <p className="hero__eyebrow">Together with their families</p>

            <h1 className="hero__title">
              <span className="hero__name">{first}</span>
              <span className="hero__amp" aria-hidden="true">&amp;</span>
              <span className="hero__name">{second}</span>
            </h1>

            <p className="hero__lede">
              invite you to celebrate their wedding
            </p>

            <span className="hero__card-rule" aria-hidden="true" />

            <div className="hero__meta">
              <span className="hero__meta-item">{dateLine}</span>
              <span className="hero__meta-dot" aria-hidden="true" />
              <span className="hero__meta-item">{venueName}</span>
              <span className="hero__meta-dot" aria-hidden="true" />
              <span className="hero__meta-item">{venueLocation}</span>
            </div>
          </div>
        </div>

        <div className="hero__bottom">
          <a className="hero__scroll" href="#details" aria-label="Continue to the details">
            <span>Discover</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div id="hero-sentinel" className="hero__sentinel" aria-hidden="true" />
    </section>
  )
}
