<template>
  <div class="drop-down-container">
    <div
      class="drop-down-container__slot"
      :class="{ 'drop-down-container__slot--expand': isExpand }"
    >
      <slot />
    </div>
    <button
      class="drop-down-container__button"
      :class="{ 'drop-down-container__button--expand': isExpand }"
      @click="isExpand = !isExpand"
    >
      {{ isExpand ? 'Zwiń' : 'Rozwiń' }}
      <LayoutIcon
        class="drop-down-container__button-icon"
        :class="{ 'drop-down-container__button-icon--expand': isExpand }"
        :icon="Chevron"
        :size="8"
      />
    </button>
    <button @click="handle">log</button>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
import Button from '~/components/layout/nav/Button.vue'

const isExpand = ref(false)
</script>

<style lang="scss" scoped>
.drop-down-container {
  height: 100%;
  &__slot {
    overflow: hidden;
    max-height: 700px;

    transition: max-height 500ms ease-in-out;

    &--expand {
      max-height: 5000px;
    }

    @media ($viewport-8) {
      max-height: 100%;
    }
  }

  &__button {
    @include reset-button;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 8px;

    @include flex-row;
    gap: 4px;
    align-items: center;
    justify-content: center;

    background-color: $white-color;
    box-shadow: 0 -20px 16px $white-color;
    transition: all 500ms ease-in-out;

    color: $blue-color;

    &--expand {
      box-shadow: none;
    }

    &:hover {
      cursor: pointer;
    }

    @media ($viewport-8) {
      display: none;
    }
  }
  &__button-icon {
    color: $blue-color;
    transform: rotate(90deg);
    transition: all 500ms ease-in-out;

    &--expand {
      transform: rotate(-90deg);
    }
  }
}
</style>
