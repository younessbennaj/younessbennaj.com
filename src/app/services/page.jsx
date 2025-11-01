import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { SimpleLayout } from '@/components/SimpleLayout'
import { CustomAccordion } from '@/components/CustomAccordion'
import kyudo from '@/images/kyudo.png'
import clsx from 'clsx'

import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Services',
  description:
    'Découvrez mes services d’accompagnement pour l’expatriation au Japon.',
}

const questions = [
  {
    question: "Qui peut bénéficier de vos services d'accompagnement ?",
    answer:
      "Mes services s'adressent principalement aux développeurs et professionnels de la tech avec un diplôme Bac+3 minimum qui souhaitent s'expatrier au Japon. Cette condition de diplôme est requise pour l'obtention d'un visa de travail japonais. Que vous soyez développeur web, data scientist, DevOps, product manager, etc., l'important est d'avoir une motivation claire et un projet concret d'expatriation.",
  },
  {
    question:
      'Quelle est la différence entre le format "Kick-Off" et "Sur-Mesure" ?',
    answer:
      'Le format "Kick-Off" (150€) est une session unique de 60 minutes pour structurer votre projet et obtenir une feuille de route claire. Le format "Sur-Mesure" (790€) propose un accompagnement complet sur plusieurs mois, avec des sessions régulières, un suivi personnalisé, et un support continu jusqu\'à votre installation au Japon.',
  },
  {
    question:
      "Combien de temps faut-il prévoir pour concrétiser son projet d'expatriation ?",
    answer:
      "La durée varie selon votre situation et vos objectifs. En moyenne, il faut compter 6 à 12 mois entre la décision de partir et l'installation effective. Cela inclut la recherche d'emploi, les démarches de visa, la préparation logistique, et l'adaptation aux premiers mois sur place. Un bon accompagnement permet d'optimiser ce délai.",
  },
  {
    question: 'Faut-il parler japonais pour travailler dans la tech au Japon ?',
    answer:
      "Non, ce n'est pas obligatoire pour démarrer. De nombreuses entreprises tech à Tokyo recrutent des profils anglophones, surtout dans les startups et les entreprises internationales. Cependant, apprendre le japonais améliore considérablement vos opportunités et votre intégration. Je vous aide à évaluer vos options selon votre niveau actuel.",
  },
  {
    question: "Comment se déroule une session d'accompagnement ?",
    answer:
      "Les sessions se déroulent en visioconférence, avec un agenda structuré adapté à vos besoins. Pour le Kick-Off : audit de situation, conseils personnalisés, et plan d'action. Pour le Sur-Mesure : sessions régulières avec suivi des candidatures, préparation aux entretiens, et accompagnement sur les démarches administratives.",
  },
  {
    question: "Quel budget total prévoir pour s'installer au Japon ?",
    answer:
      "Le budget varie selon votre situation, mais il faut généralement prévoir entre 8 000€ et 15 000€ pour les 6 premiers mois. Cela inclut : billet d'avion, caution d'appartement, premiers mois de loyer, frais d'installation, et coussin de sécurité. Lors de nos sessions, je vous aide à établir un budget réaliste selon votre profil.",
  },
  {
    question: 'Proposez-vous une garantie de résultat ?',
    answer:
      "Je ne peux pas garantir l'obtention d'un poste, car cela dépend de nombreux facteurs (marché, timing, profil, etc.). En revanche, je m'engage à vous fournir tous les outils, stratégies et conseils pour maximiser vos chances de réussite. Mon approche est basée sur mon expérience personnelle et celle de nombreux expatriés avec qui j'ai pu échanger longuement.",
  },
  {
    question:
      "Peut-on commencer l'accompagnement si on n'a pas encore de visa ?",
    answer:
      "Absolument ! La plupart de mes clients commencent l'accompagnement avant d'avoir leur visa. En fait, c'est même recommandé. Nous travaillons d'abord sur votre stratégie de recherche d'emploi, l'optimisation de votre profil, puis sur la recherche d'une entreprise qui sponsorisera votre visa. C'est la séquence la plus efficace.",
  },
  {
    question: "Continuez-vous à accompagner après l'arrivée au Japon ?",
    answer:
      "Oui, l'accompagnement ne s'arrête pas à l'obtention du visa. Pour le format Sur-Mesure, je reste disponible pendant les premiers mois d'installation pour vous aider sur les démarches administratives, l'adaptation professionnelle, et les questions pratiques du quotidien. C'est souvent une période où un soutien est précieux.",
  },
  {
    question:
      "Comment puis-je réserver une session ou commencer l'accompagnement ?",
    answer:
      "Pour le Kick-Off, vous pouvez directement réserver sur mon calendrier Calendly. Pour le format Sur-Mesure, je propose d'abord un appel de découverte gratuit de 20 minutes pour faire connaissance et vérifier que nous sommes alignés. Ensuite, nous pouvons démarrer l'accompagnement selon vos disponibilités.",
  },
]

