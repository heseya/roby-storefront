import type { ProductListed } from '@heseya/store-core'
import type { ProductsService } from '@heseya/store-core/dist/src/services/api/modules/products'

import type { OmnibusPrice } from './OmnibusPrice'

type ArgumentType<T> = T extends (arg: infer R) => unknown ? R : never

export type ProductGetParams = Omit<ArgumentType<ProductsService['get']>, 'full'>

export type ExtendedProductListed = ProductListed & {
  omnibus?: OmnibusPrice
  isInWishlist?: boolean
}
