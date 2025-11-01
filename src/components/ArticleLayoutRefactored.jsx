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
        <ArticleHeader article={article} readingTime={readingTime} />

        <div className="my-10 flex flex-wrap items-center gap-4">
          <TagList tags={normalizedTags} />
          <ShareLinks url={currentUrl} title={article.title} />
        </div>

        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <article className="min-w-0">
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>

            <ArticleFooter
              article={article}
              normalizedTags={normalizedTags}
              currentUrl={currentUrl}
            />
          </article>
          <TableOfContents toc={toc} activeId={activeId} />
        </div>
      </div>
    </Container>
  )
}
