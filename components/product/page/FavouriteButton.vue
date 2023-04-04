<template>
  <LayoutButton class="favorite-btn" variant="white">
    <HeartIcon class="favorite-btn__icon" />
    <span class="favorite-btn__text"> {{ t('addToFavorites') }} </span>
  </LayoutButton>
</template>

<i18n lang="json">
{
  "en": {
    "addToFavorites": "Add to favorites"
  },
  "pl": {
    "addToFavorites": "Dodaj do ulubionych"
  }
}
</i18n>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/heart.svg?component'

const t = useLocalI18n()

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
