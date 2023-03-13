import { useConfigStore } from '@/store/config'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useConfigStore(nuxtApp.$pinia)

  await Promise.all([config.fetchConfig()])
})
