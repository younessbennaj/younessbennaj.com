import { memo } from 'react'

export const TagList = memo(function TagList({
  tags,
  className = '',
  ariaLabel = 'Article tags',
  ...props
}) {
  if (!tags?.length) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
      <span className="sr-only">{ariaLabel}:</span>
      {tags.map(({ label, value }) => (
        <a
          key={value}
          href={`/blog/tags/${value}`}
          className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 underline-offset-2 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-300"
          aria-label={`View articles tagged with ${label}`}
          rel="tag"
        >
          {label}
        </a>
      ))}
    </div>
  )
})
