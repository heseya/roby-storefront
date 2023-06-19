import { useGtag } from 'vue-gtag-next'
import { createHeseyaEventBusService, HeseyaEvent } from '@heseya/store-core'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useConfigStore } from '~/store/config'
import { mapCartItemToItem, mapProductToItem } from '~/utils/google'

export default defineNuxtPlugin((nuxt) => {
  const gtm = useGtag()
  const config = useConfigStore(nuxt.$pinia as Pinia)
  const bus = createHeseyaEventBusService()

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    gtm.event('', { ecommerce: null })
    gtm.event('view_item', {
      ecommerce: { items: [mapProductToItem(product)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    gtm.event('', { ecommerce: null })
    gtm.event('view_item_list', {
      ecommerce: {
        item_list_name: set?.name,
        items: items.map(mapProductToItem),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    gtm.event('', { ecommerce: null })
    gtm.event('add_to_cart', {
      ecommerce: {
        currency: config.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.RemoveFromCart, (item) => {
    gtm.event('', { ecommerce: null })
    gtm.event('remove_from_cart', {
      ecommerce: {
        currency: config.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.AddShippingInfo, ({ shipping, items }) => {
    gtm.event('', { ecommerce: null })
    gtm.event('add_shipping_info', {
      ecommerce: {
        currency: config.currency,
        value: shipping.price,
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.InitiateCheckout, (items) => {
    gtm.event('', { ecommerce: null })
    gtm.event('begin_checkout', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  bus.on(HeseyaEvent.Login, () => {
    gtm.event('login', {
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Register, () => {
    gtm.event('sign_up', {
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Purchase, ({ order, items }) => {
    gtm.event('', { ecommerce: null })
    // TODO: add coupons?
    gtm.event('purchase', {
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
    gtm.event('', { ecommerce: null })
    gtm.event('view_cart', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  return {
    provide: {
      ev: bus,
    },
  }
})
