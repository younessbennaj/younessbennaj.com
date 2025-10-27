import { memo } from 'react'
import Image from 'next/image'
import { formatDate } from '@/lib/formatDate'
import { ClockIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

export const ArticleHeader = memo(function ArticleHeader({
  article,
  readingTime,
}) {
  return (
    <header className="flex flex-col">
      {/* Article Title */}
      <h1
        className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
        itemProp="headline"
      >
        {article.title}
      </h1>

      {/* Article Description */}
      {article.description && (
        <p
          className="mb-10 mt-6 text-base text-zinc-600 dark:text-zinc-400"
          itemProp="description"
        >
          {article.description}
        </p>
      )}

      {/* Hero Image Section */}
      {article.image && (
        <figure className="mb-8 overflow-hidden rounded-md bg-zinc-50 dark:bg-zinc-800/50">
          <Image
            src={article.image}
            alt={article.imageAlt || `Illustration for ${article.title}`}
            width={1200}
            height={630}
            className="aspect-[16/9] w-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            itemProp="image"
          />
          {article.imageCaption && (
            <figcaption className="mt-4 px-6 pb-6 text-sm text-zinc-600 dark:text-zinc-400">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article Metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-zinc-400 dark:text-zinc-500">
        <span className="hidden h-6 w-0.5 rounded-full bg-zinc-200 md:inline dark:bg-zinc-500" />

        <div className="flex items-center gap-1">
          <CalendarIcon className="inline size-4" />
          <time
            dateTime={article.createdAt}
            // className="ml-3"
            itemProp="datePublished"
          >
            {formatDate(article.createdAt)}
          </time>
        </div>

        <span className="hidden text-zinc-300 md:inline dark:text-zinc-600">
          •
        </span>

        {readingTime && (
          <div className="flex items-center gap-1">
            <ClockIcon className="inline size-4" />
            <span className="align-middle" aria-label="Temps de lecture estimé">
              {readingTime} min de lecture
            </span>
          </div>
        )}

        <span className="hidden text-zinc-300 md:inline dark:text-zinc-600">
          •
        </span>

        {article.author && (
          <div className="flex items-center gap-1">
            <UserIcon className="inline size-4" />
            <address
              className="not-italic"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{article.author}</span>
            </address>
          </div>
        )}
      </div>
    </header>
  )
})
