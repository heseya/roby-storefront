import type { ComputedRef } from 'vue'

import { SiteMode } from '~/interfaces/siteMode'
import { toFloat } from '~/utils/utils'

interface DisplayedPriceDetailsDto {
  price: {
    net: string | number
    gross: string | number
  }
  priceInitial: {
    net: string | number
    gross: string | number
  }
}

/**
 * This hook returns the price we want to display.
 * Business assumptions:
 * For B2C shops, we display the gross price.
 * For B2B shops, we display the net price and, in some cases, additionally the gross price and the vat rate.
 */
export const useDisplayedPriceDetails = ({
  price,
  priceInitial,
}: DisplayedPriceDetailsDto): {
  mainPrice: ComputedRef<number>
  secondPrice: ComputedRef<number | null>
  originalMainPrice: ComputedRef<number>
  hasDiscount: ComputedRef<boolean>
  vatRate: ComputedRef<number>
} => {
  const config = usePublicRuntimeConfig()
  const vatRate = useVatRate()

  const isModeB2B = computed(() => config.siteMode === SiteMode.B2B)

  const mainPrice = computed(() => toFloat(isModeB2B.value ? price.net : price.gross))
  const secondPrice = computed(() => (isModeB2B.value ? toFloat(price.gross) : null))

  const originalMainPrice = computed(() =>
    toFloat(isModeB2B.value ? priceInitial.net : priceInitial.gross),
  )

  const hasDiscount = computed(() => toFloat(price.net) !== toFloat(priceInitial.net))

  return {
    mainPrice,
    secondPrice,
    originalMainPrice,
    hasDiscount,
    vatRate,
  }
}
