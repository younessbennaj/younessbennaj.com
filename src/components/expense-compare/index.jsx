import React from 'react'
import { headers } from 'next/headers'
import { ExpenseCompareCSR } from './components/ExpenseCompareCSR'

export function ExpenseCompare({
  data,
  cityA,
  cityB,
  defaultCurrency = 'EUR',
  exchangeRate = 0.0058, // 1 JPY = 0.0058 EUR
}) {
  const userAgent = headers().get('user-agent') || ''
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(userAgent)
  const deviceType = isMobile ? 'sp' : 'pc'
  return (
    <ExpenseCompareCSR
      data={data}
      cityA={cityA}
      cityB={cityB}
      defaultCurrency={defaultCurrency}
      exchangeRate={exchangeRate}
      deviceType={deviceType}
    />
  )
}
