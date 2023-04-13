import { ProductSet, ProductSetList } from '@heseya/store-core'

export const isProductSetHighlighted = (productSet: ProductSet | ProductSetList): boolean =>
  !!productSet.metadata.highlighted
