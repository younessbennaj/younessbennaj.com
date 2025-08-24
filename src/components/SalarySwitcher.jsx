'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useInView, useMotionValue, useSpring, motion } from 'motion/react'
import clsx from 'clsx'

export function SegmentedSalaryToggle({
  from = { label: 'Yens' },
  to = { label: 'Paris equiv.' },
  value,
  onChange,
}) {
  const [mode, setMode] = React.useState(value ?? 'from')

  const handleChange = (v) => {
    if (!v) return // Radix peut envoyer '' (deselection) => on ignore
    setMode(v)
    onChange?.(v)
  }

  return (
    <div className="inline-flex">
      {/* Container = même contexte de layout pour le glider */}
      <ToggleGroup.Root
        type="single"
        value={mode}
        onValueChange={handleChange}
        className="relative isolate flex rounded-full bg-zinc-900/5 p-1 dark:bg-zinc-50/10"
        aria-label="Basculer l’affichage du salaire"
      >
        {/* Glider : un seul élément, positionné par layout entre les 2 items */}
        <motion.div
          layout
          className={clsx(
            'absolute inset-y-1 my-auto h-[calc(100%-0.5rem)] rounded-full bg-white shadow-sm dark:bg-zinc-100',
          )}
          style={{
            // largeur de la pill = ~50% - padding (2px), on laisse un peu d’air
            width: 'calc(50% - 4px)',
            // on “colle” à gauche ou à droite en fonction du mode
            left: mode === 'from' ? 4 : 'calc(50% + 0px)',
          }}
          transition={{
            type: 'spring',
            bounce: 0.2,
            visualDuration: 0.2,
          }}
        />

        {/* Item FROM */}
        <ToggleGroup.Item
          value="from"
          className={clsx(
            'relative z-10 cursor-pointer select-none rounded-full px-4 py-2 text-sm transition',
            mode === 'from'
              ? 'text-zinc-900 dark:text-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
          )}
          aria-label={`Afficher ${from.label}`}
          style={{ width: '50%', textAlign: 'center' }}
        >
          {from.label}
        </ToggleGroup.Item>

        {/* Item TO */}
        <ToggleGroup.Item
          value="to"
          className={clsx(
            'relative z-10 cursor-pointer select-none rounded-full px-4 py-2 text-sm transition',
            mode === 'to'
              ? 'text-zinc-900 dark:text-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
          )}
          aria-label={`Afficher ${to.label}`}
          style={{ width: '50%', textAlign: 'center' }}
        >
          {to.label}
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}

/* ------------------------------ NumberTicker ------------------------------ */
/** Compteur animé façon “pompe à essence” */
export function NumberTicker({
  value, // nouvelle cible numérique
  className,
  decimalPlaces = 0,
  delay = 0, // en secondes
  locale = 'fr-FR',
  ...props
}) {
  const ref = React.useRef(null)

  // On mémorise la dernière valeur effectivement rendue
  const prevValueRef = React.useRef(typeof value === 'number' ? value : 0)

  // Motion value part de la dernière valeur rendue
  const motionValue = useMotionValue(prevValueRef.current)

  // Spring plus “tenu” pour limiter l’overshoot
  const springValue = useSpring(motionValue, {
    damping: 26, // + haut = moins d’oscillation
    stiffness: 180, // + bas = moins “raide”
    mass: 1,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  // À chaque changement de `value`, on anime de prev → value
  React.useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      // point de départ = dernière valeur affichée
      motionValue.set(prevValueRef.current)
      // destination = nouvelle valeur
      motionValue.set(value)
      // on met à jour notre référence pour la prochaine anim
      prevValueRef.current = value
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [value, isInView, delay, motionValue])

  // On rend la valeur animée, clampée à >= 0 pour éviter les flashes négatifs
  React.useEffect(() => {
    const unsub = springValue.on('change', (latest) => {
      if (ref.current) {
        const safe = Math.max(latest, 0)
        ref.current.textContent = Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(safe.toFixed(decimalPlaces)))
      }
    })
    return () => unsub()
  }, [springValue, decimalPlaces, locale])

  return (
    <span
      ref={ref}
      className={cn('inline-block tabular-nums tracking-wider', className)}
      {...props}
    >
      {Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(prevValueRef.current)}
    </span>
  )
}

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

      {/* Segmented control Radix (ton composant) */}
      <SegmentedSalaryToggle
        from={from}
        to={to}
        mode={mode}
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
