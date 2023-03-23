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
        name: 'imagePROGRAF TC-20',
        price: 3899,
      } as any,
    ] as CartItem[],
  }),

  getters: {
    length(): number {
      return this.items.length
    },
  },
})
