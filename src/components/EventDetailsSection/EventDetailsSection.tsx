import './EventDetailsSection.css'

export interface EventInfo {
  type: 'ceremony' | 'reception'
  time: string
  venue: string
  address: string
  mapsUrl: string
}

interface EventCardProps {
  event: EventInfo
}

function EventIcon({ type }: { type: EventInfo['type'] }) {
  if (type === 'ceremony') {
    return (
      <svg viewBox="0 0 24 24" className="event-card__icon-svg" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="event-card__icon-svg" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
    </svg>
  )
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <div className="event-card__icon">
        <EventIcon type={event.type} />
      </div>
      <p className="event-card__type">{event.type === 'ceremony' ? 'Ceremony' : 'Reception'}</p>
      <h3 className="event-card__venue">{event.venue}</h3>
      <p className="event-card__time">{event.time}</p>
      <p className="event-card__address">{event.address}</p>
      <div className="event-card__map">
        <iframe
          title={`Map for ${event.venue}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="180"
          style={{ border: 0 }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          aria-label={`Map showing location of ${event.venue}`}
        />
      </div>
      <a
        href={event.mapsUrl}
        className="event-card__directions"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${event.venue}`}
      >
        Get Directions
      </a>
    </div>
  )
}

interface EventDetailsSectionProps {
  events: [EventInfo, EventInfo]
}

export default function EventDetailsSection({ events }: EventDetailsSectionProps) {
  return (
    <section id="details" className="event-details">
      <div className="event-details__inner">
        <div className="event-details__header">
          <p className="event-details__eyebrow">Join Us</p>
          <h2 className="event-details__title">The Details</h2>
          <hr className="event-details__divider" />
        </div>
        <div className="event-details__cards">
          {events.map((event) => (
            <EventCard key={event.type} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
