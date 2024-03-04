import { restoreCart, type SavedCartItem } from '@heseya/store-core'

import { useCartStore } from '~/store/cart'
import { useCheckoutStore } from '~/store/checkout'
import { useUserStore } from '~/store/user'
import { useWishlistStore } from '~/store/wishlist'

type ChannelEventType = 'cart' | 'checkout' | 'wishlist' | 'user'

interface ChannelPush {
  type: ChannelEventType
  payload: string
}

export default defineNuxtPlugin(({ $pinia }) => {
  const stores = {
    cart: useCartStore($pinia as any),
    checkout: useCheckoutStore($pinia as any),
    wishlist: useWishlistStore($pinia as any),
    user: useUserStore($pinia as any),
  }

  const channel = useBroadcastChannel<ChannelPush, ChannelPush>({
    name: 'multitab-store-sync',
  })

  if (!channel.channel.value || !channel.isSupported.value) {
    // eslint-disable-next-line no-console
    console.warn('BroadcastChannel is not supported')
    return
  }

  watch(channel.data, (event) => {
    const store = stores[event.type]
    switch (event.type) {
      case 'cart': {
        if (event.payload === JSON.stringify(stores.cart.$state)) return

        const state: typeof stores.cart.$state = JSON.parse(event.payload)
        const items = restoreCart(state.items as unknown as SavedCartItem[])
        stores.cart.$state = { ...state, items }
        break
      }
      case 'checkout':
      case 'user':
      case 'wishlist': {
        if (event.payload === JSON.stringify(store.$state)) return
        const state: typeof store.$state = JSON.parse(event.payload)
        store.$state = state
        break
      }
      default:
        // eslint-disable-next-line no-console
        console.warn('Unknown event')
    }
  })

  const useStoreChannelPost = (event: ChannelEventType) => {
    watch(
      () => stores[event].$state,
      (state) => {
        channel.post({ type: event, payload: JSON.stringify(state) })
      },
      { deep: true },
    )
  }

  useStoreChannelPost('cart')
  useStoreChannelPost('checkout')
  useStoreChannelPost('wishlist')
  useStoreChannelPost('user')
})
