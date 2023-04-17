<template>
  <IconButton
    v-show="type === 'next' ? !swiper.isEnd : !swiper.isBeginning"
    :class="['carousel-button', { 'carousel-button--prev': type === 'prev' }]"
    :icon="ArrowNext"
    :icon-size="12"
    @click="type === 'next' ? swiper.slideNext() : swiper.slidePrev()"
  />
</template>

<script lang="ts" setup>
import { useSwiper } from 'swiper/vue'
import ArrowNext from '@/assets/icons/chevron.svg?component'
import IconButton from '~/components/layout/IconButton.vue'

const swiper = useSwiper()

withDefaults(
  defineProps<{
    type?: 'next' | 'prev'
  }>(),
  { type: 'prev' },
)
</script>

<style lang="scss" scoped>
.carousel-button {
  width: 36px;
  height: 36px;
  background-color: $gray-color-300;
  border-radius: 50%;

  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: $gray-color-400;
  }

  &--prev {
    transform: rotate(180deg);
    left: -36px;
  }
}
</style>
