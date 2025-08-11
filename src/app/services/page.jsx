import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Services',
  description:
    'Découvrez mes services d’accompagnement pour l’expatriation au Japon.',
}

export default function Services() {
  return (
    <SimpleLayout
      title="Services d’accompagnement pour l’expatriation au Japon"
      intro=""
    >
      <section className="mx-auto mb-20 max-w-3xl space-y-10">
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Le vrai problème quand on veut s’expatrier au Japon
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
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

        <h3 className="text-center text-3xl font-semibold text-zinc-900 dark:text-white">
          Deux formats d’accompagnement selon vos besoins
        </h3>
      </section>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Carte 1 */}
        <div className="mb-10 h-auto flex-1 rounded-2xl border border-zinc-200 p-8 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
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
          <ul className="mb-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ✅ Audit complet de votre situation (profil, visa, contraintes,
              objectifs)
            </li>
            <li>✅ Conseils personnalisés sur le visa adapté à votre profil</li>
            <li>
              ✅ Estimation réaliste du budget total à prévoir (visa,
              installation, premier mois)
            </li>
            <li>
              ✅ Plan d’action priorisé pour les mois à venir, selon votre
              calendrier
            </li>
            <li>
              ✅ Fiche PDF récapitulative + ressources clés pour avancer
              sereinement
            </li>
            <li>✅ Checklist stratégique et recommandations concrètes</li>
            <li>
              ✅ 1 mois de support email pour toute question liée à la session
            </li>
          </ul>
          <div className="mb-6 rounded-md bg-zinc-100 p-3 text-sm italic text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <strong>Idéal pour</strong> : structurer son projet, poser les
            bases, et avancer sans se disperser.
          </div>
          <Button
            variant="primary"
            href="https://calendly.com/youness-bennaj/60min"
            className="w-full"
            target="_blank"
          >
            Réserver une session
          </Button>
        </div>

        {/* Carte 2 */}
        <div className="h-auto flex-1 rounded-2xl border border-zinc-200 p-8 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
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
          <ul className="mb-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ✅ Appel de cadrage personnalisé (1h30) pour définir les
              fondations du projet
            </li>
            <li>
              ✅ Sessions de suivi régulières (hebdo ou bi-mensuel) adaptées à
              votre rythme
            </li>
            <li>
              ✅ Accompagnement stratégique et opérationnel pour la recherche
              d’emploi
            </li>
            <li>
              ✅ Suivi des candidatures, aide à la priorisation et retours
              personnalisés
            </li>
            <li>✅ Préparation complète aux entretiens</li>
            <li>✅ Optimisation CV</li>
            <li>✅ Simulations d’entretien en conditions réelles</li>
            <li>
              ✅ Recommandations sur la négociation salariale selon votre profil
              et le marché
            </li>
            <li>
              ✅ Assistance dans les démarches administratives (visa, logement,
              assurance)
            </li>
            <li>
              ✅ Conseils pratiques pour bien s’installer : quartier, mode de
              vie, intégration
            </li>
            <li>
              ✅ Accès à un espace Notion partagé (suivi, roadmap, to-dos,
              ressources)
            </li>
            <li>
              ✅ Support asynchrone illimité (email ou messagerie privée)
              pendant toute la durée
            </li>
          </ul>
          <div className="mb-6 rounded-md bg-zinc-100 p-3 text-sm italic text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <strong>Idéal pour</strong> : celles et ceux qui veulent avancer
            avec clarté et soutien à chaque étape.
          </div>
          <Button
            variant="primary"
            href="https://calendly.com/youness-bennaj/15min"
            className="w-full"
            target="_blank"
          >
            Demander un appel de découverte
          </Button>
        </div>
      </div>
    </SimpleLayout>
  )
}
