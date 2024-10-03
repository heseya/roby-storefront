// useSiteMode.ts

import { SiteMode } from '~/interfaces/siteMode'

export function useSiteMode() {
  const config = usePublicRuntimeConfig()

  // Computed property to check if the site is in B2B mode
  const isModeB2B = computed(() => config.siteMode === SiteMode.B2B)

  return {
    isModeB2B,
  }
}
