import { useEffect, useState } from 'react'
import { calculateReadingTime } from '@/lib/articleUtils'

export function useReadingTime(article, children) {
  const [readingTime, setReadingTime] = useState(article?.readingTime || null)

  useEffect(() => {
    if (!document || article?.readingTime) return

    const contentEl = document.querySelector('[data-mdx-content]')
    if (contentEl) {
      const text = contentEl.innerText
      const calculatedTime = calculateReadingTime(text)
      setReadingTime(calculatedTime)
    }
  }, [children, article])

  return readingTime
}
