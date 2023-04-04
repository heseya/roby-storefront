<template>
  <LayoutButton
    :class="['favorite-btn', { 'favorite-btn--active': isInWishlist }]"
    :variant="isInWishlist ? 'gray' : 'white'"
    @click="toggle"
  >
    <HeartIcon class="favorite-btn__icon" />
    <span class="favorite-btn__text">
      {{ isInWishlist ? t('removeFromFavorites') : t('addToFavorites') }}
    </span>
  </LayoutButton>
</template>

<i18n lang="json">
{
  "en": {
    "addToFavorites": "Add to favorites",
    "removeFromFavorites": "Remove from favorites"
  },
  "pl": {
    "addToFavorites": "Dodaj do ulubionych",
    "removeFromFavorites": "Usuń z ulubionych"
  }
}
</i18n>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

import HeartIcon from '@/assets/icons/heart.svg?component'

const t = useLocalI18n()
const props = withDefaults(defineProps<{ product: ProductList }>(), {})

const { isInWishlist, toggle } = useWishlist(props.product)
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
