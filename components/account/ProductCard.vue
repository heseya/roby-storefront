<template>
  <div class="product-list-item">
    <NuxtLink :to="localePath(`/product/${product.slug}`)">
      <Media object-fit="cover" :media="product.cover" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

defineProps<{
  product: ProductList
}>()

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.product-list-item {
  border: 1px solid $gray-color-300;
  height: 100%;
  padding: 5px;
  width: 75px;
  height: 75px;
}
</style>
