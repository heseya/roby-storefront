import type { ListResponse, ProductListed } from '@heseya/store-core'

import type { ExtendedProductListed, ProductGetParams } from '@/types/Product'
import { useAuthStore } from '~/store/auth'

export const useHeseyaProducts = () => {
  const auth = useAuthStore()
  const heseya = useHeseya()
  const omnibus = useOmnibus()
  const currency = useCurrency()

  const getOmnibus = async (products: ProductListed[]) => {
    return await omnibus
      .getPrices(
        products.filter((p) => isOmnibusShowable(p, currency.value)).map((product) => product.id),
      )
      .catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Failed to get omnibus prices')
        return []
      })
  }

  const getWishlist = async (products: ProductListed[]) => {
    if (!auth.isLogged) return null
    return await heseya.Wishlist.check(products.map((p) => p.id)).catch(function () {
      return null
    })
  }

  /**
   * TODO: inject personal price
   */
  const getProducts = async (
    params?: ProductGetParams,
  ): Promise<ListResponse<ExtendedProductListed>> => {
    const products = await heseya.Products.get(params)

    const [omnibusData, wishlistData] = await Promise.all([
      getOmnibus(products.data),
      getWishlist(products.data),
    ])

    return {
      data: products.data.map((p) => ({
        ...p,
        omnibus: omnibusData.find((d) => d.product_id === p.id),
        isInWishlist: wishlistData?.includes(p.id),
      })),
      pagination: products.pagination,
    }
  }

  return { get: getProducts }
}
