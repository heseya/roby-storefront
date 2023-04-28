<template>
  <div class="reason">
    <div class="reason__icon-container">
      <LayoutIcon :icon="icon" class="reason__icon" :size="34" />
    </div>
    <span class="reason__title">{{ title }}</span>
    <span class="reason__description">{{ description }}</span>
  </div>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

export interface ReasonProps {
  title: string
  description: string
  icon: FunctionalComponent
}

defineProps<ReasonProps>()
</script>

<style lang="scss" scoped>
.reason {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  text-align: center;
  color: $gray-color-900;
  font-size: rem(14);

  &__title {
    font-weight: bold;
  }

  &__icon {
    color: var(--primary-color);
  }

  &__icon-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 68px;
    width: 68px;
    border-radius: 50%;
    background-color: $unnamed-color-f9eae8;
  }
}
</style>
