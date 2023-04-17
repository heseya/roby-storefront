<template>
  <div class="image-carousel">
    <LayoutHeader class="image-carousel__title" variant="black">{{ banner.name }}</LayoutHeader>
    <LayoutCarousel :items="banner.banner_media" :breakpoints="breakpoints">
      <template #item="media: BannerMedia">
        <Media
          class="image-carousel__picture image-carousel__picture--gray-filter"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :media="media.media[0].media"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Banner, BannerMedia } from '@heseya/store-core'

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
    imageWidth?: number | string
    imageHeight?: number | string
    banner: Banner
    grayFilter?: boolean
  }>(),
  {
    imageWidth: 160,
    imageHeight: 60,
    grayFilter: false,
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

    &--gray-filter {
      filter: grayscale(100%);
      transition: all 200ms ease-in-out;

      &:hover {
        filter: grayscale(0);
      }
    }
  }
}
</style>
