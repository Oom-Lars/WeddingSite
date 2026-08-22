import useScrollReveal from '../../hooks/useScrollReveal'
import './PhotoGallerySection.css'

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

function GalleryTile({ image, index }: { image: GalleryImage; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  return (
    <div
      ref={ref}
      className={`gallery__tile gallery__tile--${index} reveal`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="gallery__media">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </div>
    </div>
  )
}

interface PhotoGallerySectionProps {
  images: GalleryImage[]
}

export default function PhotoGallerySection({ images }: PhotoGallerySectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__inner">
        <header className="gallery__header reveal" ref={headerRef}>
          <span className="eyebrow">Moments</span>
          <h2 className="section-title">
            The years <em>between then and now</em>
          </h2>
          <p className="section-lead">
            Quiet snapshots from the road that brought us here.
          </p>
        </header>

        <div className="gallery__grid">
          {images.map((image, i) => (
            <GalleryTile key={image.id} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
