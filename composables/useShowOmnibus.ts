import { ProductList, parsePrices } from '@heseya/store-core'

export const useShowOmnibus = (product: MaybeRef<ProductList | null>) => {
  const currency = useCurrency()

  const showOmnibus = computed(() => {
    const unrefed = unref(product)
    if (!unrefed) return false

    return (
      unrefed.available &&
      parsePrices(unrefed.prices_min, currency.value) !==
        parsePrices(unrefed.prices_min_initial, currency.value)
    )
  })

  return showOmnibus
}
