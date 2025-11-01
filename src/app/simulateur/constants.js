// Import or define the same constants used in the form
export const ROLES = [
  { id: 'frontend_dev', label: 'Développeur Front-End' },
  { id: 'backend_dev', label: 'Développeur Back-End' },
  { id: 'fullstack_dev', label: 'Full Stack' },
  { id: 'data_engineer', label: 'Data Engineer' },
  { id: 'devops', label: 'DevOps' },
  { id: 'product_manager', label: 'Product Manager' },
  { id: 'engineering_manager', label: 'Engineering Manager' },
  { id: 'cto', label: 'CTO / Directeur Technique' },
  { id: 'other', label: 'Autre' },
]

export const EXPERIENCE_LEVELS = [
  { id: 'junior', label: '0–2 ans' },
  { id: 'intermediate', label: '3–5 ans' },
  { id: 'senior', label: '6–9 ans' },
  { id: 'expert', label: '10+ ans' },
]

export const MANAGEMENT = [
  { id: 'none', label: 'Aucune expérience en management' },
  { id: 'support', label: 'Mentoring ou accompagnement technique' },
  { id: 'lead', label: 'Responsable d’équipe / Lead technique' },
  { id: 'cto', label: 'Rôle de direction (CTO, Engineering Manager…)' },
]

export const EDUCATION_LEVELS = [
  {
    id: 'bachelor',
    label: 'Diplôme Bac +3 (Licence, Bachelor…)',
  },
  {
    id: 'master',
    label: 'Master universitaire (Bac +5)',
  },
  {
    id: 'engineering',
    label: 'Ecole d’ingénieur / informatique',
  },
]

export const SECTORS = [
  { id: 'deeptech', label: 'DeepTech' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'healthtech', label: 'HealthTech' },
  { id: 'martech', label: 'MarTech' },
  { id: 'luxury', label: 'Luxe' },
  { id: 'b2b_tools', label: 'Outils B2B' },
  { id: 'consulting', label: 'Conseil' },
  { id: 'entertainment', label: 'Divertissement' },
  { id: 'proptech', label: 'PropTech' },
  { id: 'retail_btoc', label: 'Retail & BtoC' },
  { id: 'impact', label: 'GreenTech' },
  { id: 'mobility_smartcity', label: 'Mobilité & Smart City' },
  { id: 'industry_supply', label: 'Industrie & Supply' },
  { id: 'agritech', label: 'AgriTech' },
  { id: 'foodtech', label: 'FoodTech' },
  { id: 'traveltech', label: 'TravelTech' },
  { id: 'nonprofit', label: 'Non-profit' },
  { id: 'vc_funds', label: 'Fonds / VC' },
  { id: 'other', label: 'Autre' },
]

// ...existing code...
export const BASE_SALARIES = [
  { role: 'frontend_dev', experience: 'junior', base: 5200000 },
  { role: 'frontend_dev', experience: 'intermediate', base: 6500000 },
  { role: 'frontend_dev', experience: 'senior', base: 8000000 },
  { role: 'frontend_dev', experience: 'expert', base: 9000000 },

  { role: 'backend_dev', experience: 'junior', base: 5200000 },
  { role: 'backend_dev', experience: 'intermediate', base: 6500000 },
  { role: 'backend_dev', experience: 'senior', base: 8000000 },
  { role: 'backend_dev', experience: 'expert', base: 9000000 },

  { role: 'fullstack_dev', experience: 'junior', base: 5300000 },
  { role: 'fullstack_dev', experience: 'intermediate', base: 6600000 },
  { role: 'fullstack_dev', experience: 'senior', base: 8200000 },
  { role: 'fullstack_dev', experience: 'expert', base: 9200000 },

  { role: 'data_engineer', experience: 'junior', base: 5500000 },
  { role: 'data_engineer', experience: 'intermediate', base: 7000000 },
  { role: 'data_engineer', experience: 'senior', base: 8500000 },
  { role: 'data_engineer', experience: 'expert', base: 9500000 },

  { role: 'devops', experience: 'junior', base: 5400000 },
  { role: 'devops', experience: 'intermediate', base: 6800000 },
  { role: 'devops', experience: 'senior', base: 8300000 },
  { role: 'devops', experience: 'expert', base: 9300000 },

  { role: 'product_manager', experience: 'junior', base: 6000000 },
  { role: 'product_manager', experience: 'intermediate', base: 7500000 },
  { role: 'product_manager', experience: 'senior', base: 9000000 },
  { role: 'product_manager', experience: 'expert', base: 10500000 },

  { role: 'engineering_manager', experience: 'junior', base: 7000000 },
  { role: 'engineering_manager', experience: 'intermediate', base: 8500000 },
  { role: 'engineering_manager', experience: 'senior', base: 10000000 },
  { role: 'engineering_manager', experience: 'expert', base: 11500000 },

  { role: 'cto', experience: 'junior', base: 8000000 },
  { role: 'cto', experience: 'intermediate', base: 9500000 },
  { role: 'cto', experience: 'senior', base: 11000000 },
  { role: 'cto', experience: 'expert', base: 13000000 },
]

