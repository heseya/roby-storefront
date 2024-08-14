import '@heseya/store-core'
import type { Price } from '@heseya/store-core'

// ? Here we can ovveride types in SDK, when they changed but SDK is not yet updated
declare module '@heseya/store-core' {
  // TODO: remove this override when that fields will be removed from api
  interface ProductListed {
    /** @deprecated */
    prices_min: Price[]
    /** @deprecated */
    prices_min_initial: Price[]
    /** @deprecated */
    prices_max: Price[]
    /** @deprecated */
    prices_max_initial: Price[]
  }
}
