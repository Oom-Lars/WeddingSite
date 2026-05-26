import useScrollReveal from '../../hooks/useScrollReveal'
import './GiftRegistrySection.css'

interface GiftRegistrySectionProps {
  registryUrl: string
}

export default function GiftRegistrySection({ registryUrl }: GiftRegistrySectionProps) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const external = registryUrl && registryUrl !== '#'

  return (
    <section className="registry">
      <div className="registry__inner reveal" ref={ref}>
        <span className="eyebrow">Registry</span>
        <h2 className="section-title">
          Your presence <em>is the gift</em>
        </h2>
        <p className="registry__note">
          Truly. But if you'd like to mark the day with something more,
          we've curated a small registry of pieces we'll treasure for years to come.
        </p>
        <a
          href={registryUrl}
          className="registry__link"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label="View our gift registry"
        >
          <span>View the registry</span>
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
    </section>
  )
}
