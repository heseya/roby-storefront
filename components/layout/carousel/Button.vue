<template>
  <button
    class="carousel-button"
    @click="next ? swiper.slideNext() : swiper.slidePrev()"
    v-show="next ? !swiper.isEnd : !swiper.isBeginning"
  >
    <ArrowNext />
  </button>
</template>

<script lang="ts" setup>
import { useSwiper } from 'swiper/vue'
import ArrowNext from '@/assets/icons/arrow-next.svg?component'

const swiper = useSwiper()

defineProps<{
  next?: boolean
}>()
</script>

<style lang="scss" scoped>
.carousel-button {
  width: 36px;
  height: 36px;
  outline: none;
  border: none;
  background-color: $gray-color-300;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: $gray-color-400;
    cursor: pointer;
  }
}
</style>
