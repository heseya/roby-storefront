<template>
  <div class="product-price">
    <component
      :is="tag"
      class="product-price__price"
      :class="{ 'product-price__price--discounted': isDiscounted }"
    >
      <template v-if="priceMin !== priceMax">
        {{ $t('common.from') }}
      </template>
      {{ formatAmount(priceMin, currency) }}
      <!-- <template v-if="priceMin !== priceMax">
        - {{ formatAmount(priceMax, currency) }}
      </template> -->
    </component>
    {{ ' ' }}
    <component
      :is="tag"
      v-if="isDiscounted"
      class="product-price__price product-price__price--original"
    >
      <template v-if="priceMinInitial !== priceMaxInitial">
        {{ $t('common.from') }}
      </template>
      {{ formatAmount(priceMinInitial, currency) }}
      <!-- <template v-if="priceMinInitial !== priceMaxInitial">
        - {{ formatAmount(priceMaxInitial, currency) }}
      </template> -->
    </component>
  </div>
</template>

<script setup lang="ts">
import type { ProductList } from '@heseya/store-core'

const $t = useGlobalI18n()
const props = withDefaults(
  defineProps<{
    product: ProductList
    tag?: string
  }>(),
  {
    tag: 'span',
  },
)

const currency = useCurrency()
const calculateGrossPrice = usePriceGross()

const priceMinInitial = computed(() =>
  calculateGrossPrice(props.product.prices_min_initial, currency.value),
)
const priceMin = computed(() => calculateGrossPrice(props.product.prices_min, currency.value))
const priceMaxInitial = computed(() =>
  calculateGrossPrice(props.product.prices_max_initial, currency.value),
)
const priceMax = computed(() => calculateGrossPrice(props.product.prices_max, currency.value))

const isDiscounted = computed(
  () => priceMax.value < priceMaxInitial.value || priceMin.value < priceMinInitial.value,
)
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
