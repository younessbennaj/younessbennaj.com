'use client'

import React from 'react'
import { Button } from '@/components/Button'
import {
  ROLES,
  EXPERIENCE_LEVELS,
  SECTORS,
  MANAGEMENT,
  EDUCATION_LEVELS,
} from '../constants'
import { SelectField } from './SelectField'

export const SalarySimulatorForm = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    role: '',
    experience: '',
    industry: '',
    management: '',
    education: '',
  })

  const [errors, setErrors] = React.useState({
    role: false,
    experience: false,
    industry: false,
    management: false,
    education: false,
  })

  const handleValueChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur du champ quand l'utilisateur sélectionne une valeur
    if (value && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      role: !formData.role,
      experience: !formData.experience,
      management: !formData.management,
      education: !formData.education,
      industry: false, // industry n'est pas requis
    }

    setErrors(newErrors)

    // Retourner true si aucune erreur
    return !Object.values(newErrors).some((hasError) => hasError)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!validateForm()) {
      return
    }

    // Appeler la fonction onSubmit passée en prop avec les données
    onSubmit(formData)
  }

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <SelectField
            name="role"
            value={formData.role}
            onValueChange={(value) => handleValueChange('role', value)}
            options={ROLES}
            placeholder="Sélectionner un rôle"
            label="Rôle"
            required
            hasError={errors.role}
          />

          <SelectField
            name="experience"
            value={formData.experience}
            onValueChange={(value) => handleValueChange('experience', value)}
            options={EXPERIENCE_LEVELS}
            placeholder="Sélectionner un niveau d'expérience"
            label="Niveau d'expérience"
            required
            hasError={errors.experience}
            tooltip={{
              title: 'Expérience globale en tech',
              content:
                'Indiquez votre expérience totale dans le secteur de la tech, pas seulement dans votre rôle actuel. Cela inclut donc tous vos postes précédents.',
            }}
          />

          <SelectField
            name="education"
            value={formData.education}
            onValueChange={(value) => handleValueChange('education', value)}
            options={EDUCATION_LEVELS}
            placeholder="Sélectionner un niveau d'éducation"
            label="Niveau d'éducation"
            required
            hasError={errors.education}
            tooltip={{
              title: 'Parcours académique et professionnel',
              content:
                "Indiquez le plus haut niveau de diplôme ou de formation que vous avez suivi dans le domaine. Cela permet d'estimer comment votre parcours pourrait être perçu par les recruteurs ou les services d'immigration au Japon. Les parcours non diplômants (comme les bootcamps ou l'auto-formation) restent tout à fait valides.",
            }}
          />

          <SelectField
            name="management"
            value={formData.management}
            onValueChange={(value) => handleValueChange('management', value)}
            options={MANAGEMENT}
            placeholder="Sélectionner votre expérience en management"
            label="Expérience en management"
            required
            hasError={errors.management}
            tooltip={{
              title: 'Critère clé pour le marché japonais',
              content:
                "L'expérience en management ou mentoring est cruciale au Japon. Les entreprises recherchent activement des talents étrangers capables de former leurs équipes à de nouvelles méthodes et d'apporter une expertise internationale. C'est un facteur déterminant pour votre attractivité sur le marché.",
            }}
          />

          <SelectField
            name="industry"
            value={formData.industry}
            onValueChange={(value) => handleValueChange('industry', value)}
            options={SECTORS}
            placeholder="Sélectionner un secteur d'activité"
            label="Industrie"
            hasError={errors.industry}
            tooltip={{
              title: "Secteur d'activité (optionnel)",
              content:
                "Ce champ est facultatif. Une expérience dans des secteurs très recherchés comme la deeptech ou la fintech peut jouer positivement sur le salaire. Mais changer d'industrie est fréquent, surtout lors d'une expatriation, donc ne vous limitez pas à cela.",
            }}
          />

          <Button className="mt-7 py-3 !text-lg" type="submit">
            Calculer
          </Button>
        </div>
      </form>

      {/* Affichage des erreurs globales */}
      {Object.values(errors).some((hasError) => hasError) && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">
            Veuillez remplir tous les champs obligatoires.
          </p>
        </div>
      )}
    </div>
  )
}
