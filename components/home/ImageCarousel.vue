<template>
  <div class="image-carousel">
    <LayoutHeader class="image-carousel__title" variant="black">{{ banner.name }}</LayoutHeader>
    <LayoutCarousel :items="banner.banner_media" :breakpoints="breakpoints">
      <template #item="media: BannerMedia">
        <Media
          class="image-carousel__picture"
          :style="{ height: `${imageHeight}px`, width: `${imageWidth}px` }"
          :media="media.media[0].media"
        />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
import { Banner, BannerMedia } from '@heseya/store-core'

const breakpoints = {
  320: { slidesPerView: 1 },
  480: { slidesPerView: 2 },
  640: { slidesPerView: 'auto', spaceBetween: 50 },
}

withDefaults(
  defineProps<{
    imageWidth?: number | string
    imageHeight?: number | string
    banner: Banner
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
