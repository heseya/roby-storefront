import { HeseyaEvent } from '@heseya/store-core'

export default defineNuxtPlugin(() => {
  const { ceneoGuid } = usePublicRuntimeConfig()
  if (!ceneoGuid) return

  useHead({
    script: [
      {
        defer: true,
        // new version: https://ssl.ceneo.pl/ct/v5/script.js
        src: `https://ssl.ceneo.pl/shops/sw.js?accountGuid=${ceneoGuid}&t=${Date.now()}`,
      },
    ],
  })

  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.Purchase, (order) => {
    window?.ceneo?.('transaction', {
      client_email: order.email,
      order_id: order.code,
      shop_products: order.products.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        currency: order.currency,
      })),
      amount: order.summary,
    })
  })
})
