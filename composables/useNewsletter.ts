import { useGetResponse } from '~/composables/useGetResponse'

/**
 * Wrapper for newsletter subscription providers that may be used in the future.
 */
export const useNewsletter = () => {
  const { subscribe: edroneSubscribe, enabled: edroneEnabled } = useEdrone()
  const { subscribe: grSubscribe, enabled: grEnabled } = useGetResponse()

  const enabled = computed(() => edroneEnabled.value || grEnabled.value)

  const subscribe = async (email: string) => {
    // eslint-disable-next-line no-console
    console.log('subscribe')
    subscribeEdrone(email)
    // eslint-disable-next-line no-console
    console.log('subscribe middle')
    await subscribeGetResponse(email)
    // eslint-disable-next-line no-console
    console.log('subscribe post')
  }

  const subscribeEdrone = (email: string) => {
    if (!edroneEnabled.value) return
    // eslint-disable-next-line no-console
    console.log('subscribeEdrone in')

    edroneSubscribe({
      email,
      customer_tags: 'Newsletter',
      first_name: '',
    })
  }

  const subscribeGetResponse = async (email: string) => {
    if (!grEnabled.value) return

    // eslint-disable-next-line no-console
    console.log('subscribeEdrone in')

    await grSubscribe({
      email,
    })
  }

  return { subscribe, enabled }
}
