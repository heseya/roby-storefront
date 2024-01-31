import { parsePrices } from '@heseya/store-core'
import type { Price } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

export const usePriceGross = () => {
  const channelsStore = useChannelsStore()

  const calculateGrossPrice = (prices: Price[], currencyCode: string) => {
    const netPricesValue = parsePrices(prices, currencyCode, 'net')
    const vatMultiplerRate = channelsStore.selected
      ? 1 + parseFloat(channelsStore.selected.vat_rate || '23') / 100
      : 1

    return netPricesValue * vatMultiplerRate
  }

  return calculateGrossPrice
}
