import { useGtag, isTracking } from 'vue-gtag-next'
import { createHeseyaEventBusService, HeseyaEvent } from '@heseya/store-core'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useConfigStore } from '~/store/config'
import { mapCartItemToItem, mapProductToItem } from '~/utils/google'

export default defineNuxtPlugin((nuxt) => {
  const { event: gTagEvent } = useGtag()
  const config = useConfigStore(nuxt.$pinia as Pinia)
  const bus = createHeseyaEventBusService()

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_item', {
      ecommerce: { items: [mapProductToItem(product)] },
    })
  })

  // TODO
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

  // TODO
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
        affiliation: 'Ksiażki.pl website',
        value: order.summary,
        currency: config.currency,
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

  return {
    provide: {
      ev: bus,
    },
  }
})
