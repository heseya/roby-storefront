import { ProductAttribute } from '@heseya/store-core'
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '~/consts/subtextAttribute'

export const getProductSubtext = <T>(item?: T & { attributes: ProductAttribute[] }) =>
  item?.attributes.find(
    (attribute: ProductAttribute) => attribute.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME,
  )?.selected_options[0]?.name