export const SECTOR_MODIFIERS = {
  deeptech: 1.12,
  fintech: 1.1,
  healthtech: 1.09,
  martech: 1.08,
  luxury: 1.05,
  b2b_tools: 1.04,
  consulting: 1.02,
  entertainment: 1.02,
  proptech: 0.98,
  retail_btoc: 0.95,
  impact: 0.94,
  mobility_smartcity: 0.93,
  industry_supply: 0.92,
  agritech: 0.91,
  foodtech: 0.9,
  traveltech: 0.9,
  nonprofit: 0.85,
  vc_funds: 1.07,
  other: 1.0,
}

// Modificateurs par ville (basé sur le coût de la vie et les opportunités)
export const CITY_MODIFIERS = {
  tokyo: 1.15, // Tokyo - Centre économique principal, coût de vie élevé
  osaka: 1.05, // Osaka - Deuxième pôle économique, coût de vie modéré
  fukuoka: 0.95, // Fukuoka - Hub émergent, coût de vie plus bas
}

// Modificateurs par type de contrat
export const CONTRACT_MODIFIERS = {
  direct: 1.0, // Position permanente (Seishain) - salaire de référence
  indirect: 0.88, // Contrat court via cabinet (Keiyaku) - moins d'avantages et stabilité
}

// SCORING MAPPING

// EXPERIENCE — /3
export const EXPERIENCE_SCORING = {
  junior: 0, // 0–2 ans
  intermediate: 1, // 3–5 ans
  senior: 2, // 6–9 ans
  expert: 3, // 10+ ans
}

// ROLE — /3
export const ROLE_SCORING = {
  frontend_dev: 2,
  backend_dev: 2,
  fullstack_dev: 2,
  data_engineer: 3,
  devops: 2,
  product_manager: 3,
  cto: 3,
  engineering_manager: 3,
  other: 1,
}

// MANAGEMENT — /2
export const MANAGEMENT_SCORING = {
  none: 0,
  support: 1,
  lead: 2,
  cto: 2,
}

// EDUCATION — /2
export const EDUCATION_SCORING = {
  bachelor: 1, // Bac+2/+3
  master: 2, // Bac+5 ou école d’ingénieur
}

// SECTOR — /1
export const SECTOR_SCORING = {
  deeptech: 1,
  fintech: 1,
  vc_funds: 1,
  healthtech: 0,
  martech: 0,
  luxury: 0,
  b2b_tools: 0,
  consulting: 0,
  entertainment: 0,
  proptech: 0,
  retail_btoc: 0,
  impact: 0,
  mobility_smartcity: 0,
  industry_supply: 0,
  agritech: 0,
  foodtech: 0,
  traveltech: 0,
  nonprofit: 0,
  other: 0,
}
