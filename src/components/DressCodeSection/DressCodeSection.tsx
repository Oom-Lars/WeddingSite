import './DressCodeSection.css'

export interface DressCodeColumn {
  label: string
  style: string
  iconSvg: string
}

interface DressCodeSectionProps {
  dressStyle: string
  columns: [DressCodeColumn, DressCodeColumn]
}

function HimIcon() {
  return (
    <svg viewBox="0 0 64 80" className="dresscode__col-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Suit jacket silhouette */}
      <rect x="20" y="2" width="24" height="28" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      {/* Lapels */}
      <path d="M32,8 L24,20 L32,18 L40,20 L32,8Z" fill="currentColor" opacity="0.4"/>
      {/* Tie */}
      <path d="M30,18 L32,30 L34,18 L32,14Z" fill="currentColor" opacity="0.6"/>
      {/* Body */}
      <path d="M16,30 Q10,35 10,50 L54,50 Q54,35 48,30 L40,28 L32,32 L24,28Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
      {/* Legs */}
      <rect x="16" y="50" width="13" height="28" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="35" y="50" width="13" height="28" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
      {/* Head */}
      <circle cx="32" cy="0" r="0" fill="none"/>
    </svg>
  )
}

function HerIcon() {
  return (
    <svg viewBox="0 0 64 80" className="dresscode__col-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Dress bodice */}
      <path d="M22,2 Q32,0 42,2 L44,28 Q38,26 32,26 Q26,26 20,28Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      {/* Dress skirt flare */}
      <path d="M20,28 Q10,35 8,55 L56,55 Q54,35 44,28 Q38,26 32,26 Q26,26 20,28Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      {/* Skirt hem detail */}
      <path d="M8,55 Q20,62 32,60 Q44,62 56,55" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/>
      {/* Waist detail */}
      <path d="M20,28 Q32,32 44,28" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Neckline */}
      <path d="M24,2 Q32,8 40,2" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/>
    </svg>
  )
}

export default function DressCodeSection({ dressStyle, columns }: DressCodeSectionProps) {
  return (
    <section className="dresscode">
      <div className="dresscode__inner">
        <div className="dresscode__header">
          <p className="dresscode__eyebrow">Attire</p>
          <h2 className="dresscode__title">Dress Code</h2>
          <p className="dresscode__style">{dressStyle}</p>
          <hr className="dresscode__divider" />
        </div>

        <div className="dresscode__columns">
          {/* Him column */}
          <div className="dresscode__col">
            <div className="dresscode__col-icon-wrap">
              <HimIcon />
            </div>
            <h3 className="dresscode__col-label">{columns[0].label}</h3>
            <p className="dresscode__col-style">{columns[0].style}</p>
          </div>

          {/* Gold vertical divider */}
          <div className="dresscode__sep" aria-hidden="true" />

          {/* Her column */}
          <div className="dresscode__col">
            <div className="dresscode__col-icon-wrap">
              <HerIcon />
            </div>
            <h3 className="dresscode__col-label">{columns[1].label}</h3>
            <p className="dresscode__col-style">{columns[1].style}</p>
          </div>
        </div>

        <p className="dresscode__note">
          Please avoid white, ivory, or black. We'd love to see you in earth tones and garden hues.
        </p>
      </div>
    </section>
  )
}
