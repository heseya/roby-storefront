<template>
  <component :is="tag" :class="[`header`, `header--${variant}`]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
type HeaderVariant = 'white' | 'black'

withDefaults(
  defineProps<{
    tag?: string
    variant?: HeaderVariant
  }>(),
  {
    tag: 'span',
    variant: 'white',
  },
)
</script>

<style lang="scss" scoped>
.header {
  font-size: rem(26);
  font-weight: bold;
  text-align: center;

  &--white {
    color: $white-color;
  }

  &--black {
    color: $gray-color-900;
  }
}
</style>
