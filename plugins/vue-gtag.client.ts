import { HeseyaEvent, parsePrices } from '@heseya/store-core'
import VueGtag, { trackRouter, isTracking, useGtag } from 'vue-gtag-next'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { COOKIE_MARKETING_ACCEPTED_KEY, COOKIE_ANALYTICS_ACCEPTED_KEY } from '@/consts/cookiesKeys'
import { mapCartItemToItem, mapOrderProductToItem, mapProductToItem } from '@/utils/google'
import { useChannelsStore } from '@/store/channels'

const COOKIES_CONFIG = {
  maxAge: 365 * 24 * 60 * 60,
  path: '/',
} as const

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction, appHost } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleTagManagerId,
    },
    useDebugger: !isProduction,
  })

  const { set } = useGtag()

  const marketingCookie = useStatefulCookie<number>(COOKIE_MARKETING_ACCEPTED_KEY, COOKIES_CONFIG)
  const analyticsCookie = useStatefulCookie<number>(COOKIE_ANALYTICS_ACCEPTED_KEY, COOKIES_CONFIG)

  watch(
    marketingCookie,
    (value) => {
      // TODO: is this correct?
      if (value === 0) set({ allow_ad_personalization_signals: false, allow_google_signals: false })
    },
    { immediate: true },
  )

  watch(
    analyticsCookie,
    (value) => {
      // TODO: what should be enabled/disabled here?
      if (value) set({})
      else set({})
    },
    { immediate: true },
  )

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

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_item', {
      ecommerce: { items: [mapProductToItem(product, currency.value)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    const currency = useCurrency()
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_item_list', {
      ecommerce: {
        item_list_name: set?.name,
        items: items.map((i) => mapProductToItem(i, currency.value)),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
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

    gTagEvent('', { ecommerce: null })
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

    gTagEvent('', { ecommerce: null })
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

  bus.on(HeseyaEvent.Purchase, (order) => {
    if (!isTracking.value) return

    gTagEvent('', { ecommerce: null })
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

    gTagEvent('', { ecommerce: null })
    gTagEvent('view_cart', {
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })
})
