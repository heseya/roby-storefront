<template>
  <div class="carousel">
    <Swiper class="carousel__slider" watch-slides-progress :breakpoints="breakpoints">
      <SwiperSlide v-for="(item, index) in itemArr" v-slot="{ isVisible }" :key="index">
        <div
          class="carousel__content-container"
          :class="{ 'carousel__content-container--visible': isVisible }"
        >
          <slot name="item" v-bind="item" />
        </div>
      </SwiperSlide>
      <template #container-start>
        <LayoutCarouselButton class="carousel__button" />
      </template>
      <template #container-end>
        <LayoutCarouselButton next class="carousel__button" type="next" />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { SwiperOptions } from 'swiper/types'
import 'swiper/css'

defineProps<{
  itemArr: unknown[]
  breakpoints: SwiperOptions['breakpoints']
}>()
</script>

<style lang="scss" scoped>
.carousel {
  overflow: hidden;

  &__slider {
    position: relative;
    margin: 0 64px;
    overflow: visible;
  }

  &__button {
    position: absolute;
    top: calc(50% - 18px);
    right: -64px;
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
