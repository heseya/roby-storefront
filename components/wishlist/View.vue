<template>
  <BaseContainer class="wishlist-view">
    <LayoutEmpty v-if="wishlist.products.length === 0"> {{ $t('wishlist.empty') }} </LayoutEmpty>

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

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'

const { t: $t } = useI18n({ useScope: 'global' })
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
