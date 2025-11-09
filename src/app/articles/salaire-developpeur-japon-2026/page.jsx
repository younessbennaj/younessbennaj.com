import ArticleContentPC from './content/pc.mdx'
import ArticleContentSP from './content/sp.mdx'
import { headers } from 'next/headers'
import { article } from './meta'

export const metadata = {
  title: article.title,
  description: article.description,
}

export { article }

export default function Page() {
  const userAgent = headers().get('user-agent') || ''
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(userAgent)
  const deviceType = isMobile ? 'sp' : 'pc'
  return deviceType === 'sp' ? <ArticleContentSP /> : <ArticleContentPC />
}
