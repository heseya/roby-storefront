<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="hs-html-content" v-html="content"></div>
</template>

<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>

<style lang="scss">
@import '@/assets/scss/components/html-content.scss';
</style>
