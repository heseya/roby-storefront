<template>
  <div v-if="products && products.length" class="simple-carousel">
    <LayoutHeader tag="h3" class="simple-carousel__header" variant="black">
      <slot name="title">{{ title }}</slot>
    </LayoutHeader>

    <HomeProductCarouselSimple
      class="simple-carousel__carousel"
      :products="products"
      :space-between="23"
    />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const { get: getProducts } = useHeseyaProducts()
const config = useConfigStore()

const props = withDefaults(defineProps<{ query: ProductGetParams; title?: string }>(), {
  query: () => ({}),
  title: '',
})

const { data: products } = useAsyncData(
  `simple-carousel-${JSON.stringify(props.query)}`,
  async () => {
    const { data } = await getProducts({
      ...props.query,
      shipping_digital: false,
      attribute_slug: config.productSubtextAttr,
    })
    return data
  },
)

useEmitProductsViewEvent(
  computed(() => products.value || []),
  props.title,
)
</script>

<style lang="scss" scoped>
.simple-carousel {
  &__header {
    text-align: left;
    font-size: rem(20);
    line-height: rem(20);
    margin-bottom: 18px;
  }
}
</style>
