<template>
  <div
    class="product-cover-gallery"
    :class="{ 'product-cover-gallery--singular': media.length < 2 }"
  >
    <div class="product-cover-gallery__list" style="max-height: 500px; max-width: 100px">
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
    <div class="product-cover-gallery__main" style="max-width: 500px; max-height: 500px">
      <Media
        class="product-cover-gallery__item"
        :media="active"
        :width="isMobile ? 300 : 500"
        height="500"
        loading="eager"
        @click="openBigGallery"
      />

      <div class="product-cover-gallery__tags">
        <ProductTag v-for="tag in tags" :key="tag.id" :color="`#${tag.color}`" size="big">
          {{ tag.name }}
        </ProductTag>
      </div>
    </div>

    <ProductPageGallery
      v-if="isBigGalleryOpen"
      :media="props.media"
      :default-media="active"
      @close="isBigGalleryOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { CdnMedia, Tag } from '@heseya/store-core'

const isMobile = useMediaQuery('(max-width: 440px)')

const props = defineProps<{
  media: CdnMedia[]
  tags: Tag[]
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
  gap: 5px;
  width: 100%;
  max-width: 605px;
  margin: 0 auto;

  @media ($viewport-8) {
    grid-template-columns: 1fr 5fr;
  }

  &__list {
    display: none;
    flex-direction: column;
    overflow-y: auto;
    gap: 10px;
    max-height: 500px;
    padding-right: 5px;

    @include styled-scrollbar;

    @media ($viewport-8) {
      display: flex;
    }
  }

  &__main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
  }

  &__tags {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
  }

  &__item {
    width: 100%;
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
