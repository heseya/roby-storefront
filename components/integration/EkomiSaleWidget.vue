<template>
  <div id="widget-container" :class="`ekomi-widget-container ekomi-widget-${ekomiToken}`"></div>
</template>

<script setup lang="ts">
const { ekomiToken } = usePublicRuntimeConfig()
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
