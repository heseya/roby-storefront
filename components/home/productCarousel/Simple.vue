<template>
  <OmnibusProvider :products="products">
    <template #default="{ data: omnibusData, pending }">
      <LayoutCarousel :items="products" :space-between="spaceBetween">
        <template #item="product: ProductList">
          <ProductMiniature
            :product="product"
            force-size
            :omnibus-price="pending ? 'promised' : omnibusData?.[product.id]"
          />
        </template>
      </LayoutCarousel>
    </template>
  </OmnibusProvider>
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
