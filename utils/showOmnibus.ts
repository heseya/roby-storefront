import { parsePrices } from '@heseya/store-core'
import type { ProductListed } from '@heseya/store-core'

export const isOmnibusShowable = (product: ProductListed | null, currency: string) => {
  if (!product) return false

  return (
    product.available &&
    parsePrices(product.prices_min, currency) !== parsePrices(product.prices_min_initial, currency)
  )
}
