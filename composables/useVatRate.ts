import type { ComputedRef } from 'vue'

export const useVatRate = (): ComputedRef<number> => {
  const channel = useSalesChannel()
  return computed(() => parseFloat(channel.value?.vat_rate || '0'))
}
