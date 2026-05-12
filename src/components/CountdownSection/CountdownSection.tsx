import { useState, useEffect } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import './CountdownSection.css'

interface FlipCardProps {
  value: number
  label: string
}

function FlipCard({ value, label }: FlipCardProps) {
  const [prevValue, setPrevValue] = useState(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true)
      const t = setTimeout(() => {
        setPrevValue(value)
        setFlipping(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [value, prevValue])

  return (
    <div className={`flip-card ${flipping ? 'flip-card--flipping' : ''}`}>
      <span className="flip-card__value">{String(value).padStart(2, '0')}</span>
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

  return (
    <section className="countdown">
      <div className="countdown__inner">
        <p className="countdown__label">
          {isOver ? "We're married!" : 'Until we say I do'}
        </p>
        {!isOver && (
          <div className="countdown__cards">
            <FlipCard value={days} label="Days" />
            <span className="countdown__sep" aria-hidden="true">:</span>
            <FlipCard value={hours} label="Hours" />
            <span className="countdown__sep" aria-hidden="true">:</span>
            <FlipCard value={minutes} label="Minutes" />
            <span className="countdown__sep" aria-hidden="true">:</span>
            <FlipCard value={seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  )
}
