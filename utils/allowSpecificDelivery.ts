import { CartItem } from '@heseya/store-core'

export const allowSpecificDelivery = (items: CartItem[], fieldName: string): boolean => {
  // TODO: field product in item exists but its private, we need to fix it in the future
  return items.every((item) => item.product.metadata?.[fieldName] ?? false)
}
