import type { ProductListed } from '@heseya/store-core'

export const useShowOmnibus = (product: MaybeRef<ProductListed | null>) => {
  const currency = useCurrency()
  return computed(() => isOmnibusShowable(unref(product), currency.value))
}
