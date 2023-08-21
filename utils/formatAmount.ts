const formattersMap = new Map<string, Intl.NumberFormat>()

export const formatAmount = (amount: number | string, currency: string) => {
  const formatter =
    formattersMap.get(currency) ||
    new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    })

  formattersMap.set(currency, formatter)

  const value = typeof amount === 'string' ? parseFloat(amount) : amount

  return formatter.format(value ?? 0)
}
