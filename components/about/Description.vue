<template>
  <div class="description">
    <div class="description__content">
      <span>
        {{ text }}
      </span>
      <div class="description__point">
        <LayoutIcon class="description__point-icon" :icon="Chevron" :size="12" />
        <span>
          {{ point1 }}
        </span>
      </div>
      <div class="description__point">
        <LayoutIcon class="description__point-icon" :icon="Chevron" :size="12" />
        <span>
          {{ point2 }}
        </span>
      </div>
    </div>
    <div class="description__image-container">
      <img class="description__image" :src="imageUrl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'

defineProps<{
  text: string
  point1: string
  point2: string
  imageUrl: string
}>()
</script>

<style lang="scss" scoped>
.description {
  @include flex-row;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 30px;
  }

  &__content {
    flex: 1;

    @include flex-column;
    gap: 30px;
    font-size: rem(16);
  }

  &__point {
    @include flex-row;
    gap: 14px;
  }

  &__point-icon {
    flex-shrink: 0;
    margin-top: 4px;

    color: var(--primary-color-alt);
  }

  &__image-container {
    flex: 1;
    position: relative;
    min-height: 200px;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
