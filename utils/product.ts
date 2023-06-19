import { ProductListAttribute } from '@heseya/store-core'

// TODO: find attribute using something else than name
const PRODUCT_SUBTEXT_ATTRIBUTE_NAME = 'producent'

export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item?: T | null,
) =>
  item?.attributes?.find(
    (attribute: ProductListAttribute) => attribute.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME,
  )?.selected_options[0]?.name || ''
