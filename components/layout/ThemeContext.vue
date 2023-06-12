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
  '--primary-color-alt': config.env.primary_color_alt,
  '--secondary-color': config.env.secondary_color,
  '--highlight-color': config.env.highlight_color,
  '--error-color': config.env.error_color,
  '--warning-color': config.env.warning_color,
}))
</script>

<style lang="scss" scoped>
.theme {
}
</style>
