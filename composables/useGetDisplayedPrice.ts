import type { ComputedRef } from 'vue'
import type { StrNumber } from '../../sdk-core/src/interfaces/Number'
import { SiteMode } from '~/interfaces/siteMode'
import { toFloat } from '~/utils/utils'

interface DisplayedPriceDto {
  net: StrNumber | number
  gross: StrNumber | number
}

/**
 * This hook returns function that return the price we want to display.
 * Business assumptions:
 * For B2C shops, we display the gross price.
 * For B2B shops, we display the net price.
 */
export const useGetDisplayedPrice = () => {
  const config = usePublicRuntimeConfig()
  const isModeB2B = computed(() => config.siteMode === SiteMode.B2B)

  const getDisplayedPrice = ({ net, gross }: DisplayedPriceDto): ComputedRef<number> => {
    return computed(() => toFloat(isModeB2B.value ? net : gross))
  }

  const getSecondPrice = (dto: DisplayedPriceDto): ComputedRef<number | null> => {
    return computed(() => (isModeB2B.value ? toFloat(dto.gross) : null))
  }

  return { getDisplayedPrice, getSecondPrice }
}
