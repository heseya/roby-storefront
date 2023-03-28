import { CartItem } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      {
        coverMedia: {
          url: 'https://cdn-dev.heseya.com/demo/yXM0I54gAscKiEcKYnpmZFZPafTiQajOlh3XOFPp.jpg',
          type: 'photo',
        },
        qty: 1,
        totalQty: 1,
        name: 'imagePROGRAF TC-20',
        totalPrice: 3799,
        totalInitialPrice: 3999,
        discountValue: 200,
      } as any,
    ] as CartItem[],
  }),

  getters: {
    length(): number {
      return this.items.reduce((total, item) => total + item.totalQty, 0)
    },
    totalValue(): number {
      return this.items.reduce((acc, curr) => acc + curr.totalPrice, 0)
    },
    totalValueInitial(): number {
      return this.items.reduce((acc, curr) => acc + curr.totalInitialPrice, 0)
    },
    discountValue(): number {
      return this.totalValueInitial - this.totalValue
    },
  },
})
