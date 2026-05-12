import useScrollReveal from '../../hooks/useScrollReveal'
import { images } from '../../data/images'
import './OurStorySection.css'

export interface TimelineMilestone {
  id: string
  date: string
  title: string
  description: string
}

function MilestoneRow({ milestone, index }: { milestone: TimelineMilestone; index: number }) {
  const ref = useScrollReveal<HTMLLIElement>({ threshold: 0.15 })
  return (
    <li ref={ref} className="story-timeline__item reveal">
      <div className="story-timeline__marker" aria-hidden="true">
        <span className="story-timeline__index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="story-timeline__body">
        <span className="story-timeline__date">{milestone.date}</span>
        <h3 className="story-timeline__title">{milestone.title}</h3>
        <p className="story-timeline__desc">{milestone.description}</p>
      </div>
    </li>
  )
}

interface OurStorySectionProps {
  milestones: TimelineMilestone[]
}

export default function OurStorySection({ milestones }: OurStorySectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const portraitRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="story" className="story">
      <div className="story__inner">
        <header className="story__header reveal" ref={headerRef}>
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">
            How we came to <em>this day</em>
          </h2>
          <p className="section-lead">
            Three short years, a handful of cities, and one very ordinary
            afternoon that changed everything.
          </p>
        </header>

        <div className="story__grid">
          <div className="story__portrait reveal" ref={portraitRef}>
            <div className="story__portrait-frame">
              <img
                src={images.storyPortrait}
                alt="A quiet moment together"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="story__portrait-caption">
              <span>One ordinary afternoon —</span>
              <em>and three years that followed.</em>
            </p>
          </div>

          <ol className="story-timeline">
            {milestones.map((m, i) => (
              <MilestoneRow key={m.id} milestone={m} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
