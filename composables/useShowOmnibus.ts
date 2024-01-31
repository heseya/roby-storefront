import type { ProductList } from '@heseya/store-core'

export const useShowOmnibus = (product: MaybeRef<ProductList | null>) => {
  const currency = useCurrency()
  return computed(() => isOmnibusShowable(unref(product), currency.value))
}
