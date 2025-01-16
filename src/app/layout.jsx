import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    // template: '%s - Spencer Sharp',
    default:
      'Youness Bennaj - Front-end developer, inspired by cultural discovery and the world’s diversity.',
  },
  description:
    'I’m Youness, a Front-End Developer specialized in React with 5 years of experience. Passionate about the ever-evolving front-end landscape, where new technologies, frameworks, and trends constantly emerge, pushing you to continuously learn, adapt, and challenge yourself. I split my year between Tokyo, Bangkok, and Kuala Lumpur to draw inspiration from these vibrant cities.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
