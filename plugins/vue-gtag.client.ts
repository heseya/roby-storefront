import { HeseyaEvent, parsePrices } from '@heseya/store-core'
import { createGtm, useGtm } from '@gtm-support/vue-gtm'
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
  const gtm = useGtm()

  const cookie = useStatefulCookie<number>(cookieKey, COOKIES_CONFIG)

  watch(
    cookie,
    (value) => {
      if (value) gtm?.push({ event: 'set', [gtagKey]: true })
      else if (value !== undefined) gtm?.push({ event: 'set', [gtagKey]: false })
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
    }),
  )

  useGtagCookieWatch(COOKIE_FUNCTIONAL_ACCEPTED_KEY, 'functionality_storage')
  useGtagCookieWatch(COOKIE_ANALYTICS_ACCEPTED_KEY, 'analytics_storage')
  useGtagCookieWatch(COOKIE_ADS_ACCEPTED_KEY, 'ad_storage')

  /**
   * * EVENTS
   */

  const gtm = useGtm()
  const channelStore = useChannelsStore(nuxtApp.$pinia as Pinia)
  const bus = useHeseyaEventBus()

  gtm?.push({ event: 'config', value: 'G-EYZH3KQD3H' })

  bus.on(HeseyaEvent.ViewProduct, (product) => {
    const currency = useCurrency()
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'view_item',
      ecommerce: { items: [mapProductToItem(product, currency.value)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    const currency = useCurrency()
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'view_item_list',
      ecommerce: {
        item_list_name: set?.name,
        items: items.map((i) => mapProductToItem(i, currency.value)),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.RemoveFromCart, (item) => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'remove_from_cart',
      ecommerce: {
        currency: channelStore.currency,
        value: item.price,
        items: [mapCartItemToItem(item)],
      },
    })
  })

  bus.on(HeseyaEvent.AddShippingInfo, ({ shipping, items }) => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
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
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'add_payment_info',
      ecommerce: {
        payment_type: payment.name,
        items: items.map(mapCartItemToItem),
      },
    })
  })

  bus.on(HeseyaEvent.InitiateCheckout, (items) => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'begin_checkout',
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })

  bus.on(HeseyaEvent.Login, () => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({
      event: 'login',
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Register, () => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({
      event: 'sign_up',
      method: 'email',
    })
  })

  bus.on(HeseyaEvent.Purchase, (order) => {
    if (!gtm?.enabled()) return

    const vatPercentage = parseFloat(channelStore.selected?.vat_rate || '0') || 23
    const vatRate = vatPercentage / 100

    const taxValue = Math.round(parseFloat(order.summary) * vatRate * 100) / 100

    // TODO: add coupons?
    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: order.code,
        affiliation: appHost,
        currency: channelStore.currency,
        items: order.products.map(mapOrderProductToItem),
        shipping: parseFloat(order.shipping_price),
        items_value: parseFloat(order.cart_total),
        value: parseFloat(order.summary),
        tax: taxValue,
      },
    })
  })

  bus.on(HeseyaEvent.ViewCart, (items) => {
    if (!gtm?.enabled()) return

    gtm?.trackEvent({ ecommerce: null })
    gtm?.trackEvent({
      event: 'view_cart',
      ecommerce: { items: items.map(mapCartItemToItem) },
    })
  })
})
