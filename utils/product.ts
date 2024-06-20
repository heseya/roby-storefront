import type { ProductListedAttribute } from '@heseya/store-core'

export const getProductSubtext = <T extends { attributes: ProductListedAttribute[] }>(
  item: T | null,
  attributeSlug: string,
) =>
  item?.attributes
    ?.find((attribute: ProductListedAttribute) => attribute.slug === attributeSlug)
    ?.selected_options.map((option) => option.name)
    .join(', ')
