import { useGetResponse } from '~/composables/useGetResponse'

/**
 * Wrapper for newsletter subscription providers that may be used in the future.
 */
export const useNewsletter = () => {
  const { subscribe: edroneSubscribe, enabled: edroneEnabled } = useEdrone()
  const { subscribe: grSubscribe, enabled: grEnabled } = useGetResponse()

  const enabled = computed(() => edroneEnabled.value || grEnabled.value)

  const subscribe = async (email: string) => {
    subscribeEdrone(email)
    await subscribeGetResponse(email)
  }

  const subscribeEdrone = (email: string) => {
    if (!edroneEnabled.value) return

    edroneSubscribe({
      email,
      customer_tags: 'Newsletter',
      first_name: '',
    })
  }

  const subscribeGetResponse = async (email: string) => {
    if (!grEnabled.value) return

    await grSubscribe({
      email,
    })
  }

  return { subscribe, enabled }
}
