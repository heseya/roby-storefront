/**
 * Wrapper for Edrone newsletter subscription providers that may be used in the future.
 */
export const useNewsletter = () => {
  const { subscribe: edroneSubscribe, enabled: edroneEnabled } = useEdrone()

  const enabled = computed(() => edroneEnabled.value)

  const subscribe = (email: string) => {
    if (!enabled.value) return

    if (edroneEnabled.value)
      edroneSubscribe({
        email,
        customer_tags: 'Newsletter',
        first_name: '',
      })
  }

  return { subscribe, enabled }
}
