import { parsePrices } from '@heseya/store-core'
import type { ProductList } from '@heseya/store-core'

export const isOmnibusShowable = (product: ProductList | null, currency: string) => {
  if (!product) return false

  return (
    product.available &&
    parsePrices(product.prices_min, currency) !== parsePrices(product.prices_min_initial, currency)
  )
}
