import { useCallback, useEffect, useState } from 'react'

export default function useCountDown() {
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timeout = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [secondsLeft])

  const start = useCallback((seconds: number) => {
    setSecondsLeft(seconds)
  }, [])

  const formatToMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return { secondsLeft, formatToMinutes, start }
}
