<template>
  <button class="icon-btn">
    <div class="icon-btn__icon-container">
      <component :is="icon" />
      <span class="icon-btn__notification" v-show="notificationNumber > 0">{{
        notificationNumber
      }}</span>
    </div>
    <span :class="['icon-btn__label', isResize && 'icon-btn__label--resize']" v-show="label">{{
      label
    }}</span>
  </button>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

withDefaults(
  defineProps<{
    icon: FunctionalComponent
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
  min-width: 32px;
  min-height: 32px;
  flex-shrink: 0;

  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  color: $gray-color-900;
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

    background-color: $secondary-color;
  }

  &__label {
    &--resize {
      @media ($max-viewport-12) {
        display: none;
      }
    }
  }
}
</style>
