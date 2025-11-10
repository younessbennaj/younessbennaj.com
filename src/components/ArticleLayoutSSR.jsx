import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { extractHeadingsFromMDX } from '@/lib/article-toc'
import { TableOfContents } from '@/components/TableOfContents'
import { ArticleHeader } from '@/components/ArticleHeader'

export async function ArticleLayoutSSR({ article, children, slug }) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}`
  const toc = await extractHeadingsFromMDX(slug)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="dark:text-zinc-400 text-sm text-zinc-600">
            <span>
              <a
                className="dark:hover:text-zinc-100 rounded transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  className="dark:hover:text-zinc-100 pointer-events-none rounded capitalize transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                className="dark:text-zinc-100 font-medium text-zinc-900"
              >
                {article.title}
              </a>
            </span>
          </div>
        </nav>

        {/* Main Article Content */}
        <main>
          <article itemScope itemType="https://schema.org/BlogPosting">
            <ArticleHeader
              article={article}
              readingTime={article.readingTime}
            />
            <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
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
              </div>
              <aside
                aria-label="Table of contents"
                className="hidden rounded-lg border border-zinc-100 shadow-sm lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto"
              >
                <TableOfContents
                  toc={toc}
                  initialActiveId={toc[0].id}
                  title={article.title}
                  currentUrl={url}
                />
              </aside>
            </div>
          </article>
        </main>
      </div>
    </Container>
  )
}
