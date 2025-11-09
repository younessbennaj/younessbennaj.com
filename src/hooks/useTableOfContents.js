import { useEffect, useState } from 'react'

export function useTableOfContents(toc, initialActiveId) {
  const [activeId, setActiveId] = useState(initialActiveId)

  useEffect(() => {
    if (!toc.length) return

    const observerOptions = {
      rootMargin: '0% 0% -70% 0%',
      threshold: 0,
    }

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, observerOptions)

    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [toc])

  return { toc, activeId }
}
