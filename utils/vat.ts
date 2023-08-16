import { Price, Product, ProductList } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

const applyVatForCurrency = (prices: Price[]): Price[] => {
  return prices.map(({ gross, currency }) => ({
    currency,
    gross: (parseFloat(gross) * calculateVatMultiplerRateForCurrency(currency)).toFixed(2),
  }))
}

const calculateVatMultiplerRateForCurrency = (currencyCode: string): number => {
  const channelStore = useChannelsStore()
  const channel = channelStore.channels.find((ch) => ch.default_currency.code === currencyCode)
  return channel ? 1 + Number(channel.vat_rate) / 100 : 1
}

export const applyVatForProductPrices = (
  product: Product | ProductList,
): Product | ProductList => ({
  ...product,
  prices_base: applyVatForCurrency(product.prices_base),
  prices_max: applyVatForCurrency(product.prices_max),
  prices_min: applyVatForCurrency(product.prices_min),
  prices_max_initial: applyVatForCurrency(product.prices_max_initial),
  prices_min_initial: applyVatForCurrency(product.prices_min_initial),
})
