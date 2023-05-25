import { ProductListAttribute } from '@heseya/store-core'

const PRODUCT_SUBTEXT_ATTRIBUTE_NAME = 'Marka'

// TODO: find attribute using something else than name
export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item?: T | null,
) =>
  item?.attributes?.find(
    (attribute: ProductListAttribute) => attribute.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME,
  )?.selected_options[0]?.name || ''
