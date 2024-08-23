import type { Pinia } from 'pinia'

import { useCartStore } from '@/store/cart'
import { useAuthStore } from '~/store/auth'
import { useWishlistStore } from '~/store/wishlist'
import { useChannelsStore } from '~/store/channels'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia

  const cart = useCartStore(pinia)
  const authStore = useAuthStore(pinia)
  const channelsStore = useChannelsStore(pinia)
  const organization = useOrganization()
  const wishlistStore = useWishlistStore(pinia)

  watch(
    () => authStore.isLogged,
    async () => {
      cart.processCart()

      if (authStore.isLogged) {
        await wishlistStore.syncLocal()
        await wishlistStore.fetch()
      }

      window.addEventListener('online', () => cart.processCart())
    },
    { immediate: true },
  )

  watch(
    () => organization.value,
    () => {
      channelsStore.initSalesChannels()
      // TODO: Full reload of the page may be needed to fully fetch all data in the context of the new channel
      // if (channelChanged) window.location.reload()
    },
  )
})
