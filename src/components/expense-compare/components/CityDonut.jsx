import React from 'react'

import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts'
import { NumberTicker } from '../../NumberTicker'
import { convert, CURRENCY_META, formatMoney } from '../utils'

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
  currency,
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
        {/* {percent < 0.01 ? '< 1%' : `${(percent * 100).toFixed(0)}%`} */}
        {formatMoney(value, currency)}
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

export function CityDonut({ title, data, mode, exchangeRate }) {
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
      <h4 className="dark:text-zinc-100 mb-2 text-base font-semibold text-zinc-900">
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            {isVisible && (
              <Pie
                activeShape={(props) =>
                  renderActiveShape({ ...props, currency })
                }
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
              decimalPlaces={CURRENCY_META[mode].decimals}
              locale={CURRENCY_META[mode].locale} // fr-FR pour €, ja-JP pour ¥
              className="dark:text-zinc-100 text-zinc-900"
            />
            {mode === 'EUR' && <span>{CURRENCY_META[mode].symbol}</span>}
          </div>

          {/* <span className="tabular-nums">{formatMoney(total, currency)}</span> */}
        </div>
      </div>
    </div>
  )
}
