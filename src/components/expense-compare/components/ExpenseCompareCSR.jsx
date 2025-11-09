'use client'

import React from 'react'

import { SegmentedSalaryToggle } from '../../SegmentedSalaryToggle'
import { CityDonut } from './CityDonut'
import { StraightAngleCityDonut } from './StraightAngleCityDonut'

const LEGEND_COLORS = [
  'oklch(82% 0.12 25)',
  'oklch(80% 0.11 205)',
  'oklch(80% 0.12 145)',
  'oklch(80% 0.12 55)',
  'oklch(80% 0.12 300)',
  'oklch(80% 0.12 0)',
]

export function ExpenseCompareCSR({
  data,
  cityA,
  cityB,
  defaultCurrency = 'EUR',
  exchangeRate = 0.0058, // 1 JPY = 0.0058 EUR
  deviceType,
}) {
  const [mode, setMode] = React.useState(defaultCurrency)

  const isSmallDevice = deviceType === 'sp'

  const legendItems = React.useMemo(() => {
    const seen = new Set()
    const items = []
    ;[cityA, cityB].forEach((city) => {
      ;(data[city] || []).forEach((d) => {
        if (!seen.has(d.label)) {
          seen.add(d.label)
          items.push(d.label)
        }
      })
    })
    return items.map((label, idx) => ({
      label,
      color: LEGEND_COLORS[idx % LEGEND_COLORS.length],
    }))
  }, [data, cityA, cityB])

  return (
    <section className="w-full">
      {/* Handle response here by hide or not each type of pie chart */}
      {!isSmallDevice && (
        <div className="flex gap-5">
          <CityDonut
            title={cityA}
            data={data[cityA]}
            mode={mode}
            exchangeRate={exchangeRate}
            className="flex-1"
          />

          <div className="dark:bg-zinc-700 w-px bg-zinc-300" />

          <CityDonut
            title={cityB}
            data={data[cityB]}
            mode={mode}
            exchangeRate={exchangeRate}
            className="flex-1"
          />
        </div>
      )}

      {/* Mobile Layout - Semicircle Charts */}
      {isSmallDevice && (
        <div className="flex gap-0.5">
          <StraightAngleCityDonut
            title={cityA}
            data={data[cityA]}
            mode={mode}
            exchangeRate={exchangeRate}
            className="flex-1"
            clockwise={false}
          />

          <div className="dark:bg-zinc-700 w-px bg-zinc-300" />

          <StraightAngleCityDonut
            title={cityB}
            data={data[cityB]}
            mode={mode}
            exchangeRate={exchangeRate}
            className="flex-1"
            clockwise
          />
        </div>
      )}
      {/* Légende commune */}
      <div className="mb-10 mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {legendItems.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: it.color }}
              aria-hidden="true"
            />
            <span className="dark:text-zinc-300 text-sm text-zinc-600">
              {it.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <SegmentedSalaryToggle
          from={{ label: 'Euros', value: 'EUR' }}
          to={{ label: 'Yens', value: 'JPY' }}
          value={mode} // Direct value: 'EUR' or 'JPY'
          onChange={setMode} // Direct setter
        />
      </div>
    </section>
  )
}
