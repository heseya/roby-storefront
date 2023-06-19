import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

export const useUser = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  return user
}
