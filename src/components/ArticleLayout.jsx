'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { ArticleHeader } from '@/components/ArticleHeader'
import { ArticleFooter } from '@/components/ArticleFooter'
import { TableOfContents } from '@/components/TableOfContents'
import { TagList } from '@/components/TagList'
import { ShareLinks } from '@/components/ShareLinks'
import { useTableOfContents } from '@/hooks/useTableOfContents'
import { useReadingTime } from '@/hooks/useReadingTime'
import { useCurrentUrl } from '@/hooks/useCurrentUrl'
import { useNormalizedTags } from '@/hooks/useNormalizedTags'

export function ArticleLayout({ article, children }) {
  const router = useRouter()
  const { previousPathname } = useContext(AppContext)

  // Custom hooks for better separation of concerns
  const { toc, activeId } = useTableOfContents(children)
  console.log('toc', toc)
  const readingTime = useReadingTime(article, children)
  const currentUrl = useCurrentUrl()
  const normalizedTags = useNormalizedTags(article?.tags)

  const handleArticlesClick = () => {
    router.push('/articles')
  }

  const handleCategoryClick = () => {
    if (article.category) {
      router.push(`/articles/${article.category}`)
    }
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
            {/* Articles Link */}
            <li>
              <button
                onClick={handleArticlesClick}
                className="rounded transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-zinc-100"
                aria-label="Go to articles page"
              >
                Articles
              </button>
            </li>

            {/* Category Link (if exists) */}
            {article.category && (
              <>
                <li className="before:mx-2 before:content-['>']">
                  <button
                    onClick={handleCategoryClick}
                    className="rounded capitalize transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-zinc-100"
                    aria-label={`Go to ${article.category} articles`}
                  >
                    {article.category}
                  </button>
                </li>
              </>
            )}

            {/* Current Article Title */}
            <li className="before:mx-2 before:content-['>']">
              <span
                aria-current="page"
                className="font-medium text-zinc-900 dark:text-zinc-100"
              >
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Main Article Content */}
        <main>
          <article itemScope itemType="https://schema.org/BlogPosting">
            <ArticleHeader article={article} readingTime={readingTime} />

            {/* Article Metadata */}
            <div
              className="my-10 flex flex-wrap items-center justify-between gap-4"
              role="group"
              aria-label="Article metadata"
            >
              <TagList tags={normalizedTags} />

              <ShareLinks url={currentUrl} title={article.title} />
            </div>

            <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
              {/* Article Content */}
              <div className="min-w-0">
                <section aria-label="Article content">
                  <Prose
                    className="mt-8"
                    data-mdx-content
                    itemProp="articleBody"
                  >
                    {children}
                  </Prose>
                </section>

                <ArticleFooter
                  article={article}
                  normalizedTags={normalizedTags}
                  currentUrl={currentUrl}
                />
              </div>

              {/* Table of Contents Sidebar */}
              <aside
                aria-label="Table of contents"
                className="hidden lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto"
              >
                <TableOfContents toc={toc} activeId={activeId} />
              </aside>
            </div>
          </article>
        </main>
      </div>
    </Container>
  )
}
