import { HeseyaEvent, parsePrices } from '@heseya/store-core'
import { createGtm, useGtm } from '@gtm-support/vue-gtm'
import type { Pinia } from '@pinia/nuxt/dist/runtime/composables'

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
const useGtagCookieWatch = (cookieKey: string, gtagKey: string, track: (data: object) => void) => {
  const cookie = useStatefulCookie<number>(cookieKey, COOKIES_CONFIG)

  watch(
    cookie,
    (value) => {
      if (value) track({ event: 'set', [gtagKey]: true })
      else if (value !== undefined) track({ event: 'set', [gtagKey]: false })
    },
    { immediate: true },
  )
}

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction, appHost } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(
    createGtm({
      id: googleTagManagerId,
      defer: true,
      debug: !isProduction,
      vueRouter: useRouter(),
      loadScript: true,
      enabled: false,
    }),
  )

  /**
   * * TRACKING
   */
  const gtm = useGtm()
  const pushEventsQueue = useState<object[]>('gtag-push-queue', () => [])
  const trackEventsQueue = useState<object[]>('gtag-track-queue', () => [])

  const push = (event: object) => {
    if (gtm?.enabled()) gtm?.push(event)
    else pushEventsQueue.value.push(event)
  }

  const trackEvent = (event: object) => {
    if (gtm?.enabled()) gtm?.trackEvent(event)
    else trackEventsQueue.value.push(event)
  }

  const enableGtm = () => {
    if (gtm?.enabled()) return

    gtm?.enable()

    // Is this push necessary? This is a fixed value from ***REMOVED***.
    push({ event: 'config', value: 'G-EYZH3KQD3H' })

    // Clear the queue
    pushEventsQueue.value.forEach((event) => gtm?.push(event))
    trackEventsQueue.value.forEach((event) => gtm?.trackEvent(event))
    pushEventsQueue.value = []
    trackEventsQueue.value = []
  }

  useGtagCookieWatch(COOKIE_FUNCTIONAL_ACCEPTED_KEY, 'functionality_storage', push)
  useGtagCookieWatch(COOKIE_ANALYTICS_ACCEPTED_KEY, 'analytics_storage', push)
  useGtagCookieWatch(COOKIE_ADS_ACCEPTED_KEY, 'ad_storage', push)
  useGtagCookieWatch(COOKIE_ADS_ACCEPTED_KEY, 'ad_user_data', push)
  useGtagCookieWatch(COOKIE_ADS_ACCEPTED_KEY, 'ad_personalization', push)

  /**
   * * EVENTS
   */
  const channelStore = useChannelsStore(nuxtApp.$pinia as Pinia)
  const bus = useHeseyaEventBus()
  bus.on(HeseyaEvent.ViewProduct, (product) => {
    const currency = useCurrency()

    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'view_item',
      ecommerce: { items: [mapProductToItem(product, currency.value)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    const currency = useCurrency()

    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'view_item_list',
      ecommerce: {
        item_list_name: set?.name,
        items: items.map((i) => mapProductToItem(i, currency.value)),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.RemoveFromCart, (item) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'remove_from_cart',
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.AddShippingInfo, ({ shipping, items }) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'add_shipping_info',
      ecommerce: {
        shipping_tier: shipping.name,
        currency: channelStore.currency,
        value: parsePrices(shipping.prices, channelStore.currency),
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.AddPaymentInfo, ({ payment, items }) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'add_payment_info',
      ecommerce: {
        payment_type: payment.name,
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.InitiateCheckout, (items) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'begin_checkout',
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  bus.on(HeseyaEvent.Login, () => {
    trackEvent({
      event: 'login',
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Register, () => {
    trackEvent({
      event: 'sign_up',
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Purchase, (order) => {
    const vatPercentage = parseFloat(channelStore.selected?.vat_rate || '0') || 23
    const vatRate = vatPercentage / 100

    const taxValue = Math.round(parseFloat(order.summary) * vatRate * 100) / 100

    // TODO: add coupons?
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: order.code,
        affiliation: appHost,
        currency: channelStore.currency,
        shipping_tier: order.shipping_method?.name,
        // @ts-expect-error payment_method does not exists on Order type, but it is passed in event
        payment_type: order.payment_method?.name,
        items: order.products.map(mapOrderProductToItem),
        shipping: parseFloat(order.shipping_price),
        items_value: parseFloat(order.cart_total),
        value: parseFloat(order.summary),
        tax: taxValue,
      },
    })
  })

  bus.on(HeseyaEvent.ViewCart, (items) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'view_cart',
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  return {
    provide: {
      enableGtm,
    },
  }
})
