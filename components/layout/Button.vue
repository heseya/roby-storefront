<template>
  <button :class="[`btn`, `btn--${variant}`]">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary'

withDefaults(
  defineProps<{
    label: string
    variant?: ButtonVariant
  }>(),
  { variant: 'primary' },
)
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  outline: none;
  border: none;
  height: 32px;
  width: 200px;
  border-radius: 4px;
  font-family: $textFont;
  font-size: rem(14);
  transition: background-color 200ms ease-in-out;

  &--primary {
    color: $white-color;
    background-color: $unnamed-color-e1a044;

    &:hover {
      background-color: $gray-color-300;
      cursor: pointer;
    }
  }

  &--secondary {
    color: $gray-color-900;
    background-color: $white-color;

    &:hover {
      background-color: $gray-color-300;
      cursor: pointer;
    }
  }
}
</style>
