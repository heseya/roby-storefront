import { useChannelsStore } from '@/store/channels'

export const calculateVatMultiplerRateForCurrency = (currencyCode: string): number => {
  const channelStore = useChannelsStore()
  const channel = channelStore.channels.find((ch) => ch.default_currency.code === currencyCode)
  return channel ? 1 + parseFloat(channel.vat_rate) / 100 : 1
}
