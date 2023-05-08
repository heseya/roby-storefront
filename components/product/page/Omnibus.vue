<template>
  <div class="product-omnibus-note">
    <span v-if="pending"> ... </span>
    <span v-else-if="price === null || price === product.price_min">
      {{ t('currentIsLowest') }}
    </span>
    <span v-else>
      {{ t('lowest') }} <b>{{ formatAmount(price || 0) }}</b>
    </span>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "currentIsLowest": "Powyższa cena jest również najniższą ceną z 30 dni przed wprowadzeniem ceny aktualnej.",
    "lowest": "Najniższa cena z 30 dni przed wprowadzeniem ceny aktualnej, wynikająca z zakończonej akcji promocyjnej:"
  }
}
</i18n>

<script setup lang="ts">
import axios from 'axios'
import { Product } from '@heseya/store-core'

const props = defineProps<{
  product: Product
}>()

const t = useLocalI18n()

const { data: price, pending } = useAsyncData(async () => {
  try {
    const { public: config } = useRuntimeConfig()

    const { data } = await axios.get<{ data?: { price_min: number } }>(
      `/products/${props.product.id}?current_price_min=${props.product.price_min}`,
      {
        baseURL: config.priceTrackerUrl,
      },
    )

    return data?.data?.price_min || null
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Nie udało się załadować najniższej ceny z ostatnich 30 dni', error)
  }
})
</script>

<style lang="scss" scoped>
.product-omnibus-note {
  color: $gray-color-600;
  font-size: rem(12);
}
</style>
