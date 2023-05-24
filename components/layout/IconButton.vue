<template>
  <button class="icon-btn">
    <div class="icon-btn__icon-container">
      <LayoutIcon :icon="icon" :size="iconSize" :is-resize="isResize" />
      <ClientOnly>
        <span v-show="isNumber(count)" class="icon-btn__notification">{{ count }}</span>
      </ClientOnly>
    </div>
    <span v-show="label" :class="['icon-btn__label', { 'icon-btn__label--resize': isResize }]">{{
      label
    }}</span>
  </button>
</template>

<script lang="ts" setup>
import isNumber from 'lodash/isNumber'
import { FunctionalComponent } from 'vue'
import { IconSize } from '@/components/layout/Icon.vue'

withDefaults(
  defineProps<{
    icon: FunctionalComponent
    iconSize?: IconSize
    label?: string
    count?: number
    isResize?: boolean
  }>(),
  { label: '', iconSize: 'md', count: undefined, isResize: false },
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
  transition: filter 0.3s;

  &:hover {
    cursor: pointer;
    filter: brightness(1.5);
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
    background-color: var(--primary-color);
  }

  &__label {
    color: $gray-color-900;
    transition: color 0.3s;

    &--resize {
      @media ($max-viewport-12) {
        display: none;
      }
    }
  }

  &:hover &__label {
    color: var(--secondary-color);
  }
}
</style>
