import { ListResponse } from '@heseya/store-core'

import { ExtendedProductList, ProductGetParams } from '@/types/Product'

export const useHeseyaProducts = () => {
  const heseya = useHeseya()
  const omnibus = useOmnibus()
  const currency = useCurrency()

  /**
   * TODO: inject personal price and wishlist status
   */
  const getProducts = async (
    params?: ProductGetParams,
  ): Promise<ListResponse<ExtendedProductList>> => {
    const products = await heseya.Products.get(params)

    const omnibusData = await omnibus
      .getPrices(
        products.data
          .filter((p) => isOmnibusShowable(p, currency.value))
          .map((product) => product.id),
      )
      .catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch omnibus prices')
        return []
      })

    return {
      data: products.data.map((p) => ({
        ...p,
        omnibus: omnibusData.find((d) => d.product_id === p.id),
      })),
      pagination: products.pagination,
    }
  }

  return { get: getProducts }
}
