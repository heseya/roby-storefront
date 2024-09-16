import type { ProductListed } from '@heseya/store-core'

export const useShowOmnibus = (product: MaybeRef<ProductListed | null>) => {
  return computed(() => isOmnibusShowable(unref(product)))
}
