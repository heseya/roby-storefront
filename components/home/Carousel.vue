<template>
  <div class="carousel">
    <LayoutHeader class="carousel__title" variant="black">{{ t('ourPartners') }}</LayoutHeader>
    <div class="carousel__slider">
      <button
        class="carousel__button carousel__button--prev"
        :class="hidePrev ? 'hide' : ''"
        @click="handlePrev"
      >
        <ArrowNext />
      </button>
      <button class="carousel__button" :class="hideNext ? 'hide' : ''" @click="handleNext">
        <ArrowNext />
      </button>
      <div class="carousel__picture-container" ref="slider">
        <img
          v-for="(image, index) in imageArr"
          :key="index"
          class="carousel__picture"
          :src="image.src"
          :alt="image.alt"
        />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "ourPartners": "Nasi partnerzy"
  }
}
</i18n>

<script lang="ts" setup>
import ArrowNext from '@/assets/icons/arrow-next.svg?component'

interface ImageSrc {
  src: string
  alt: string
}

const imageArr: ImageSrc[] = [
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-HSM-Niszczarki.svg',
    alt: 'hsm',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-Sharp-Kserokopiarki-Drukarki.svg',
    alt: 'sharp',
  },
  {
    src: 'https://***REMOVED***.pl/wp-content/uploads/2021/08/Logo-HSM-Niszczarki.svg',
    alt: 'hsm',
  },
]

const hidePrev = ref(true)
const hideNext = ref(false)
const slider = ref() as Ref<HTMLDivElement>

const handleNext = () => {
  if (slider.value) {
    const width = slider.value.clientWidth
    const scrollWidth = slider.value.scrollWidth
    const scrollPosition = slider.value.scrollLeft + 210
    slider.value.scrollLeft = scrollPosition

    if (scrollPosition >= 200) {
      hidePrev.value = false
    }

    if (scrollPosition + width >= scrollWidth - 50) {
      hideNext.value = true
    }
  }
}
const handlePrev = () => {
  if (slider.value) {
    slider.value.scrollLeft -= 210
    const scrollPosition = slider.value.scrollLeft

    if (scrollPosition <= 210) {
      hidePrev.value = true
    }

    hideNext.value = false
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none !important;
}

.carousel {
  @include flex-column;
  gap: 22px;
  width: 80vw;

  &__slider {
    position: relative;
    padding: 0 26px;
  }

  &__button {
    position: absolute;
    top: calc(50% - 18px);
    right: 0;

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

    &--prev {
      transform: rotate(180deg);
      left: 0;
    }
  }

  &__title {
    text-align: left;
  }

  &__picture-container {
    @include flex-row;
    gap: 50px;
    overflow: hidden;
    scroll-behavior: smooth;
    list-style: none;
  }

  &__picture {
    width: 160px;
    height: 60px;
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
