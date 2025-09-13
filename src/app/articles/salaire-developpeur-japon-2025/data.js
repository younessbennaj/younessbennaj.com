export const parisTokyoLivingIndex = [
  { category: 'Logement', Paris: 100, Tokyo: 70 },
  { category: 'Transports', Paris: 100, Tokyo: 75 },
  { category: 'Restaurants', Paris: 100, Tokyo: 65 },
  { category: 'Courses', Paris: 100, Tokyo: 85 },
  { category: 'Loisirs', Paris: 100, Tokyo: 75 },
]

export const exampleExpenses = {
  Paris: [
    { label: 'Logement', valueEUR: 950 },
    { label: 'Transports', valueEUR: 70 },
    { label: 'Restaurants', valueEUR: 200 },
    { label: 'Courses', valueEUR: 230 },
    { label: 'Loisirs', valueEUR: 140 },
  ],
  Tokyo: [
    { label: 'Logement', valueEUR: 680 },
    { label: 'Transports', valueEUR: 55 },
    { label: 'Restaurants', valueEUR: 150 },
    { label: 'Courses', valueEUR: 190 },
    { label: 'Loisirs', valueEUR: 110 },
  ],
}

export const salariesByExperience = [
  {
    level: 'Junior (0–2 ans)',
    avg: 4_000_000,
    low: 3_000_000,
    high: 5_000_000,
  },
  {
    level: 'Intermédiaire (3–5 ans)',
    avg: 6_000_000,
    low: 4_500_000,
    high: 7_500_000,
  },
  {
    level: 'Senior (6–9 ans)',
    avg: 8_000_000,
    low: 6_000_000,
    high: 10_000_000,
  },
  {
    level: 'Expert (10+ ans)',
    avg: 10_000_000,
    low: 8_000_000,
    high: 13_000_000,
  },
]

export const salariesBySpecialization = [
  {
    spec: 'Front‑end Developer',
    avg: 6_500_000,
    low: 5_000_000,
    high: 8_000_000,
  },
  {
    spec: 'Back‑end Developer',
    avg: 7_000_000,
    low: 5_500_000,
    high: 9_000_000,
  },
  {
    spec: 'Full‑stack Developer',
    avg: 6_800_000,
    low: 5_200_000,
    high: 8_500_000,
  },
  {
    spec: 'Mobile Developer',
    avg: 6_700_000,
    low: 5_000_000,
    high: 8_200_000,
  },
  {
    spec: 'Data Engineer / Scientist',
    avg: 8_500_000,
    low: 7_000_000,
    high: 11_000_000,
  },
  {
    spec: 'DevOps / Cloud Engineer',
    avg: 8_000_000,
    low: 6_500_000,
    high: 10_500_000,
  },
]

export const salariesByCity = [
  { city: 'Tokyo', avg: 7_000_000, low: 5_500_000, high: 9_000_000 },
  { city: 'Osaka', avg: 6_200_000, low: 5_000_000, high: 7_500_000 },
  { city: 'Fukuoka', avg: 5_800_000, low: 4_800_000, high: 7_000_000 },
]
