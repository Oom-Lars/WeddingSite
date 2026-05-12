import { useState, useEffect, useRef } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import useScrollReveal from '../../hooks/useScrollReveal'
import './CountdownSection.css'

interface FlipCardProps {
  value: number
  label: string
}

function FlipCard({ value, label }: FlipCardProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setFlipping(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setFlipping(false)
        prevValueRef.current = value
      }, 160) // Half the animation duration
      
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <div className={`flip-card ${flipping ? 'flip-card--flipping' : ''}`}>
      <span className="flip-card__value">{String(displayValue).padStart(2, '0')}</span>
      <span className="flip-card__label">{label}</span>
    </div>
  )
}

interface CountdownSectionProps {
  weddingDate: Date
}

export default function CountdownSection({ weddingDate }: CountdownSectionProps) {
  const { days, hours, minutes, seconds } = useCountdown(weddingDate)
  const isOver = days === 0 && hours === 0 && minutes === 0 && seconds === 0
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.25 })

  return (
    <section className="countdown" aria-label="Countdown">
      <div className="countdown__inner reveal" ref={ref}>
        <p className="countdown__eyebrow">
          {isOver ? 'The day has come' : 'Counting down to the day'}
        </p>
        {!isOver && (
          <div className="countdown__cards">
            <FlipCard value={days} label="Days" />
            <FlipCard value={hours} label="Hours" />
            <FlipCard value={minutes} label="Minutes" />
            <FlipCard value={seconds} label="Seconds" />
          </div>
        )}
        {isOver && <p className="countdown__title">We're married</p>}
      </div>
    </section>
  )
}
