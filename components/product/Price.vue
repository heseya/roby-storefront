<template>
  <div class="product-price">
    <component
      :is="tag"
      class="product-price__price"
      :class="{ 'product-price__price--discounted': hasDiscount }"
    >
      {{ hasSchemas ? $t('offers.from') : '' }} {{ formatAmount(mainPrice, currency) }}
    </component>
    {{ ' ' }}
    <component
      :is="tag"
      v-if="hasDiscount"
      class="product-price__price product-price__price--original"
    >
      {{ formatAmount(originalMainPrice, currency) }}
    </component>
  </div>
</template>

<script setup lang="ts">
import type { ProductListed } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    product: ProductListed
    tag?: string
  }>(),
  {
    tag: 'span',
  },
)
const $t = useGlobalI18n()
const currency = useCurrency()
const hasSchemas = computed(() => props.product.has_schemas)

const { mainPrice, originalMainPrice, hasDiscount } = useDisplayedPriceDetails({
  price: props.product.price,
  priceInitial: props.product.price_initial,
})
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  flex-wrap: wrap;

  &__price {
    line-height: 1.1em;
    white-space: nowrap;

    &--discounted {
      color: var(--highlight-color);
    }

    &--original {
      color: $gray-color-600;
      margin-left: 4px;
      font-size: 0.8em;
      text-decoration: line-through;
    }
  }
}
</style>
