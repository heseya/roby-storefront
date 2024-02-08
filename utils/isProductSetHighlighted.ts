import type { ProductSet, ProductSetList } from '@heseya/store-core'
import { CATEGORY_HIGHLIGHTED_KEY } from '@/consts/metadataKeys'

export const isProductSetHighlighted = (productSet: ProductSet | ProductSetList): boolean =>
  !!productSet.metadata[CATEGORY_HIGHLIGHTED_KEY]
