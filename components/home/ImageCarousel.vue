<template>
  <div class="image-carousel">
    <LayoutHeader class="image-carousel__title" variant="black">{{ banner.name }}</LayoutHeader>
    <LayoutCarousel :items="banner.banner_media" :breakpoints="breakpoints">
      <template #item="media: BannerMedia">
        <Media
          class="image-carousel__picture"
          :class="{ 'image-carousel__picture--gray-filter': grayFilter }"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :media="media.media[0].media"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { Banner, BannerMedia } from '@heseya/store-core'
import { SwiperOptions } from 'swiper/types'

const breakpoints: Record<number, SwiperOptions> = {
  320: { slidesPerView: 1 },
  480: { slidesPerView: 2 },
  640: { slidesPerView: 'auto', spaceBetween: 50 },
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

    @media ($max-viewport-9) {
      font-size: rem(18);
    }
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;

    &--gray-filter {
      filter: grayscale(100%) brightness(150%);
      transition: all 200ms ease-in-out;

      &:hover {
        filter: grayscale(0) brightness(100%);
      }
    }
  }
}
</style>
