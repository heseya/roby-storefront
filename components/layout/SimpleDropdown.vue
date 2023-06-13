<template>
  <div class="simple-dropdown">
    <div class="simple-dropdown__header">
      <slot name="title" :expanded="isExpanded">
        {{ title }}
      </slot>

      <LayoutIconButton
        class="simple-dropdown__button-icon"
        :class="{ 'simple-dropdown__button-icon--expand': isExpanded }"
        :icon="Chevron"
        :icon-size="12"
        @click="isExpanded = !isExpanded"
      />
    </div>

    <div
      class="simple-dropdown__content"
      :style="{
        // TODO: change fixed height
        maxHeight: (isExpanded ? 300 : 0) + 'px',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chevron from '@/assets/icons/chevron.svg?component'

defineProps<{
  title?: string
}>()

defineSlots<{
  default(props: unknown): unknown
  title(props: { expanded: boolean }): unknown
}>()

const isExpanded = ref(true)
</script>

<style lang="scss" scoped>
.simple-dropdown {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button-icon {
    color: $text-color;
    transform: rotate(90deg);
    transition: all 500ms ease-in-out;

    &--expand {
      transform: rotate(-90deg);
    }
  }

  &__content {
    overflow: hidden;
    transition: 0.3s;
  }
}
</style>
