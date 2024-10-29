'use client'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'react-feather'

export function CustomAccordion({ questions }) {
  return (
    <Accordion.Root type="single" defaultValue="item-2" collapsible>
      {questions.map((q, index) => (
        <Accordion.Item
          className="border-b border-zinc-200 px-6 py-2 dark:rounded-lg dark:border-none dark:data-[state=open]:bg-zinc-800/50 dark:data-[state=open]:text-white"
          key={index}
          value={`item-${index}`}
        >
          <h3 className="flex">
            <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span>{q.question}</span>
              <ChevronDown size={16} />
            </Accordion.Trigger>
          </h3>
          <Accordion.Content className="pb-4 pt-0 text-xs">
            {q.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
