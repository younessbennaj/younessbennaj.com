import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {
  Code,
  CheckCircle,
  Smartphone,
  Zap,
  Cloud,
  Link as LinkIcon,
  Briefcase,
  Book,
  Settings,
} from 'react-feather'
import Balancer from 'react-wrap-balancer'

import { Button } from '@/components/Button'
import { OrbitingCirclesDemo } from '@/components/OrbitingCirclesDemo'
import { BentoGrid, BentoCard } from '@/components/BentoGrid'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { ServicesTabs } from '@/components/ServicesTabs'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { CustomAccordion } from '@/components/CustomAccordion'
import { Showcase } from '@/components/Showcase'

import { Globe } from '@/components/Globe'
import logoLeeto from '@/images/logos/leeto.svg'
import epitechLogo from '@/images/logos/epitech.svg'
import logoYuso from '@/images/logos/yuso.svg'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { getAllArticles } from '@/lib/articles'
import { getAllUseCases } from '@/lib/useCases'
import { formatDate } from '@/lib/formatDate'
import fernandoLeetoImage from '@/images/testimonials/fernando-leeto.jpeg'
import maximeLeetoImage from '@/images/testimonials/maxime-leeto.jpeg'
import kevinLeetoImage from '@/images/testimonials/kevin-leeto.jpeg'
import thomasLeetoImage from '@/images/testimonials/thomas-leeto.jpeg'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Role({ role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start?.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start?.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end?.label
  let endDate = typeof role.end === 'string' ? role.end : role.end?.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        {startLabel ? (
          <>
            <dt className="sr-only">Date</dt>
            <dd
              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
              aria-label={`${startLabel} until ${endLabel}`}
            >
              <time dateTime={startDate}>{startLabel}</time>{' '}
              <span aria-hidden="true">—</span>{' '}
              <time dateTime={endDate}>{endLabel}</time>
            </dd>
          </>
        ) : null}
      </dl>
    </li>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Leeto',
      title: 'Front-End Engineer',
      logo: logoLeeto,
      start: 'January 2021',
      end: 'August 2024',
    },
    {
      company: 'Yuso Fleet',
      title: 'Front-End Engineer',
      logo: logoYuso,
      start: 'October 2016',
      end: 'September 2018',
    },
  ]

  let skills = [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'TanStack Query',
    'Vite',
    'Storybook',
    'Jest',
    'React Testing Library',
    'Cypress',
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Briefcase className="h-6 w-6 flex-none text-zinc-500" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mb-6 mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Book className="h-6 w-6 flex-none text-zinc-500" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mb-6 mt-6 space-y-4">
        <Role
          role={{
            company: 'Epitech',
            title: 'Master Degree, Computer Science',
            logo: epitechLogo,
          }}
        />
      </ol>
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Settings className="h-6 w-6 flex-none text-zinc-500" />
        <span className="ml-3">Skills</span>
      </h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="focus:ring-ring text-primary-foreground hover:bg-primary/80 dark:bg-primary inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {skill}
          </div>
        ))}
      </div>

      <Button
        href="/resume.pdf"
        locale={false}
        target="_blank"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
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
        ))}
      </div>
    </div>
  )
}

const useCases = [
  {
    image: 'https://placehold.co/400x300.png',
    title:
      'Unlocking the Power of Cloud Computing: A Guide to Scalable Solutions',
    tags: ['Cloud', 'AWS', 'Infrastructure'],
  },
  {
    image: 'https://placehold.co/400x300.png',
    title:
      'The Future of AI: How Machine Learning is Revolutionizing Industries',
    tags: ['AI', 'Machine Learning', 'Python'],
  },
  {
    image: 'https://placehold.co/400x300.png',
    title:
      'The Impact of 5G on Business: How Faster Networks are Transforming the Way We Work',
    tags: ['5G', 'Networks', 'Telecommunications'],
  },
]

