<template>
  <div class="reason">
    <div class="reason__icon--background">
      <component class="reason__icon" :is="icon" />
    </div>
    <span class="reason__title">{{ title }}</span>
    <span class="reason__description">{{ description }}</span>
  </div>
</template>

<script lang="ts" setup>
// import ChevronRight from '@/assets/icons/chevron.svg?component'
import { FunctionalComponent } from '@vue/runtime-dom'

export interface ReasonProps {
  title: string
  description: string
  icon: FunctionalComponent
}

defineProps<ReasonProps>()
</script>

<style lang="scss" scoped>
.tmp {
  flex-shrink: 0;
  width: 34px;
  height: 34px;

  svg {
    width: 34px;
    height: 34px;
  }
}

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
    color: $primary-color;

    &--background {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 68px;
      width: 68px;
      border-radius: 50%;
      background-color: $unnamed-color-f9eae8;
    }
  }
}
</style>
