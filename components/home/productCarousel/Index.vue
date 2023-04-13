<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <LayoutHeader class="product-carousel__title" variant="black">{{
        category.name
      }}</LayoutHeader>
      <HomeProductCarouselShowAll />
    </div>
    <LayoutCarousel
      v-if="category.children?.length && !withoutSubcategories"
      class="product-carousel__categories"
      :items="category.children"
      :spaceBetween="20"
      hideNav
    >
      <template #item="{ id, name }: ProductSetList">
        <HomeProductCarouselCategoryButton
          :label="name"
          :isChosen="id === selectedCategory"
          @click="setNewCategory(id)"
        />
      </template>
    </LayoutCarousel>
    <LayoutCarousel :items="products" :spaceBetween="10">
      <template #item="product">
        <ProductMiniature :product="product" />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { CdnMediaType, ProductSetList } from '@heseya/store-core'

// tmp, in the future from the BE
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

const props = withDefaults(
  defineProps<{
    category: ProductSetList
    withoutSubcategories?: boolean
  }>(),
  { withoutSubcategories: false },
)

const selectedCategory = ref(props.category.children?.length && props.category.children[0].id)

const setNewCategory = (value: string) => {
  if (value !== selectedCategory.value) {
    selectedCategory.value = value
  }
}
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
