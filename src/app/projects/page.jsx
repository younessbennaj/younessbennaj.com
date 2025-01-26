import pinsplash from '@/images/projects/pinsplash.webp'
import pinsplashMobile from '@/images/projects/pinsplash-mobile.webp'
import pinsplashSearch from '@/images/projects/pinsplash-search.webp'
import autocomplete from '@/images/projects/autocomplete.webp'
import toasts from '@/images/projects/toasts.webp'
import toastsMobile from '@/images/projects/toasts-mobile.webp'
import slideout from '@/images/projects/slideout.webp'
import finance from '@/images/projects/finance.webp'
import chat from '@/images/projects/chat.webp'
import country from '@/images/projects/country.webp'
import countryMobile from '@/images/projects/country-mobile.webp'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ProjectCard } from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export const projects = [
  {
    title: 'Pinsplash',
    description:
      'A responsive web client that allows users to browse, search, and interact with Unsplash images',
    status: 'in_progress',
    images: [
      {
        src: pinsplash,
        alt: 'Pinsplash',
      },
      { src: pinsplashSearch, alt: 'Pinsplash search' },
      {
        src: pinsplashMobile,
        alt: 'Pinsplash mobile',
      },
    ],
    slug: 'pinsplash',
    githubLink: 'https://github.com/younessbennaj/pinsplash',
    liveLink: 'https://pinsplash-chi.vercel.app/',
  },
  {
    title: 'Country Page',
    description:
      'A country page with a quite large set of data and complex filtering/sorting options',
    status: 'completed',
    images: [
      { alt: 'Country Page', src: country },
      {
        alt: 'Country Page mobile screen',
        src: countryMobile,
      },
    ],
    slug: 'country-page',
    githubLink: 'https://github.com/younessbennaj/country-page',
    liveLink: 'https://country-page-theta.vercel.app/',
  },
  {
    title: 'Headless Autocomplete component',
    description: 'A headless autocomplete component for React',
    status: 'completed',
    images: [{ alt: 'Headless Autocomplete component', src: autocomplete }],
    slug: 'headless-autocomplete',
    githubLink: 'https://github.com/younessbennaj/autocomplete',
    liveLink: 'https://autocomplete-bice.vercel.app/',
  },
  {
    title: 'ToastJam: My opinionated toast component',
    description: 'A toast component for React',
    status: 'completed',
    images: [
      { alt: 'ToastJam: My opinionated toast component', src: toasts },
      {
        alt: 'ToastJam: My opinionated toast component on mobile screen',
        src: toastsMobile,
      },
    ],
    slug: 'toastjam-toast-component',
    githubLink: 'https://github.com/younessbennaj/toast-notifications',
    liveLink: 'https://toast-notifications-ecru.vercel.app/',
  },
  {
    title: 'Accessible Slide-Out Drawer',
    description: 'An accessible slide-out drawer component for React',
    status: 'completed',
    images: [{ alt: 'Accessible Slide-Out Drawer', src: slideout }],
    slug: 'accessible-slideout-drawer',
    githubLink: 'https://github.com/younessbennaj/slide-out-menu',
    liveLink: 'https://slide-out-menu-kappa.vercel.app/',
  },
  {
    title: 'Personal finance app',
    description:
      'A personal finance app containing 5 pages (Overview, Transactions, Budgets, Pots, and Recurring Bills)',
    status: 'coming_soon',
    images: [{ alt: 'Personal finance app', src: finance }],
    slug: 'personal-finance-app',
  },
  {
    title: 'Chat AI',
    description:
      'A chat app allows users to input their queries and receive responses from the AI',
    status: 'coming_soon',
    images: [{ alt: 'Chat AI', src: chat }],
    slug: 'chat-ai',
  },
]

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            status={project.status}
            images={project.images}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </ul>
    </SimpleLayout>
  )
}