const questions = [
  {
    question: 'What experience do you have with remote work?',
    answer:
      'I have over three years of experience working in fully remote teams, both in France and internationally. I’m highly adaptable to asynchronous workflows and proficient with a wide range of remote communication tools. My approach ensures seamless collaboration across time zones, keeping projects on track no matter where I am.',
  },
  {
    question: 'What makes you different from other front-end developers?',
    answer:
      'I’m recognized for my proactive mindset, creative problem-solving, and focus on delivering efficient, effective solutions. My colleagues highlight my ability to deeply understand challenges and propose pragmatic, high-impact results. I approach each project with enthusiasm and a strong attention to detail, ensuring both technical excellence and alignment with user and business goals.',
  },
  {
    question: 'What type of projects do you enjoy working on the most?',
    answer:
      'I’m open to all types of projects, regardless of their scope. I enjoy working on everything from building reusable components for a design system to developing features with complex business logic. In my previous experiences, I’ve delivered high-impact features and smaller components with the same level of precision and attention to detail. My goal is always to align with the project’s objectives, whether it’s enhancing user experience, improving performance, or driving business outcomes.',
  },
  // {
  //   question:
  //     'How do you manage contracts and administrative processes for international clients?',
  //   answer:
  //     'I use tools like Remote.com to simplify contract management, payments, and compliance for international collaborations. These platforms ensure a smooth and legally compliant process for both parties. However, I’m also flexible and open to working with any custom processes or tools already in place within your company to make the collaboration as seamless as possible.',
  // },
  {
    question: 'How can we get started on a project?',
    answer:
      'Getting started is simple! You can reach out to me via LinkedIn or email with an overview of your project or needs. From there, we can schedule a quick call to discuss the scope, timeline, and goals. I’ll provide a tailored proposal and workflow to kick off our collaboration smoothly.',
  },
  // {
  //   question:
  //     'How do you manage project timelines and client communication in different time zones?',
  //   answer:
  //     'I structure my day around a stable routine and keep clients updated on progress through regular check-ins, adapting my schedule as needed to sync with their time zones. Whether through asynchronous communication or scheduled meetings, I ensure that all parties are aligned, regardless of location.',
  // },
  {
    question:
      'How do you ensure your work aligns with the latest industry trends?',
    answer:
      'Staying current is a priority. I actively follow the latest advancements in React, TypeScript, and the broader tech ecosystem. I enjoy experimenting with new tools, techniques, and best practices through small projects in my portfolio, ensuring I stay sharp and up-to-date.',
  },
  {
    question: 'Can you work with legacy codebases?',
    answer:
      'Yes, I’m comfortable working with legacy codebases and improving existing structures. I focus on understanding the original architecture to ensure that any updates I make are scalable and maintainable, and I always prioritize code quality and performance.',
  },
  // {
  //   question: 'How do you handle project feedback and revisions?',
  //   answer:
  //     'I see feedback as a valuable part of the development process. I encourage open communication and make sure to implement revisions that enhance the project’s quality. My goal is always to align the final product with the client’s vision, incorporating feedback efficiently while keeping the project timeline intact.',
  // },
  // {
  //   question: 'Are you available for long-term projects?',
  //   answer:
  //     'Yes, I’m open to both short-term and long-term projects. For longer engagements, I establish a structured workflow with milestones and regular progress updates to ensure the project remains on track and meets the client’s evolving needs.',
  // },
]

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Proficiency in HTML, CSS, and JavaScript',
    description:
      'A solid foundation in front-end essentials that powers responsive and interactive designs.',
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Expertise in React and TypeScript',
    description:
      'Advanced use of React and TypeScript for building scalable, dynamic web applications.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'CI/CD Process Implementation',
    description:
      'Experience in setting up CI/CD pipelines to streamline deployments and improve code quality.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Responsive and Mobile-First Design',
    description:
      'Creating layouts that adapt seamlessly across devices to enhance user experience.',
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: 'Web Performance Optimization',
    description:
      'Optimizing load times and responsiveness through efficient coding and asset management.',
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: 'API Integration',
    description:
      'Skilled in integrating third-party APIs to extend functionality and improve interactivity.',
  },
]

