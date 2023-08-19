import { SalesChannel } from '@heseya/store-core'
import { defineStore } from 'pinia'

import { SALES_CHANNEL_KEY } from '@/consts/cookiesKeys'

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [] as SalesChannel[],
    selected: null as SalesChannel | null,
  }),

  getters: {
    currency(state) {
      return state.selected?.default_currency.code || 'PLN'
    },
  },

  actions: {
    async fetchChannels(): Promise<void> {
      try {
        const heseya = useHeseya()

        const { data: channels } = await heseya.SalesChannels.get()

        this.channels = channels
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[CHANNELS] Failed to fetch SalesChannels', e)
      }
    },

    setChannel(channelId?: string) {
      const channelCookie = useStatefulCookie(SALES_CHANNEL_KEY)

      const channel = this.channels.find((c) => c.id === channelId) || this.channels[0]

      this.selected = channel
      channelCookie.value = channel.id
    },

    isCountryCodeAllowedInChannel(countryCode: string) {
      if (!this.selected) return true
      const isIncludedInList = this.selected.countries.includes(countryCode)
      return this.selected.countries_block_list ? !isIncludedInList : isIncludedInList
    },
  },

  persist: false,
})
