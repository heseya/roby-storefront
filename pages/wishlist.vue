<template>
  <div class="wishlist-page">
    <LayoutHeader variant="black" tag="h1" class="wishlist-page__title">
      {{ t('title') }}
    </LayoutHeader>

    <LayoutEmpty v-if="wishlist.products.length === 0"> {{ t('empty') }} </LayoutEmpty>

    <div v-if="wishlist.products.length > 0" class="wishlist-page__items">
      <ProductMiniature
        v-for="product in wishlist.products"
        :key="product.id"
        horizontal
        :product="product"
        class="wishlist-page__item"
      >
        <ProductPageSmallFavouriteButton class="wishlist-page__btn" :product="product" />
      </ProductMiniature>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Lista życzeń",
    "empty": "Nie masz żadnego produktu dodanego do listy życzeń"
  }
}
</i18n>

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'

const t = useLocalI18n()
const wishlist = useWishlistStore()

useHead({
  title: t('title'),
})
</script>

<style lang="scss" scoped>
.wishlist-page {
  max-width: $container-width;
  padding: 0 $container-padding;
  margin: 0 auto;
  margin-bottom: 50px;

  @media ($viewport-10) {
    margin-top: 90px;
  }

  &__title {
    text-align: left;
    margin-bottom: 24px;
  }

  &__items {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    @media ($viewport-6) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    padding-right: 32px;
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
