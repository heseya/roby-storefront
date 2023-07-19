import { ProductList, ProductListAttribute } from '@heseya/store-core'
import { ALLOW_RENTING_KEY, ASK_FOR_PRICE_KEY } from '@/consts/metadataKeys'

export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item: T | null,
  attributeName: string,
) =>
  item?.attributes
    ?.find((attribute: ProductListAttribute) => attribute.name === attributeName)
    ?.selected_options.map((option) => option.name)
    .join(', ')

export const isProductPriceShown = (product?: ProductList | null) => {
  if (product?.metadata?.[ASK_FOR_PRICE_KEY]) return false
  if (product?.metadata?.[ALLOW_RENTING_KEY] && product?.price_min === 0) return false
  return true
}
