import { useEffect, useRef } from 'react'
import './VenueSketchSection.css'

interface VenueSketchSectionProps {
  venueName: string
}

export default function VenueSketchSection({ venueName }: VenueSketchSectionProps) {
  const svgWrapperRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        if (!svgWrapperRef.current || !sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        const viewH = window.innerHeight
        // Only apply parallax when section is in view
        if (rect.bottom < 0 || rect.top > viewH) return
        const progress = (viewH - rect.top) / (viewH + rect.height)
        const offset = (progress - 0.5) * 60 // max ±30px
        svgWrapperRef.current.style.transform = `translateY(${offset}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="venue-sketch" ref={sectionRef}>
      <div className="venue-sketch__bg" aria-hidden="true">
        <div className="venue-sketch__svg-wrapper" ref={svgWrapperRef}>
          {/* Large watercolor estate SVG — hand-drawn aesthetic */}
          <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" className="venue-sketch__svg">
            {/* Sky */}
            <rect width="800" height="420" fill="#F5F2E8"/>
            
            {/* Soft watercolor sky wash */}
            <ellipse cx="400" cy="80" rx="380" ry="100" fill="#E8E3D0" opacity="0.5"/>
            
            {/* Far background trees */}
            <ellipse cx="80" cy="200" rx="70" ry="90" fill="#8FAF5A" opacity="0.3"/>
            <ellipse cx="720" cy="190" rx="75" ry="95" fill="#8FAF5A" opacity="0.3"/>
            
            {/* Mid trees left cluster */}
            <ellipse cx="100" cy="180" rx="60" ry="80" fill="#7A9B52" opacity="0.45"/>
            <ellipse cx="90" cy="170" rx="50" ry="70" fill="#6B8C4A" opacity="0.55"/>
            <rect x="86" y="235" width="10" height="60" fill="#8B7355" opacity="0.6"/>
            
            <ellipse cx="155" cy="195" rx="45" ry="65" fill="#7A9B52" opacity="0.4"/>
            <rect x="151" y="248" width="8" height="50" fill="#8B7355" opacity="0.55"/>
            
            {/* Mid trees right cluster */}
            <ellipse cx="700" cy="175" rx="65" ry="85" fill="#7A9B52" opacity="0.45"/>
            <ellipse cx="710" cy="165" rx="55" ry="75" fill="#6B8C4A" opacity="0.55"/>
            <rect x="706" y="230" width="10" height="60" fill="#8B7355" opacity="0.6"/>
            
            <ellipse cx="645" cy="190" rx="48" ry="68" fill="#7A9B52" opacity="0.4"/>
            <rect x="641" y="245" width="8" height="52" fill="#8B7355" opacity="0.55"/>
            
            {/* Main estate building */}
            <rect x="200" y="160" width="400" height="200" fill="#EAD9B5" stroke="#B8975A" strokeWidth="2" opacity="0.92"/>
            
            {/* Central pediment / portico */}
            <polygon points="340,160 400,110 460,160" fill="#D4BC8A" stroke="#B8975A" strokeWidth="1.5" opacity="0.9"/>
            
            {/* Main roof */}
            <polygon points="185,160 400,90 615,160" fill="#C8A87A" stroke="#B8975A" strokeWidth="2" opacity="0.85"/>
            
            {/* Chimneys */}
            <rect x="255" y="105" width="22" height="48" fill="#C8A87A" stroke="#B8975A" strokeWidth="1.5"/>
            <rect x="520" y="108" width="22" height="45" fill="#C8A87A" stroke="#B8975A" strokeWidth="1.5"/>
            
            {/* Grand entrance door */}
            <rect x="368" y="280" width="64" height="80" rx="32" fill="#506B38" stroke="#B8975A" strokeWidth="2"/>
            <circle cx="424" cy="322" r="4" fill="#B8975A"/>
            
            {/* Columns */}
            <rect x="350" y="200" width="10" height="80" fill="#D4BC8A" stroke="#B8975A" strokeWidth="0.8" opacity="0.7"/>
            <rect x="440" y="200" width="10" height="80" fill="#D4BC8A" stroke="#B8975A" strokeWidth="0.8" opacity="0.7"/>
            
            {/* Ground floor windows */}
            <rect x="220" y="195" width="50" height="45" rx="4" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1.2" opacity="0.8"/>
            <line x1="245" y1="195" x2="245" y2="240" stroke="#B8975A" strokeWidth="0.8" opacity="0.5"/>
            <line x1="220" y1="217" x2="270" y2="217" stroke="#B8975A" strokeWidth="0.8" opacity="0.5"/>
            
            <rect x="530" y="195" width="50" height="45" rx="4" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1.2" opacity="0.8"/>
            <line x1="555" y1="195" x2="555" y2="240" stroke="#B8975A" strokeWidth="0.8" opacity="0.5"/>
            <line x1="530" y1="217" x2="580" y2="217" stroke="#B8975A" strokeWidth="0.8" opacity="0.5"/>
            
            {/* Upper windows */}
            <rect x="240" y="260" width="42" height="35" rx="3" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1" opacity="0.75"/>
            <rect x="518" y="260" width="42" height="35" rx="3" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1" opacity="0.75"/>
            
            {/* Attic windows */}
            <rect x="290" y="130" width="32" height="26" rx="2" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1" opacity="0.65"/>
            <rect x="478" y="130" width="32" height="26" rx="2" fill="#C8DDE8" stroke="#B8975A" strokeWidth="1" opacity="0.65"/>
            
            {/* Climbing vines */}
            <path d="M200,360 Q188,320 192,280 Q196,240 200,200" stroke="#6B8C4A" strokeWidth="2.5" fill="none" opacity="0.45"/>
            <path d="M600,360 Q612,320 608,280 Q604,240 600,200" stroke="#6B8C4A" strokeWidth="2.5" fill="none" opacity="0.45"/>
            
            {/* Lawn */}
            <ellipse cx="400" cy="380" rx="340" ry="30" fill="#8FAF5A" opacity="0.25"/>
            <rect x="60" y="368" width="680" height="20" fill="#8FAF5A" opacity="0.18"/>
            
            {/* Foreground hedges */}
            <ellipse cx="240" cy="365" rx="50" ry="25" fill="#6B8C4A" opacity="0.55"/>
            <ellipse cx="560" cy="365" rx="50" ry="25" fill="#6B8C4A" opacity="0.55"/>
            <ellipse cx="310" cy="372" rx="35" ry="18" fill="#7A9B52" opacity="0.45"/>
            <ellipse cx="490" cy="372" rx="35" ry="18" fill="#7A9B52" opacity="0.45"/>
            
            {/* Path to door */}
            <path d="M400,420 L400,360" stroke="#C4A882" strokeWidth="20" opacity="0.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <div className="venue-sketch__overlay">
        <p className="venue-sketch__eyebrow">The Venue</p>
        <h2 className="venue-sketch__name">{venueName}</h2>
        <hr className="venue-sketch__divider" />
      </div>
    </section>
  )
}
