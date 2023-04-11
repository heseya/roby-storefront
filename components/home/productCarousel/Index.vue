<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <LayoutHeader class="product-carousel__title" variant="black">{{ title }}</LayoutHeader>
      <HomeProductCarouselShowAll />
    </div>
    <LayoutCarousel
      class="product-carousel__categories"
      :item-arr="categories"
      :spaceBetween="20"
      withoutNavButtons
    >
      <template #item="{ value, label }: ImageSrc">
        <HomeProductCarouselCategoryButton
          :label="label"
          :isChosen="value === selectedCategory"
          @click="setNewCategory(value)"
        />
      </template>
    </LayoutCarousel>
    <LayoutCarousel :item-arr="products" :spaceBetween="10">
      <template #item="product">
        <ProductMiniature :product="product" />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { CdnMediaType } from '@heseya/store-core'

const categories = [
  { label: 'Category1', value: 'cat1' },
  { label: 'Category2', value: 'cat2' },
  { label: 'Category3', value: 'cat3' },
  { label: 'Category4', value: 'cat4' },
  { label: 'Category5', value: 'cat5' },
]

const products = [
  {
    name: 'Canon',
    slug: 'canon-printer',
    price_min: 12333,
    price_max: 12333,
    attributes: [],
    cover: {
      url: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
      alt: 'printer',
      type: CdnMediaType.Photo,
    },
    tags: [],
  },
  {
    name: 'Canon',
    slug: 'canon-printer',
    price_min: 12333,
    price_max: 12333,
    attributes: [],
    cover: {
      url: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
      alt: 'printer',
      type: CdnMediaType.Photo,
    },
    tags: [],
  },
  {
    name: 'Canon',
    slug: 'canon-printer',
    price_min: 12333,
    price_max: 12333,
    attributes: [],
    cover: {
      url: 'https://***REMOVED***.pl/wp-content/uploads/2020/07/Lexmark-XC4140-FRONT.jpg',
      alt: 'printer',
      type: CdnMediaType.Photo,
    },
    tags: [],
  },
]

const selectedCategory = ref(categories[0].value)

const setNewCategory = (value: string) => {
  if (value !== selectedCategory.value) {
    selectedCategory.value = value
  }
}

defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.product-carousel {
  @include flex-column;
  gap: 22px;

  &__header {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    @media ($max-viewport-3) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__title {
    padding-left: 150px;
    flex: 1;
    line-height: 130%;

    @media ($max-viewport-8) {
      padding: 0;
      text-align: left;
    }

    @media ($max-viewport-3) {
      align-self: flex-start;
    }
  }

  &__categories {
    @include flex-row;
    justify-content: center;

    @media ($max-viewport-8) {
      justify-content: flex-start;
    }
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
