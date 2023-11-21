import { HeseyaEvent, parsePrices } from '@heseya/store-core'
import VueGtag, { trackRouter, isTracking, useGtag } from 'vue-gtag-next'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import {
  COOKIE_ADS_ACCEPTED_KEY,
  COOKIE_ANALYTICS_ACCEPTED_KEY,
  COOKIE_FUNCTIONAL_ACCEPTED_KEY,
  COOKIES_CONFIG,
} from '@/consts/cookiesKeys'

import { mapCartItemToItem, mapOrderProductToItem, mapProductToItem } from '@/utils/google'
import { useChannelsStore } from '@/store/channels'

/**
 * Watches for a change in the cookie and sets the value in gtag.
 */
const useGtagCookieWatch = (cookieKey: string, gtagKey: string) => {
  const { set } = useGtag()

  const cookie = useStatefulCookie<number>(cookieKey, COOKIES_CONFIG)

  watch(
    cookie,
    (value) => {
      if (value) set({ [gtagKey]: true })
      else if (value !== undefined) set({ [gtagKey]: false })
    },
    { immediate: true },
  )
}

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction, appHost } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleTagManagerId,
    },
    useDebugger: !isProduction,
  })

  useGtagCookieWatch(COOKIE_FUNCTIONAL_ACCEPTED_KEY, 'functionality_storage')
  useGtagCookieWatch(COOKIE_ANALYTICS_ACCEPTED_KEY, 'analytics_storage')
  useGtagCookieWatch(COOKIE_ADS_ACCEPTED_KEY, 'ad_storage')

  trackRouter(useRouter())

  /**
   * * EVENTS
   */

  const { event: gTagEvent } = useGtag()
  const channelStore = useChannelsStore(nuxtApp.$pinia as Pinia)
  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    const currency = useCurrency()
    if (!isTracking.value) return

    gTagEvent('view_item', {
      ecommerce: { items: [mapProductToItem(product, currency.value)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    const currency = useCurrency()
    if (!isTracking.value) return

    gTagEvent('view_item_list', {
      ecommerce: {
        item_list_name: set?.name,
        items: items.map((i) => mapProductToItem(i, currency.value)),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    if (!isTracking.value) return

    gTagEvent('add_to_cart', {
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.RemoveFromCart, (item) => {
    if (!isTracking.value) return

    gTagEvent('remove_from_cart', {
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.AddShippingInfo, ({ shipping, items }) => {
    if (!isTracking.value) return

    gTagEvent('add_shipping_info', {
      ecommerce: {
        currency: channelStore.currency,
        value: parsePrices(shipping.prices, channelStore.currency),
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.InitiateCheckout, (items) => {
    if (!isTracking.value) return

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

  bus.on(HeseyaEvent.Purchase, (order) => {
    if (!isTracking.value) return

    // TODO: add coupons?
    gTagEvent('purchase', {
      ecommerce: {
        transaction_id: order.code,
        affiliation: appHost,
        value: order.summary,
        currency: channelStore.currency,
        shipping: order.shipping_price,
        items: order.products.map(mapOrderProductToItem),
        items_value: order.cart_total,
      },
    })
  })

  bus.on(HeseyaEvent.ViewCart, (items) => {
    if (!isTracking.value) return

    gTagEvent('view_cart', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })
})
