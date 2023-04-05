<template>
  <div class="carousel">
    <LayoutHeader class="carousel__title" variant="black">{{ title }}</LayoutHeader>
    <Swiper class="carousel__slider" slides-per-view="4" watch-slides-progress>
      <SwiperSlide v-for="(image, index) in imageArr" v-slot="{ isVisible }" :key="index">
        <div
          class="carousel__picture-container"
          :class="{ 'carousel__picture-container--visible': isVisible }"
        >
          <img class="carousel__picture" :src="image.src" :alt="image.alt" />
        </div>
      </SwiperSlide>
      <template #container-start>
        <LayoutCarouselButton class="carousel__button carousel__button--prev" />
      </template>
      <template #container-end>
        <LayoutCarouselButton next class="carousel__button" />
      </template>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ImageSrc } from '~/components/home/Carousel.vue'

defineProps<{
  title: string
  imageArr: ImageSrc[]
}>()
</script>

<style lang="scss" scoped>
.carousel {
  //overflow: hidden;

  &__slider {
    position: relative;
    margin: 0 64px;
    overflow: visible;
  }

  &__button-background {
    background-color: $white-color;
  }

  &__button {
    position: absolute;
    top: calc(50% - 18px);
    right: -64px;
    z-index: 10;

    &--prev {
      transform: rotate(180deg);
      left: -64px;
    }
  }

  &__picture-container {
    @include flex-column;
    justify-content: center;
    align-items: center;
    opacity: 0;

    transition: opacity 200ms ease-in-out;

    &--visible {
      opacity: 100%;
    }
  }

  &__picture {
    width: 160px;
    height: 60px;
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
