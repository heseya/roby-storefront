<template>
  <div
    v-if="ekomiCustomerId"
    id="widget-container"
    :class="`ekomi-widget-container ekomi-widget-${props.token}`"
  ></div>
</template>

<script setup lang="ts">
const { ekomiCustomerId } = usePublicRuntimeConfig()
const props = defineProps<{ token: string }>()

onMounted(() => {
  if (!ekomiCustomerId) return

  setTimeout(() => {
    // @ts-ignore
    window.registerWidget?.(window, props.token)
  }, 2000)
})
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
