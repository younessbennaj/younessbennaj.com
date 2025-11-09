import React from 'react'

import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'
import { NumberTicker } from '../../NumberTicker'
import { convert, CURRENCY_META } from '../utils'

// Pass the type straight or not here to handle responsive
export function StraightAngleCityDonut({
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
      <h4 className="dark:text-zinc-100 mb-2 text-center text-base font-semibold text-zinc-900">
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
                // activeShape={renderActiveShape}
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
              decimalPlaces={CURRENCY_META[mode].decimals}
              locale={CURRENCY_META[mode].locale} // fr-FR pour €, ja-JP pour ¥
              className="dark:text-zinc-100 text-zinc-900"
            />
            {mode === 'EUR' && <span>{CURRENCY_META[mode].symbol}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
