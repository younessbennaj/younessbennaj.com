import { memo } from 'react'
import { formatDate } from '@/lib/formatDate'

export const ArticleHeader = memo(function ArticleHeader({
  article,
  readingTime,
}) {
  return (
    <header className="flex flex-col">
      <h1
        className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
        itemProp="headline"
      >
        {article.title}
      </h1>

      <div className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />

        <time
          dateTime={article.createdAt}
          className="ml-3"
          itemProp="datePublished"
        >
          {formatDate(article.createdAt)}
        </time>

        {article.author && (
          <>
            <span className="mx-3 text-zinc-300 dark:text-zinc-600">•</span>
            <address
              className="not-italic"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{article.author}</span>
            </address>
          </>
        )}

        {readingTime && (
          <>
            <span className="mx-3 text-zinc-300 dark:text-zinc-600">•</span>
            <span aria-label="Temps de lecture estimé">
              {readingTime} min de lecture
            </span>
          </>
        )}
      </div>

      {article.description && (
        <p
          className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
          itemProp="description"
        >
          {article.description}
        </p>
      )}
    </header>
  )
})
