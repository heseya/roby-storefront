import type { ProductSet, ProductSetListed } from '@heseya/store-core'
import { CATEGORY_HIGHLIGHTED_KEY } from '@/consts/metadataKeys'

export const isProductSetHighlighted = (productSet: ProductSet | ProductSetListed): boolean =>
  !!productSet.metadata[CATEGORY_HIGHLIGHTED_KEY]
