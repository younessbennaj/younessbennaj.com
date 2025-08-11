import { useEffect, useState } from 'react'

export function useCurrentUrl() {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    try {
      setCurrentUrl(window.location.href)
    } catch {
      setCurrentUrl('')
    }
  }, [])

  return currentUrl
}
