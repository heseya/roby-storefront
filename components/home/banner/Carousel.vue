<template>
  <div v-if="mediaList.length" class="carousel-banner">
    <Swiper
      class="carousel-banner__slider"
      :slides-per-view="1"
      :loop="true"
      :modules="[SwiperAutoplay, SwiperPagination]"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="(item, index) in mediaList" :key="index">
        <div class="carousel-banner__slide">
          <LazyHomeBannerCard
            :title="item.title"
            :subtitle="item.subtitle"
            :link="item.url"
            :media="item.media"
            centered
            :title-tag="index === 0 ? 'h1' : 'h2'"
            :height="480"
            :gradient="gradient"
          />
        </div>
      </SwiperSlide>
      <template #container-start>
        <LazyLayoutCarouselButton
          always-visible
          class="carousel-banner__button carousel-banner__button--prev"
        />
      </template>
      <template #container-end>
        <LazyLayoutCarouselButton
          always-visible
          next
          class="carousel-banner__button"
          type="next"
          :gradient="gradient"
        />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import type { Banner } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
  gradient?: boolean
}>()

const mediaList = computed(() => props.banner?.banner_media)
</script>

<style lang="scss" scoped>
.carousel-banner {
  @include flex-column;
  width: 100%;
  align-items: center;
  overflow: hidden;
  max-width: 1920px;
  margin: 0 auto;

  @media ($max-viewport-10) {
    padding: 0;
  }

  &__slider {
    position: relative;
    min-height: 36px;
    overflow: visible;
    width: 100%;
    max-width: 100%;
    margin: 0;

    @media ($max-viewport-10) {
      padding: 0;
    }
  }

  &__slide {
    flex: 1;
    flex-direction: row;
    // height: 280px;
    height: 400px;
    width: 100%;

    // @media ($viewport-6) {
    //   height: 380px;
    // }

    // @media ($viewport-9) {
    //   height: 480px;
    // }

    // @media ($viewport-12) {
    //   height: 580px;
    // }

    @media ($viewport-6) {
      height: 480px;
    }

    :deep(.card__title) {
      font-size: rem(46);
      line-height: rem(52);

      @media ($max-viewport-9) {
        font-size: rem(18);
        line-height: rem(22);
      }
    }
  }

  .swiper-slide {
    height: unset;
    width: 100%;
  }

  &__button {
    position: absolute;
    top: 0;
    right: 16px !important;
    z-index: 1000;

    &--prev {
      right: auto;
      left: 16px !important;
    }

    @media ($max-viewport-10) {
      display: none;
    }
  }
}
</style>
