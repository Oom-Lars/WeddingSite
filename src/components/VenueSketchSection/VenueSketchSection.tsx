import useScrollReveal from '../../hooks/useScrollReveal'
import { images } from '../../data/images'
import './VenueSketchSection.css'

interface VenueSectionProps {
  venueName: string
  venueLocation: string
  venueTagline: string
  venueMapsUrl: string
}

export default function VenueSketchSection({
  venueName,
  venueLocation,
  venueTagline,
  venueMapsUrl,
}: VenueSectionProps) {
  const artRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })
  const panelRef = useScrollReveal<HTMLDivElement>({ threshold: 0.25 })

  // The couple's watercolour of the cellar hangs as a cream-matted print
  // against the olive ground. It used to be a stock coastal photo used
  // full-bleed behind a glass panel — a pale illustration cannot take a dark
  // veil and a wide crop, and the drawing is the thing guests came to see.
  // (The ceremony-lawn watercolour is the cover; see HeroSection.)
  return (
    <section id="venue" className="venue" aria-label="The venue">
      <div className="venue__inner">
        <figure className="venue__art reveal" ref={artRef}>
          <div className="venue__art-mat">
            <img
              src={images.venueCellar}
              alt={`Watercolour of the cellar at ${venueName} — a white Cape Dutch gable with tall arched doors, wine barrels and lavender`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="venue__art-caption">
            Where we&apos;ll raise a glass
          </figcaption>
        </figure>

        <div className="venue__panel reveal" ref={panelRef}>
          <span className="venue__eyebrow">The Venue</span>
          <h2 className="venue__name">{venueName}</h2>
          <p className="venue__location">{venueLocation}</p>
          <span className="venue__rule" aria-hidden="true" />
          <p className="venue__tagline">{venueTagline}</p>

          <a
            href={venueMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="venue__link"
            aria-label={`Open ${venueName} in Google Maps`}
          >
            <span>Open in Maps</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3 13 13 3M6 3h7v7"
                stroke="currentColor"
                strokeWidth="1.25"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
