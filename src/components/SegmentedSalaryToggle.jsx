import * as React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function SegmentedSalaryToggle({
  from = { label: 'Euros', value: 'EUR' },
  to = { label: 'Yens', value: 'JPY' },
  value,
  onChange,
}) {
  const [mode, setMode] = React.useState(value ?? from.value)

  const handleChange = (v) => {
    if (!v) return
    setMode(v)
    onChange?.(v)
  }

  return (
    <div className="inline-flex">
      <ToggleGroup.Root
        type="single"
        value={mode}
        onValueChange={handleChange}
        className="relative isolate flex rounded-full bg-zinc-900/5 p-1 dark:bg-zinc-50/10"
        aria-label="Basculer l'affichage du salaire"
      >
        <motion.div
          layout
          className="absolute inset-y-1 my-auto h-[calc(100%-0.5rem)] rounded-full bg-white shadow-sm dark:bg-zinc-100"
          style={{
            width: 'calc(50% - 4px)',
            left: mode === from.value ? 4 : 'calc(50% + 0px)',
          }}
          transition={{
            type: 'spring',
            bounce: 0.2,
            visualDuration: 0.2,
          }}
        />

        <ToggleGroup.Item
          value={from.value}
          className={clsx(
            'relative z-10 cursor-pointer select-none rounded-full px-4 py-2 text-sm transition',
            mode === from.value
              ? 'text-zinc-900 dark:text-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
          )}
          style={{ width: '50%', textAlign: 'center' }}
        >
          {from.label}
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value={to.value}
          className={clsx(
            'relative z-10 cursor-pointer select-none rounded-full px-4 py-2 text-sm transition',
            mode === to.value
              ? 'text-zinc-900 dark:text-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
          )}
          style={{ width: '50%', textAlign: 'center' }}
        >
          {to.label}
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
