import { ProductList, Product, CartItemSchema } from '@heseya/store-core'
import { useCartStore } from '~/store/cart'

export const useAddToCart = (product: ProductList | Product) => {
  const cart = useCartStore()

  const quantity = ref(1)

  const isProductPurchaseLimitReached = computed((): boolean => {
    if (!product.purchase_limit_per_user) return false

    const productsInBasket = cart.items.find((p) => p.productId === product.id)?.totalQty || 0

    return product.purchase_limit_per_user < productsInBasket + quantity.value
  })

  const addToCart = (schemaValue: CartItemSchema[]) => {
    if (!product.available || isProductPurchaseLimitReached.value) return false

    cart.add({
      product,
      schemas: 'schemas' in product ? product.schemas : [],
      schemaValue,
      quantity: Number(quantity.value) || 1,
    })

    return true
  }

  return { addToCart, quantity, isProductPurchaseLimitReached }
}
