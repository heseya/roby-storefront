<template>
  <div class="item">
    <div class="item__icon-container">
      <img class="item__icon" :src="imageUrl" loading="lazy" />
    </div>
    <div class="item__content">
      <LayoutHeader variant="black" class="item__title">{{ item.title }}</LayoutHeader>
      <span>{{ item.description }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageAdvantage } from '~/interfaces/rentPage'

const props = defineProps<{ item: TranslatedRentPageAdvantage }>()

const imageUrl = computed(() => getImageUrl(props.item.image))
</script>

<style lang="scss" scoped>
.item {
  padding: 24px 64px;

  border: 1px solid $gray-color-300;
  border-radius: 4px;

  @include flex-row;
  align-items: center;
  gap: 20px;

  @media ($max-viewport-9) {
    padding: 16px;
    gap: 16px;
  }

  &__icon-container {
    height: 67px;
    width: 67px;
    position: relative;

    flex-shrink: 0;
    color: var(--secondary-color);

    @include flex-row;
    justify-content: center;
    align-items: center;

    @media ($max-viewport-9) {
      height: 44px;
      width: 44px;
    }

    // This is the only way to lighten css variable in the background without adding a new color
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: var(--secondary-color);
      opacity: 0.15;
      z-index: -1;
    }
  }

  &__icon {
    height: 35px;
    width: 35px;
  }

  &__title {
    font-size: rem(20);
    text-align: left;

    @media ($max-viewport-9) {
      font-size: rem(16);
    }
  }

  &__content {
    @include flex-column;
    gap: 5px;
    font-size: rem(16);

    @media ($max-viewport-9) {
      font-size: rem(14);
    }
  }
}
</style>
