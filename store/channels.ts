import { SalesChannelActivity, SalesChannelStatus } from '@heseya/store-core'
import type { SalesChannelListed } from '@heseya/store-core'
import { defineStore } from 'pinia'

import { SALES_CHANNEL_KEY } from '@/consts/cookiesKeys'

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [] as SalesChannelListed[],
    selected: null as SalesChannelListed | null,
  }),

  getters: {
    currency(state) {
      // TODO: sales channel should return a currency
      return state.selected?.price_map?.currency || 'PLN'
    },
  },

  actions: {
    async fetchChannels(): Promise<void> {
      try {
        const heseya = useHeseya()

        const { data: channels } = await heseya.SalesChannels.get({
          lang_fallback: 'any',
          limit: 500,
        })

        this.channels = channels
          .filter(
            (c) =>
              c.status === SalesChannelStatus.Public && c.activity === SalesChannelActivity.Active,
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[CHANNELS] Failed to fetch SalesChannels', e)
      }
    },

    initSalesChannels() {
      // TODO: selected channel should probably be included in URL, not in the cookie
      const channelCookie = useCookie(SALES_CHANNEL_KEY)
      const organization = useOrganization()

      if (organization.value?.sales_channel) {
        this.channels.push(organization.value.sales_channel)
        this.setChannel(organization.value.sales_channel.id)
        return channelCookie.value !== organization.value.sales_channel.id
      } else {
        this.setChannel(undefined)
        return true
      }
    },

    setChannel(channelId?: string) {
      const channelCookie = useStatefulCookie(SALES_CHANNEL_KEY)
      const channelNameCookie = useStatefulCookie('channel_name')

      const channel =
        this.channels.find((c) => c.id === channelId) ||
        this.channels.find((c) => c.slug === 'pl') ||
        this.channels[0]

      this.selected = channel
      channelCookie.value = channel.id
      channelNameCookie.value = channel.name
    },
  },

  persist: false,
})
