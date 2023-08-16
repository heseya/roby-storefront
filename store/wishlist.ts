import { HeseyaPaginationMeta, ProductList, WishlistProduct } from '@heseya/store-core'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    userWishlist: [] as WishlistProduct[],
    localWishlist: [] as ProductList[],
    pagination: {
      perPage: 0,
      currentPage: 0,
      lastPage: 0,
      total: 0,
    } as HeseyaPaginationMeta,
    error: null as Error | null,
  }),

  getters: {
    quantity(): number {
      return this.localWishlist.length + (this.pagination?.total || 0)
    },

    products(): ProductList[] {
      return [...this.localWishlist, ...this.userWishlist.map((product) => product.product)]
    },
  },

  actions: {
    async add(product: ProductList) {
      const auth = useAuthStore()
      if (await this.isInWishlist(product.id)) return

      if (!auth.isLogged) this.localWishlist.push(product)
      else {
        await this.authAdd(product)
      }
    },

    async authAdd(product: ProductList) {
      const auth = useAuthStore()
      const heseya = useHeseya()

      // eslint-disable-next-line no-console
      if (!auth.isLogged) return console.warn('User is not logged in')

      try {
        const entry = await heseya.Wishlist.add({ product_id: product.id })
        this.userWishlist.push(entry)
        this.pagination.total += 1
        return true
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Failed to save local wishlist`, e)
        return false
      }
    },

    async remove(productId: string) {
      const auth = useAuthStore()

      if (!auth.isLogged)
        this.localWishlist = this.localWishlist.filter((product) => product.id !== productId)
      else {
        await this.authRemove(productId)
      }
    },

    async authRemove(productId: string) {
      const auth = useAuthStore()
      const heseya = useHeseya()

      // eslint-disable-next-line no-console
      if (!auth.isLogged) return console.warn('User is not logged in')

      await heseya.Wishlist.delete(productId)
      this.userWishlist = this.userWishlist.filter((entry) => entry.product.id !== productId)
      this.pagination.total -= 1
    },

    async isInWishlist(productId: string): Promise<boolean> {
      const auth = useAuthStore()
      const heseya = useHeseya()

      if (!auth.isLogged) return this.products.some((product) => product.id === productId)
      try {
        // If procuct is not in wishlist, it will throw an error
        await heseya.Wishlist.getOne(productId)
        return true
      } catch {
        return false
      }
    },

    async syncLocal() {
      const auth = useAuthStore()

      // eslint-disable-next-line no-console
      if (!auth.isLogged) return console.warn('User is not logged in')

      try {
        const productsToSync = await Promise.all(
          this.localWishlist.map(async (product) =>
            (await this.isInWishlist(product.id)) ? null : product,
          ),
        )
        const filteredProducts = productsToSync.filter(Boolean) as ProductList[]

        await Promise.all(filteredProducts.map((product) => this.authAdd(product)))
        this.localWishlist = []
        return true
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Failed to save local wishlist`, e)
        return false
      }
    },

    async fetch() {
      const auth = useAuthStore()
      const heseya = useHeseya()

      // eslint-disable-next-line no-console
      if (!auth.isLogged) return console.warn('User is not logged in')

      const { data, pagination } = await heseya.Wishlist.get()
      this.userWishlist = data.map((wishlistProduct) => ({
        ...wishlistProduct,
        product: applyVatForProductPrices(wishlistProduct.product),
      }))

      this.pagination = pagination
    },
  },

  persist: true,
})
