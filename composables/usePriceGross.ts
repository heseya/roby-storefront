import { Price } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

export const usePriceGross = () => {
  const channelsStore = useChannelsStore()

  const calculateGrossPrice = (prices: Price[], currencyCode: string) => {
    const channel = channelsStore.channels.find((ch) => ch.default_currency.code === currencyCode)

    const netPricesValue = parsePrices(prices, currencyCode)
    const vatMultiplerRate = channel ? 1 + parseFloat(channel.vat_rate || '23') / 100 : 1

    return netPricesValue * vatMultiplerRate
  }

  return calculateGrossPrice
}