const benefits1 = [
  'Audit complet de votre situation (profil, visa, contraintes, objectifs)',
  'Conseils personnalisés sur le visa adapté à votre profil',
  'Estimation réaliste du budget total à prévoir (visa, installation, premier mois)',
  "Plan d'action priorisé pour les mois à venir, selon votre calendrier",
  'Fiche PDF récapitulative + ressources clés pour avancer sereinement',
  'Checklist stratégique et recommandations concrètes',
  '1 mois de support email pour toute question liée à la session',
]

const benefits2 = [
  'Appel de cadrage personnalisé (1h30) pour définir les fondations du projet',
  'Sessions de suivi régulières (hebdo ou bi-mensuel) adaptées à votre rythme',
  "Accompagnement stratégique et opérationnel pour la recherche d'emploi",
  'Suivi des candidatures, aide à la priorisation et retours personnalisés',
  'Préparation complète aux entretiens',
  'Optimisation CV',
  "Simulations d'entretien en conditions réelles",
  'Recommandations sur la négociation salariale selon votre profil et le marché',
  'Assistance dans les démarches administratives (visa, logement, assurance)',
  "Conseils pratiques pour bien s'installer : quartier, mode de vie, intégration",
  'Accès à un espace Notion partagé (suivi, roadmap, to-dos, ressources)',
  'Support asynchrone illimité (email ou messagerie privée) pendant toute la durée',
]

