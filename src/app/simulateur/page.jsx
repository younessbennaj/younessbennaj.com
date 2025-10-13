'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { SalarySimulatorForm } from './components/SalarySimulatorForm'

export default function SimulationPage() {
  const router = useRouter()
  const [isEligible, setIsEligible] = React.useState(undefined) // undefined = pas encore répondu

  const handleFormSubmit = (formData) => {
    // Encode form data to base64 (Unicode safe)
    const jsonString = JSON.stringify(formData)
    const encodedData = encodeURIComponent(jsonString)
    const base64Token = btoa(encodedData)

    // Redirect with encoded token
    router.push(`/simulateur/resultat?data=${base64Token}`)
  }

  const handleEligibilityAnswer = (eligible) => {
    setIsEligible(eligible)
  }

  return (
    <div className="mt-0 overflow-hidden rounded-xl border-zinc-200 p-0 sm:px-6 md:mx-auto md:mt-24 md:max-w-3xl md:border md:px-4 md:shadow-xl lg:max-w-6xl lg:px-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-xl px-6 py-10 lg:grid-cols-10">
          {/* Left section */}
          <div className="order-2 col-span-5 lg:order-1">
            <h2 className="mb-6 mt-1 hidden text-2xl font-semibold text-zinc-900 md:block dark:text-white">
              Envie de travailler au Japon mais difficile d&apos;y voir clair
              sur les salaires ?
            </h2>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Ce simulateur vous permet de situer votre valeur sur le marché
              japonais selon votre profil. Vous obtenez une estimation en yens,
              son équivalent en euros, et une analyse personnalisée.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Le résultat vous aide à mieux négocier une future offre, à cibler
              les bonnes opportunités selon votre profil, et à valider
              concrètement la faisabilité de votre projet d&apos;expatriation au
              Japon.
            </p>
            <p className="mb-6 mt-4 text-zinc-600 dark:text-zinc-400">
              Ce simulateur est gratuit et anonyme. Commencez dès maintenant à
              poser les bases solides de votre projet Japon.
            </p>
            <Alert
              type="info"
              title="Données actualisées 2025"
              description="Les estimations proposées s'appuient sur une analyse approfondie du marché tech japonais en 2025, incluant des offres d'emploi récentes, des rapports salariaux, et le retour d'expérience de développeurs expatriés."
            />
          </div>

          {/* Right section - contenu conditionnel */}
          <div className="order-1 col-span-5 lg:order-2">
            <h2 className="mb-6 mt-1 block text-2xl font-semibold text-zinc-900 md:hidden dark:text-white">
              Envie de travailler au Japon mais difficile d&apos;y voir clair
              sur les salaires ?
            </h2>
            {/* Question de qualification */}
            {isEligible === undefined && (
              <div className="space-y-6">
                {/* <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Vérification d&apos;éligibilité
                </h3> */}
                <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
                  <h4 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">
                    Avez-vous au moins un diplôme Bac +3 dans le domaine
                    informatique ?
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="primary"
                      onClick={() => handleEligibilityAnswer(true)}
                      className="w-full"
                    >
                      Oui
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleEligibilityAnswer(false)}
                      className="w-full"
                    >
                      Non
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Simulateur pour les éligibles */}
            {isEligible === true && (
              <SalarySimulatorForm onSubmit={handleFormSubmit} />
            )}

            {/* Message pour les non-éligibles */}
            {isEligible === false && (
              <div className="space-y-6">
                <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                    Pas encore Bac +3 ? Des solutions existent.
                  </h3>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                    Les grilles salariales et les critères d’immigration vers le
                    Japon reposent en grande partie sur un niveau Bac +3 ou
                    équivalent. Mais pas de panique : il existe des moyens
                    d’atteindre ce niveau, même après une reconversion ou un
                    parcours atypique.
                  </p>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                    Formations diplômantes, reprises d’études… il est tout à
                    fait possible de bâtir les fondations nécessaires pour
                    concrétiser votre projet Japon.
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      href="/faq#bac3"
                      className="w-full"
                    >
                      FAQ – Je n’ai pas minimum Bac+3, que faire ?
                    </Button>
                    <button
                      onClick={() => setIsEligible(undefined)}
                      className="w-full text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      Lire les articles
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
