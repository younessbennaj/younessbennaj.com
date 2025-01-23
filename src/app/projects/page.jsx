import pinsplash from '@/images/projects/pinsplash.webp'
import autocomplete from '@/images/projects/autocomplete.webp'
import toasts from '@/images/projects/toasts.webp'
import slideout from '@/images/projects/slideout.webp'
import finance from '@/images/projects/finance.webp'
import chat from '@/images/projects/chat.webp'
import country from '@/images/projects/country.webp'
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
    image: pinsplash,
    slug: 'pinsplash',
    githubLink: 'https://github.com/younessbennaj/pinsplash',
  },
  {
    title: 'Country Page',
    description:
      'A country page with a quite large set of data and complex filtering/sorting options',
    status: 'completed',
    image: country,
    slug: 'country-page',
    githubLink: 'https://github.com/younessbennaj/country-page',
  },
  {
    title: 'Headless Autocomplete component',
    description: 'A headless autocomplete component for React',
    status: 'completed',
    image: autocomplete,
    slug: 'headless-autocomplete',
    githubLink: 'https://github.com/younessbennaj/autocomplete',
  },
  {
    title: 'ToastJam: My opinionated toast component',
    description: 'A toast component for React',
    status: 'completed',
    image: toasts,
    slug: 'toastjam-toast-component',
    githubLink: 'https://github.com/younessbennaj/toast-notifications',
  },
  {
    title: 'Accessible Slide-Out Drawer',
    description: 'An accessible slide-out drawer component for React',
    status: 'completed',
    image: slideout,
    slug: 'accessible-slideout-drawer',
    githubLink: 'https://github.com/younessbennaj/slide-out-menu',
  },
  {
    title: 'Personal finance app',
    description:
      'A personal finance app containing 5 pages (Overview, Transactions, Budgets, Pots, and Recurring Bills)',
    status: 'coming_soon',
    image: finance,
    slug: 'personal-finance-app',
  },
  {
    title: 'Chat AI',
    description:
      'A chat app allows users to input their queries and receive responses from the AI',
    status: 'coming_soon',
    image: chat,
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
            image={project.image}
            // href={`/projects/${project.slug}`}
            href={project.githubLink}
          />
        ))}
      </ul>
    </SimpleLayout>
  )
}
