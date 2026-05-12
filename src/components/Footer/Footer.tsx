import './Footer.css'

interface FooterProps {
  coupleNames: string
  weddingDate: string
}

export default function Footer({ coupleNames, weddingDate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Decorative SVG divider */}
        <div className="footer__ornament" aria-hidden="true">
          <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg" className="footer__ornament-svg">
            <line x1="0" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
            <circle cx="90" cy="12" r="2" fill="currentColor" opacity="0.6"/>
            <circle cx="100" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
            <circle cx="110" cy="12" r="2" fill="currentColor" opacity="0.6"/>
            <line x1="120" y1="12" x2="200" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          </svg>
        </div>

        <p className="footer__names">{coupleNames}</p>
        <p className="footer__date">{weddingDate}</p>

        <div className="footer__ornament" aria-hidden="true">
          <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg" className="footer__ornament-svg">
            <line x1="0" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
            <circle cx="90" cy="12" r="2" fill="currentColor" opacity="0.6"/>
            <circle cx="100" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
            <circle cx="110" cy="12" r="2" fill="currentColor" opacity="0.6"/>
            <line x1="120" y1="12" x2="200" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          </svg>
        </div>

        <p className="footer__tagline">Made with love</p>
      </div>
    </footer>
  )
}
