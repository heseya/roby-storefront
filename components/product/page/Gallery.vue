<template>
  <div class="product-gallery">
    <button class="product-gallery__close-btn" @click="emit('close')">
      <LayoutIcon :size="10" :icon="CrossIcon" />
    </button>
    <button
      class="product-gallery__btn product-gallery__btn--prev"
      :disabled="!prev"
      @click="active = prev"
    >
      <LayoutIcon :size="13" :icon="ChevronIcon" />
    </button>
    <button
      class="product-gallery__btn product-gallery__btn--next"
      :disabled="!next"
      @click="active = next"
    >
      <LayoutIcon :size="13" :icon="ChevronIcon" />
    </button>

    <div class="product-gallery__main">
      <Media class="product-gallery__item" :media="active" width="1400" height="1400" />
    </div>

    <div class="product-gallery__list">
      <Media
        v-for="m in media"
        :key="m.id"
        class="product-gallery__item"
        :media="m"
        width="164"
        height="164"
        @click="setActive(m)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CdnMedia } from '@heseya/store-core'
import ChevronIcon from '@/assets/icons/chevron.svg?component'
import CrossIcon from '@/assets/icons/cross.svg?component'

const props = defineProps<{
  media: CdnMedia[]
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const active = ref<CdnMedia | null>(props.media[0] || null)

const setActive = (image: CdnMedia) => {
  active.value = image
}

const next = computed(() => {
  const index = props.media.findIndex((m) => m.id === active.value?.id)
  return props.media[index + 1] || null // props.media[0]
})

const prev = computed(() => {
  const index = props.media.findIndex((m) => m.id === active.value?.id)
  return props.media[index - 1] || null // props.media[props.media.length - 1]
})

onKeyStroke('ArrowRight', () => {
  if (next.value) active.value = next.value
})

onKeyStroke('ArrowLeft', () => {
  if (prev.value) active.value = prev.value
})

onKeyStroke('Escape', () => {
  emit('close')
})
</script>

<style lang="scss" scoped>
$btn-position-mobile: 16px;
$btn-position-desktop: 48px;

.product-gallery {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  display: flex;
  gap: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $btn-position-mobile;
  z-index: 100000;

  &__close-btn {
    all: unset;
    position: absolute;
    top: $btn-position-mobile;
    right: $btn-position-mobile;
    cursor: pointer;

    @media ($viewport-10) {
      transform: scale(2.6);
      top: $btn-position-desktop;
      right: $btn-position-desktop;
    }
  }

  &__btn {
    all: unset;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: $gray-color-300;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ($viewport-10) {
      width: 72px;
      height: 72px;

      > svg {
        transform: scale(1.6);
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: $gray-color-400;
    }

    &--prev {
      left: $btn-position-mobile;
      transform: translateY(-50%) rotate(180deg);

      @media ($viewport-10) {
        left: $btn-position-desktop;
      }
    }

    &--next {
      right: $btn-position-mobile;

      @media ($viewport-10) {
        right: $btn-position-desktop;
      }
    }
  }

  &__main {
    width: 100%;
    max-width: 70vh;
    aspect-ratio: 1/1;
  }

  &__item {
    border: solid 1px $gray-color-300;
  }

  &__list {
    max-width: 100%;
    display: flex;
    gap: 10px;
    overflow-x: auto;
  }

  &__list &__item {
    cursor: pointer;
    width: 70px;
    flex-shrink: 0;
    min-height: max-content;
    aspect-ratio: 1/1;

    @media ($viewport-10) {
      width: 140px;
    }
  }
}
</style>
