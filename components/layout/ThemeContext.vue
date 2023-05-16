<template>
  <div id="theme-context" :style="colorStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config'

const config = useConfigStore()

const colorStyles = computed(() => ({
  '--primary-color': config.env.primary_color,
  '--secondary-color': config.env.secondary_color,
  '--primary-color-alt': config.env.primary_color_alt,
  '--error-color': config.env.error_color,
}))
</script>

<style lang="scss" scoped>
.theme {
}
</style>
