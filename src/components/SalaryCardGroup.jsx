'use client'

import { SalaryCard } from './SalaryCard'

export function SalaryCardGroup({ items, titleKey }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items &&
        items.map((item, index) => (
          <SalaryCard
            key={index}
            title={item[titleKey]}
            avg={item.avg}
            low={item.low}
            high={item.high}
          />
        ))}
    </div>
  )
}
