<template>
  <div class="image-carousel">
    <LayoutHeader class="image-carousel__title" variant="black">{{ title }}</LayoutHeader>
    <LayoutCarousel :itemArr="images" :breakpoints="breakpoints">
      <template #item="{ src, alt }: ImageSrc">
        <img
          class="image-carousel__picture"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :src="src"
          :alt="alt"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
export interface ImageSrc {
  src: string
  alt: string
}

const breakpoints = {
  480: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  850: { slidesPerView: 4 },
  1100: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
  1680: { slidesPerView: 7 },
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
.image-carousel {
  @include flex-column;
  gap: 22px;

  &__title {
    text-align: left;
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
