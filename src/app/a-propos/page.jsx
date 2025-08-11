import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { LinkedInIcon, XIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon, ...delegated }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        {...delegated}
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'À propos',
  description:
    'Découvrez le parcours de Youness Bennaj, développeur web basé à Tokyo, spécialisé dans l’expatriation au Japon pour les talents tech. Partage d’expériences, conseils et contenus pour réussir sa vie professionnelle au Japon.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="w-full px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-auto w-full rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Une nouvelle vie au Japon, et une envie : Transmettre ce que j’ai
            appris.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Comme beaucoup d’enfants de ma génération, j’ai grandi avec le
              soft power japonais en toile de fond. Au fil des années, toutes
              ces influences ont nourri une curiosité tenace : un jour, je
              vivrai au Japon. En 2024, j’ai franchi le pas. Ce projet n’était
              pas une fuite, ni un fantasme : simplement l’envie de voir, de
              comprendre, de vivre ici pour de vrai.
            </p>
            <p>
              En m’installant à Tokyo, j’ai voulu confronter mes idées à la
              réalité. Découvrir le Japon au quotidien, au-delà des images et
              des clichés. J’ai appris à m’adapter, à naviguer les différences,
              à mieux comprendre ce pays — et un peu mieux me comprendre moi
              aussi. Ce parcours m’a transformé, sur le plan personnel comme
              professionnel, et m’a confirmé que cette expérience méritait
              d’être partagée.
            </p>
            <p>
              Ce site, je l’ai créé pour ça. Pour transmettre ce que j’aurais
              aimé lire quand je préparais mon départ. Pour aider celles et ceux
              qui, comme moi, envisagent de vivre et travailler au Japon, mais
              cherchent encore des repères concrets. Tu y trouveras des retours
              d’expérience, des conseils pratiques, et peut-être de quoi nourrir
              ta propre réflexion. Et si tu veux échanger plus directement,
              n’hésite pas à me contacter. La suite commence ici.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.linkedin.com/in/youness-bennaj"
              icon={LinkedInIcon}
              className="mt-4"
              target="_blank"
            >
              Suivre sur LinkedIn
            </SocialLink>
            <SocialLink
              href="https://twitter.com/younessbennaj"
              icon={XIcon}
              className="mt-4"
              target="_blank"
            >
              Suivre sur Twitter
            </SocialLink>

            <SocialLink
              href="mailto:youness.bennaj@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              target="_blank"
            >
              youness.bennaj@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
