<template>
  <LayoutButton class="favorite-btn" variant="white">
    <HeartIcon class="favorite-btn__icon" />
    <span class="favorite-btn__text">Dodaj do ulubionych</span>
  </LayoutButton>
</template>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/heart.svg?component'

withDefaults(defineProps<{ productId: string }>(), {})
</script>

<style lang="scss" scoped>
.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    color: $gray-color-600;
    margin-right: 8px;
  }
}
</style>
