import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore()

  if (!auth.isLogged) {
    return navigateTo(`/login?redirect=${to.path}`)
  }

  if (process.server) return
  const route = useRoute()

  // Watch only on client side
  const stopWatch = watch(
    () => auth.isLogged,
    () => {
      if (!auth.isLogged && route.name === to.name) {
        navigateTo(`/login?redirect=${to.path}`)
        stopWatch()
      }
    },
  )
})
