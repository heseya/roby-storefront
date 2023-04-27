<template>
  <div class="product-list-item">
    <NuxtLink :to="`/product/${product.slug}`">
      <Media object-fit="cover" width="63" height="63" :media="product.cover" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@heseya/store-core'

defineProps<{
  product: Product
}>()
</script>

<style lang="scss" scoped>
.product-list-item {
  border: 1px solid $gray-color-300;
  height: 100%;
  padding: 5px;
}
</style>
