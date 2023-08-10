const formattersMap = new Map<string, Intl.NumberFormat>()

export const formatAmount = (amount: number, currency: string) => {
  const formatter =
    formattersMap.get(currency) ||
    new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    })

  formattersMap.set(currency, formatter)

  return formatter.format(amount ?? 0)
}
