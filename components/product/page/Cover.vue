<template>
  <div
    class="product-cover-gallery"
    :class="{ 'product-cover-gallery--singular': media.length < 2 }"
  >
    <div class="product-cover-gallery__list">
      <Media
        v-for="image in props.media"
        :key="image.id"
        class="product-cover-gallery__item"
        :media="image"
        width="100"
        height="100"
        @click="setActive(image)"
      />
    </div>
    <div class="product-cover-gallery__main">
      <Media
        class="product-cover-gallery__item"
        :media="active"
        width="500"
        height="500"
        @click="openBigGallery"
      />
    </div>

    <ProductPageGallery
      v-if="isBigGalleryOpen"
      :media="props.media"
      @close="isBigGalleryOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { CdnMedia } from '@heseya/store-core'

const props = defineProps<{
  media: CdnMedia[]
}>()

const isBigGalleryOpen = ref(false)
const active = ref<CdnMedia | null>(null)
// const shownImages = computed(() => props.media.filter((m) => m.id !== active.value?.id))

const setActive = (image: CdnMedia) => {
  active.value = image
}

const openBigGallery = () => (isBigGalleryOpen.value = true)

watch(
  () => props.media,
  (media) => {
    active.value = media[0] || null
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.product-cover-gallery {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  @media ($viewport-8) {
    grid-template-columns: 1fr 5fr;
  }

  &__list {
    display: none;
    flex-direction: column;
    gap: 10px;

    @media ($viewport-8) {
      display: flex;
    }
  }

  &__main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item {
    border: solid 1px $gray-color-300;
    cursor: pointer;
    aspect-ratio: 1/1;
  }

  &--singular {
    grid-template-columns: 1fr;
  }

  &--singular &__list {
    display: none;
  }
}
</style>
