<template>
  <LayoutCarousel :items="products" :space-between="10">
    <template #item="product: ProductList">
      <ProductMiniature :product="product" />
    </template>
  </LayoutCarousel>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

withDefaults(
  defineProps<{
    products?: ProductList[]
  }>(),
  { products: () => [] },
)
</script>