const testimonials = [
  {
    name: 'Thomas',
    position: 'Product Lead',
    company: 'Leeto',
    avatar: thomasLeetoImage,
    testimonial:
      'Youness consistently proved to be a key contributor to the success of numerous projects, thanks to his deep understanding of challenges, unwavering motivation, and boundless energy.',
  },
  {
    name: 'Kévin',
    position: 'Lead Front-End Developer',
    company: 'Leeto',
    avatar: kevinLeetoImage,
    testimonial:
      'His in-depth expertise in the React ecosystem is an invaluable asset, and his contagious enthusiasm motivates the team.',
  },
  {
    name: 'Fernando',
    position: 'Back-End Developer',
    company: 'Leeto',
    avatar: fernandoLeetoImage,
    testimonial:
      'Youness consistently delivers high-quality work with a proactive and positive attitude, making him an invaluable asset to any team.',
  },
  {
    name: 'Maxime',
    position: 'Product Designer',
    company: 'Leeto',
    avatar: maximeLeetoImage,
    testimonial:
      'He has a brilliant mind that allows him to understand and solve complex problems effectively, always prioritizing the best user experience.',
  },
]

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)
  let useCases = await getAllUseCases()

  console.log(useCases)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Front-end developer, inspired by cultural discovery and the world’s
            diversity.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Youness, a Front-End Developer specialized in React with{' '}
            <b>over 5 years of experience</b>. Passionate about the
            ever-evolving front-end landscape, where new technologies,
            frameworks, and trends constantly emerge, pushing you to
            continuously learn, adapt, and challenge yourself.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/younessbennaj"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
              target="_blank"
            />
            <SocialLink
              href="https://www.linkedin.com/in/youness-bennaj/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
            />
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      {/* <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Services
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>How can I be impactful to your team?</Balancer>
        </h3>
        <ServicesTabs />
      </Container> */}
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Cases
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>How do I solve business problems?</Balancer>
        </h3>
        <BentoGrid>
          {useCases.map((useCase) => {
            return (
              <BentoCard
                key={useCase.slug}
                className={
                  useCase.priority === 'high'
                    ? 'col-span-2 md:col-span-4'
                    : 'col-span-2 md:col-span-2'
                }
                description={useCase.description}
                name={useCase.title}
                cta="Learn more"
                href={`/cases/${useCase.slug}`}
              ></BentoCard>
            )
          })}
        </BentoGrid>
      </Container>
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          My skills
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>The technologies and tools I master</Balancer>
        </h3>
        <OrbitingCirclesDemo />
      </Container>
      {/* <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Experience and Skills
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>
            My professional journey and the technologies I master
          </Balancer>
        </h3>
        <Resume />
      </Container> */}
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Showcase
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>My latest projects</Balancer>
        </h3>
        <Showcase />
      </Container>
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          My Front-End Expertise
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>
            Core competencies for delivering great user experiences
          </Balancer>
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card flex flex-col items-center overflow-hidden rounded-lg p-6 text-center"
            >
              <div className="rounded-lg bg-gradient-to-b from-zinc-200 to-zinc-100 p-2 text-white text-zinc-800 dark:from-zinc-700 dark:to-zinc-600 dark:text-white">
                {feature.icon}
              </div>

              <h2 className="mb-4 mt-4 text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Testimonials
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>What my collaborators say</Balancer>
        </h3>
        <div className="columns-1 gap-4 space-y-4 py-10 sm:columns-2 lg:columns-2 xl:columns-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-fit flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80"
            >
              <div className="flex-grow px-4 py-5 sm:p-6">
                <div className="mb-4 flex items-center">
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt=""
                  />
                  <div className="ml-3">
                    <h3 className="text-foreground text-lg font-medium">
                      {testimonial.name}
                    </h3>
                    <p className="text-muted-foreground te text-xs text-zinc-600 dark:text-zinc-400">
                      {testimonial.position} @{testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="space-y-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {testimonial.testimonial}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            href="https://www.linkedin.com/in/youness-bennaj/details/recommendations/"
            target="_blank"
          >
            Read more on LinkedIn
          </Button>
        </div>
      </Container>

      {/* <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Remote Work, Global Vision
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>Working seamlessly from vibrant cities worldwide</Balancer>
        </h3>
        <div className="mb-12 mt-6 space-y-7 text-center text-lg text-zinc-600 dark:text-zinc-400">
          <p>
            Embracing a full remote, location-independent lifestyle allows me to
            fuel both my <b>creativity</b> and <b>productivity</b> as a
            front-end developer. By working from vibrant cities like Tokyo,
            Bangkok, and Kuala Lumpur, I stay connected with dynamic, fast-paced
            environments that inspire my work.
          </p>
        </div>
        <div className="relative">
          <Globe />
        </div>
      </Container> */}
      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          Blog
        </h2>
        <h3 className="mb-12 mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Balancer>My latest articles and guides</Balancer>
        </h3>
        <div className="mb-[64px] flex flex-col gap-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <div className="text-center">
          <Button href="/articles">View more</Button>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <h2 className="text-center text-sm font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
          FAQ
        </h2>
        <h3 className="mb-[64px] mt-2 text-center text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Frequently Asked Questions
        </h3>
        <CustomAccordion questions={questions} />
      </Container>
      <Container className="mt-24 text-center md:mt-28">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Let’s Build Something Great Together
        </h2>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          Ready to bring your ideas to life? Whether it&apos;s a small feature
          or a big project, I’m here to help.
        </p>
        <Button
          href="mailto:your.email@example.com"
          className="mt-6"
          target="_blank"
        >
          Contact Me
        </Button>
      </Container>
    </>
  )
}
