<template>
  <div class="product-price">
    <component
      :is="tag"
      class="product-price__price"
      :class="{ 'product-price__price--discounted': isDiscounted }"
    >
      {{ formatAmount(product.price_min) }}
      <template v-if="product.price_min !== product.price_max">
        - {{ formatAmount(product.price_max) }}
      </template>
    </component>

    <component
      :is="tag"
      v-if="isDiscounted"
      class="product-price__price product-price__price--original"
    >
      {{ formatAmount(product.price_min_initial) }}
      <template v-if="product.price_min_initial !== product.price_max_initial">
        - {{ formatAmount(product.price_max_initial) }}
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    product: ProductList
    tag: string
  }>(),
  {
    tag: 'span',
  },
)

const isDiscounted = computed(() => {
  return (
    props.product.price_max < props.product.price_max_initial ||
    props.product.price_min < props.product.price_min_initial
  )
})
</script>

<style lang="scss" scoped>
.product-price {
  &__price {
    &--discounted {
      color: var(--primary-color);
    }

    &--original {
      color: $gray-color-600;
      margin-left: 4px;
      text-decoration: line-through;
    }
  }
}
</style>
