<template>
  <div
    class="product-purchase-panel"
    :class="{ 'product-purchase-panel--no-schemas': !product.has_schemas }"
  >
    <div class="product-purchase-panel__price">
      <LayoutLoading :active="pending" />
      <span class="product-price">
        {{ formatAmount(price) }}
      </span>
      <span v-if="price !== originalPrice" class="product-price product-price--discounted">
        {{ formatAmount(originalPrice) }}
      </span>
    </div>

    <ProductPageOmnibus :product="product" class="product-purchase-panel__omnibus" />

    <ProductPageSchemas
      v-model:value="schemaValue"
      i-if="product.has_schemas"
      class="product-purchase-panel__schemas"
      :product="product"
    />

    <ProductQuantityInput v-model:quantity="quantity" class="product-purchase-panel__quantity" />

    <LayoutButton
      :disabled="!product.available"
      class="product-purchase-panel__cart-btn"
      @click="addToCart"
    >
      {{ product.available ? t('actions.addToCart') : t('actions.notAvailable') }}
    </LayoutButton>

    <a
      v-if="isLeaseable"
      class="product-purchase-panel__lease-btn"
      :href="getLeasingUrl(product.name, price, false, product.vat_rate)"
    >
      <LayoutButton variant="gray" :style="{ width: '100%' }">
        {{ t('actions.lease') }}
      </LayoutButton>
    </a>

    <div class="product-purchase-panel__detail"><DeliveryIcon /> {{ availability }}</div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "actions": {
      "addToCart": "Dodaj do koszyka",
      "notAvailable": "Niedostępny",
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
import { CartItemSchema, Product, parseSchemasToValues } from '@heseya/store-core'

import DeliveryIcon from '@/assets/icons/delivery.svg?component'
import { useCartStore } from '@/store/cart'

const props = withDefaults(
  defineProps<{
    product: Product
  }>(),
  {},
)
const cart = useCartStore()
const router = useRouter()
const t = useLocalI18n()

const getLeasingUrl = useLeaselink()

const quantity = ref(1)
const schemaValue = ref<CartItemSchema[]>(parseSchemasToValues(props.product.schemas))
const { price, originalPrice, pending } = useProductPrice(props.product, schemaValue)

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

const isLeaseable = computed(() => {
  return !!props.product.metadata.allow_lease
})

const addToCart = () => {
  if (!props.product.available) return

  cart.add({
    product: props.product,
    schemas: props.product.schemas,
    schemaValue: schemaValue.value,
    quantity: Number(quantity.value) || 1,
  })

  router.push('/cart')
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
    line-height: rem(28);
    font-weight: 600;
    grid-area: price;
    color: var(--primary-color);
    position: relative;

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
    grid-area: schemas;
  }
}

.product-price {
  color: var(--primary-color);

  &--discounted {
    color: $gray-color-600;
    margin-left: 4px;
    font-size: 0.8em;
    text-decoration: line-through;
  }
}
</style>
