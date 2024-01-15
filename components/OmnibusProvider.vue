<template>
  <div>
    <slot v-bind="{ data: omnibusData, pending }"></slot>
  </div>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    products?: ProductList[]
  }>(),
  { products: () => [] },
)

const currency = useCurrency()
const omnibusService = useOmnibus()

const {
  data: omnibusData,
  refresh: refreshOmnibus,
  pending,
} = useAsyncData(async () => {
  const productsWithOmnibus = props.products.filter((product) =>
    isOmnibusShowable(product, currency.value),
  )

  const data = await omnibusService.getPrices(productsWithOmnibus.map((product) => product.id))
  const result = data.reduce((acc, curr) => {
    if (curr.product_id && curr.price_min) acc[curr.product_id] = curr.price_min
    return acc
  }, {} as Record<string, number>)

  console.log('Omnibus data', result)

  return result
})

watch(
  () => props.products,
  () => {
    refreshOmnibus()
  },
)
</script>
