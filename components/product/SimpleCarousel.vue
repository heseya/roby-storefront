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

const heseya = useHeseya()
const config = useConfigStore()

type ArgumentType<T> = T extends (arg: infer R) => unknown ? R : never

const props = withDefaults(
  defineProps<{ query: Omit<ArgumentType<typeof heseya.Products.get>, 'full'>; title: string }>(),
  {
    query: () => ({}),
    title: '',
  },
)

const { data: products } = useAsyncData('simple-carousel', async () => {
  const { data } = await heseya.Products.get({
    ...props.query,
    shipping_digital: false,
    attribute_slug: config.productSubtextAttr,
  })
  return data
})

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
