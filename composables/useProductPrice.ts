import { CartItemSchema, Product, CartItem, parsePrices } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

export const useProductPrice = (product: Product, schemaValue: Ref<CartItemSchema[]>) => {
  const heseya = useHeseya()
  const currency = useCurrency()
  const channel = useChannelsStore()

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
      sales_channel_id: channel.selected?.id || '',
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
