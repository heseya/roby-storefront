import { HeseyaEvent } from '@heseya/store-core'
import { createGtm, useGtm } from '@gtm-support/vue-gtm'

import {
  COOKIE_ADS_ACCEPTED_KEY,
  COOKIE_ANALYTICS_ACCEPTED_KEY,
  COOKIE_FUNCTIONAL_ACCEPTED_KEY,
  COOKIES_CONFIG,
} from '@/consts/cookiesKeys'

import { mapCartItemToItem, mapProductToItem } from '@/utils/google'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(
    createGtm({
      id: googleTagManagerId,
      defer: true,
      debug: !isProduction,
      vueRouter: useRouter() as any,
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

    // Clear the queue
    pushEventsQueue.value.forEach((event) => gtm?.push(event))
    trackEventsQueue.value.forEach((event) => gtm?.trackEvent(event))
    pushEventsQueue.value = []
    trackEventsQueue.value = []
  }

  /**
   ** Sending consents
   */

  push([
    'consent',
    'default',
    {
      functionality_storage: 'denied',
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    },
  ])

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

      push([
        'consent',
        'update',
        {
          functionality_storage: functionalCookie.value === 1 ? 'granted' : 'denied',
          analytics_storage: analyticsCookie.value === 1 ? 'granted' : 'denied',
          ad_storage: adsCookie.value === 1 ? 'granted' : 'denied',
          ad_user_data: adsCookie.value === 1 ? 'granted' : 'denied',
          ad_personalization: adsCookie.value === 1 ? 'granted' : 'denied',
        },
      ])
    },
    { immediate: true },
  )

  /**
   * * EVENTS
   */
  const bus = useHeseyaEventBus()
  bus.on(HeseyaEvent.ViewProduct, (product) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'view_item',
      ecommerce: { items: [mapProductToItem(product)] },
    })
  })

  bus.on(HeseyaEvent.ViewProductList, ({ set, items }) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'view_item_list',
      ecommerce: {
        item_list_name: set?.name,
        items: items.map((i) => mapProductToItem(i)),
      },
    })
  })

  bus.on(HeseyaEvent.AddToCart, (item) => {
    trackEvent({ ecommerce: null })
    trackEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'PLN',
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
        currency: 'PLN',
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
        currency: 'PLN',
        value: shipping.price,
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

  bus.on(HeseyaEvent.Purchase, ({ order, items }) => {
    // TODO: add coupons?
    trackEvent({
      event: 'purchase',
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
