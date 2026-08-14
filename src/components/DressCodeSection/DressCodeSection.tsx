import useScrollReveal from '../../hooks/useScrollReveal'
import { images } from '../../data/images'
import './DressCodeSection.css'

export interface DressCodeColumn {
  label: string
  style: string
  image: string
  imageAlt: string
}

interface DressCodeSectionProps {
  dressStyle: string
  columns: readonly [DressCodeColumn, DressCodeColumn]
  palette: readonly string[]
  avoid: string
}

export default function DressCodeSection({
  dressStyle,
  columns,
  palette,
  avoid,
}: DressCodeSectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="attire" className="dresscode">
      <div className="dresscode__inner">
        <header className="dresscode__header reveal" ref={headerRef}>
          <span className="eyebrow eyebrow--light">Attire</span>
          <h2 className="dresscode__title">
            Dress for <em>a summer wine farm</em>
          </h2>
          <p className="dresscode__style">{dressStyle}</p>
        </header>

        <div className="dresscode__grid reveal" ref={gridRef}>
          <div className="dresscode__mood">
            <div className="dresscode__mood-image">
              <img src={images.dressMood} alt="Dress code mood — vineyard tones" loading="lazy" />
            </div>
            <div className="dresscode__palette" aria-label="Recommended colour palette">
              {palette.map((c, i) => (
                <span
                  key={c}
                  className="dresscode__swatch"
                  style={{ background: c, animationDelay: `${i * 0.08}s` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="dresscode__notes">
            <div className="dresscode__cols">
              {columns.map((c) => (
                <div key={c.label} className="dresscode__col">
                  <h3 className="dresscode__col-label">{c.label}</h3>
                  <figure className="dresscode__col-figure">
                    <img src={c.image} alt={c.imageAlt} loading="lazy" />
                  </figure>
                  <p className="dresscode__col-style">{c.style}</p>
                </div>
              ))}
            </div>

            <p className="dresscode__avoid">{avoid}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
