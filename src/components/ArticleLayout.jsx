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
  const readingTime = useReadingTime(article, children)
  const currentUrl = useCurrentUrl()
  const normalizedTags = useNormalizedTags(article?.tags)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <span>
              <a
                className="rounded transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-zinc-100"
                aria-label="Go to articles page"
                href="/articles"
              >
                Articles
              </a>
            </span>
            {article.category && (
              <span className="pointer-events-none before:mx-2 before:content-['/']">
                <a
                  // TODO: Create a category page and enable this link
                  aria-disabled="true"
                  className="pointer-events-none rounded capitalize transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-zinc-100"
                  aria-label={`Go to ${article.category} articles`}
                  href={`/articles/${article.category}`}
                >
                  {article.category}
                </a>
              </span>
            )}
            <span className="before:mx-2 before:content-['/']">
              <a
                aria-current="page"
                className="font-medium text-zinc-900 dark:text-zinc-100"
              >
                {article.title}
              </a>
            </span>
          </div>
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

              <div className="block md:hidden">
                <ShareLinks url={currentUrl} title={article.title} />
              </div>
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
              {toc && toc.length > 0 && (
                <aside
                  aria-label="Table of contents"
                  className="hidden rounded-lg border border-zinc-100 shadow-sm lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto"
                >
                  <TableOfContents
                    currentUrl={currentUrl}
                    toc={toc}
                    activeId={activeId}
                    title={article.title}
                  />
                </aside>
              )}
            </div>
          </article>
        </main>
      </div>
    </Container>
  )
}
