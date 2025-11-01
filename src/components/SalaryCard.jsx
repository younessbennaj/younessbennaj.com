'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

/** Icônes ¥ / € */
function YenIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

function EuroIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

function Toggle({ checked, onChange, label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`group flex h-[40px] w-[60px] rounded-full p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-all duration-200 dark:bg-zinc-800/90 dark:ring-white/10 ${
          checked ? 'justify-end bg-zinc-600' : 'justify-start bg-zinc-100'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.span
          className="flex aspect-square h-full items-center justify-center rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          {!checked && (
            <YenIcon className="size-6 stroke-zinc-600 dark:stroke-white" />
          )}
          {checked && (
            <EuroIcon className="size-6 stroke-zinc-600 dark:stroke-white" />
          )}
        </motion.span>
      </button>
    </div>
  )
}

/** Format monétaire simple */
function formatCurrency(value, code = 'JPY', locale = 'fr-FR') {
  const decimals = code === 'JPY' ? 0 : 2
  const effectiveLocale = code === 'JPY' ? 'ja-JP' : locale

  // Add this missing return statement:
  return new Intl.NumberFormat(effectiveLocale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

const EXCHANGE_RATE = 0.0058
const ADJUSTMENT_FACTOR = 1.22
const LOCALE = 'fr-FR'

/** Détection nombre (gère "1 234 567" / "1,234,567") */
function isNumeric(val) {
  if (typeof val === 'number') return true
  if (typeof val === 'string') {
    const normalized = val.replace(/[ ,]/g, '')
    return !isNaN(Number(normalized))
  }
  return false
}

export function SalaryCard({ title, avg, low, high }) {
  const [equivalent, setEquivalent] = useState(false)

  const renderSalary = (val) => {
    if (!isNumeric(val)) return val
    const num = Number(String(val).replace(/[ ,]/g, ''))
    if (equivalent) {
      const eur = num * EXCHANGE_RATE
      const ppp = eur * ADJUSTMENT_FACTOR
      return formatCurrency(ppp, 'EUR', LOCALE)
    }
    return formatCurrency(num, 'JPY', LOCALE)
  }

  return (
    <div className="space-y-5 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <Toggle
          checked={equivalent}
          onChange={setEquivalent}
          label={
            equivalent
              ? 'Afficher les valeurs originales (JPY)'
              : 'Afficher l’équivalent Paris (€)'
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div className="text-base font-medium text-zinc-600">Salaire moyen</div>
        <div className="text-base font-semibold">{renderSalary(avg)}</div>

        <div className="text-base font-medium">Fourchette basse</div>
        <div className="text-base font-semibold">{renderSalary(low)}</div>

        <div className="text-base font-medium">Fourchette haute</div>
        <div className="text-base font-semibold">{renderSalary(high)}</div>
      </div>
    </div>
  )
}
