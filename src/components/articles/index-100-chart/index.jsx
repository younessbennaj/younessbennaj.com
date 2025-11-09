'use client'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function inferKeys(data) {
  if (!Array.isArray(data) || data.length === 0)
    return { leftKey: null, rightKey: null }
  const sample = data[0] || {}
  const candidates = Object.keys(sample).filter((k) => k !== 'category')
  return { leftKey: candidates[0] || null, rightKey: candidates[1] || null }
}

const CustomTooltip = ({
  active,
  payload,
  label,
  leftKey,
  rightKey,
  baseLabel,
}) => {
  if (!active || !payload || payload.length === 0) return null

  const row = payload[0]?.payload || {}
  const leftVal = Number(row?.[leftKey] ?? 0)
  const rightVal = Number(row?.[rightKey] ?? 0)

  if (!leftKey || !rightKey) return null

  const diffPct = leftVal === 0 ? 0 : ((leftVal - rightVal) / leftVal) * 100 // >0 => right less expensive
  const dir =
    diffPct > 0 ? 'moins cher' : diffPct < 0 ? 'plus cher' : 'au même niveau'
  const absPct = Math.abs(diffPct)
  const nf0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

  return (
    <div className="dark:border-zinc-700 dark:bg-zinc-900/95 rounded-lg border border-zinc-200 bg-white/95 px-3 py-2 text-sm shadow-xl backdrop-blur">
      <div className="dark:text-zinc-400 mb-1 text-xs font-medium text-zinc-500">
        {label}
      </div>
      <div className="mb-1 space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="dark:text-zinc-300 text-zinc-600">{leftKey}</span>
          </span>
          <span className="dark:text-zinc-100 tabular-nums text-zinc-900">
            {nf0.format(leftVal)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
            <span className="dark:text-zinc-300 text-zinc-600">{rightKey}</span>
          </span>
          <span className="dark:text-zinc-100 tabular-nums text-zinc-900">
            {nf0.format(rightVal)}
          </span>
        </div>
      </div>
      <div className="dark:text-zinc-300 mt-1 text-xs text-zinc-600">
        {rightKey} est ~{nf0.format(absPct)}% {dir} que {leftKey} sur la
        catégorie {label}.
      </div>
      <div className="dark:text-zinc-400 mt-1 text-[10px] leading-4 text-zinc-500">
        Indice 100 ({baseLabel} = 100) — plus bas = moins cher.
      </div>
    </div>
  )
}

export function Index100Chart({
  data = [],
  leftKey: leftKeyProp,
  rightKey: rightKeyProp,
  baseLabel = 'Paris',
  leftBarColor = 'oklch(80.8% 0.114 19.571)', // Default orange/red color
  rightBarColor = 'oklch(80.9% 0.105 251.813)', // Default blue color
  deviceType,
}) {
  const height = deviceType === 'sp' ? 300 : 500
  // Infer keys if not provided
  const inferred = inferKeys(data)
  const leftKey = leftKeyProp || inferred.leftKey
  const rightKey = rightKeyProp || inferred.rightKey

  const hasKeys = Boolean(leftKey && rightKey && data?.length)

  if (!hasKeys) {
    return (
      <div className="dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 w-full rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
        Aucune série valide à afficher. Assurez‑vous que vos objets `data`
        contiennent un champ `category` et au moins deux clés numériques (ex.:
        &quot;Paris&quot;, &quot;Tokyo&quot;), ou bien passez `leftKey` et
        `rightKey`.
      </div>
    )
  }

  const title = `Coût de la vie comparé : ${rightKey} vs ${leftKey}`

  const guidance = `Ce graphique utilise un indice 100 avec ${baseLabel} comme référence.`
  const summary =
    typeof avg === 'number'
      ? `Ainsi, si une catégorie affiche ${rightKey} = 70, cela signifie que ${rightKey} est environ 30% moins cher que ${baseLabel} sur cette catégorie. En moyenne, ${rightKey} est ~${Math.abs(avg)}% ${avg > 0 ? 'moins cher' : avg < 0 ? 'plus cher' : 'au même niveau'} que ${baseLabel}.`
      : `Concrètement, ${baseLabel} = 100 pour chaque catégorie. Une valeur inférieure à 100 indique que ${rightKey} est moins cher que ${baseLabel}, une valeur supérieure indique l’inverse.`

  return (
    <div className="w-full">
      <div className="dark:border-zinc-700 dark:bg-zinc-900 w-full rounded-lg border border-zinc-200 bg-white p-2 md:p-3">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            barSize={deviceType === 'sp' ? 14 : 28}
            barGap={deviceType === 'sp' ? 6 : 12}
            barCategoryGap={24}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--grid, #e5e7eb)"
            />
            <XAxis
              dataKey="category"
              padding={0}
              tick={{
                angle: deviceType === 'sp' ? -50 : 0,
                textAnchor: deviceType === 'sp' ? 'end' : 'middle',
                dy: deviceType === 'sp' ? 4 : 0,
                fontSize: deviceType === 'sp' ? 9 : 16,
              }}
              tickCount={5}
              height={deviceType === 'sp' ? 70 : 40}
            />
            <YAxis
              width={deviceType === 'sp' ? 20 : 40}
              tickSize={deviceType === 'sp' ? 3 : 5}
              tick={{
                fontSize: deviceType === 'sp' ? 12 : 16,
              }}
            />
            {deviceType !== 'sp' && (
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                content={
                  <CustomTooltip
                    leftKey={leftKey}
                    rightKey={rightKey}
                    baseLabel={baseLabel}
                  />
                }
              />
            )}

            {/* <Legend /> */}
            <Bar dataKey={leftKey} name={leftKey} fill={leftBarColor} />
            <Bar dataKey={rightKey} name={rightKey} fill={rightBarColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="dark:text-zinc-400 mt-2 text-xs text-zinc-500">
        Lecture rapide : si {rightKey} = 60 sur « Logement », cela signifie que
        c&#39;est ≈40% moins cher que {baseLabel}.
      </p>
    </div>
  )
}
