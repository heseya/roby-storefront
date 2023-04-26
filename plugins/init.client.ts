import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const cart = useCartStore(nuxtApp.$pinia as Pinia)
  const authStore = useAuthStore(nuxtApp.$pinia as Pinia)

  watch(
    () => authStore.isLogged,
    () => cart.processCart(),
    { immediate: true },
  )

  await Promise.all([cart.processCart()])
})
