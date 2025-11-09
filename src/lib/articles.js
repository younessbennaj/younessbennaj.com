import glob from 'fast-glob'

export async function importArticle(articleFilename) {
  let { article } = await import(`../app/articles/${articleFilename}`)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  // exclude articles with disabled: true
  articles = articles.filter((article) => !article.disabled)

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
