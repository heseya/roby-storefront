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
          <slot name="item" v-bind="(item as any)" />
        </div>
      </SwiperSlide>
      <template #container-start>
        <LayoutCarouselButton v-show="!hideNav" class="carousel__button" />
      </template>
      <template #container-end>
        <LayoutCarouselButton v-show="!hideNav" next class="carousel__button" type="next" />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { SwiperOptions } from 'swiper/types'

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
  padding-left: 36px;
  padding-right: 36px;
  overflow: hidden;

  &--without-button {
    padding: 0;
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

    &--without-button {
      padding: 0;
    }

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
    right: -36px;
    z-index: 10;
    background: $white-color;

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
