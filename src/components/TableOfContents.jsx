import { memo } from 'react'
import { smoothScrollTo } from '@/lib/performanceUtils'
import classNames from 'classnames'
import { ShareLinks } from '@/components/ShareLinks'

export const TableOfContents = memo(function TableOfContents({
  toc,
  activeId,
  currentUrl,
  title,
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
    <div className="dark:bg-zinc-900 flex flex-col gap-8 bg-zinc-50 p-6">
      <nav
        aria-labelledby="toc-heading"
        className="rounded-lg"
        role="navigation"
      >
        <h2
          id="toc-heading"
          className="text-md dark:text-zinc-300 mb-4 pl-4 font-semibold text-zinc-900"
        >
          Sommaire
        </h2>
        {/* add separator */}
        <hr className="dark:border-zinc-700 my-4 border-t border-zinc-200" />
        <ol className="dark:text-zinc-400 text-sm leading-6 text-zinc-600">
          {toc.map(({ id, text, level }) => (
            <li key={id} className={level === 3 ? 'ml-6 text-sm' : 'text-md'}>
              <a
                href={`#${id}`}
                onClick={(e) => scrollToHeading(e, id)}
                aria-current={activeId === id ? 'location' : undefined}
                className={classNames(
                  'block rounded-lg transition-colors focus:outline-none',
                  {
                    'text-blue-600 hover:text-blue-600': activeId === id,
                    'text-zinc-500 hover:text-zinc-900': activeId !== id,
                    'text-md px-4 py-2': level === 2,
                    'px-1 py-1 text-xs': level === 3,
                  },
                )}
                aria-label={`Go to section: ${text}`}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex flex-col gap-2 pl-4">
        <span className="dark:text-zinc-400 text-xs text-zinc-500">
          Partager cet article
        </span>
        <ShareLinks url={currentUrl} title={title} />
      </div>
    </div>
  )
})
