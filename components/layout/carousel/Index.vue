<template>
  <div class="carousel" :class="{ 'carousel--without-button': hideNav }">
    <Swiper
      class="carousel__slider"
      :class="{ 'carousel__slider--without-button': hideNav }"
      watch-slides-progress
      :breakpoints="breakpoints"
      slides-per-view="auto"
      :space-between="spaceBetween"
    >
      <SwiperSlide v-for="(item, index) in items" v-slot="{ isVisible }" :key="index">
        <div
          class="carousel__content-container"
          :class="{ 'carousel__content-container--visible': isVisible }"
        >
          <slot name="item" v-bind="item" />
        </div>
      </SwiperSlide>
      <template v-if="!hideNav" #container-start>
        <LayoutCarouselButton class="carousel__button" />
      </template>
      <template v-if="!hideNav" #container-end>
        <LayoutCarouselButton next class="carousel__button" type="next" />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { SwiperOptions } from 'swiper/types'
import 'swiper/css'

withDefaults(
  defineProps<{
    items: unknown[]
    breakpoints?: SwiperOptions['breakpoints']
    hideNav?: boolean
    spaceBetween?: number
  }>(),
  { hideNav: false, spaceBetween: 0, breakpoints: undefined },
)
</script>

<style lang="scss" scoped>
.carousel {
  @include flex-column;
  align-items: center;
  padding: 0 36px;
  overflow: hidden;

  &--without-button {
    padding: 0;
  }

  &__slider {
    position: relative;
    min-height: 36px;
    overflow: visible;
    width: fit-content;
    max-width: 100%;
    padding: 0 26px;
    margin: 0;

    &--without-button {
      padding: 0;
    }
  }

  .swiper-slide {
    width: fit-content;
  }

  &__button {
    position: absolute;
    top: calc(50% - 18px);
    right: -36px;
    z-index: 10;
  }

  &__content-container {
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
