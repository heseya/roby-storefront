<template>
  <button :class="[`btn`, `btn--${variant}`]">
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary' | 'white' | 'gray'

withDefaults(
  defineProps<{
    label?: string
    variant?: ButtonVariant
    htmlType?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', label: '', htmlType: 'button' },
)
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: $textFont;
  font-size: rem(14);
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  border: solid 1px $transparent;

  &--primary {
    color: $white-color;
    background-color: var(--secondary-color-alt);

    &:hover {
      background-color: var(--secondary-color);
    }
  }

  &--secondary {
    color: $gray-color-900;
    background-color: $white-color;

    &:hover {
      background-color: $gray-color-300;
    }
  }

  &--white {
    color: $text-color;
    background-color: $white-color;
    cursor: pointer;
    border: solid 1px $gray-color-300;

    &:hover {
      background-color: $gray-color-300;
    }
  }

  &--gray {
    color: $text-color;
    background-color: $gray-color-300;

    &:hover {
      background-color: $gray-color-400;
    }
  }
}
</style>
