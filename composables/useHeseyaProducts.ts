import { ListResponse } from '@heseya/store-core'
import { ProductsService } from '@heseya/store-core/dist/src/services/api/modules/products'
import { ExtendedProductList } from '~/types/Product'

type ArgumentType<T> = T extends (arg: infer R) => unknown ? R : never

export type ProductGetParams = Omit<ArgumentType<ProductsService['get']>, 'full'>

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

    const omnibusData = await omnibus.getPrices(
      products.data
        .filter((p) => isOmnibusShowable(p, currency.value))
        .map((product) => product.id),
    )

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
