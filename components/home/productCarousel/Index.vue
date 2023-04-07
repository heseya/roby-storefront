<template>
  <div class="product-carousel">
    <div>
      <LayoutHeader class="product-carousel__title" variant="black">{{ title }}</LayoutHeader>
      <button class="product-carousel__show-all">Pokaż wszystkie</button>
    </div>
    <div class="product-carousel__categories">
      <LayoutCarousel :item-arr="categories" :breakpoints="breakpoints" withoutNavButtons>
        <template #item="{ value, label }: ImageSrc">
          <HomeProductCarouselCategoryButton
            :label="label"
            :isChosen="value === selectedCategory"
            @click="setNewCategory(value)"
          />
        </template>
      </LayoutCarousel>
    </div>
    <LayoutCarousel :item-arr="images" :breakpoints="breakpoints">
      <template #item="{ src, alt }: ImageSrc">
        <img
          class="product-carousel__picture"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :src="src"
          :alt="alt"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { ImageSrc } from '~/components/home/ImageCarousel.vue'

const categories = [
  { label: 'Category1', value: 'cat1' },
  { label: 'Category2', value: 'cat2' },
  { label: 'Category3', value: 'cat3' },
  { label: 'Category4', value: 'cat4' },
  { label: 'Category5', value: 'cat5' },
]

const breakpoints = {
  480: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  850: { slidesPerView: 4 },
  1100: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
  1680: { slidesPerView: 7 },
}

const selectedCategory = ref(categories[0].value)

const setNewCategory = (value: string) => {
  if (value !== selectedCategory.value) {
    selectedCategory.value = value
  }

  console.log(value, selectedCategory.value)
}

withDefaults(
  defineProps<{
    title: string
    images: ImageSrc[]
    imageWidth?: number
    imageHeight?: number
  }>(),
  {
    imageWidth: 160,
    imageHeight: 60,
  },
)
</script>

<style lang="scss" scoped>
.product-carousel {
  @include flex-column;
  gap: 22px;

  &__categories {
    //@include flex-row;
    //justify-content: center;
    //gap: 20px;
  }

  &__show-all {
    all: unset;
    font-family: $textFont;
    font-size: rem(12);

    text-transform: uppercase;
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
