import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore()
  const localePath = useLocalePath()

  if (!auth.isLogged) {
    return navigateTo(localePath(`/login?redirect=${to.path}`))
  }

  if (process.server) return
  const route = useRoute()

  // Watch only on client side
  const stopWatch = watch(
    () => auth.isLogged,
    () => {
      // This effect is not cleaned on route change, so we need to check if the route is still the same
      if (!auth.isLogged && route.name === to.name) {
        navigateTo(localePath(`/login?redirect=${to.path}`))
        stopWatch()
      }
    },
  )
})
