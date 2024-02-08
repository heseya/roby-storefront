import { CartItem, parsePrices } from '@heseya/store-core'
import type { CartItemSchema, Product } from '@heseya/store-core'

export const useProductPrice = (product: Product, schemaValue: Ref<CartItemSchema[]>) => {
  const heseya = useHeseya()
  const currency = useCurrency()
  const channel = useSalesChannel()

  const pending = ref(false)

  const originalPrice = ref(parsePrices(product.prices_min_initial, currency.value))
  const price = ref(parsePrices(product.prices_min, currency.value))

  const calc = async () => {
    const cartItem = new CartItem(
      product,
      1,
      product.schemas,
      schemaValue.value,
      [],
      currency.value,
    )

    const cart = await heseya.Orders.processCart({
      coupons: [],
      items: [cartItem.getOrderObject()],
      sales_channel_id: channel.value?.id || '',
      currency: currency.value,
    })

    if (cart.items.length !== 1)
      throw new Error(`[ID: ${product.id}] Invalid cart items count while calculating price`)

    const item = cart.items[0]

    price.value = parseFloat(item.price_discounted)
    originalPrice.value = parseFloat(item.price)

    return {
      price: item.price_discounted,
      originalPrice: item.price,
    }
  }

  computedAsync(() => calc(), null, pending)

  return { price, originalPrice, calc, pending }
}
