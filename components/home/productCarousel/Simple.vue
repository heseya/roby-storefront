<template>
  <LayoutCarousel :items="products" :space-between="spaceBetween">
    <template #item="product">
      <LazyProductMiniature :product="product" force-size />
    </template>
  </LayoutCarousel>
</template>

<script setup lang="ts">
import type { ExtendedProductListed } from '~/types/Product'

withDefaults(
  defineProps<{
    products?: ExtendedProductListed[]
    spaceBetween?: number
  }>(),
  { products: () => [], spaceBetween: 10 },
)
</script>
