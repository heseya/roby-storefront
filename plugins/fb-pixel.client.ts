import { HeseyaEvent } from '@heseya/store-core'

export default defineNuxtPlugin(() => {
  const bus = useHeseyaEventBus()

  bus.on(HeseyaEvent.InitiateCheckout, () => {
    window?.fbq?.('track', 'InitiateCheckout')
  })

  bus.on(HeseyaEvent.AddToCart, (_item) => {
    window?.fbq?.('track', 'AddToCart')
  })

  bus.on(HeseyaEvent.Purchase, ({ order }) => {
    const currency = useCurrency()

    window?.fbq?.('track', 'Purchase', {
      value: order.summary,
      currency: currency.value,
    })
  })
})
