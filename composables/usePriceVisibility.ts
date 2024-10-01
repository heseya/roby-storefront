import { computed } from 'vue'
import { ASK_FOR_PRICE_KEY } from '~/consts/metadataKeys'
import { SiteMode } from '~/interfaces/siteMode'
import type { ExtendedProductListed } from '~/types/Product'

export function usePriceVisibility(props: ExtendedProductListed) {
  const runtimeConfig = usePublicRuntimeConfig()
  const isLogged = useIsLogged()

  const isModeB2B = computed(() => runtimeConfig.siteMode === SiteMode.B2B)
  const shouldShowPriceIfLoggedIn = computed(() => (isModeB2B.value ? isLogged.value : true))

  const askForPrice = computed(() => props?.metadata?.[ASK_FOR_PRICE_KEY])
  const hidePrice = computed(() =>
    isModeB2B.value
      ? isLogged.value
        ? askForPrice.value || !props.available
        : false
      : askForPrice.value || !props.available,
  )

  const priceVisibility = computed(() => {
    // First: Check if we're in B2B mode and whether the user is logged in

    // Final logic:
    // Price is visible if:
    // - In B2B mode: only show if logged in
    // - Not in B2B mode: always show
    // - Also ensure that `hidePrice` conditions (askForPrice or product availability) are respected in both cases
    return shouldShowPriceIfLoggedIn.value && !hidePrice.value
  })

  const loginToBuy = computed(() => isModeB2B.value && !isLogged.value)

  return {
    priceVisibility,
    loginToBuy,
    askForPrice,
    hidePrice,
  }
}
