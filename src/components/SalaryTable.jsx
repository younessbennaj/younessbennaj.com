'use client'

import React, { useId, useMemo, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Table } from '@/components/Table'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

function AnimatedCellValue({ value, className }) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={String(value)}
        layout
        style={{ display: 'inline-block' }}
        initial={
          reduce ? false : { opacity: 0, y: 20 } // <-- plus bas pour un vrai mouvement “bottom → top”
        }
        animate={{ opacity: 1, y: 0 }}
        // exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}

/** Format monétaire simple */
function formatCurrency(value, code = 'JPY', locale = 'fr-FR') {
  const decimals = code === 'JPY' ? 0 : 2
  // Si c'est du yen, force locale japonaise pour avoir "¥"
  const effectiveLocale = code === 'JPY' ? 'ja-JP' : locale

  return new Intl.NumberFormat(effectiveLocale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Détection nombre (gère "1 234 567" / "1,234,567") */
function isNumeric(val) {
  if (typeof val === 'number') return true
  if (typeof val === 'string') {
    const normalized = val.replace(/[ ,]/g, '')
    return !isNaN(Number(normalized))
  }
  return false
}

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

/** Toggle avec animation motion et icônes ¥/€ */
function Toggle({ checked, onChange, label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`group flex h-[40px] w-[60px] rounded-full bg-zinc-100 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-all duration-200 dark:bg-zinc-800/90 dark:ring-white/10 ${
          checked ? 'justify-end' : 'justify-start'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.span
          className="flex aspect-square h-full items-center justify-center rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          {!checked && (
            <YenIcon className="h-5 w-5 stroke-zinc-600 dark:stroke-white" />
          )}
          {checked && (
            <EuroIcon className="h-5 w-5 stroke-zinc-600 dark:stroke-white" />
          )}
        </motion.span>
      </button>
    </div>
  )
}

export function SalaryTable({
  title,
  columns = [],
  rows = [],
  adjustmentFactor = 0.82, // facteur coût de la vie vers Paris
  exchangeRate = 0.0058, // 1 JPY = 0.0058 EUR (exemple)
  locale = 'fr-FR',
  initialEquivalent = false, // false = JPY, true = EUR (équivalent Paris)
  // Afficher la note même en mode JPY
}) {
  const [equivalent, setEquivalent] = useState(Boolean(initialEquivalent))
  useId() // (réservé si tu veux rattacher un id ARIA plus tard)

  // Met à jour dynamiquement les intitulés (supprime/échange JPY/EUR dans les labels)
  const computedColumns = useMemo(() => {
    return columns.map((c, idx) => {
      const isFirst = idx === 0
      const base = { ...c }
      // Alignements & styles par défaut
      base.align = isFirst ? 'left' : 'right'
      // mettre en avant la colonne "moyen/avg"
      base.emphasize = !isFirst && /avg|moyen|average/i.test(c.key)
      return base
    })
  }, [columns])

  // Rendu cellule (appliqué via Table.render)
  const renderCell = (val) => {
    if (!isNumeric(val)) return val
    const num = Number(String(val).replace(/[ ,]/g, ''))
    if (equivalent) {
      const eur = num * exchangeRate
      const ppp = eur * adjustmentFactor
      return formatCurrency(ppp, 'EUR', locale)
    }
    return formatCurrency(num, 'JPY', locale)
  }

  return (
    <div className="hidden w-full md:block">
      {/* En-tête + toggle */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {title ? (
          <div className="m-0 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </div>
        ) : (
          <span />
        )}

        <div>
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
      </div>

      {/* Tableau générique */}
      <Table
        className="overflow-hidden rounded-md shadow-lg ring-1 ring-zinc-900/5"
        columns={computedColumns.map((c) => ({
          ...c,
          render: (raw) => {
            const formatted = renderCell(raw) // ta fonction existante qui formate (JPY/EUR)
            const numeric = isNumeric(raw)

            return (
              <AnimatedCellValue
                value={formatted}
                className={numeric ? 'font-medium tabular-nums' : undefined}
              />
            )
          },
        }))}
        rows={rows}
        // footerNote={footerNote}
      />
    </div>
  )
}
