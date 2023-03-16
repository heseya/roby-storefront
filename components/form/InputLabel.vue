<template>
  <label :for="props.for" class="input__label">
    <slot>{{ label }}</slot>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    for?: string
  }>(),
  {
    label: '',
    for: '',
  },
)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
