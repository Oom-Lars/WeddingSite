import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Floating botanical particles */}
      <div className="hero__particles" aria-hidden="true">
        <div className="hero__particle hero__particle--1" />
        <div className="hero__particle hero__particle--2" />
        <div className="hero__particle hero__particle--3" />
        <div className="hero__particle hero__particle--4" />
        <div className="hero__particle hero__particle--5" />
        <div className="hero__particle hero__particle--6" />
        <div className="hero__particle hero__particle--7" />
        <div className="hero__particle hero__particle--8" />
      </div>

      <div className="hero__content">
        {/* Top label */}
        <p className="hero__label">for the wedding of</p>

        {/* Watercolor building SVG illustration */}
        <div className="hero__illustration" aria-hidden="true">
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" className="hero__svg">
            {/* Sky wash */}
            <rect width="500" height="280" fill="#F0EDE0"/>

            {/* Background trees left */}
            <ellipse cx="60" cy="120" rx="45" ry="55" fill="#7A9B52" opacity="0.5"/>
            <ellipse cx="55" cy="115" rx="38" ry="48" fill="#6B8C4A" opacity="0.6"/>
            <rect x="55" y="155" width="8" height="40" fill="#8B7355" opacity="0.7"/>

            {/* Background trees right */}
            <ellipse cx="440" cy="110" rx="50" ry="60" fill="#7A9B52" opacity="0.5"/>
            <ellipse cx="445" cy="105" rx="42" ry="52" fill="#6B8C4A" opacity="0.6"/>
            <rect x="438" y="150" width="9" height="45" fill="#8B7355" opacity="0.7"/>

            {/* Small tree far right */}
            <ellipse cx="480" cy="130" rx="28" ry="38" fill="#8FAF5A" opacity="0.45"/>
            <rect x="476" y="158" width="6" height="30" fill="#8B7355" opacity="0.6"/>

            {/* Main building body */}
            <rect x="130" y="110" width="240" height="120" fill="#E8D5B0" stroke="#B8975A" strokeWidth="1.5" opacity="0.9"/>

            {/* Roof */}
            <polygon points="120,110 250,60 380,110" fill="#C4A882" stroke="#B8975A" strokeWidth="1.5" opacity="0.9"/>

            {/* Chimney left */}
            <rect x="165" y="68" width="18" height="35" fill="#C4A882" stroke="#B8975A" strokeWidth="1"/>
            {/* Chimney right */}
            <rect x="315" y="72" width="18" height="32" fill="#C4A882" stroke="#B8975A" strokeWidth="1"/>

            {/* Front door */}
            <rect x="225" y="175" width="50" height="55" rx="25" fill="#506B38" stroke="#B8975A" strokeWidth="1.5"/>
            <circle cx="268" cy="205" r="3" fill="#B8975A"/>

            {/* Windows row 1 */}
            <rect x="148" y="130" width="35" height="30" rx="3" fill="#D4E8F0" stroke="#B8975A" strokeWidth="1" opacity="0.8"/>
            <line x1="165" y1="130" x2="165" y2="160" stroke="#B8975A" strokeWidth="0.8" opacity="0.6"/>
            <line x1="148" y1="145" x2="183" y2="145" stroke="#B8975A" strokeWidth="0.8" opacity="0.6"/>

            <rect x="317" y="130" width="35" height="30" rx="3" fill="#D4E8F0" stroke="#B8975A" strokeWidth="1" opacity="0.8"/>
            <line x1="334" y1="130" x2="334" y2="160" stroke="#B8975A" strokeWidth="0.8" opacity="0.6"/>
            <line x1="317" y1="145" x2="352" y2="145" stroke="#B8975A" strokeWidth="0.8" opacity="0.6"/>

            {/* Windows row 2 - upper */}
            <rect x="185" y="80" width="28" height="22" rx="2" fill="#D4E8F0" stroke="#B8975A" strokeWidth="1" opacity="0.7"/>
            <rect x="287" y="80" width="28" height="22" rx="2" fill="#D4E8F0" stroke="#B8975A" strokeWidth="1" opacity="0.7"/>

            {/* Climbing vines on building */}
            <path d="M130,230 Q120,200 125,170 Q128,150 130,130" stroke="#6B8C4A" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M370,230 Q380,200 375,170 Q372,150 370,130" stroke="#6B8C4A" strokeWidth="2" fill="none" opacity="0.5"/>

            {/* Ground / lawn */}
            <ellipse cx="250" cy="240" rx="200" ry="20" fill="#8FAF5A" opacity="0.3"/>
            <rect x="50" y="235" width="400" height="15" fill="#8FAF5A" opacity="0.2"/>

            {/* Foreground bushes */}
            <ellipse cx="155" cy="232" rx="30" ry="18" fill="#6B8C4A" opacity="0.6"/>
            <ellipse cx="345" cy="232" rx="30" ry="18" fill="#6B8C4A" opacity="0.6"/>
            <ellipse cx="200" cy="238" rx="20" ry="12" fill="#7A9B52" opacity="0.5"/>
            <ellipse cx="300" cy="238" rx="20" ry="12" fill="#7A9B52" opacity="0.5"/>
          </svg>
        </div>

        {/* Gold divider */}
        <hr className="hero__divider" />

        {/* Couple names */}
        <div className="hero__names">
          <h1 className="hero__name">
            {'RENÉ'.split('').map((letter, i) => (
              <span key={i} className="hero__letter" style={{ animationDelay: `${i * 0.08}s` }}>
                {letter}
              </span>
            ))}
          </h1>
          <p className="hero__and">and</p>
          <h1 className="hero__name">
            {'ALEX'.split('').map((letter, i) => (
              <span key={i} className="hero__letter" style={{ animationDelay: `${(i + 5) * 0.08}s` }}>
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Gold divider */}
        <hr className="hero__divider" />

        {/* Date and venue */}
        <p className="hero__date">Saturday, the Twelfth of September, Two Thousand and Twenty-Six</p>
        <p className="hero__venue">The Grand Estate · City, ST</p>

        {/* Scroll hint */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-line" />
        </div>
      </div>

      {/* Sentinel for Nav IntersectionObserver */}
      <div id="hero-sentinel" className="hero__sentinel" aria-hidden="true" />
    </section>
  );
}
