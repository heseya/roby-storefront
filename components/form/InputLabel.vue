<template>
  <label :for="props.for" class="input__label" :class="{ 'input__label--uppercase': uppercase }">
    <slot>{{ label }}</slot>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    for?: string
    uppercase?: boolean
  }>(),
  {
    label: '',
    for: '',
    uppercase: false,
  },
)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/input.scss';
</style>
