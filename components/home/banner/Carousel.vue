<template>
  <div v-if="mediaList.length" class="carousel-banner">
    <Swiper class="carousel-banner__slider" :slides-per-view="1">
      <SwiperSlide v-for="(item, index) in mediaList" :key="index">
        <div class="carousel-banner__slide">
          <HomeBannerCard
            :title="item.title"
            :subtitle="item.subtitle"
            :link="item.url"
            :media="item.media"
            centered
            :title-tag="index === 0 ? 'h1' : 'h2'"
          />
        </div>
      </SwiperSlide>
      <template #container-start>
        <LayoutCarouselButton class="carousel-banner__button carousel-banner__button--prev" />
      </template>
      <template #container-end>
        <LayoutCarouselButton next class="carousel-banner__button" type="next" />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Banner } from '@heseya/store-core'

const props = defineProps<{
  banner: Banner
}>()

const mediaList = computed(() => props.banner?.banner_media)
</script>

<style lang="scss" scoped>
.carousel-banner {
  @include flex-column;
  width: 100%;
  align-items: center;
  overflow: hidden;
  max-width: 2550px;
  margin: 0 auto;

  @media ($max-viewport-10) {
    padding: 0;
  }

  &__slider {
    position: relative;
    min-height: 36px;
    overflow: visible;
    width: fit-content;
    max-width: 100%;
    margin: 0;

    @media ($max-viewport-10) {
      padding: 0;
    }
  }

  &__slide {
    flex: 1;
    flex-direction: row;
    height: 280px;
    width: 100%;

    @media ($viewport-6) {
      height: 380px;
    }

    @media ($viewport-9) {
      height: 480px;
    }

    @media ($viewport-12) {
      height: 580px;
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
    right: 16px;
    z-index: 1000;

    &--prev {
      right: auto;
      left: 16px;
    }

    @media ($max-viewport-10) {
      display: none;
    }
  }
}
</style>
