<template>
  <button class="icon-btn">
    <div class="icon-btn__icon-container">
      <LayoutIcon :icon="icon" :size="iconSize" :isResize="isResize" />
      <span v-show="notificationNumber > 0" class="icon-btn__notification">{{
        notificationNumber
      }}</span>
    </div>
    <span v-show="label" :class="['icon-btn__label', { 'icon-btn__label--resize': isResize }]">{{
      label
    }}</span>
  </button>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import { IconSize } from '~/components/layout/Icon.vue'

withDefaults(
  defineProps<{
    icon: FunctionalComponent
    iconSize?: IconSize
    label?: string
    notificationNumber?: number
    isResize?: boolean
  }>(),
  { label: '', notificationNumber: 0, isResize: false },
)
</script>

<style lang="scss" scoped>
.icon-btn {
  padding: 0;
  min-width: 16px;
  min-height: 16px;
  flex-shrink: 0;

  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &__icon-container {
    position: relative;
    display: flex;
  }

  &__notification {
    position: absolute;
    right: -10px;
    top: -8px;

    height: 15px;
    width: 15px;

    border-radius: 50%;
    line-height: 15px;
    font-size: rem(10);

    color: $gray-color-900;
    background-color: var(--secondary-color);
  }

  &__label {
    color: $gray-color-900;

    &--resize {
      @media ($max-viewport-12) {
        display: none;
      }
    }
  }
}
</style>
