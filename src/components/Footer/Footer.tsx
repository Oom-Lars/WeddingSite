import './Footer.css'

interface FooterProps {
  coupleNames: string
  weddingDate: string
  monogram: string
  venueLocation: string
}

export default function Footer({ coupleNames, weddingDate, monogram, venueLocation }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__monogram" aria-hidden="true">
          {monogram}
        </div>

        <h2 className="footer__names">{coupleNames}</h2>

        <div className="footer__meta">
          <span>{weddingDate}</span>
          <span className="footer__meta-dot" aria-hidden="true" />
          <span>{venueLocation}</span>
        </div>

        <div className="footer__rule" aria-hidden="true" />

        <p className="footer__credit">
          <span>Made with love</span>
          <span className="footer__credit-sep" aria-hidden="true">·</span>
          <span>© {year}</span>
        </p>
      </div>
    </footer>
  )
}
