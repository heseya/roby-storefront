<template>
  <component class="icon" :height="calculatedSize" :width="calculatedSize" :is="icon" />
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

export type IconSize = 'sm' | 'md' | 'lg' | number

const props = withDefaults(
  defineProps<{
    icon: FunctionalComponent
    size?: IconSize
  }>(),
  {
    size: 'md',
  },
)

const calculatedSize = computed(() => {
  switch (props.size) {
    case 'md':
      return 24
    case 'sm':
      return 16
    case 'lg':
      return 34
    default:
      return isNaN(props.size) ? 24 : props.size
  }
})
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
}
</style>
