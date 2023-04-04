import { useCartStore } from '@/store/cart'

export default defineNuxtPlugin(async (nuxtApp) => {
  const cart = useCartStore(nuxtApp.$pinia)

  await Promise.all([cart.processCart()])
})
