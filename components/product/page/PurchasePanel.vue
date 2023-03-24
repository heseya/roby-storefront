<template>
  <div
    class="product-purchase-panel"
    :class="{ 'product-purchase-panel--no-schemas': !product.has_schemas }"
  >
    <ProductPrice :product="product" class="product-purchase-panel__price" />

    <ProductPageOmnibus class="product-purchase-panel__omnibus" />

    <div v-if="product.has_schemas" class="product-purchase-panel__schemas">TODO Schemas</div>

    <FormSelect v-model="quantity" name="quantity" class="product-purchase-panel__quantity">
      <option v-for="q in 10" :key="q" :value="q">{{ q }}</option>
    </FormSelect>

    <LayoutButton class="product-purchase-panel__cart-btn" @click="addToCart">
      {{ t('actions.addToCart') }}
    </LayoutButton>

    <LayoutButton variant="gray" class="product-purchase-panel__lease-btn" @click="lease">
      {{ t('actions.lease') }}
    </LayoutButton>

    <div class="product-purchase-panel__detail"><DeliveryIcon /> {{ availability }}</div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "actions": {
      "addToCart": "Dodaj do koszyka",
      "lease": "Zapytaj o leasing"
    },
    "availability": {
      "available": "Produkt dostępny na zamówienie",
      "unavailable": "Niedostępny",
      "shippingDigital": "Dostawa natychmiastowa",
      "shippingDate": "Gotowy do wysłania od {date}",
      "shippingTime": "Gotowy do wysłania w {time}",
      "days": "dni"
    }
  }
}
</i18n>

<script setup lang="ts">
import { Product } from '@heseya/store-core'

import DeliveryIcon from '@/assets/icons/delivery.svg?component'

const props = withDefaults(
  defineProps<{
    product: Product
  }>(),
  {},
)
const t = useLocalI18n()

const quantity = ref(1)

const availability = computed(() => {
  if (!props.product.available) return t('availability.unavailable')

  if (props.product.shipping_digital) return t('availability.shippingDigital')

  if (props.product.shipping_date) {
    return t('availability.shippingDate', {
      date: new Date(props.product.shipping_date).toLocaleDateString(),
    })
  }
  if (props.product.shipping_time) {
    const hours: number = Math.round(props.product.shipping_time * 24)
    return t('availability.shippingTime', {
      time: hours <= 72 ? `${hours}h` : `${props.product.shipping_time} ${t('availability.days')}`,
    })
  }
  return props.product.available ? t('availability.available') : t('availability.unavailable')
})

const addToCart = () => {
  // TODO
  console.log('addToCart')
}

const lease = () => {
  // TODO
  console.log('lease')
}
</script>

<style lang="scss" scoped>
.product-purchase-panel {
  display: grid;
  align-items: center;
  align-items: center;
  grid-template-columns: 80px 1fr;
  grid-gap: 16px;
  grid-template-areas: 'schemas schemas' 'quantity price' 'omnibus omnibus' 'cart-btn cart-btn' 'lease-btn lease-btn' 'details details';

  @media ($viewport-6) {
    grid-template-columns: 80px 1fr 1fr;
    justify-content: strech;
    justify-content: stretch;
    grid-template-areas: 'price price price' 'omnibus omnibus omnibus' 'schemas schemas schemas' 'quantity cart-btn lease-btn' 'details details details';
  }

  &--no-schemas {
    grid-template-areas: 'quantity price' 'omnibus omnibus' 'cart-btn cart-btn' 'lease-btn lease-btn' 'details details';

    @media ($viewport-6) {
      grid-template-areas: 'price price price' 'omnibus omnibus omnibus' 'quantity cart-btn lease-btn' 'details details details';
    }
  }

  :deep(.btn) {
    font-weight: 500;
    min-height: 40px;
  }

  &__price {
    font-size: rem(20);
    font-weight: 600;
    grid-area: price;

    @media ($viewport-5) {
      font-size: rem(26);
    }
  }

  &__omnibus {
    grid-area: omnibus;
  }

  &__quantity {
    grid-area: quantity;
  }

  &__cart-btn {
    grid-area: cart-btn;
  }

  &__lease-btn {
    grid-area: lease-btn;
  }

  &__detail {
    font-weight: 500;
    grid-area: details;
    display: flex;
    align-items: center;

    > svg {
      color: $gray-color-600;
      margin-right: 8px;
    }
  }

  &__schemas {
    background-color: #fff;
    padding: 8px;
    grid-area: schemas;
  }
}
</style>