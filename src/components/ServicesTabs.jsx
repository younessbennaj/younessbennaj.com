'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useEffect, useState } from 'react'

const tabs = [
  {
    title: 'Understanding Your Needs',
    description:
      'Adapting to your team’s workflows and delivering impactful solutions from day one. I integrate quickly into your team, ensuring minimal disruption and maximum impact on ongoing projects.',
  },
  {
    title: 'Seamless Integration',
    description:
      'Adapting to your team’s workflows and delivering impactful solutions from day one. I integrate quickly into your team, ensuring minimal disruption and maximum impact on ongoing projects.',
  },
  {
    title: 'Sharing Knowledge',
    description:
      'Fostering growth and promoting best practices within the team. I actively contribute to your team’s technical growth by sharing my expertise and fostering a culture of learning.',
  },
]

export function ServicesTabs() {
  return (
    <Tabs.Root
      activationMode="manual"
      orientation="vertical"
      className="grid grid-cols-2 text-left"
      defaultValue="tab1"
    >
      <Tabs.List className="flex flex-col gap-6 p-4">
        {tabs.map((tab, index) => (
          <Tabs.Trigger
            className="data-[state=active]:bg-zinc-100/50 data-[state=active]:dark:bg-zinc-800/50"
            key={index}
            value={`tab${index + 1}`}
          >
            <div className="rounded-xl border border-zinc-200 p-6 text-left dark:border-zinc-700/40">
              <h3 className="mb-1 text-lg font-semibold">{tab.title}</h3>
              <p className="text-sm">{tab.description}</p>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content className="p-4" value="tab1">
        <h4 className="mb-4 text-2xl font-semibold">How ?</h4>
        <p className="mb-4">
          I focus on understanding the specific challenges your product faces by
          conducting a thorough analysis of your team structure, workflows, and
          technical environment. Leveraging my experience with B2B SaaS
          platforms and complex marketplaces, I assess how to align with your
          goals and propose solutions that are both strategic and actionable.
          <br />
          <br />
          Through informal discussions, system design reviews, or practical
          assignments, I aim to establish a clear understanding of your
          expectations and priorities. These initial steps lay the groundwork
          for a successful collaboration built on trust and shared objectives.
          <br />
          <br />
          To provide further insight into my expertise and approach, feel free
          to explore my articles and projects, where I share lessons learned and
          strategies implemented in past experiences.
        </p>
      </Tabs.Content>
      <Tabs.Content className="p-4" value="tab2">
        <h4 className="mb-4 text-2xl font-semibold">How ?</h4>
        <p className="mb-4">
          From the moment I join your team, my priority is to adapt to your
          existing workflows and processes. By aligning with your tools,
          communication styles, and team structure, I can seamlessly fit into
          your environment. This allows me to focus on solving pressing
          challenges without delay.
          <br />
          <br />
          I bring a proactive mindset to tackling immediate pain points, whether
          it’s debugging critical issues, enhancing feature performance, or
          addressing technical debt. My approach is both collaborative and
          results-oriented, ensuring quick wins that set the stage for sustained
          success.
          <br />
          <br />
          By building strong relationships across design, product, and
          engineering teams, I ensure open communication and smooth
          collaboration. Together, we can create a productive, cohesive
          environment that drives meaningful progress.
        </p>
      </Tabs.Content>
      <Tabs.Content className="p-4" value="tab3">
        <h4 className="mb-4 text-2xl font-semibold">How ?</h4>
        <p className="mb-4">
          Beyond delivering technical solutions, I prioritize empowering the
          team to handle future challenges independently. I share best practices
          in front-end development, from React performance optimization to code
          quality guidelines, ensuring the team’s collective knowledge is
          enriched.
          <br />
          <br />
          This includes conducting code reviews, providing mentorship to junior
          developers, and creating accessible documentation to support
          continuous learning. My goal is to enable the team to adopt scalable
          practices that enhance productivity and maintain quality standards
          over time.
          <br />
          <br />
          Together, we’ll create an environment of growth and innovation, where
          team members feel supported and inspired to excel in their roles. This
          collaborative mindset not only strengthens the team but also drives
          the success of your product and organization.
        </p>
      </Tabs.Content>
    </Tabs.Root>
  )
}
