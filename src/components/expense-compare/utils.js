export const CURRENCY_META = {
  EUR: { symbol: '€', locale: 'fr-FR', decimals: 0 },
  JPY: { symbol: '¥', locale: 'ja-JP', decimals: 0 },
}

export function formatMoney(value, currency = 'EUR') {
  const meta = CURRENCY_META[currency] || CURRENCY_META.EUR
  return new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  }).format(value)
}

export function convert(valueEUR, mode, rateEURtoJPY) {
  if (mode === 'JPY') return valueEUR / rateEURtoJPY
  return valueEUR
}
