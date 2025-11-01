export const parisTokyoLivingIndex = [
  { category: 'Logement', Paris: 100, Tokyo: 60 }, // Tokyo ~40% moins cher [oai_citation:22‡numbeo.com](https://www.numbeo.com/cost-of-living/compare_cities.jsp?country1=France&city1=Paris&country2=Japan&city2=Tokyo#:~:text=Japan%20www,lower%20than%20in%20Paris)
  { category: 'Transports', Paris: 100, Tokyo: 78 }, // Tokyo ~20-25% moins cher en commun [oai_citation:23‡expatistan.com](https://www.expatistan.com/cost-of-living/comparison/tokyo/paris#:~:text=%28%C2%A55%2C658%2C297%29%20%C2%A53%2C103%2C120%20%20%2B%C2%A082,%C2%A53%2C545%29%20%C2%A54%2C846)
  { category: 'Restaurants', Paris: 100, Tokyo: 52 }, // Tokyo ~48% moins cher (presque moitié prix) [oai_citation:24‡numbeo.com](https://www.numbeo.com/cost-of-living/compare_cities.jsp?country1=Japan&city1=Tokyo&country2=France&city2=Paris#:~:text=France%20www,higher)
  { category: 'Courses', Paris: 100, Tokyo: 85 }, // Tokyo ~15-20% moins cher sur l'alimentaire [oai_citation:25‡numbeo.com](https://www.numbeo.com/cost-of-living/compare_cities.jsp?country1=Japan&city1=Tokyo&country2=France&city2=Paris#:~:text=France%20www,higher)
  { category: 'Loisirs', Paris: 100, Tokyo: 75 }, // Tokyo ~25-30% moins cher divertissements [oai_citation:26‡expatistan.com](https://www.expatistan.com/cost-of-living/comparison/tokyo/paris#:~:text=Standard%20men%27s%20haircut%20in%20expat,the%20expat%20area%20including%20appetisers)
]

export const exampleExpenses = {
  Paris: [
    { label: 'Logement', valueEUR: 1_100 },
    { label: 'Transports', valueEUR: 80 },
    { label: 'Restaurants', valueEUR: 300 },
    { label: 'Courses', valueEUR: 250 },
    { label: 'Loisirs', valueEUR: 200 },
  ],
  Tokyo: [
    { label: 'Logement', valueEUR: 850 },
    { label: 'Transports', valueEUR: 60 },
    { label: 'Restaurants', valueEUR: 180 },
    { label: 'Courses', valueEUR: 210 },
    { label: 'Loisirs', valueEUR: 170 },
  ],
}

export const salariesByExperience = [
  {
    level: 'Junior (0–2 ans)',
    avg: 5_806_000,
    low: 4_500_000,
    high: 7_600_000,
  },
  {
    level: 'Intermédiaire (3–5 ans)',
    avg: 7_451_000,
    low: 5_500_000,
    high: 10_700_000,
  },
  {
    level: 'Senior (6–9 ans)',
    avg: 9_699_000,
    low: 7_400_000,
    high: 13_100_000,
  },
  {
    level: 'Expert (10+ ans)',
    avg: 11_646_000,
    low: 8_500_000,
    high: 16_000_000,
  },
]

export const salariesBySpecialization = [
  {
    spec: 'Développeur Front‑end',
    avg: 7_000_000,
    low: 5_500_000,
    high: 8_500_000,
  },
  {
    spec: 'Développeur Back‑end',
    avg: 7_500_000,
    low: 6_000_000,
    high: 9_500_000,
  },
  {
    spec: 'Développeur Full‑stack',
    avg: 7_300_000,
    low: 5_700_000,
    high: 9_000_000,
  },
  {
    spec: 'Développeur Mobile',
    avg: 7_200_000,
    low: 5_500_000,
    high: 8_700_000,
  },
  {
    spec: 'Data Engineer',
    avg: 9_000_000,
    low: 7_500_000,
    high: 11_500_000,
  },
  {
    spec: 'AI/ML Engineer',
    avg: 9_000_000,
    low: 7_500_000,
    high: 12_000_000,
  },
  {
    spec: 'Ingénieur DevOps / Cloud',
    avg: 8_500_000,
    low: 7_000_000,
    high: 11_000_000,
  },
]

export const salariesByCity = [
  { city: 'Tokyo', avg: 8_000_000, low: 6_500_000, high: 9_500_000 },
  { city: 'Osaka', avg: 6_700_000, low: 5_500_000, high: 8_000_000 },
  { city: 'Fukuoka', avg: 6_300_000, low: 5_300_000, high: 7_500_000 },
]

export const salariesByContractType = [
  {
    contract: 'CDI direct avec l’entreprise',
    avg: 7_500_000,
    low: 6_000_000,
    high: 9_500_000,
  },
  {
    contract: 'Placement via cabinet de recrutement',
    avg: 6_800_000,
    low: 5_500_000,
    high: 8_500_000,
  },
]
