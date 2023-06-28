import { ProductListAttribute } from '@heseya/store-core'

export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item: T | null,
  attributeName: string,
) =>
  item?.attributes?.find((attribute: ProductListAttribute) => attribute.name === attributeName)
    ?.selected_options[0]?.name || ''
