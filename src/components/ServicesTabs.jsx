'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useEffect, useState } from 'react'

const tabs = [
  {
    title: 'Understanding Your Needs',
    description:
      'Adapting to your team’s workflows and delivering impactful solutions from day one.',
  },
  {
    title: 'Seamless Integration',
    description:
      'Adapting to your team’s workflows and delivering impactful solutions from day one.',
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
      className="grid text-left md:grid-cols-2"
      defaultValue="tab1"
    >
      <Tabs.List className="flex max-w-full gap-6 overflow-x-auto px-0 py-4 md:flex-col md:py-4">
        {tabs.map((tab, index) => (
          <Tabs.Trigger
            className="h-full w-64 data-[state=active]:bg-zinc-100/50 md:h-auto md:w-full data-[state=active]:dark:bg-zinc-800/50"
            key={index}
            value={`tab${index + 1}`}
          >
            <div className="h-full w-64 rounded-xl border border-zinc-200 p-6 text-left md:h-auto md:w-full dark:border-zinc-700/40">
              <h3 className="mb-1 text-base font-semibold md:text-lg">
                {tab.title}
              </h3>
              <p className="text-xs md:text-sm">{tab.description}</p>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="rounded-lg border border-zinc-200 md:border-0">
        <Tabs.Content className="p-4" value="tab1">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4">
            I’ll analyze your team’s workflows, organizational goals, and
            product challenges to uncover how I can best contribute to your
            success. Together, we’ll identify the most impactful improvements
            for your systems, processes, and outcomes.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4">
            You need a clear and actionable strategy for tackling bottlenecks or
            streamlining development workflows. Ideal for teams looking to boost
            efficiency without compromising quality.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4">
            A discovery workshop followed by a tailored action plan. I’ll spend
            one to two weeks integrating with your team to gain insights and
            propose high-value improvements.
          </p>
        </Tabs.Content>
        <Tabs.Content className="p-4" value="tab2">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4">
            I’ll seamlessly join your team, quickly adapting to existing
            workflows and tackling immediate priorities to deliver fast results.
            My goal is to blend in efficiently while becoming an impactful
            contributor from day one.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4">
            You need someone who can hit the ground running without lengthy
            onboarding, providing quick wins and long-term value simultaneously.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4">
            Onboarding consultation to get up to speed on your tools and
            processes, followed by immediate hands-on contributions. Weekly
            updates and retrospectives to ensure alignment and continuous
            progress.
          </p>
        </Tabs.Content>
        <Tabs.Content className="p-4" value="tab3">
          <h4 className="mb-4 text-2xl font-semibold">What:</h4>
          <p className="mb-4">
            I actively share best practices, simplify complex concepts, and
            foster collaboration. Whether it’s mentoring juniors or leading
            technical discussions, I focus on creating a culture of learning and
            improvement.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Great When:</h4>
          <p className="mb-4">
            Your team is looking to grow collectively, adopt new methodologies,
            or improve their understanding of modern front-end development and
            performance optimization.
          </p>
          <h4 className="mb-4 text-2xl font-semibold">Format:</h4>
          <p className="mb-4">
            Team workshops, code reviews, and one-on-one mentorship sessions.
            Includes creating and maintaining team guidelines for best practices
            in React, performance, and front-end architecture.
          </p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
