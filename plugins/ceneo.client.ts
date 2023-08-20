import { createHeseyaEventBusService, HeseyaEvent } from '@heseya/store-core'

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

  const bus = createHeseyaEventBusService()
  bus.on(HeseyaEvent.Purchase, ({ order, items, email }) => {
    window.ceneo('transaction', {
      client_email: email,
      order_id: order.code,
      shop_products: items.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.totalQty,
        currency: 'PLN',
      })),
      amount: order.summary,
    })
  })
})
