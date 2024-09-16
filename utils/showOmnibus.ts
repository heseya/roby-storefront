import type { ProductListed } from '@heseya/store-core'

export const isOmnibusShowable = (product: ProductListed | null) => {
  if (!product) return false

  return (
    product.available && parseFloat(product.price.gross) !== parseFloat(product.price_initial.gross)
  )
}
