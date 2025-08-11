import { memo } from 'react'
import { smoothScrollTo } from '@/lib/performanceUtils'

export const TableOfContents = memo(function TableOfContents({
  toc,
  activeId,
}) {
  if (!toc.length) return null

  const scrollToHeading = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      smoothScrollTo(element)
      // Update URL without triggering navigation
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${id}`)
      }
    }
  }

  return (
    <nav
      aria-labelledby="toc-heading"
      className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900"
      role="navigation"
    >
      <h2
        id="toc-heading"
        className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-300"
      >
        Sommaire
      </h2>
      <ol className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {toc.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'ml-4' : undefined}>
            <a
              href={`#${id}`}
              onClick={(e) => scrollToHeading(e, id)}
              aria-current={activeId === id ? 'location' : undefined}
              className={`block rounded px-2 py-1 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-zinc-800 ${
                activeId === id
                  ? 'bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                  : ''
              }`}
              aria-label={`Go to section: ${text}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
})
