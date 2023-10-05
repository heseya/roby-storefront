<template>
  <div v-if="mediaList.length" class="carousel-banner">
    <Swiper class="carousel-banner__slider" watch-slides-progress :slides-per-view="1">
      <SwiperSlide v-for="(item, index) in mediaList" :key="index">
        <div class="carousel-banner__main-card">
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
        <LayoutCarouselButton class="carousel-banner__button" />
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

  &__main-card {
    flex: 1;
    height: 480px;

    @media ($viewport-9) {
      flex-direction: row;
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

  .swiper-slide {
    height: unset;
    width: fit-content;
  }

  &__button {
    position: absolute;
    top: 0;
    right: -64px;
    z-index: 1000;

    @media ($max-viewport-10) {
      display: none;
    }
  }

  &__content-container {
    height: 100%;
    @include flex-column;
    justify-content: center;
    align-items: center;

    opacity: 0;
    transition: opacity 200ms ease-in-out;

    &--visible {
      opacity: 100%;
    }
  }
}
</style>
