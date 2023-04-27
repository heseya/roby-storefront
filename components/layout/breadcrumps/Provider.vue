<template>
  <div></div>
</template>

<script setup lang="ts">
import { BreadcrumbsDto } from '~/interfaces/Breadcrumbs'

const props = withDefaults(
  defineProps<{
    breadcrumbs: BreadcrumbsDto
  }>(),
  {
    breadcrumbs: () => [],
  },
)

const { set } = useBreadcrumbs()

watch(
  () => props.breadcrumbs,
  (breadcrumbs) => {
    set(breadcrumbs)
  },
  { deep: true, immediate: true },
)

// Clear links when route changes
onUnmounted(() => {
  set([])
})
</script>
