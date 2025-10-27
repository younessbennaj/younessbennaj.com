'use client'

import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts'
import { SegmentedSalaryToggle } from './SegmentedSalaryToggle'
import { NumberTicker } from './NumberTicker'
import { useResponsive } from '@/hooks/useResponsive'

const CURRENCY_META = {
  EUR: { symbol: '€', locale: 'fr-FR', decimals: 0 },
  JPY: { symbol: '¥', locale: 'ja-JP', decimals: 0 },
}

function formatMoney(value, currency = 'EUR') {
  const meta = CURRENCY_META[currency] || CURRENCY_META.EUR
  return new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  }).format(value)
}

function convert(valueEUR, mode, rateEURtoJPY) {
  if (mode === 'JPY') return valueEUR / rateEURtoJPY
  return valueEUR
}

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * (midAngle ?? 1))
  const cos = Math.cos(-RADIAN * (midAngle ?? 1))
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy - 12} dy={8} textAnchor="middle" fill={fill}>
        {payload.label}
      </text>
      <text x={cx} y={cy + 12} dy={8} textAnchor="middle" fill={fill}>
        {percent < 0.01 ? '< 1%' : `${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
    </g>
  )
}

// Pass the type straight or not here to handle responsive
function StraightAngleCityDonut({
  title,
  data,
  mode,
  exchangeRate,
  clockwise = true,
}) {
  const currency = mode
  const chartRef = React.useRef(null)

  // Calculate angles based on direction
  const startAngle = clockwise ? 90 : 90
  const endAngle = clockwise ? -90 : 270
  const cx = clockwise ? '0%' : '100%'

  const total = React.useMemo(() => {
    return data.reduce(
      (sum, d) => sum + convert(d.valueEUR, mode, exchangeRate),
      0,
    )
  }, [data, mode, exchangeRate])

  const displayData = React.useMemo(
    () =>
      data.map((d) => ({
        label: d.label,
        value: Math.round(convert(d.valueEUR, mode, exchangeRate)),
      })),
    [data, mode, exchangeRate],
  )

  const COLORS = [
    'oklch(82% 0.12 25)',
    'oklch(80% 0.11 205)',
    'oklch(80% 0.12 145)',
    'oklch(80% 0.12 55)',
    'oklch(80% 0.12 300)',
    'oklch(80% 0.12 0)',
  ]

  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the chart is visible
        rootMargin: '0px 0px -10% 0px', // Start slightly before fully visible
      },
    )

    const chartNode = chartRef.current
    if (chartNode) {
      observer.observe(chartNode)
    }

    return () => {
      if (chartNode) {
        observer.unobserve(chartNode)
      }
    }
  }, [isVisible])

  return (
    <div className="w-full bg-white p-4" ref={chartRef}>
      <h4 className="mb-2 text-center text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            {/* <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              content={<CustomTooltip />}
            /> */}
            {isVisible && (
              <Pie
                activeShape={renderActiveShape}
                data={displayData}
                dataKey="value"
                nameKey="label"
                cx={cx}
                cy="50%%"
                // for responsive
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                animationDuration={800}
                animationEasing="ease-out"
                animationBegin={0}
                onAnimationEnd={() => {
                  // Handle animation end
                }}
              >
                {displayData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col items-center justify-center">
          <span>Total</span>
          <div className="flex items-center justify-center gap-1">
            {mode === 'JPY' && <span>{CURRENCY_META[mode].symbol}</span>}
            <NumberTicker
              value={total}
              startValue={0}
              decimalPlaces={CURRENCY_META[mode].decimals}
              locale={CURRENCY_META[mode].locale} // fr-FR pour €, ja-JP pour ¥
              className="text-zinc-900 dark:text-zinc-100"
            />
            {mode === 'EUR' && <span>{CURRENCY_META[mode].symbol}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

function CityDonut({ title, data, mode, exchangeRate }) {
  const currency = mode
  const chartRef = React.useRef(null)

  const total = React.useMemo(() => {
    return data.reduce(
      (sum, d) => sum + convert(d.valueEUR, mode, exchangeRate),
      0,
    )
  }, [data, mode, exchangeRate])

  const displayData = React.useMemo(
    () =>
      data.map((d) => ({
        label: d.label,
        value: Math.round(convert(d.valueEUR, mode, exchangeRate)),
      })),
    [data, mode, exchangeRate],
  )

  const COLORS = [
    'oklch(82% 0.12 25)',
    'oklch(80% 0.11 205)',
    'oklch(80% 0.12 145)',
    'oklch(80% 0.12 55)',
    'oklch(80% 0.12 300)',
    'oklch(80% 0.12 0)',
  ]

  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the chart is visible
        rootMargin: '0px 0px -10% 0px', // Start slightly before fully visible
      },
    )

    const chartNode = chartRef.current
    if (chartNode) {
      observer.observe(chartNode)
    }

    return () => {
      if (chartNode) {
        observer.unobserve(chartNode)
      }
    }
  }, [isVisible])

  return (
    <div className="w-full bg-white p-4" ref={chartRef}>
      <h4 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            {isVisible && (
              <Pie
                activeShape={renderActiveShape}
                data={displayData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                animationDuration={800}
                animationEasing="ease-out"
                animationBegin={0}
              >
                {displayData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col items-center justify-center">
          <span>Total</span>
          <div className="flex items-center justify-center gap-1">
            {mode === 'JPY' && <span>{CURRENCY_META[mode].symbol}</span>}
            <NumberTicker
              value={total}
              startValue={0}
              decimalPlaces={CURRENCY_META[mode].decimals}
              locale={CURRENCY_META[mode].locale} // fr-FR pour €, ja-JP pour ¥
              className="text-zinc-900 dark:text-zinc-100"
            />
            {mode === 'EUR' && <span>{CURRENCY_META[mode].symbol}</span>}
          </div>

          {/* <span className="tabular-nums">{formatMoney(total, currency)}</span> */}
        </div>
      </div>
    </div>
  )
}

const LEGEND_COLORS = [
  'oklch(82% 0.12 25)',
  'oklch(80% 0.11 205)',
  'oklch(80% 0.12 145)',
  'oklch(80% 0.12 55)',
  'oklch(80% 0.12 300)',
  'oklch(80% 0.12 0)',
]

export function ExpenseCompare({
  data,
  cityA,
  cityB,
  defaultCurrency = 'EUR',
  exchangeRate = 0.0058, // 1 JPY = 0.0058 EUR
}) {
  const [mode, setMode] = React.useState(defaultCurrency)

  const { isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice } =
    useResponsive()

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

          <div className="w-px bg-zinc-300 dark:bg-zinc-700" />

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

          <div className="w-px bg-zinc-300 dark:bg-zinc-700" />

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
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
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
