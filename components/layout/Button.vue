<template>
  <button
    :class="[
      `btn`,
      `btn--${variant}`,
      `btn--size-${size}`,
      { 'btn--text-dark': textColorThemePrimary === 'dark' && variant === 'primary' },
    ]"
    :disabled="disabled"
    :type="htmlType"
  >
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
    disabled?: boolean
    size?: 'small' | 'medium'
  }>(),
  { variant: 'primary', label: '', htmlType: 'button', disabled: false, size: 'medium' },
)

const textColorThemePrimary = useContrastColorFromCssVar('primary-color-alt')
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: var(--text-font-family, $textFont);
  font-size: rem(14);
  font-weight: 500;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  border: solid 1px $transparent;
  text-decoration: none;

  &--size-small {
    padding: 4px 8px;
    font-size: rem(12);
  }

  &--size-medium {
    @media ($viewport-10) {
      font-size: rem(16);
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--text-dark {
    color: $text-color !important;
  }

  &--primary {
    color: $white-color;
    background-color: var(--primary-color);

    &:not([disabled]):hover {
      background-color: var(--primary-color-alt);
    }
  }

  &--secondary {
    color: $gray-color-900;
    background-color: $white-color;

    &:not([disabled]):hover {
      background-color: $gray-color-300;
    }
  }

  &--white {
    color: $text-color;
    background-color: $white-color;
    cursor: pointer;
    border: solid 1px $gray-color-300;

    &:not([disabled]):hover {
      background-color: $gray-color-300;
    }
  }

  &--gray {
    color: $text-color;
    background-color: $gray-color-300;

    &:not([disabled]):hover {
      background-color: $gray-color-400;
    }
  }
}
</style>
