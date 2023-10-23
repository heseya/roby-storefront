<template>
  <div class="carousel-button" :class="{ 'carousel-button--prev': type === 'prev' }">
    <IconButton
      v-show="firstTimeAllVisible ? false : type === 'next' ? !swiper.isEnd : !swiper.isBeginning"
      class="carousel-button__icon"
      :icon="ArrowNext"
      :icon-size="12"
      :title="t(type)"
      @click="type === 'next' ? swiper.slideNext() : swiper.slidePrev()"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "next": "Przewiń do następnego slajdu",
    "prev": "Przewiń do poprzedniego slajdu"
  },
  "en": {
    "next": "Scroll to the next slide",
    "prev": "Scroll to the previous slide"
  }
}
</i18n>

<script lang="ts" setup>
import ArrowNext from '@/assets/icons/chevron.svg?component'
import IconButton from '@/components/layout/IconButton.vue'

const t = useLocalI18n()

const swiper = useSwiper()
const firstTime = ref(true)
// values from useSwiper aren't reactive, on first load it checks how many elements are visible
const firstTimeAllVisible = computed(() => {
  // @ts-ignore - visibleSlides is not in the types, but it's there
  const visibleSlides: HTMLElement[] = swiper.value.visibleSlides

  if (firstTime.value && visibleSlides) {
    firstTime.value = false
    return swiper.value.slides.length === visibleSlides?.length
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

  @include flex-column;
  justify-content: center;

  &__icon {
    width: 36px;
    height: 36px;
    background-color: $gray-color-300 !important;
    border-radius: 50%;
    transition: background-color 200ms ease-in-out;
    position: relative;

    &:hover {
      filter: none;
      background-color: $gray-color-400 !important;
    }

    &::after {
      --clickable-space-around-button: -15px;
      content: '';
      left: var(--clickable-space-around-button);
      right: var(--clickable-space-around-button);
      bottom: var(--clickable-space-around-button);
      top: var(--clickable-space-around-button);
      position: absolute;
    }
  }

  &--prev {
    transform: rotate(180deg);
    left: -36px;
  }
}
</style>
