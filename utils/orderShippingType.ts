import { CartItem, OrderSummary } from '@heseya/store-core'

/**
 * 'default' - shipping only with phisical shipping method
 * 'digital' - shipping only with digital shipping method
 * 'mixed' - shipping both with digital and phisical shipping method
 */
export enum OrderShippingType {
  Default = 'default',
  Digital = 'digital',
  Mixed = 'mixed',
}

export const getOrderShippingType = (order: OrderSummary): OrderShippingType => {
  if (order.shipping_method && order.digital_shipping_method) return OrderShippingType.Mixed
  if (order.digital_shipping_method) return OrderShippingType.Digital
  return OrderShippingType.Default
}

export const getShippingTypeFromCart = (cart: CartItem[]): OrderShippingType | 'none' => {
  if (!cart.length) return 'none'
  if (cart.every((i) => i.shippingDigital)) return OrderShippingType.Digital
  else if (cart.every((i) => !i.shippingDigital)) return OrderShippingType.Default
  return OrderShippingType.Mixed
}
