import { useChannelsStore } from '@/store/channels'

export const useCurrency = () => {
  const channelStore = useChannelsStore()

  return computed(() => channelStore.currency)
}
