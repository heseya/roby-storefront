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
import { ProductList, Price } from '@heseya/store-core'

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

const getPriceWithVAT = (prices: Price[], targetCurrency: string): number => {
  const nettoPriceValue = parsePrices(prices, targetCurrency)
  return nettoPriceValue * calculateVatMultiplerRateForCurrency(targetCurrency)
}

const currency = useCurrency()

const priceMinInitial = computed(() =>
  getPriceWithVAT(props.product.prices_min_initial, currency.value),
)
const priceMin = computed(() => getPriceWithVAT(props.product.prices_min, currency.value))
const priceMaxInitial = computed(() =>
  getPriceWithVAT(props.product.prices_max_initial, currency.value),
)
const priceMax = computed(() => getPriceWithVAT(props.product.prices_max, currency.value))

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
