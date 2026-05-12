import './GiftRegistrySection.css'

interface GiftRegistrySectionProps {
  registryUrl: string
}

export default function GiftRegistrySection({ registryUrl }: GiftRegistrySectionProps) {
  return (
    <section className="registry">
      <div className="registry__inner">
        <div className="registry__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="18" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M6 26h36" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M24 18V44" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M24 18c0 0-6-8 0-12 6 4 0 12 0 12z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M24 18c0 0 6-8 0-12-6 4 0 12 0 12z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M6 18h12a6 6 0 0 0-12 0z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M42 18H30a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <p className="registry__eyebrow">Gifts</p>
        <h2 className="registry__title">Gift Registry</h2>
        <hr className="registry__divider" />
        <p className="registry__note">
          Your presence at our celebration is the greatest gift of all. For those who wish to honour us with a gift, we have curated a small registry of things we love.
        </p>
        <a
          href={registryUrl}
          className="registry__btn"
          target={registryUrl !== '#' ? '_blank' : undefined}
          rel={registryUrl !== '#' ? 'noopener noreferrer' : undefined}
          aria-label="View our gift registry"
        >
          View Registry
        </a>
      </div>
    </section>
  )
}
