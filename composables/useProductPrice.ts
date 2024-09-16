import type { CartItemSchema, Product } from '@heseya/store-core'

export const useProductPrice = (product: Product, schemaValue: Ref<CartItemSchema[]>) => {
  const heseya = useHeseya()

  const pending = ref(false)

  const priceGross = ref(parseFloat(product.price?.gross ?? 0))
  const priceNet = ref(parseFloat(product.price?.net ?? 0))
  const originalPriceGross = ref(parseFloat(product.price_initial?.gross ?? 0))
  const originalPriceNet = ref(parseFloat(product.price_initial?.net ?? 0))

  const calc = async () => {
    const productVariantDto = {
      schemas: Object.fromEntries([...schemaValue.value].map((s) => [s.id, s.value])),
    }

    const productVariantPrice = await heseya.Products.getProductVariantPrice(
      product.id,
      productVariantDto,
    )

    priceGross.value = parseFloat(productVariantPrice.price.gross)
    priceNet.value = parseFloat(productVariantPrice.price.net)
    originalPriceGross.value = parseFloat(productVariantPrice.price_initial.gross)
    originalPriceNet.value = parseFloat(productVariantPrice.price_initial.net)

    return {
      priceGross: productVariantPrice.price.gross,
      priceNet: productVariantPrice.price.net,
      originalPriceGross: productVariantPrice.price_initial.gross,
      originalPriceNet: productVariantPrice.price_initial.net,
    }
  }

  computedAsync(() => calc(), null, pending)

  return { priceGross, priceNet, originalPriceGross, originalPriceNet, calc, pending }
}
