import { SalesChannel, SalesChannelStatus } from '@heseya/store-core'
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

    /**
     * Returs first allowed country code to limit quantity of shipping methods
     * TODO: this should be removed, API should have a ShippingMethod <-> SalesChannel relation
     */
    countryCode(state) {
      return state.selected?.countries_block_list ? 'CG' : state.selected?.countries[0]
    },
  },

  actions: {
    async fetchChannels(): Promise<void> {
      try {
        const heseya = useHeseya()

        const { data: channels } = await heseya.SalesChannels.get({ lang_fallback: 'any' })

        this.channels = channels
          .filter((c) => c.status === SalesChannelStatus.Active)
          .sort((a, b) => a.name.localeCompare(b.name))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[CHANNELS] Failed to fetch SalesChannels', e)
      }
    },

    setChannel(channelId?: string) {
      const channelCookie = useStatefulCookie(SALES_CHANNEL_KEY)

      const channel =
        this.channels.find((c) => c.id === channelId) ||
        this.channels.find((c) => c.slug === 'pl') ||
        this.channels[0]

      this.selected = channel
      channelCookie.value = channel.id
    },
  },

  persist: false,
})
