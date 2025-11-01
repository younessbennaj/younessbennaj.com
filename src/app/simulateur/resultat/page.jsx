'use client'

import React, { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import * as Tooltip from '@radix-ui/react-tooltip'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { NumberTicker } from '@/components/NumberTicker'
import { SelectField } from '../components/SelectField'
import { Alert } from '@/components/Alert'
import {
  ROLES,
  EXPERIENCE_LEVELS,
  SECTORS,
  BASE_SALARIES,
  SECTOR_MODIFIERS,
  CITY_MODIFIERS,
  CONTRACT_MODIFIERS,
  EXPERIENCE_SCORING,
  ROLE_SCORING,
  MANAGEMENT_SCORING,
  SECTOR_SCORING,
  EDUCATION_SCORING,
  EDUCATION_LEVELS,
} from '../constants'
import clsx from 'clsx'
import {
  FireIcon,
  CurrencyYenIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'

// Fonction utilitaire pour rendre les icônes d'opinion
const renderOpinionIcons = (score) => {
  const icons = []

  if (score < 0) {
    // Icônes négatives (MinusIcon en rouge)
    for (let i = 0; i < Math.abs(score); i++) {
      icons.push(
        <MinusIcon key={`minus-${i}`} className="h-5 w-5 text-red-500" />,
      )
    }
  } else if (score > 0) {
    // Icônes positives (PlusIcon en vert)
    for (let i = 0; i < score; i++) {
      icons.push(
        <PlusIcon key={`plus-${i}`} className="size-5 text-green-500" />,
      )
    }
  } else if (score === 0) {
    icons.push(<PlusIcon key={`plus-0}`} className="h-5 w-5 text-green-500" />)
  }

  return <div className="inline-flex items-center gap-1">{icons}</div>
}

// Fonction pour calculer le score d'opinion pour chaque catégorie
const getOpinionScore = (category, value) => {
  const scores = {
    experience: {
      junior: 0, // Au lieu de -1 (débuter c'est normal)
      intermediate: 1, // Au lieu de 0 (déjà une bonne base)
      senior: 2, // Au lieu de 1 (très recherché)
      expert: 3, // Au lieu de 2 (excellent niveau)
    },
    role: {
      frontend_dev: 2, // Au lieu de 0 (très demandé)
      backend_dev: 2, // Au lieu de 0 (très demandé)
      fullstack_dev: 2, // Au lieu de 0 (très polyvalent)
      data_engineer: 2, // Au lieu de 1 (spécialité premium)
      devops: 2, // Au lieu de 0 (très recherché)
      product_manager: 2, // Au lieu de 1 (leadership valorisé)
      engineering_manager: 3, // Au lieu de 1 (management + tech)
      cto: 3, // Reste à 2 (niveau exceptionnel)
      other: 1, // Au lieu de -2 (moins sévère)
    },
    management: {
      none: 0, // Au lieu de -1 (pas de pénalité)
      support: 1, // Au lieu de 0 (début de leadership)
      lead: 2, // Au lieu de 1 (bon leadership)
      cto: 3, // Au lieu de 2 (leadership exceptionnel)
    },
    education: {
      bachelor: 1, // Au lieu de 0 (bon niveau de base)
      master: 2, // Au lieu de 1 (très bon niveau)
      engineering: 3, // Au lieu de 2 (excellence académique)
    },
    sector: {
      // Secteurs premium
      deeptech: 3, // Au lieu de 2 (secteur d'élite)
      fintech: 3, // Au lieu de 2 (secteur d'élite)
      vc_funds: 2, // Au lieu de 1 (secteur premium)

      // Secteurs en croissance
      healthtech: 1, // Au lieu de 0 (secteur porteur)
      martech: 1, // Au lieu de 0 (digitalisation)
      luxury: 1, // Au lieu de 0 (marché japonais fort)
      b2b_tools: 1, // Au lieu de 0 (transformation digitale)
      entertainment: 1, // Au lieu de 0 (secteur fort au Japon)
      proptech: 1, // Au lieu de 0 (innovation immobilière)
      mobility_smartcity: 2, // Au lieu de 0 (priorité gouvernementale)

      // Secteurs standards
      consulting: 0, // Au lieu de -1 (neutre)
      retail_btoc: 0, // Au lieu de -1 (neutre)
      industry_supply: 1, // Au lieu de 0 (industrie 4.0)
      impact: 1, // Au lieu de 0 (RSE en croissance)

      // Secteurs moins favorisés
      agritech: 0, // Au lieu de -1 (innovation rurale)
      foodtech: 0, // Au lieu de -1 (culture alimentaire)
      traveltech: -1, // Au lieu de -1 (post-covid difficile)
      nonprofit: -1, // Au lieu de -2 (moins sévère)
      other: 0, // Au lieu de -1 (neutre par défaut)
    },
  }

  return scores[category]?.[value] || 0
}

function getProfileLevel(score) {
  if (score >= 9) return 'elite' // Top 5% des profils
  if (score >= 7) return 'advanced' // Top 10% des profils
  if (score >= 5) return 'intermediate' // Top 20% des profils
  return 'basic' // Aucun tag
}

function getProfileScore(formData) {
  const experienceScore = EXPERIENCE_SCORING[formData.experience] ?? 0
  const roleScore = ROLE_SCORING[formData.role] ?? 0
  const managementScore = MANAGEMENT_SCORING[formData.management] ?? 0
  const sectorScore = SECTOR_SCORING[formData.industry] ?? 0 // Valeur par défaut minimale
  const educationScore = EDUCATION_SCORING[formData.education] ?? 0

  return (
    experienceScore + roleScore + managementScore + sectorScore + educationScore
  )
}

const TAG_STYLES = {
  green: 'bg-green-100 text-green-800',
  green10: 'bg-green-200 text-green-900',
  green20: 'bg-green-300 text-green-900',
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-200 text-orange-900',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-200 text-blue-900/80',
  blueLight: 'bg-blue-100/80 text-blue-800/80',
}

const PROFILE_TAGS_BY_LEVEL = {
  elite: [
    {
      variant: 'green',
      text: 'Top 5% des profils',
      icon: <ArrowTrendingUpIcon className="size-4" />,
    },
    {
      variant: 'red',
      text: 'Spécialité en forte demande',
      icon: <FireIcon className="size-4" />,
    },
    {
      variant: 'purple',
      text: 'Meilleurs salaires du marché',
      icon: <CurrencyYenIcon className="size-4" />,
    },
  ],
  advanced: [
    {
      variant: 'green10',
      text: 'Top 10% des profils',
      icon: <ArrowTrendingUpIcon className="size-4" />,
    },
    {
      variant: 'orange',
      text: 'Spécialité recherchée',
      icon: <FireIcon className="size-4" />,
    },
    {
      variant: 'blue',
      text: 'Salaire au-dessus de la moyenne',
      icon: <CurrencyYenIcon className="size-4" />,
    },
  ],
  intermediate: [
    {
      variant: 'green20',
      text: 'Top 20% des profils',
      icon: <ArrowTrendingUpIcon className="size-4" />,
    },
    {
      variant: 'yellow',
      text: 'Spécialité en progression',
      icon: <FireIcon className="size-4" />,
    },
    {
      variant: 'blueLight',
      text: 'Bon potentiel de rémunération',
      icon: <CurrencyYenIcon className="size-4" />,
    },
  ],
  basic: [
    {
      variant: 'green20',
      text: 'Top 30% des profils',
      icon: <ArrowTrendingUpIcon className="size-4" />,
    },
    {
      variant: 'yellow',
      text: 'Spécialité en progression',
      icon: <FireIcon className="size-4" />,
    },
    {
      variant: 'blueLight',
      text: 'Bon potentiel de rémunération',
      icon: <CurrencyYenIcon className="size-4" />,
    },
  ],
}

function ProfilTag({ variant = 'green', text, icon = null }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        TAG_STYLES[variant],
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  )
}

const SalaryTabs = ({
  salaryResult,
  currentSalaryType,
  onSalaryTypeChange,
}) => {
  const salaryData = [
    {
      id: 'min',
      label: 'Minimum',
      value: salaryResult.min,
    },
    {
      id: 'adjusted',
      label: 'Moyen',
      value: salaryResult.adjusted,
    },
    {
      id: 'max',
      label: 'Maximum',
      value: salaryResult.max,
    },
  ]

  const formatSalary = (salary) => {
    return (salary / 1000000).toFixed(1) + 'M¥'
  }

  return (
    <div className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
      {salaryData.map((salary) => (
        <div
          key={salary.id}
          className={cn(
            'inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-all',
            currentSalaryType === salary.id
              ? 'bg-white text-zinc-900 shadow-sm drop-shadow-md dark:bg-zinc-900 dark:text-white'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
          )}
          onClick={() => onSalaryTypeChange(salary.id)}
        >
          <div className="p-2 text-center">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {salary.label}
            </div>
            <div className="text-lg font-bold">
              {formatSalary(salary.value)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper functions to get labels from IDs
const getRoleLabel = (roleId) => {
  return ROLES.find((role) => role.id === roleId)?.label || roleId
}

const getExperienceLabel = (experienceId) => {
  return (
    EXPERIENCE_LEVELS.find((exp) => exp.id === experienceId)?.label ||
    experienceId
  )
}

const getIndustryLabel = (industryId) => {
  return SECTORS.find((sector) => sector.id === industryId)?.label || industryId
}

// Salary calculation function
// Salary calculation function with refinement parameters
const calculateSalary = (
  role,
  experience,
  industry,
  contractType = 'direct',
  city = 'tokyo',
  refinementSector = null,
) => {
  // Find base salary
  const baseSalaryData = BASE_SALARIES.find(
    (salary) => salary.role === role && salary.experience === experience,
  )

  if (!baseSalaryData) {
    return null // No salary data found
  }

  const baseSalary = baseSalaryData.base

  // Determine which sector to use for calculation
  const effectiveSector = refinementSector || industry

  // Apply sector modifier if available
  const sectorModifier = effectiveSector
    ? SECTOR_MODIFIERS[effectiveSector] || 1
    : 1

  // Apply city modifier
  const cityModifier = CITY_MODIFIERS[city] || 1

  // Apply contract type modifier
  const contractModifier = CONTRACT_MODIFIERS[contractType] || 1

  // Calculate final adjusted salary with all modifiers
  const adjustedSalary = Math.round(
    baseSalary * sectorModifier * cityModifier * contractModifier,
  )

  // Calculate salary range (±20% from adjusted salary)
  const minSalary = Math.round(adjustedSalary * 0.8)
  const maxSalary = Math.round(adjustedSalary * 1.2)

  return {
    base: baseSalary,
    adjusted: adjustedSalary,
    sectorModifier: sectorModifier,
    cityModifier: cityModifier,
    contractModifier: contractModifier,
    totalModifier: sectorModifier * cityModifier * contractModifier,
    min: minSalary,
    max: maxSalary,
    effectiveSector: effectiveSector,
  }
}

// Convert JPY to EUR (approximate rate: 1 EUR = 160 JPY)
const convertToEuro = (salaryYen) => {
  return Math.round(salaryYen * 0.0058 * 1.22)
}

// Format salary for display (in millions of yen)
const formatSalary = (salary) => {
  return (salary / 1000000).toFixed(1) + 'M¥'
}

// Constants for the modularization panel
export const CONTRACT_TYPES = [
  { id: 'direct', label: 'Position permanente (Seishain)' },
  { id: 'indirect', label: 'Contrat court via cabinet (Keiyaku)' },
]

const CITIES = [
  { id: 'tokyo', label: 'Tokyo' },
  { id: 'osaka', label: 'Osaka' },
  { id: 'fukuoka', label: 'Fukuoka' },
]

// Tooltip content
const CONTRACT_TYPE_TOOLTIP = {
  title: 'On parle ici du type de contrat',
  content: (
    <div className="space-y-2">
      <p>Ce paramètre correspond à la manière dont vous êtes embauché :</p>
      <ul className="space-y-1 pl-4">
        <li>
          • <strong>Position permanente (Seishain)</strong> : vous êtes
          directement employé par l&apos;entreprise (contrat stable).
        </li>
        <li>
          • <strong>Contrat court via cabinet (Keiyaku)</strong> : vous êtes
          placé par une agence ou un cabinet externe, souvent pour des missions
          de durée limitée.
        </li>
      </ul>
      <p>
        Cela peut impacter le salaire, les avantages, et la stabilité du poste.
      </p>
    </div>
  ),
}

const CITY_TOOLTIP = {
  title: 'Sélection des villes',
  content: (
    <div className="space-y-2">
      <p>
        Nous nous sommes concentrés sur les 3 hubs technologiques majeurs du
        Japon :
      </p>
      <ul className="space-y-1 pl-4">
        <li>
          • <strong>Tokyo</strong> : Centre économique et technologique
          principal
        </li>
        <li>
          • <strong>Osaka</strong> : Deuxième pôle économique du pays
        </li>
        <li>
          • <strong>Fukuoka</strong> : Hub technologique émergent du sud
        </li>
      </ul>
      <p>Ces villes concentrent la majorité des opportunités tech au Japon.</p>
    </div>
  ),
}

const getEducationLabel = (educationId) => {
  return (
    EDUCATION_LEVELS.find((edu) => edu.id === educationId)?.label || educationId
  )
}

function ResultatPageContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [salaryResult, setSalaryResult] = React.useState(null)
  const [currentSalaryType, setCurrentSalaryType] = React.useState('adjusted') // 'min', 'adjusted', 'max'

  const score = formData ? getProfileScore(formData || {}) : 0

  const level = getProfileLevel(score)

  // Modularization panel state (not implemented yet)
  const [modularizationData, setModularizationData] = React.useState({
    contractType: 'direct', // Default to "Position permanente (Seishain)"
    city: 'tokyo', // Default to "Tokyo"
    sector: '', // Default to user's selected industry
  })

  // Mettre à jour handleModularizationChange pour utiliser onValueChange
  const handleModularizationChange = (name, value) => {
    setModularizationData((prev) => ({ ...prev, [name]: value }))
  }

  // Dans l'effet qui décode les données
  React.useEffect(() => {
    try {
      const encodedData = searchParams.get('data')

      if (!encodedData) {
        setError('Aucune donnée trouvée')
        return
      }

      // Decode base64 token (Unicode safe)
      const decodedData = atob(encodedData)
      const jsonString = decodeURIComponent(decodedData)
      const parsedData = JSON.parse(jsonString)

      setFormData(parsedData)

      // Présélectionner le secteur avec formData.industry
      setModularizationData((prev) => ({
        ...prev,
        sector: parsedData.industry || '',
      }))

      // Calculate salary
      const salary = calculateSalary(
        parsedData.role,
        parsedData.experience,
        parsedData.industry,
      )

      setSalaryResult(salary)
    } catch (err) {
      setError('Erreur lors du décodage des données')
      console.error('Decode error:', err)
    }
  }, [searchParams])

  // Effect pour recalculer automatiquement le salaire quand les paramètres changent
  React.useEffect(() => {
    if (!formData) return

    const recalculatedSalary = calculateSalary(
      formData.role,
      formData.experience,
      formData.industry,
      modularizationData.contractType,
      modularizationData.city,
      modularizationData.sector || null, // Use null if empty string
    )

    setSalaryResult(recalculatedSalary)
  }, [formData, modularizationData])

  if (error) {
    return (
      <SimpleLayout>
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-red-600">Erreur</h1>
          <p className="text-zinc-600">{error}</p>
        </div>
      </SimpleLayout>
    )
  }

  if (!formData) {
    return (
      <SimpleLayout>
        <div className="text-center">
          <p className="text-zinc-600">Chargement...</p>
        </div>
      </SimpleLayout>
    )
  }

  return (
    <SimpleLayout>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Résultats de simulation
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Voici votre estimation salariale au Japon
          </p>
        </header>
        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-xl border border-zinc-200 py-6 shadow-xl lg:grid-cols-10">
          {/* Left column - Salary Results (70%) */}
          <div className="relative flex h-full overflow-hidden lg:col-span-5">
            {salaryResult && (
              <div className="relative w-full p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
                <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
                  Voici l&apos;estimation pour un(e){' '}
                  <span className="whitespace-nowrap rounded-sm bg-blue-200 px-1">
                    {getRoleLabel(formData.role)}
                  </span>{' '}
                  ayant{' '}
                  <span className="whitespace-nowrap rounded-sm bg-blue-200 px-1">
                    {getExperienceLabel(formData.experience)}
                  </span>{' '}
                  d&apos;expérience
                  {((formData.industry && formData.industry !== 'other') ||
                    (modularizationData.sector &&
                      modularizationData.sector !== 'other')) && (
                    <>
                      {' '}
                      dans le secteur{' '}
                      <span className="whitespace-nowrap rounded-sm bg-blue-200 px-1">
                        {modularizationData.sector &&
                        modularizationData.sector !== 'other'
                          ? getIndustryLabel(modularizationData.sector)
                          : getIndustryLabel(formData.industry)}
                      </span>
                    </>
                  )}
                  .
                </h2>

                <SalaryTabs
                  salaryResult={salaryResult}
                  currentSalaryType={currentSalaryType}
                  onSalaryTypeChange={setCurrentSalaryType}
                />

                {/* Euro Conversion with NumberTicker */}
                <div className="mt-6 text-center">
                  <div className="rounded-lg bg-white/60 p-4 dark:bg-zinc-800/60">
                    <div className="flex items-center justify-center text-3xl font-bold text-zinc-900 lg:text-4xl">
                      <NumberTicker
                        value={convertToEuro(salaryResult[currentSalaryType])}
                        decimalPlaces={0}
                        locale="fr-FR"
                        delay={0.1}
                        className="text-5xl"
                      />
                      <span className="ml-2">€</span>
                    </div>
                    <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Équivalent en euros d&apos;un salaire brut annuel à Paris
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Button */}
                <div className="mt-10 text-center">
                  <Button
                    className="w-fit px-6 py-5 !text-base uppercase"
                    href="/services"
                  >
                    Je lance mon projet Japon
                  </Button>
                </div>
              </div>
            )}

            {!salaryResult && (
              <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Aucune donnée salariale disponible pour cette combinaison.
                </p>
              </div>
            )}
          </div>

          {/* Right column - Modularization Panel (30%) */}
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-white p-6 dark:bg-zinc-800">
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  Analyse de votre profile
                </h3>
                {/* // Create a storybook story to see any variantion depening on level */}
                <div className="flex flex-wrap gap-2">
                  {PROFILE_TAGS_BY_LEVEL[level].map((tag, index) => (
                    <ProfilTag
                      key={index}
                      variant={tag.variant}
                      text={tag.text}
                      icon={tag.icon}
                    />
                  ))}
                </div>
                <button
                  className="mt-4 inline text-xs font-medium text-sky-600 underline decoration-sky-600 underline-offset-2 transition-colors hover:text-sky-700 hover:decoration-sky-700 focus:outline-none"
                  onClick={() =>
                    document
                      .getElementById('salary-breakdown')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Qu&apos;est-ce que cela signifie ?
                </button>
              </div>
              <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                Personnalisez votre estimation
              </h3>

              <div className="space-y-4">
                <SelectField
                  name="contractType"
                  value={modularizationData.contractType}
                  onValueChange={(value) =>
                    handleModularizationChange('contractType', value)
                  }
                  options={CONTRACT_TYPES}
                  placeholder="Sélectionner un type de contrat"
                  label="Type de contrat"
                  tooltip={CONTRACT_TYPE_TOOLTIP}
                />

                <SelectField
                  name="city"
                  value={modularizationData.city}
                  onValueChange={(value) =>
                    handleModularizationChange('city', value)
                  }
                  options={CITIES}
                  placeholder="Sélectionner une ville"
                  label="Ville"
                  tooltip={CITY_TOOLTIP}
                />

                <SelectField
                  name="sector"
                  value={modularizationData.sector}
                  onValueChange={(value) =>
                    handleModularizationChange('sector', value)
                  }
                  options={SECTORS}
                  placeholder="Sélectionner un secteur"
                  label="Secteur d'activité"
                />
              </div>

              <Alert
                variant="info"
                className="mt-6"
                title="Pourquoi cette personnalisation ?"
                description="Le salaire au Japon peut varier significativement en fonction du type de contrat, de la ville, et du secteur d'activité. En ajustant ces paramètres, vous obtenez une estimation plus précise et réaliste adaptée à votre situation."
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div
          id="salary-breakdown"
          className="mx-auto max-w-[800px] pb-[50px] pt-10 text-center"
        >
          <h2 className="mb-6 text-3xl font-medium text-zinc-900 dark:text-white">
            Comprenez ce qui compose votre estimation salariale
          </h2>
          <p className="mx-auto mb-4 max-w-[600px] text-zinc-600 dark:text-zinc-400">
            Votre estimation ne se limite pas à un chiffre global. Elle repose
            sur plusieurs dimensions clés de votre profil professionnel. Voici
            comment chaque catégorie a contribué à votre positionnement sur le
            marché japonais :
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Experience Level Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <span>Niveau d&apos;expérience</span>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {getExperienceLabel(formData.experience)}
              </span>
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Votre expérience professionnelle est un facteur clé dans la
              détermination de votre salaire. Plus votre expérience est
              significative, plus vous apportez de la valeur à l&apos;entreprise
              et plus votre rémunération peut être élevée.
            </p>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-zinc-600">
                Votre score sur ce critère :
              </div>
              {renderOpinionIcons(
                getOpinionScore('experience', formData.experience),
              )}
            </div>
          </div>
          {/* Role Complexity Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <span>Complexité du rôle</span>
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                {getRoleLabel(formData.role)}
              </span>
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Le rôle que vous occupez influence directement votre rémunération.
              Des postes plus complexes ou spécialisés nécessitent des
              compétences avancées et sont généralement mieux valorisés sur le
              marché japonais.
            </p>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-zinc-600">
                Votre score sur ce critère :
              </div>

              {renderOpinionIcons(getOpinionScore('role', formData.role))}
            </div>
          </div>

          {/* Sector Demand Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <span>Demande sectorielle</span>
              <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {modularizationData.sector
                  ? getIndustryLabel(modularizationData.sector)
                  : formData.industry
                    ? getIndustryLabel(formData.industry)
                    : 'Non spécifié'}
              </span>
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Certains secteurs sont en forte demande au Japon, ce qui peut
              entraîner des salaires plus élevés. Votre spécialisation dans un
              domaine recherché augmente significativement votre attractivité
              sur le marché de l&apos;emploi.
            </p>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-zinc-600">
                {!modularizationData.sector ||
                modularizationData.sector === 'other'
                  ? 'Veuillez sélectionner un secteur pour obtenir une évaluation'
                  : 'Votre score sur ce critère :'}
              </div>
              {modularizationData.sector &&
                modularizationData.sector !== 'other' &&
                renderOpinionIcons(
                  getOpinionScore('sector', modularizationData.sector),
                )}
            </div>
          </div>

          {/* Education Level Card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <span>Niveau d&apos;études</span>
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                {formData.education
                  ? getEducationLabel(formData.education)
                  : 'Non spécifié'}
              </span>
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Votre formation académique joue un rôle important dans
              l&apos;évaluation de votre profil. Au Japon, le niveau
              d&apos;études influence non seulement les opportunités
              d&apos;emploi mais aussi les critères d&apos;immigration et de
              visa.
            </p>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-zinc-600">
                Votre score sur ce critère :
              </div>
              {renderOpinionIcons(
                getOpinionScore('education', formData.education),
              )}
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
            Prêt à concrétiser votre projet au Japon ?
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Découvrez mes services d&apos;accompagnement personnalisé pour vous
            aider dans votre recherche d&apos;emploi au Japon, de la préparation
            de votre CV à la négociation salariale.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/services">
              <Button variant="primary" className="w-full sm:w-auto">
                Découvrir mes services
              </Button>
            </Link>
            <Link href="/simulateur">
              <Button variant="secondary" className="w-full sm:w-auto">
                Nouvelle simulation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

export default function ResultatPage() {
  return (
    <Suspense
      fallback={
        <SimpleLayout>
          <div className="text-center">
            <p className="text-zinc-600">Chargement...</p>
          </div>
        </SimpleLayout>
      }
    >
      <ResultatPageContent />
    </Suspense>
  )
}
