import { ProductAttribute } from '@heseya/store-core'
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '~/consts/subtextAttribute'

// TODO: do not attribute from fixed string
export const getProductSubtext = <T extends { attributes: ProductAttribute[] }>(item?: T) =>
  item?.attributes?.find(
    (attribute: ProductAttribute) => attribute.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME,
  )?.selected_options[0]?.name
