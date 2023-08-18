import { Price } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

export const usePriceGross = (prices: Price[], currencyCode: string): number => {
  const channelsStore = useChannelsStore()
  const channel = channelsStore.channels.find((ch) => ch.default_currency.code === currencyCode)

  const netPricesValue = parsePrices(prices, currencyCode)
  const vatMultiplerRate = channel ? 1 + parseFloat(channel.vat_rate || '0') / 100 : 1

  return netPricesValue * vatMultiplerRate
}
