import { useEffect, useState } from 'react'
import { slugify } from '@/lib/articleUtils'

export function useTableOfContents(children) {
  const [toc, setToc] = useState([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!document) return

    const headings = Array.from(
      document.querySelectorAll('[data-mdx-content] h2, [data-mdx-content] h3'),
    )

    const tocItems = headings.map((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent)
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName === 'H2' ? 2 : 3,
      }
    })

    setToc(tocItems)
  }, [children])

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
