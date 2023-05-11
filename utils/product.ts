import { ProductListAttribute } from '@heseya/store-core'
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '~/consts/subtextAttribute'

export const getProductSubtext = <T extends { attributes: ProductListAttribute[] }>(
  item?: T | null,
) =>
  item?.attributes?.find(
    (attribute: ProductListAttribute) => attribute.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME,
  )?.selected_options[0]?.name || ''
