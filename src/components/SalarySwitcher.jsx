'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { SegmentedSalaryToggle } from './SegmentedSalaryToggle'
import { NumberTicker } from './NumberTicker'

/* --------------------------------- Utils --------------------------------- */

const currencyMeta = {
  JPY: { symbol: '¥', decimals: 0, label: 'yens' },
  EUR: { symbol: '€', decimals: 2, label: 'euros' },
  USD: { symbol: '$', decimals: 2, label: 'dollars' },
}

function getCurrencyMeta(code) {
  const upper = (code || '').toUpperCase()
  return (
    currencyMeta[upper] || {
      symbol: upper || '¤',
      decimals: 0,
      label: upper || 'currency',
    }
  )
}

/* ----------------------------- SalarySwitcher ---------------------------- */
/**
 * Props attendues :
 * - from / to: { value: number, currency: string, symbol?: string, label?: string }
 * - initial?: 'from' | 'to'
 * - title?: string
 * - locale?: string (par défaut 'fr-FR')
 * - onChange?: (mode) => void
 * - className?: string
 */
export function SalarySwitcher({
  from,
  to,
  initial = 'from',
  onChange,
  className,
}) {
  const [mode, setMode] = React.useState(initial)

  const active = mode === 'from' ? from : to
  const inactive = mode === 'from' ? to : from

  const activeMetaBase = getCurrencyMeta(active.currency)
  const inactiveMetaBase = getCurrencyMeta(inactive.currency)

  const activeMeta = {
    ...activeMetaBase,
    symbol: active.symbol ?? activeMetaBase.symbol,
    label: active.label ?? activeMetaBase.label,
    locale: active.locale ?? activeMetaBase.locale, // important pour la logique prefix/suffix
  }
  const inactiveMeta = {
    ...inactiveMetaBase,
    symbol: inactive.symbol ?? inactiveMetaBase.symbol,
    label: inactive.label ?? inactiveMetaBase.label,
    locale: inactive.locale ?? inactiveMetaBase.locale,
  }

  // mémoriser la valeur précédente pour lancer l’anim au bon point
  const previousValue = React.useRef(active.value)
  React.useEffect(() => {
    previousValue.current = active.value
  }, [active.value])

  const handleChange = (val) => {
    if (!val) return
    setMode(val)
    onChange?.(val)
  }

  // Symbole en préfixe si locale japonaise (yen), sinon suffixe
  const isPrefix = activeMeta.locale === 'ja-JP' || active.currency === 'JPY'

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4',
        className,
      )}
    >
      {/* Montant + devise (symbole en prefix pour ¥, suffix pour €) */}
      <div className="flex items-end justify-center">
        <motion.span
          key={`symbol-${active.currency}-prefix`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isPrefix ? 1 : 0, y: isPrefix ? 0 : -6 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!isPrefix}
          className={cn(
            'select-none text-5xl font-normal leading-none text-zinc-500 dark:text-zinc-400',
            isPrefix ? 'order-1 pr-2' : 'hidden',
          )}
        >
          {activeMeta.symbol}
        </motion.span>

        <div
          className={cn(
            'text-5xl font-semibold leading-none sm:text-6xl',
            isPrefix ? 'order-2' : 'order-1',
          )}
        >
          <NumberTicker
            value={active.value}
            startValue={previousValue.current}
            decimalPlaces={getCurrencyMeta(active.currency).decimals}
            locale={activeMeta.locale} // fr-FR pour €, ja-JP pour ¥
            className="text-zinc-900 dark:text-zinc-100"
          />
        </div>

        <motion.span
          key={`symbol-${active.currency}-suffix`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: !isPrefix ? 1 : 0, y: !isPrefix ? 0 : -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={isPrefix}
          className={cn(
            'select-none text-5xl font-normal leading-none text-zinc-500 dark:text-zinc-400',
            !isPrefix ? 'order-2 pl-2' : 'hidden',
          )}
        >
          {activeMeta.symbol}
        </motion.span>
      </div>

      <SegmentedSalaryToggle
        from={{
          label: from.label || getCurrencyMeta(from.currency).label,
          value: 'from',
        }}
        to={{
          label: to.label || getCurrencyMeta(to.currency).label,
          value: 'to',
        }}
        value={mode} // Changed from 'mode={mode}' to 'value={mode}'
        onChange={handleChange}
      />
    </div>
  )
}

/* --------------------------------- Exemple --------------------------------
<SalarySwitcher
  title="Exemple : 6,000,000 JPY ↔ équivalent Paris"
  from={{ value: 6_000_000, currency: 'JPY', label: 'yens' }}
  to={{ value: 34_400, currency: 'EUR', label: 'euros' }}
  initial="from"
  locale="fr-FR"
/>
---------------------------------------------------------------------------- */
