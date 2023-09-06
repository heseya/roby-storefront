import { HeseyaEvent } from '@heseya/store-core'
import VueGtag, { trackRouter, isTracking, useGtag } from 'vue-gtag-next'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { mapCartItemToItem, mapProductToItem } from '~/utils/google'
import { useConfigStore } from '@/store/config'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleTagManagerId,
    },
    useDebugger: !isProduction,
  })

  trackRouter(useRouter())

  /**
   * * EVENTS
   */

  const { event: gTagEvent } = useGtag()
  const config = useConfigStore(nuxtApp.$pinia as Pinia)
  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_item', {
      ecommerce: { items: [mapProductToItem(product)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_item_list', {
      ecommerce: {
        item_list_name: set?.name,
        items: items.map(mapProductToItem),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('add_to_cart', {
      ecommerce: {
        currency: config.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.RemoveFromCart, (item) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('remove_from_cart', {
      ecommerce: {
        currency: config.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.AddShippingInfo, ({ shipping, items }) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('add_shipping_info', {
      ecommerce: {
        currency: config.currency,
        value: shipping.price,
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.InitiateCheckout, (items) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('begin_checkout', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  bus.on(HeseyaEvent.Login, () => {
    if (!isTracking.value) return

    gTagEvent('login', {
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Register, () => {
    if (!isTracking.value) return

    gTagEvent('sign_up', {
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Purchase, ({ order, items }) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    // TODO: add coupons?
    gTagEvent('purchase', {
      ecommerce: {
        transaction_id: order.code,
        affiliation: 'storefront',
        value: order.summary,
        currency: 'PLN',
        shipping: order.shipping_price,
        items: items.map(mapCartItemToItem),
        items_value: order.cart_total,
      },
    })
  })

  bus.on(HeseyaEvent.ViewCart, (items) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_cart', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })
})
