<template>
  <component
    :is="icon"
    :class="['icon', { 'icon--resize': isResize }]"
    :height="calculatedSize"
    :width="calculatedSize"
  />
</template>

<script lang="ts" setup>
import type { FunctionalComponent } from 'vue'

export type IconSize = 'sm' | 'md' | 'lg' | number

const props = withDefaults(
  defineProps<{
    isResize?: boolean
    icon: FunctionalComponent
    size?: IconSize
  }>(),
  {
    size: 'md',
    isResize: false,
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

  &--resize {
    @media ($max-viewport-12) {
      height: 16px;
      width: 16px;
    }
  }
}
</style>
