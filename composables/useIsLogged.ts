import { storeToRefs } from 'pinia'

import { useAuthStore } from '~/store/auth'

export const useIsLogged = () => {
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)
  return isLogged
}
