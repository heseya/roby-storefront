<template>
  <div class="item">
    <div class="item__icon">
      <LayoutIcon :icon="item.icon" :size="35" />
    </div>
    <div class="item__content">
      <LayoutHeader variant="black" class="item__title">{{ item.title }}</LayoutHeader>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

export interface AdvantageProps {
  title: string
  icon: FunctionalComponent
  text: string
}

defineProps<{ item: AdvantageProps }>()
</script>

<style lang="scss" scoped>
.item {
  padding: 24px 64px;

  border: 1px solid $gray-color-300;
  border-radius: 4px;

  @include flex-row;
  gap: 20px;

  &__icon {
    height: 67px;
    width: 67px;

    flex-shrink: 0;
    color: var(--primary-color);
    background-color: $unnamed-color-f9eae8;
    border-radius: 50%;

    @include flex-row;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-size: rem(20);
    text-align: left;
  }

  &__content {
    @include flex-column;
    gap: 5px;

    font-size: rem(16);
  }
}
</style>
