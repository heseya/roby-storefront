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
import { useChannelsStore } from '@/store/channels'

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

const channelStore = useChannelsStore()

const calculateVatMultiplerRateForCurrency = (currencyCode: string): number => {
  const channel = channelStore.channels.find((ch) => ch.default_currency.code === currencyCode)
  return channel ? 1 + Number(channel.vat_rate) / 100 : 1
}

const applyVatForCurrency = (prices: Price[]): Price[] => {
  return prices.map(({ gross, currency }) => ({
    currency,
    gross: (parseFloat(gross) * calculateVatMultiplerRateForCurrency(currency)).toFixed(2),
  }))
}

const getPriceWithVAT = (prices: Price[], targetCurrency: string): number => {
  const netPriceValue = parsePrices(prices, targetCurrency)
  const pricesWithVAT = applyVatForCurrency([
    { currency: targetCurrency, gross: netPriceValue.toString() },
  ])
  return parseFloat(pricesWithVAT[0]?.gross || '0') || 0
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
