import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '~/store/auth'
import { useWishlistStore } from '~/store/wishlist'

export default defineNuxtPlugin(async (nuxtApp) => {
  const cart = useCartStore(nuxtApp.$pinia as Pinia)
  const authStore = useAuthStore(nuxtApp.$pinia as Pinia)
  const wishlistStore = useWishlistStore(nuxtApp.$pinia as Pinia)

  watch(
    () => authStore.isLogged,
    async () => {
      cart.processCart()

      if (authStore.isLogged) {
        await wishlistStore.syncLocal()
        await wishlistStore.fetch()
      } else {
        wishlistStore.$reset()
      }
    },
    { immediate: true },
  )

  await Promise.all([cart.processCart()])
})
