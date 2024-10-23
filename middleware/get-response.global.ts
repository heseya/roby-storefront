import { useAuthStore } from '~/store/auth'
import { useGetResponse } from '~/composables/useGetResponse'

export default defineNuxtRouteMiddleware((_to, _from) => {
  const auth = useAuthStore()
  const user = useUser()
  const { trackUserByEmail } = useGetResponse()
  if (auth.isLogged && user.value?.email) {
    trackUserByEmail(user.value?.email as string)
  }
})
