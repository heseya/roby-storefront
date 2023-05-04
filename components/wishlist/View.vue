<template>
  <BaseContainer class="wishlist-view">
    <LayoutEmpty v-if="wishlist.products.length === 0"> {{ t('empty') }} </LayoutEmpty>

    <div v-if="wishlist.products.length > 0" class="wishlist-view__items">
      <ProductMiniature
        v-for="product in wishlist.products"
        :key="product.id"
        horizontal
        :product="product"
        class="wishlist-view__item"
      />
    </div>
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "empty": "Nie masz żadnego produktu dodanego do listy życzeń"
  }
}
</i18n>

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'

const t = useLocalI18n()
const wishlist = useWishlistStore()
</script>

<style lang="scss" scoped>
.wishlist-view {
  width: 100%;

  &__items {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    @media ($viewport-6) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
