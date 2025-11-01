import { formatDate } from '@/lib/formatDate'
import { TagList } from '@/components/TagList'
import { ShareLinks } from '@/components/ShareLinks'

export function ArticleFooter({ article, normalizedTags, currentUrl }) {
  return (
    <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-700">
      {/* Article Meta Information */}
      <div className="space-y-6">
        {article.updatedAt && (
          <time
            dateTime={article.updatedAt}
            className="block text-sm text-zinc-500 dark:text-zinc-400"
            itemProp="dateModified"
          >
            Mis à jour le {formatDate(article.updatedAt)}
          </time>
        )}

        {/* Article Topics/Tags */}
        {normalizedTags?.length > 0 && (
          <section aria-label="Article topics">
            <h3 className="sr-only">Topics</h3>
            <TagList tags={normalizedTags} itemProp="keywords" />
          </section>
        )}

        {/* Social Sharing */}
        <section aria-label="Share this article">
          <h3 className="sr-only">Share this article</h3>
          <ShareLinks url={currentUrl} title={article.title} />
        </section>
      </div>

      {/* Call to Action */}
      {article.cta && (
        <section
          className="mt-10 rounded border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900"
          aria-label="Call to action"
        >
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Passez à l&apos;action
          </h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">
            {article.description || 'Découvrez-en plus en suivant ce lien.'}
          </p>
          <a
            href={article.cta.href}
            className="inline-block rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            rel={article.cta.external ? 'noopener noreferrer' : undefined}
            target={article.cta.external ? '_blank' : undefined}
          >
            {article.cta.label}
          </a>
        </section>
      )}
    </footer>
  )
}
