import { HeseyaEvent, parsePrices } from '@heseya/store-core'
import { createGtm, useGtm } from '@gtm-support/vue-gtm'
import type { Pinia } from 'pinia'

import {
  COOKIE_ADS_ACCEPTED_KEY,
  COOKIE_ANALYTICS_ACCEPTED_KEY,
  COOKIE_FUNCTIONAL_ACCEPTED_KEY,
  COOKIES_CONFIG,
} from '@/consts/cookiesKeys'

import { mapCartItemToItem, mapOrderProductToItem, mapProductToItem } from '@/utils/google'
import { useChannelsStore } from '@/store/channels'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, production, i18n } = usePublicRuntimeConfig()
  const isProduction = computed(() => ['true', '1', 1, true].includes(production))
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(
    createGtm({
      id: googleTagManagerId,
      defer: true,
      debug: !isProduction.value,
      vueRouter: useRouter(),
      loadScript: true,
      enabled: false,
    }),
  )

  /**
   * * TRACKING
   */
  const gtm = useGtm()
  const pushEventsQueue = useState<unknown[][]>('gtag-push-queue', () => [])
  const trackEventsQueue = useState<object[]>('gtag-track-queue', () => [])

  const push = (...args: unknown[]) => {
    if (gtm?.enabled()) window.gtag(...args)
    else pushEventsQueue.value.push(args)
  }

  const trackEvent = (event: object) => {
    if (gtm?.enabled()) gtm?.trackEvent(event)
    else trackEventsQueue.value.push(event)
  }

  const enableGtm = () => {
    if (gtm?.enabled()) return

    gtm?.enable()

    // Clear the queue
    const interval = setInterval(() => {
      if (!window.gtag) return
      pushEventsQueue.value.forEach((args) => window.gtag(...args))
      trackEventsQueue.value.forEach((event) => gtm?.trackEvent(event))
      pushEventsQueue.value = []
      trackEventsQueue.value = []
      clearInterval(interval)
    }, 300)
  }

  /**
   ** Sending consents
   */
  const functionalCookie = useStatefulCookie<number>(COOKIE_FUNCTIONAL_ACCEPTED_KEY, COOKIES_CONFIG)
  const analyticsCookie = useStatefulCookie<number>(COOKIE_ANALYTICS_ACCEPTED_KEY, COOKIES_CONFIG)
  const adsCookie = useStatefulCookie<number>(COOKIE_ADS_ACCEPTED_KEY, COOKIES_CONFIG)

  watch(
    [functionalCookie, analyticsCookie, adsCookie],
    () => {
      const isUnset = [functionalCookie, analyticsCookie, adsCookie].every(
        (c) => c.value === undefined,
      )
      if (isUnset) return

      push('consent', 'update', {
        functionality_storage: functionalCookie.value === 1 ? 'granted' : 'denied',
        security_storage: functionalCookie.value === 1 ? 'granted' : 'denied',
        analytics_storage: analyticsCookie.value === 1 ? 'granted' : 'denied',
        ad_storage: adsCookie.value === 1 ? 'granted' : 'denied',
        ad_user_data: adsCookie.value === 1 ? 'granted' : 'denied',
        ad_personalization: adsCookie.value === 1 ? 'granted' : 'denied',
        personalization_storage: adsCookie.value === 1 ? 'granted' : 'denied',
      })
    },
    { immediate: true },
  )

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
    const taxValue =
      Math.round(parseFloat(order.summary.net) * parseFloat(order.summary.vat_rate) * 100) / 100

    // TODO: add coupons?
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: order.code,
        affiliation: i18n.baseUrl,
        currency: channelStore.currency,
        shipping_tier: order.shipping_method?.name,
        // @ts-expect-error payment_method does not exists on Order type, but it is passed in event
        payment_type: order.payment_method?.name,
        items: order.products.map(mapOrderProductToItem),
        shipping: parseFloat(order.shipping_price.gross),
        items_value: parseFloat(order.cart_total.gross),
        value: parseFloat(order.summary.gross),
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
