import useScrollReveal from '../../hooks/useScrollReveal'
import './PlettFavouritesSection.css'

interface Favourite {
  name: string
  href: string
}

interface PlettFavouritesSectionProps {
  eat: readonly Favourite[]
  do: readonly Favourite[]
}

function List({ title, items }: { title: string; items: readonly Favourite[] }) {
  return (
    <div className="plett__col">
      <h3 className="plett__col-title">{title}</h3>
      <ul className="plett__list" role="list">
        {items.map((it) => (
          <li key={it.name}>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="plett__link"
            >
              <span>{it.name}</span>
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PlettFavouritesSection({
  eat,
  do: doList,
}: PlettFavouritesSectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="plett" className="plett">
      <div className="plett__inner">
        <header className="plett__header reveal" ref={headerRef}>
          <span className="eyebrow">Staying in town?</span>
          <h2 className="section-title">
            A few of our <em>favourites in Plett</em>
          </h2>
          <p className="plett__intro">
            If you're making a weekend of it, here are a few places we love.
          </p>
        </header>

        <div className="plett__grid reveal" ref={gridRef}>
          <List title="Where to eat" items={eat} />
          <List title="What to do" items={doList} />
        </div>
      </div>
    </section>
  )
}
