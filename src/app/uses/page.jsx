import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="13” MacBook Air, M3, 16GB of unified RAM (2024)">
            The perfect mix of portability and power. Whether I’m writing code,
            testing applications, or running design tools, this MacBook delivers
            unmatched performance without breaking a sweat.
          </Tool>
          <Tool title="Apple Magic Trackpad and Magic Keyboard">
            A seamless and ergonomic experience. The Magic Trackpad’s gestures
            keep my workflow smooth, while the keyboard offers a clean,
            responsive typing feel for long coding sessions.
          </Tool>
          <Tool title="Ergonomic Laptop Stand">
            Raising my MacBook to eye level makes a huge difference for posture
            and focus. Combined with the trackpad and keyboard, it’s the ideal
            ergonomic setup for a productive day.
          </Tool>
          <Tool title="AirPods Pro">
            Noise cancellation at its best. Whether it’s blocking out a bustling
            café or creating a distraction-free zone at home, AirPods Pro keep
            me in the zone with clear audio and no background noise.
          </Tool>
          <Tool title="A Quiet Coffee Shop with Good Vibes">
            Sometimes, a cozy café with just the right level of background noise
            and a great cup of coffee or an iced tea is the perfect productivity
            hack. A change of scenery can do wonders for creativity and focus.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            My go-to code editor for front-end development. With extensions like
            Prettier, ESLint, and TailwindCSS IntelliSense, it streamlines my
            workflow and ensures clean, consistent code.
          </Tool>
          <Tool title="Vite">
            A lightning-fast build tool I use for modern front-end projects. It
            makes development faster with near-instant hot module replacement.
          </Tool>
          <Tool title="GitHub and GitHub Actions">
            I rely on GitHub for version control and collaborative coding.
            GitHub Actions helps me set up CI/CD pipelines to automate builds,
            tests, and deployments efficiently.
          </Tool>
          <Tool title="Postman">
            An essential tool for testing and integrating APIs into my projects.
            It simplifies debugging and ensures smooth front-end/back-end
            communication.
          </Tool>
          <Tool title="Supabase">
            My preferred back-end-as-a-service for projects that need user
            authentication, databases, and real-time features. It&apos;s fast,
            flexible, and integrates well with React.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            Through my previous experiences, I’ve learned to use Figma from a
            developer’s perspective. While I don’t create designs myself, I’m
            comfortable navigating the tool to inspect designs, extract assets,
            and collaborate closely with designers to implement pixel-perfect
            user interfaces.
          </Tool>
        </ToolsSection>
        {/* <ToolsSection title="Employer of Record (EOR) Tools">
          <Tool title="Remote.com">
            As a freelancer working with international clients, I use Remote.com
            to manage contracts, payments, and compliance seamlessly. It
            simplifies cross-border employment and ensures a smooth experience
            for both me and my clients, allowing me to focus on delivering
            high-quality work.
          </Tool>
          <Tool title="Flexible Solutions">
            I’m also open to using other EOR tools or adopting custom processes
            tailored to a company’s workflow, ensuring smooth collaboration that
            fits your needs.
          </Tool>
        </ToolsSection> */}
      </div>
    </SimpleLayout>
  )
}
