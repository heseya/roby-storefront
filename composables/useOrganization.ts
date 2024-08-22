import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

export const useOrganization = () => {
  const userStore = useUserStore()
  const { organization } = storeToRefs(userStore)
  return organization
}
