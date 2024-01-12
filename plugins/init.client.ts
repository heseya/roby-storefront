import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '~/store/auth'
import { useWishlistStore } from '~/store/wishlist'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia

  const cart = useCartStore(pinia)
  const authStore = useAuthStore(pinia)
  const wishlistStore = useWishlistStore(pinia)

  watch(
    () => authStore.isLogged,
    async () => {
      cart.processCart()

      if (authStore.isLogged) {
        await wishlistStore.syncLocal()
        await wishlistStore.fetch()
      }

      window.addEventListener('online', () => cart.processCart())
    },
    { immediate: true },
  )
})
