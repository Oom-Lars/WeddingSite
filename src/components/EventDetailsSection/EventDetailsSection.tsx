import useScrollReveal from '../../hooks/useScrollReveal'
import './EventDetailsSection.css'

export interface EventInfo {
  type: 'ceremony' | 'reception'
  /** Omitted for the reception — the couple did not want a second call time. */
  time?: string
  arrivalTime?: string
  venue: string
  address: string
  mapsUrl: string
}

function EventCard({ event, index }: { event: EventInfo; index: number }) {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.2 })
  return (
    <article ref={ref} className={`event reveal reveal-delay-${index + 1}`}>
      <span className="event__type">
        {event.type === 'ceremony' ? 'The Ceremony' : 'The Reception'}
      </span>

      <h3 className="event__venue">{event.venue}</h3>

      {event.time && (
        <div className="event__time">
          <span className="event__time-value">{event.time}</span>
          <span className="event__time-rule" aria-hidden="true" />
        </div>
      )}

      {event.arrivalTime && (
        <p className="event__arrival">
          Guest arrival from <strong>{event.arrivalTime}</strong>
        </p>
      )}

      <p className="event__address">{event.address}</p>

      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="event__link"
        aria-label={`Open ${event.venue} in Google Maps`}
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
    </article>
  )
}

interface EventDetailsSectionProps {
  events: readonly [EventInfo, EventInfo]
  date: string
}

export default function EventDetailsSection({ events, date }: EventDetailsSectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="details" className="details">
      <div className="details__inner">
        <header className="details__header reveal" ref={headerRef}>
          <span className="eyebrow">The Day</span>
          <h2 className="section-title">
            A <em>simple</em> rhythm to the day
          </h2>
          <p className="details__date">{date}</p>
        </header>

        <div className="details__cards">
          <EventCard event={events[0]} index={0} />
          <div className="details__divider" aria-hidden="true">
            <span className="details__divider-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </span>
          </div>
          <EventCard event={events[1]} index={1} />
        </div>
      </div>
    </section>
  )
}
