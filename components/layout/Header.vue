<template>
  <span :class="[`header`, `header__${variant}`]">
    <slot />
  </span>
</template>

<script lang="ts" setup>
type HeaderVariant = 'white' | 'black'

withDefaults(
  defineProps<{
    variant: HeaderVariant
  }>(),
  { variant: 'white' },
)
</script>

<style lang="scss" scoped>
.header {
  font-size: rem(26);
  font-weight: bold;
  text-align: center;

  &__white {
    color: $white-color;
  }

  &__black {
    color: $black-color;
  }
}
</style>
