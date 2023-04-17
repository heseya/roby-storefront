import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore()

  if (!auth.isLogged) {
    return navigateTo(`/login?redirect=${to.path}`)
  }

  watch(auth, () => {
    if (!auth.isLogged) {
      return navigateTo(`/login?redirect=${to.path}`)
    }
  })
})
