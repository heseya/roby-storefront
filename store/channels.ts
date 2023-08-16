import { Price } from '@heseya/store-core/dist/src/interfaces/Price'
import { Channel } from 'interfaces/Channel'
import { defineStore } from 'pinia'

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [] as Channel[],
    selected: null as Channel | null,
  }),

  getters: {
    currency(state) {
      return state.selected?.default_currency.code || 'PLN'
    },
  },

  actions: {
    async fetchChannels(): Promise<void> {
      const heseya = useHeseya()

      // TODO: this is temporary mock
      const currencies = await heseya.Currencies.get()

      const channels: Channel[] = currencies.map((currency) => ({
        id: currency.code,
        name: currency.name,
        slug: currency.code,
        status: 'active',
        vat_rate: '23',
        countries_block_list: false,
        countries: [],
        default_currency: currency,
        default_language: {
          id: 'en',
          iso: 'EN',
          name: 'English',
          default: true,
          hidden: false,
        },
      }))

      this.channels = channels

      if (!this.selected) this.selected = channels[0]
    },
    calculateVatMultiplerRateForCurrency(currencyCode: string): number {
      const channel = this.channels.find((ch) => ch.default_currency.code === currencyCode)

      return channel ? 1 + Number(channel.vat_rate) / 100 : 1
    },
    applyVATForCurrency(prices: Price[]): Price[] {
      return prices.map(({ gross, currency }) => ({
        currency,
        gross: (parseFloat(gross) * this.calculateVatMultiplerRateForCurrency(currency)).toFixed(2),
      }))
    },
  },

  persist: true,
})
