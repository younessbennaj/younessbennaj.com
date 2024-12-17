import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    outputFileTracingIncludes: {
      '/articles/*': ['./src/app/articles/**/*.mdx'],
    },
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/', // Redirige vers la page d'accueil
        permanent: false,
      },
      {
        source: '/speaking',
        destination: '/', // Redirige vers la page d'accueil
        permanent: false,
      },
      {
        source: '/use',
        destination: '/', // Redirige vers la page d'accueil
        permanent: false,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
