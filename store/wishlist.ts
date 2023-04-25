import { HeseyaPaginationMeta, ProductList, WishlistProduct } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    userWishlist: [] as WishlistProduct[],
    localWishlist: [] as ProductList[],
    pagination: {} as HeseyaPaginationMeta,
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
    add(product: ProductList) {
      if (this.isInWishlist(product.id)) return
      this.localWishlist.push(product)
      // TODO: trigger sync
    },
    remove(productId: string) {
      this.localWishlist = this.localWishlist.filter((product) => product.id !== productId)
      // TODO: trigger sync
    },

    isInWishlist(productId: string): boolean {
      // TODO: make API call if user is logged in
      return this.products.some((product) => product.id === productId)
    },
  },

  persist: true,
})
