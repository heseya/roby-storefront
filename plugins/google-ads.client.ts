import { useGtm } from '@gtm-support/vue-gtm'
import { HeseyaEvent } from '@heseya/store-core'

export default defineNuxtPlugin(() => {
  const config = usePublicRuntimeConfig()
  if (!config.googleAdsId) return

  if (!config.googleTagManagerId)
    // eslint-disable-next-line no-console
    console.warn('GOOGLE_TAG_MANAGER_ID env is not defined, but GOOGLE_ADS_ID is')

  const bus = useHeseyaEventBus()

  /**
   * https://docs.edrone.me/sending-data-client.html#order
   */
  bus.on(HeseyaEvent.Purchase, (order) => {
    const currency = useCurrency()
    const gtm = useGtm()

    gtm?.trackEvent({
      event: 'conversion',
      send_to: config.googleAdsId,
      value: order.summary,
      currency: currency.value,
      transaction_id: order.code,
    })
  })
})
