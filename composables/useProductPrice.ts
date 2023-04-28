import { CartItemSchema, Product, CartItem } from '@heseya/store-core'

export const useProductPrice = (product: Product, schemaValue: Ref<CartItemSchema[]>) => {
  const heseya = useHeseya()

  const pending = ref(false)
  const price = ref(product.price_min)
  const originalPrice = ref(product.price_min_initial)

  const calc = async () => {
    const cartItem = new CartItem(product, 1, product.schemas, schemaValue.value)

    const cart = await heseya.Orders.processCart({
      coupons: [],
      items: [cartItem.getOrderObject()],
    })

    if (cart.items.length !== 1)
      throw new Error(`[ID: ${product.id}] Invalid cart items count while calculating price`)

    const item = cart.items[0]

    price.value = item.price_discounted
    originalPrice.value = item.price

    return {
      price: item.price_discounted,
      originalPrice: item.price,
    }
  }

  computedAsync(() => calc(), null, pending)

  return { price, originalPrice, calc, pending }
}
