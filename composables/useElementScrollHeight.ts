import type { MaybeComputedElementRef } from '@vueuse/core'

export const useElementScrollHeight = (target: MaybeComputedElementRef) => {
  const height = ref(0)

  useResizeObserver(target, ([entry]) => {
    height.value = entry.target.scrollHeight || 0
  })

  return height
}
