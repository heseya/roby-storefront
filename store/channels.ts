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
  },

  persist: true,
})
