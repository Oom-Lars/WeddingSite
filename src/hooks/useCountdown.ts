import { useState, useEffect } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Pure helper that calculates the time remaining until targetDate.
 * Returns all zeros if targetDate is in the past or equal to now.
 */
export function calculateTimeLeft(targetDate: Date): CountdownValues {
  const diffMs = Math.max(0, targetDate.getTime() - Date.now())
  const totalSeconds = Math.floor(diffMs / 1000)

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

/**
 * React hook that returns a live countdown to targetDate,
 * updating every 1000ms. Clears the interval when all values
 * reach zero or when the component unmounts.
 */
export function useCountdown(targetDate: Date): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(
    () => calculateTimeLeft(targetDate)
  )

  useEffect(() => {
    const tick = () => {
      const next = calculateTimeLeft(targetDate)
      setValues(next)
      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        clearInterval(id)
      }
    }

    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return values
}
