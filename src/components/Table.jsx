'use client'
import React from 'react'
import clsx from 'clsx'

/**
 * Generic, accessible, responsive table (uniform styling on all columns).
 *
 * Props:
 * - title?: string
 * - caption?: string
 * - columns: Array<{ key, label, align?, isNumeric?, emphasize?, render? }>
 * - rows: Array<Record<string, any>>
 * - dense?: boolean
 * - footerNote?: React.ReactNode
 * - className?: string
 */
export function Table({
  title,
  caption,
  columns = [],
  rows = [],
  dense = false,
  footerNote,
  className,
}) {
  return (
    <section className={clsx('w-full', className)}>
      {title && (
        <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="m-0 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
      )}

      <div className="relative w-full overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          {caption && (
            <caption className="mb-2 text-left text-xs text-zinc-500 dark:text-zinc-400">
              {caption}
            </caption>
          )}

          <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  scope="col"
                  className={clsx(
                    'px-4 py-3 text-xs font-medium uppercase tracking-wide',
                    (col.align ?? 'left') === 'right'
                      ? 'text-right'
                      : 'text-left',
                    col.isNumeric ? 'whitespace-nowrap' : '',
                  )}
                  // Min-content hint so the first header doesn't monopolize width
                  style={idx === 0 ? { width: '1%' } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/70"
              >
                {columns.map((col) => {
                  const raw = row[col.key]
                  const content = col.render ? col.render(raw, row) : raw
                  const alignRight =
                    (col.align ?? col.isNumeric) &&
                    (col.align ?? 'right') === 'right'

                  return (
                    <td
                      key={col.key}
                      className={clsx(
                        dense ? 'px-3 py-3' : 'px-4 py-4',
                        alignRight ? 'text-right' : 'text-left',
                        col.emphasize
                          ? 'font-medium text-zinc-800 dark:text-zinc-100'
                          : 'text-zinc-700 dark:text-zinc-300',
                        col.isNumeric
                          ? 'whitespace-nowrap tabular-nums'
                          : 'break-words',
                      )}
                    >
                      {content}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footerNote && (
        <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {footerNote}
        </p>
      )}
    </section>
  )
}
