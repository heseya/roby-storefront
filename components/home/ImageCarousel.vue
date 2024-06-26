<template>
  <div class="image-carousel">
    <LayoutHeader class="image-carousel__title" variant="black" :tag="headerTag">
      {{ banner.name }}
    </LayoutHeader>
    <LayoutCarousel :items="banner.banner_media" :breakpoints="breakpoints">
      <template #item="media">
        <LazyMedia
          class="image-carousel__picture"
          :class="{
            'image-carousel__picture--gray-filter': grayFilter,
            'image-carousel__picture--drop-shadow': dropShadow,
          }"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :media="media.media[0].media"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import type { Banner } from '@heseya/store-core'
import type { SwiperOptions } from 'swiper/types'

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
    dropShadow?: boolean
    headerTag?: string
  }>(),
  {
    imageWidth: 160,
    imageHeight: 60,
    grayFilter: false,
    dropShadow: false,
    headerTag: 'span',
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
    margin: 0.5rem 0;
    padding: 4px 8px;

    &--gray-filter {
      filter: grayscale(100%) brightness(150%);
      transition: all 200ms ease-in-out;

      &:hover {
        filter: grayscale(0) brightness(100%);
      }
    }

    &--drop-shadow {
      transition: 0.3s box-shadow linear;

      &:hover {
        box-shadow: 1px 1px 5px gray;
      }
    }
  }
}
</style>
