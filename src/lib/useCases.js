import glob from 'fast-glob'

async function importUseCase(useCaseFilename) {
  let { useCase } = await import(`../app/cases/${useCaseFilename}`)

  return {
    slug: useCaseFilename.replace(/(\/page)?\.mdx$/, ''),
    ...useCase,
  }
}

export async function getAllUseCases() {
  let useCaseFilenames = await glob('*/page.mdx', {
    cwd: './src/app/cases',
  })

  let useCases = await Promise.all(useCaseFilenames.map(importUseCase))

  return useCases
}
