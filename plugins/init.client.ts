import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useCartStore } from '@/store/cart'

export default defineNuxtPlugin(async (nuxtApp) => {
  const cart = useCartStore(nuxtApp.$pinia as Pinia)

  await Promise.all([cart.processCart()])
})
