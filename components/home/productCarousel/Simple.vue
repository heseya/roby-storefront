<template>
  <LayoutCarousel :items="products" :space-between="spaceBetween">
    <template #item="product">
      <ProductMiniature :product="product" force-size />
    </template>
  </LayoutCarousel>
</template>

<script setup lang="ts">
import type { ExtendedProductList } from '~/types/Product'

withDefaults(
  defineProps<{
    products?: ExtendedProductList[]
    spaceBetween?: number
  }>(),
  { products: () => [], spaceBetween: 10 },
)
</script>
