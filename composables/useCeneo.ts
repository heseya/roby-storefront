export const useCeneo = () => {
  const { ceneoGuid } = usePublicRuntimeConfig()

  const enabled = computed(() => !!ceneoGuid)

  return { enabled }
}
