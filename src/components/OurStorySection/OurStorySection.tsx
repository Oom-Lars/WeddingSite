import useScrollReveal from '../../hooks/useScrollReveal'
import './OurStorySection.css'

export interface TimelineMilestone {
  id: string
  icon: 'heart' | 'ring' | 'star' | 'calendar'
  date: string
  title: string
  description: string
}

// Inline SVG icons for each milestone type
function MilestoneIcon({ type }: { type: TimelineMilestone['icon'] }) {
  switch (type) {
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className="milestone__icon-svg" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>
      )
    case 'ring':
      return (
        <svg viewBox="0 0 24 24" className="milestone__icon-svg" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="currentColor"/>
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" className="milestone__icon-svg" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
        </svg>
      )
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" className="milestone__icon-svg" aria-hidden="true">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
        </svg>
      )
  }
}

function MilestoneCard({ milestone, index }: { milestone: TimelineMilestone; index: number }) {
  const revealRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={revealRef}
      className={`milestone reveal ${isLeft ? 'milestone--left' : 'milestone--right'}`}
    >
      <div className="milestone__dot">
        <MilestoneIcon type={milestone.icon} />
      </div>
      <div className="milestone__card">
        <span className="milestone__date">{milestone.date}</span>
        <h3 className="milestone__title">{milestone.title}</h3>
        <p className="milestone__desc">{milestone.description}</p>
      </div>
    </div>
  )
}

interface OurStorySectionProps {
  milestones: TimelineMilestone[]
}

export default function OurStorySection({ milestones }: OurStorySectionProps) {
  return (
    <section id="story" className="story">
      <div className="story__inner">
        <div className="story__header reveal-header">
          <p className="story__eyebrow">Our Journey</p>
          <h2 className="story__title">Our Story</h2>
          <hr className="story__divider" />
        </div>
        <div className="story__timeline">
          {milestones.map((m, i) => (
            <MilestoneCard key={m.id} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
