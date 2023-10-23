import { ProductListAttribute } from '@heseya/store-core'

export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item: T | null,
  attributeSlug: string,
) =>
  item?.attributes
    ?.find((attribute: ProductListAttribute) => attribute.slug === attributeSlug)
    ?.selected_options.map((option) => option.name)
    .join(', ')
