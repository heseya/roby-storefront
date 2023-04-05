<template>
  <div>
    <LayoutHeader class="image-carousel__title" variant="black">{{ title }}</LayoutHeader>
    <LayoutCarousel :itemArr="imageArr">
      <template #item="{ src, alt }: ImageSrc">
        <img class="image-carousel__picture" :src="src" :alt="alt" />
      </template>
    </LayoutCarousel>
  </div>
</template>

<script lang="ts" setup>
export interface ImageSrc {
  src: string
  alt: string
}

defineProps<{
  title: string
  imageArr: ImageSrc[]
}>()
</script>

<style lang="scss" scoped>
.image-carousel__picture {
  width: 160px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
