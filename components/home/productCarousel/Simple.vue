<template>
  <LayoutCarousel :items="products" :space-between="spaceBetween">
    <template #item="product: ProductList">
      <ProductMiniature :product="product" force-size />
    </template>
  </LayoutCarousel>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

withDefaults(
  defineProps<{
    products?: ProductList[]
    spaceBetween?: number
  }>(),
  { products: () => [], spaceBetween: 10 },
)
</script>
