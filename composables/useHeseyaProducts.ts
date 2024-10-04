import type { ListResponse, ProductListed, ProductPrice } from '@heseya/store-core'
import type { ExtendedProductListed, ProductGetParams } from '@/types/Product'
import { useAuthStore } from '~/store/auth'

export const useHeseyaProducts = () => {
  const auth = useAuthStore()
  const heseya = useHeseya()
  const omnibus = useOmnibus()

  const getOmnibus = async (products: ProductListed[]) => {
    if (!products.length) return []

    return await omnibus
      .getPrices(products.filter((p) => isOmnibusShowable(p)).map((product) => product.id))
      .catch(() => {
        // eslint-disable-next-line no-console
        console.warn('Failed to get omnibus prices')
        return []
      })
  }

  const getWishlist = async (products: ProductListed[]) => {
    if (!auth.isLogged) return null
    if (!products.length) return []

    return await heseya.Wishlist.check(products.map((p) => p.id)).catch(function () {
      return null
    })
  }

  const getPersonalPrices = async (products: ProductListed[]): Promise<ProductPrice[] | null> => {
    if (!auth.isLogged) return null
    if (!products.length) return []

    return await heseya.Prices.getProductsPrices(products.map((p) => p.id)).catch(function () {
      // eslint-disable-next-line no-console
      console.warn('Failed to get personal prices')
      return null
    })
  }

  const getProducts = async (
    params?: ProductGetParams,
  ): Promise<ListResponse<ExtendedProductListed>> => {
    const products = await heseya.Products.get(params)

    const [omnibusData, wishlistData, personalPrices] = await Promise.all([
      getOmnibus(products.data),
      getWishlist(products.data),
      getPersonalPrices(products.data),
    ])

    return {
      data: products.data.map((p) => ({
        ...p,
        omnibus: omnibusData.find((d) => d.product_id === p.id),
        isInWishlist: wishlistData?.includes(p.id),
        price: personalPrices?.find((price) => price.id === p.id)?.price ?? p.price,
      })),
      pagination: products.pagination,
    }
  }

  return { get: getProducts }
}
