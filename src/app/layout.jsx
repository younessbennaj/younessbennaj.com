import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    default:
      'Youness Bennaj – Développeur web & consultant expatriation Japon pour talents tech.',
  },
  description:
    'Je suis Youness, développeur web et consultant spécialisé dans l’expatriation au Japon pour les talents tech. Découvrez mes conseils, contenus et services pour réussir votre transition professionnelle vers le Japon.',
  alternates: {
    canonical: 'https://younessbennaj.com',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
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
