'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { DotPattern } from './DotPattern'
import { cn } from '@/lib/utils'
const tabs = [
  {
    title: 'Understanding Your Needs',
    description:
      'Crafting tailored solutions to align with your unique challenges.',
  },
  {
    title: 'Seamless Integration',
    description: 'Adapting to your team’s workflows, tools and rituals.',
  },
  {
    title: 'Sharing Knowledge',
    description:
      'Fostering growth and promoting best practices within the team. ',
  },
]

export function ServicesTabs() {
  return (
    <Tabs.Root
      activationMode="manual"
      orientation="vertical"
      className="grid h-auto text-left md:h-[540px] md:grid-cols-2"
      defaultValue="tab1"
    >
      <Tabs.List className="flex max-w-full flex-row gap-6 overflow-x-auto px-0 py-4 md:flex-col md:py-4">
        {tabs.map((tab, index) => (
          <Tabs.Trigger
            className="flex h-full w-64 grow rounded-xl border border-zinc-100 shadow-sm transition-all duration-100 hover:bg-zinc-100/30 data-[state=active]:bg-zinc-100/50 md:w-full dark:border-zinc-800/50 hover:dark:bg-zinc-800/20 data-[state=active]:dark:bg-zinc-800/50"
            key={index}
            value={`tab${index + 1}`}
          >
            <div className="hover:bg-sinc-100/50 w-64 grow rounded-xl p-6 text-left md:w-full dark:border-zinc-700/40">
              <h3 className="mb-1 text-base font-semibold md:text-lg">
                {tab.title}
              </h3>
              <p className="text-xs md:text-sm">{tab.description}</p>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="relative rounded-lg md:border-0">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          )}
        />
        <Tabs.Content className="p-4" value="tab1">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            I’ll analyze your team’s workflows, organizational goals, and
            product challenges to uncover how I can best contribute to your
            success. Together, we’ll identify the most impactful improvements
            for your systems, processes, and outcomes.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You need a clear and actionable strategy for tackling bottlenecks or
            streamlining development workflows. Ideal for teams looking to boost
            efficiency without compromising quality.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            A discovery workshop followed by a tailored action plan. I’ll spend
            one to two weeks integrating with your team to gain insights and
            propose high-value improvements.
          </p>
        </Tabs.Content>
        <Tabs.Content className="p-4" value="tab2">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            I’ll seamlessly join your team, quickly adapting to existing
            workflows and tackling immediate priorities to deliver fast results.
            My goal is to blend in efficiently while becoming an impactful
            contributor from day one.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            You need someone who can hit the ground running without lengthy
            onboarding, providing quick wins and long-term value simultaneously.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Onboarding consultation to get up to speed on your tools and
            processes, followed by immediate hands-on contributions. Weekly
            updates and retrospectives.
          </p>
        </Tabs.Content>
        <Tabs.Content className="p-4" value="tab3">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            I actively share best practices, simplify complex concepts, and
            foster collaboration. Whether it’s mentoring juniors or leading
            technical discussions, I focus on creating a culture of learning and
            improvement.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Your team is looking to grow collectively, adopt new methodologies,
            or improve their understanding of modern front-end development and
            performance optimization.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Team workshops, code reviews, and one-on-one mentorship sessions.
            Includes creating and maintaining team guidelines for best practices
            in React, performance, and front-end architecture.
          </p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
