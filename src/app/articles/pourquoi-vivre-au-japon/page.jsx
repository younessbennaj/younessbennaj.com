import Content from './content/default.mdx'
import { article } from './meta'

export const metadata = {
  title: article.title,
  description: article.description,
}

export { article }

export default function Page() {
  return <Content />
}
