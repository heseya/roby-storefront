<template>
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

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    products?: ProductList[]
    spaceBetween?: number
  }>(),
  { products: () => [], spaceBetween: 10 },
)

const {
  data: omnibusData,
  refresh: refreshOmnibus,
  pending,
} = useAsyncData(async () => {
  const omnibusService = useOmnibus()
  const data = await omnibusService.getPrices(props.products.map((product) => product.id))
  return data.reduce((acc, curr) => {
    if (curr.product_id && curr.price_min) acc[curr.product_id] = curr.price_min
    return acc
  }, {} as Record<string, number>)
})

watch(
  () => props.products,
  () => {
    refreshOmnibus()
  },
)
</script>
