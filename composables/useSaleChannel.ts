import { useChannelsStore } from '@/store/channels'

export const useSalesChannel = () => {
  const store = useChannelsStore()

  return computed(() => store.selected)
}
