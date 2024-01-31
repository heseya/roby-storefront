<template>
  <div class="product-omnibus-note">
    <span v-if="isNil(price) || price === priceMin">
      {{ t('currentIsLowest') }}
    </span>
    <span v-else>
      {{ t('lowest') }} <b>{{ formatAmount(price, currency) }}</b>
    </span>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "currentIsLowest": "Powyższa cena jest również najniższą ceną z 30 dni przed wprowadzeniem ceny aktualnej.",
    "lowest": "Najniższa cena przed promocją (z 30 dni):"
  },
  "en": {
    "currentIsLowest": "The above price is also the lowest price in the 30 days prior to the introduction of the current price.",
    "lowest": "Lowest price before promotion (from 30 days):"
  }
}
</i18n>

<script setup lang="ts">
import { parsePrices } from '@heseya/store-core'
import isNil from 'lodash/isNil'

import type { ExtendedProductList } from '~/types/Product'

const props = withDefaults(
  defineProps<{
    product: ExtendedProductList
  }>(),
  {},
)

const t = useLocalI18n()
const omnibus = useOmnibus()
const currency = useCurrency()

const priceMin = computed(() => parsePrices(props.product.prices_min, currency.value))

const { data: fetchedPrice } = useAsyncData(`product-omnibus-${props.product.id}`, async () => {
  // Ignore fetching omnibus price if price is already provided
  if (props.product.omnibus) return

  try {
    return await omnibus.getPrice(props.product.id, priceMin.value)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Nie udało się załadować najniższej ceny z ostatnich 30 dni', error)
  }
})

const price = computed(() =>
  props.product.omnibus?.price_min ? props.product.omnibus?.price_min : fetchedPrice.value,
)
</script>

<style lang="scss" scoped>
.product-omnibus-note {
  color: $gray-color-600;
  font-size: rem(12);
}
</style>
