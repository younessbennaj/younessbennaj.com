import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    // template: '%s - Spencer Sharp',
    default:
      'Youness Bennaj - Front-end developer, freelancer, inspired by cultural discovery and the world’s diversity.',
  },
  description:
    ' I’m Youness, a front-end developer with over 5 years of experience. I help companies build user-friendly and feature-rich web applications using React, TypeScript, and modern technologies. I split my year between Tokyo, Bangkok, and Kuala Lumpur to draw inspiration from these vibrant cities.',
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
