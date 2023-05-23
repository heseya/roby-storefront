<template>
  <div class="carousel-button" :class="{ 'carousel-button--prev': type === 'prev' }">
    <IconButton
      v-show="firstTimeAllVisible ? false : type === 'next' ? !swiper.isEnd : !swiper.isBeginning"
      class="carousel-button__icon"
      :icon="ArrowNext"
      :icon-size="12"
      @click="type === 'next' ? swiper.slideNext() : swiper.slidePrev()"
    />
  </div>
</template>

<script lang="ts" setup>
import ArrowNext from '@/assets/icons/chevron.svg?component'
import IconButton from '@/components/layout/IconButton.vue'

const swiper = useSwiper()
const firstTime = ref(true)
// values from useSwiper aren't reactive, on first load it checks how many elements are visible
const firstTimeAllVisible = computed(() => {
  if (firstTime.value && swiper.value.visibleSlides) {
    firstTime.value = false
    return swiper.value.slides.length === swiper.value.visibleSlides?.length
  }

  return false
})

withDefaults(
  defineProps<{
    type?: 'next' | 'prev'
  }>(),
  { type: 'prev' },
)
</script>

<style lang="scss" scoped>
.carousel-button {
  height: 100%;
  width: fit-content;
  background: $white-color;

  @include flex-column;
  justify-content: center;

  &__icon {
    width: 36px;
    height: 36px;
    background-color: $gray-color-300;
    border-radius: 50%;
    transition: background-color 200ms ease-in-out;

    &:hover {
      filter: none;
      background-color: $gray-color-400;
    }
  }

  &--prev {
    transform: rotate(180deg);
    left: -36px;
  }
}
</style>
