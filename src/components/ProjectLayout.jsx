import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import Image from 'next/image'
import pinsplash from '@/images/projects/pinsplash.webp'

export function ProjectLayout({ children }) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="grid grid-cols-2">
        <div>
          <div>
            <span>In progress</span>
            <div>
              {/* tags tech stack */}
              <span>React</span>
              <span>Typescript</span>
              <span>Chakra UI</span>
            </div>
          </div>
          <h1>Personal finance app</h1>
          <p>
            This app contains 5 pages (Overview, Transactions, Budgets, Pots,
            and Recurring Bills) and includes a lot of tricky elements. You can
            also build it as a full-stack app!
          </p>
        </div>
        <Image src={pinsplash} alt="" width={800} height={450} />
      </div>
      <h1>Project Layout</h1>
      <p>This is the project layout component.</p>
      <Prose className="mt-8" data-mdx-content>
        {children}
      </Prose>
    </Container>
  )
}
