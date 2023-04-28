import { CartItemSchema, Product, CartItem } from '@heseya/store-core'

export const useProductPrice = (product: Product, schemaValue: Ref<CartItemSchema[]>) => {
  const heseya = useHeseya()

  const pending = ref(false)

  const calc = async () => {
    const cartItem = new CartItem(product, 1, product.schemas, schemaValue.value)

    const cart = await heseya.Orders.processCart({
      coupons: [],
      items: [cartItem.getOrderObject()],
    })

    if (cart.items.length !== 1)
      throw new Error(`[ID: ${product.id}] Invalid cart items count while calculating price`)

    return cart.items[0].price_discounted
  }

  const price = computedAsync(() => calc(), product.price_min, pending)

  return { price, calc, pending }
}