export default function Services() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  return (
    <SimpleLayout
      title="Services d’accompagnement pour l’expatriation au Japon"
      intro=""
    >
      <section className="mx-auto mb-20 max-w-3xl space-y-10 overflow-visible">
        <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          Le vrai problème quand on veut s’expatrier au Japon
        </h3>
        <div className="block pb-10">
          <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            {[image1, image2, image3, image4, image5].map(
              (image, imageIndex) => (
                <div
                  key={image.src}
                  className={clsx(
                    'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                    rotations[imageIndex % rotations.length],
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </div>
        <p className="mt-20 text-zinc-700 dark:text-zinc-300">
          Travailler au Japon fait rêver de plus en plus de développeurs
          francophones. Mais l’enthousiasme laisse vite place à la complexité :
          peu d’infos fiables, démarches floues, contrats difficiles à
          comprendre, incertitudes face aux salaires, et barrières culturelles
          qui transforment chaque étape en défi.
          <br />
          <br />
          Car vivre au Japon n’a rien à voir avec y voyager. Sans préparation,
          le rêve peut vite laisser place à la désillusion : frais imprévus,
          mauvais choix de quartier, isolement social, difficultés
          administratives… Tout cela peut faire basculer l’expérience du côté de
          la frustration. Surtout quand on vient pour travailler.{' '}
          <strong>Si le boulot ne suit pas, tout le reste devient flou.</strong>
          <br />
          <br />
          Les entreprises japonaises le savent. C’est leur crainte principale
          quand elles recrutent des étrangers : que l’expatrié ne tienne pas sur
          la durée. Beaucoup repartent après quelques mois, faute de repères ou
          de rythme de vie adapté.
          <br />
          <br />
          Et postuler au hasard n’est pas une solution. Ce qui fera la
          différence sur la longueur, c’est la maitrise du facteur travail. Le
          Japon est calme, peu stressant dans la vie quotidienne. Mais un
          mauvais choix d’entreprise, un visa mal géré, ou un salaire trop bas,
          <strong>et c’est l’ensemble de l’expatriation qui vacille.</strong>
          <br />
          <br />
          Le vrai problème, c’est qu’on est souvent seul. Les entreprises ont
          rarement les moyens d’accompagner. Elles délèguent le recrutement aux
          cabinets de recrutement, qui eux sont là pour placer et faire du
          chiffre. Une fois embauché, c’est à vous de vous débrouiller.
        </p>

        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Comme dans le Kyūdō, visez juste dès le départ
        </h3>
        <Image
          src={kyudo}
          alt="Kyūdō"
          className="mx-auto h-auto w-full rounded-lg md:h-[600px] md:w-auto"
        />
        <p className="text-zinc-700 dark:text-zinc-300">
          Au Japon, le tir à l’arc traditionnel ne consiste pas seulement à
          toucher une cible. Dans le <strong>Kyūdō</strong>, chaque geste
          compte. Chaque détail est maîtrisé. Parce qu’au moment de lâcher la
          flèche,{' '}
          <strong>
            la moindre erreur d’alignement se répercute bien plus loin
          </strong>
          .
          <br />
          <br />
          Votre projet d’expatriation, c’est pareil.
          <br />
          <br />
          Choisir une entreprise sans recul, un quartier mal adapté,
          sous-estimer certaines démarches ou négliger votre vie sociale : ce
          sont de petites déviations au départ… mais qui peuvent suffire à faire
          rater la cible des mois plus tard.
          <br />
          <br />
          Si vous voulez vivre pleinement votre expérience au Japon,
          <strong>il faut viser juste dès le départ.</strong> C’est une question
          de préparation, d’alignement, de lucidité. Comme dans le Kyūdō.
        </p>

        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Je suis passé par là. C’est pour ça que je peux vous aider.
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          Quand j’ai décidé de m’installer à Tokyo, j’ai dû tout apprendre seul
          : comprendre le marché local, revoir mes attentes salariales, trouver
          une entreprise prête à sponsoriser mon visa, et m’adapter à des codes
          culturels parfois déroutants.
          <br />
          <br />
          En ligne, je ne trouvais que des témoignages éloignés de mon profil :
          créateurs de contenu, voyageurs de passage, ou expatriés installés
          depuis longtemps dans des secteurs sans lien avec la tech. Inspirants,
          oui, mais difficile de s’y projeter.
          <br />
          <br />
          C’est pour combler ce manque que j’ai créé ce site. Parce que je sais
          ce que c’est de chercher des réponses simples, et de ne pas les
          trouver. De naviguer dans le flou, seul, en espérant ne pas faire
          d’erreur.
          <br />
          <br />
          J’ai eu la chance de m’en sortir. Mais ça n’a pas effacé le stress, la
          frustration, ni le sentiment d’être livré à moi-même. J’ai donc
          documenté chaque étape, avec une question en tête : “Et si c’était à
          refaire, comment ferais-tu ?”
          <br />
          <br />
          Aujourd’hui, je propose un accompagnement structuré pour celles et
          ceux qui veulent faire les bons choix dès le départ. Poser un cadre
          clair. Éviter les pièges. Et construire un projet solide, avec l’aide
          de quelqu’un qui est déjà passé par là.
        </p>

        <div className="mb-10 rounded-lg border border-zinc-300 bg-zinc-100 p-6 dark:border-zinc-600 dark:bg-zinc-800">
          <h4 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-200">
            Ces services sont-ils faits pour vous ?
          </h4>
          <p className="mb-3 text-zinc-700 dark:text-zinc-300">
            Mes accompagnements s&apos;adressent spécifiquement aux
            professionnels tech avec :
          </p>
          <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              • <strong>Diplôme Bac+3 minimum</strong> (condition visa)
            </li>
            <li>
              • <strong>Expérience dans la tech</strong> (dev, data, DevOps,
              product...)
            </li>
            <li>
              • <strong>Projet concret</strong> d&apos;expatriation (pas
              seulement curiosité)
            </li>
          </ul>
        </div>

        <h3 className="text-center text-3xl font-semibold text-zinc-900 dark:text-white">
          Deux formats d’accompagnement selon vos besoins
        </h3>
      </section>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Carte 1 */}
        <div className="mb-10 h-fit flex-1 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-1 text-2xl font-bold text-zinc-800 dark:text-white">
            Kick-Off
          </h3>
          <p className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Transformez vos doutes en une stratégie claire et actionnable.
          </p>
          <div className="mb-6 text-4xl font-extrabold text-zinc-800 dark:text-white">
            150€{' '}
            <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
              (session unique de 60 minutes)
            </span>
          </div>
          <div className="mb-12 text-zinc-500">
            Idéal pour structurer son projet, poser les bases, et avancer sans
            se disperser.
          </div>
          <Button
            variant="secondary"
            href="https://calendly.com/youness-bennaj/session-kickoff-japon"
            className="mb-6 w-full"
            target="_blank"
          >
            Réserver une session
          </Button>
          <ul className="mb-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {benefits1.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <CheckCircleIcon className="mt-0.5 size-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Carte 2 */}
        <div className="h-fit flex-1 rounded-2xl border border-zinc-200 p-5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-1 text-2xl font-bold text-zinc-800 dark:text-white">
            Sur-Mesure
          </h3>
          <p className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Un suivi pas à pas jusqu’à votre installation au Japon.
          </p>
          <div className="mb-6 text-4xl font-extrabold text-zinc-800 dark:text-white">
            790€{' '}
            <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
              (paiement en plusieurs fois possible)
            </span>
          </div>
          <div className="mb-12 text-zinc-500">
            Idéal pour celles et ceux qui veulent avancer avec clarté et soutien
            à chaque étape.
          </div>
          <Button
            variant="primary"
            href="https://calendly.com/youness-bennaj/appel-decouverte-accompagnement-sur-mesure-japon"
            className="mb-6 w-full"
            target="_blank"
          >
            Demander un appel de découverte
          </Button>
          <ul className="mb-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {benefits2.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <CheckCircleIcon className="mt-0.5 size-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          FAQ
        </h2>
        <h3 className="mb-[64px] mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Les questions les plus fréquentes
        </h3>
        <CustomAccordion questions={questions} />
      </Container>
    </SimpleLayout>
  )
}
