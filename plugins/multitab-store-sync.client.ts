import { restoreCart, type SavedCartItem } from '@heseya/store-core'
import { useCartStore } from '~/store/cart'

export default defineNuxtPlugin(({ $pinia }) => {
  const cart = useCartStore($pinia as any)
  const channel = useBroadcastChannel({
    name: 'multitab-store-sync',
  })

  channel.channel.value!.onmessage = (event) => {
    switch (event.data.type) {
      case 'cart-items': {
        if (event.data.payload === JSON.stringify(cart.items)) return

        const items = JSON.parse(event.data.payload)
        cart.items = restoreCart(items as SavedCartItem[])
        break
      }
      default:
        // eslint-disable-next-line no-console
        console.warn('Unknown event')
    }
  }

  watch(
    () => cart.items,
    (items) => {
      channel.post({ type: 'cart-items', payload: JSON.stringify(items) })
    },
    { deep: true },
  )
})
