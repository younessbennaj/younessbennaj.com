import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

import Balancer from 'react-wrap-balancer'

import {
  FireIcon,
  CurrencyYenIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { LinkedInIcon, XIcon } from '@/components/SocialIcons'

import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { Icon } from '@radix-ui/react-select'

function Photos() {
  // let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              // rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
        {formatDate(article.createdAt)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)
  // const { theme } = useTheme()

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Développeur web & Consultant en expatriation au Japon
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Je suis Youness, développeur web basé à Tokyo. Après avoir
            concrétisé mon propre projet d’expatriation, j’aide aujourd’hui les
            professionnels de la tech à franchir le pas. Sur ce site, je partage
            mon retour d’expérience, des conseils pratiques, et propose un
            accompagnement personnalisé pour lancer sa carrière au Japon et
            réussir son installation.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://www.linkedin.com/in/youness-bennaj/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
            />
            <SocialLink
              href="https://twitter.com/younessbennaj"
              aria-label="Follow on X"
              icon={XIcon}
              target="_blank"
            />
          </div>
        </div>
      </Container>

      {/* <Photos /> */}

      <div className="sm:px-8">
        <div className="mx-auto mt-16 w-full max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-lg px-4 py-16 sm:px-8 lg:px-12">
            <div className="flex">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-800">
                Un accompagnement complet pour concrétiser votre projet au Japon
              </h2>
              <div>
                {/* // grid 2 * 2 */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  <div className="rounded-lg bg-white">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-md bg-slate-900 p-2">
                      <FireIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      Articles et contenus approfondis
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      Des décryptages complets sur les salaires, visas,
                      conditions de travail, modes de vie, etc.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-md bg-slate-900 p-2">
                      <FireIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      Coaching et accompagnement
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      Des sessions personnalisées pour définir une stratégie
                      efficace, éviter les pièges et accélérer vos démarches.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-md bg-slate-900 p-2">
                      <FireIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      Curation de ressources clés
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      Des outils, documents, et recommandations pratiques
                      sélectionnés pour vous.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-md bg-slate-900 p-2">
                      <FireIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      Guides pratiques pour l’expatriation
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      Des checklists, tutoriels et conseils concrets pour gérer
                      l’installation, la vie quotidienne et l’administratif.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:px-8">
        <div className="mx-auto mt-16 w-full max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-900 via-gray-900 to-indigo-950 px-4 py-16 sm:px-8 lg:px-12">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white">
              Estime ton futur salaire au Japon
            </h2>
            <p className="mt-6 text-lg text-white">
              Un simulateur gratuit basé sur ton profil et les données du marché
              2025. 2 minutes suffisent pour savoir où tu te situes.
            </p>
            <Button href="/simulateur" variant="dark" className="mt-6">
              Estimer mon salaire
            </Button>
          </div>
        </div>
      </div>

      <Container className="mt-24 md:mt-28" foo="bar">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Blog
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>Mes derniers articles</Balancer>
        </h3>
        <div className="mb-[64px] flex flex-col gap-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <div className="text-center">
          <Button href="/articles">Voir tous les articles</Button>
        </div>
      </Container>
    </>
  )
}
