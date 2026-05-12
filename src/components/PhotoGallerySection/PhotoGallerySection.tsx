import useScrollReveal from '../../hooks/useScrollReveal'
import './PhotoGallerySection.css'

export interface GalleryImage {
  id: string
  alt: string
  caption: string
}

interface PhotoGallerySectionProps {
  images: GalleryImage[]
}

// Floral placeholder SVG — different for each slot based on index
function FloralPlaceholder({ index }: { index: number }) {
  const colors = ['#6B8C4A', '#B8975A', '#506B38', '#8FAF5A', '#C4A882', '#7A9B52']
  const color = colors[index % colors.length]

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="gallery__placeholder-svg" aria-hidden="true">
      <rect width="200" height="200" fill="#F0EDE0"/>
      {/* Central flower */}
      <circle cx="100" cy="100" r="12" fill={color} opacity="0.6"/>
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 100 + Math.cos(rad) * 28
        const y = 100 + Math.sin(rad) * 28
        return <ellipse key={i} cx={x} cy={y} rx="10" ry="6" fill={color} opacity="0.35" transform={`rotate(${angle}, ${x}, ${y})`}/>
      })}
      {/* Stem */}
      <path d={`M100,112 Q${90 + (index % 3) * 8},140 ${85 + (index % 4) * 6},170`} stroke={color} strokeWidth="2" fill="none" opacity="0.4"/>
      {/* Leaves */}
      <ellipse cx={88 + (index % 3) * 4} cy={145} rx="14" ry="7" fill={color} opacity="0.3" transform={`rotate(-30, ${88 + (index % 3) * 4}, 145)`}/>
      {/* Small decorative dots */}
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.2"/>
      <circle cx="160" cy="40" r="3" fill={color} opacity="0.15"/>
      <circle cx="40" cy="160" r="3" fill={color} opacity="0.15"/>
      <circle cx="160" cy="160" r="4" fill={color} opacity="0.2"/>
    </svg>
  )
}

export default function PhotoGallerySection({ images }: PhotoGallerySectionProps) {
  const revealRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__inner">
        <div className="gallery__header">
          <p className="gallery__eyebrow">Memories</p>
          <h2 className="gallery__title">Our Photos</h2>
          <hr className="gallery__divider" />
        </div>
        <div className="gallery__grid reveal" ref={revealRef}>
          {images.map((image, index) => (
            <div key={image.id} className="gallery__item">
              <FloralPlaceholder index={index} />
              <div className="gallery__caption" aria-hidden="true">
                <span>{image.caption}</span>
              </div>
              <span className="sr-only">{image.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
