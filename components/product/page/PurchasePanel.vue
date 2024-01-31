<template>
  <div
    class="product-purchase-panel"
    :class="{ 'product-purchase-panel--no-schemas': !product.has_schemas }"
  >
    <div v-if="product.available" class="product-purchase-panel__price">
      <LayoutLoading :active="pending" />
      <span class="product-price" :class="{ 'product-price--discounted': price !== originalPrice }">
        {{ formatAmount(price, currency) }}
      </span>
      <span v-if="price !== originalPrice" class="product-price product-price--original">
        {{ formatAmount(originalPrice, currency) }}
      </span>
    </div>

    <LazyProductPageOmnibus
      v-if="showOmnibus"
      :product="product"
      class="product-purchase-panel__omnibus"
    />

    <LazyProductPageSchemas
      v-if="product.has_schemas"
      v-model:value="schemaValue"
      class="product-purchase-panel__schemas"
      :product="product"
    />
    <LazyProductPageVariants class="product-purchase-panel__variants" :product="product" />

    <ProductQuantityInput v-model:quantity="quantity" class="product-purchase-panel__quantity" />

    <LayoutButton
      :disabled="!product.available || isProductPurchaseLimitReached"
      class="product-purchase-panel__cart-btn"
      @click="handleAddToCart"
    >
      {{ purchaseButtonText }}
    </LayoutButton>

    <a
      v-if="isLeaseable && leaselinkEnabled"
      class="product-purchase-panel__lease-btn"
      :href="getLeasingUrl(product.name, price, false, parseFloat(channel?.vat_rate || '0'))"
    >
      <LayoutButton variant="gray" :style="{ width: '100%' }">
        {{ t('offers.lease') }}
      </LayoutButton>
    </a>

    <div class="product-purchase-panel__detail"><DeliveryIcon /> {{ availability }}</div>
  </div>
  <UpsellModal
    v-model:open="upsellVisible"
    :product="product"
    :price="price"
    :currency="currency"
  />
</template>

<i18n lang="json">
{
  "pl": {
    "availability": {
      "available": "Produkt dostępny",
      "availableOnRequest": "Produkt dostępny na zamówienie",
      "unavailable": "Niedostępny",
      "reachedLimit": "Osiągnięto limit",
      "shippingDigital": "Dostawa natychmiastowa",
      "shippingDate": "Gotowy do wysłania od {date}",
      "shippingTime": "Gotowy do wysłania w {time}",
      "days": "dni"
    }
  },
  "en": {
    "availability": {
      "available": "Product available",
      "availableOnRequest": "Product available on request",
      "unavailable": "Unavailable",
      "reachedLimit": "Limit reached",
      "shippingDigital": "Shipping digital",
      "shippingDate": "Ready to ship from {date}",
      "shippingTime": "Ready to ship in {time}",
      "days": "days"
    }
  }
}
</i18n>

<script setup lang="ts">
import { parseSchemasToValues } from '@heseya/store-core'
import type { CartItemSchema, Product } from '@heseya/store-core'

import DeliveryIcon from '@/assets/icons/delivery.svg?component'
import UpsellModal from '~/components/product/page/UpsellModal.vue'

const props = withDefaults(
  defineProps<{
    product: Product
  }>(),
  {},
)
const t = useLocalI18n()
const $t = useGlobalI18n()
const currency = useCurrency()
const channel = useSalesChannel()
const upsellVisible = ref(false)

const { enabled: leaselinkEnabled, getUrl: getLeasingUrl } = useLeaselink()

const { quantity, isProductPurchaseLimitReached, addToCart } = useAddToCart(props.product)

const schemaValue = ref<CartItemSchema[]>(
  parseSchemasToValues(props.product.schemas, currency.value),
)
const { price, originalPrice, pending } = useProductPrice(props.product, schemaValue)

const purchaseButtonText = computed((): string => {
  if (isProductPurchaseLimitReached.value) return t('availability.reachedLimit')

  if (props.product.available) return $t('offers.addToCart')

  return t('availability.unavailable')
})

const availability = computed(() => {
  if (!props.product.available) return t('availability.unavailable')

  if (props.product.metadata.available_on_request) return t('availability.availableOnRequest')

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

const showOmnibus = useShowOmnibus(props.product)

const isLeaseable = computed(() => {
  return !!props.product.metadata.allow_lease
})

const handleAddToCart = () => {
  const success = addToCart(schemaValue.value)
  if (success) upsellVisible.value = true
}
</script>

<style lang="scss" scoped>
.product-purchase-panel {
  display: grid;
  align-items: center;
  align-items: center;
  grid-template-columns: 80px 1fr;
  grid-gap: 16px;
  grid-template-areas: 'schemas schemas' 'variants variants' 'quantity price' 'omnibus omnibus' 'cart-btn cart-btn' 'lease-btn lease-btn' 'details details';

  @media ($viewport-6) {
    grid-template-columns: 80px 1fr 1fr;
    justify-content: strech;
    justify-content: stretch;
    grid-template-areas: 'price price price' 'omnibus omnibus omnibus' 'schemas schemas schemas' 'variants variants variants' 'quantity cart-btn lease-btn' 'details details details';
  }

  &--no-schemas {
    grid-template-areas: 'quantity price' 'omnibus omnibus' 'variants variants' 'cart-btn cart-btn' 'lease-btn lease-btn' 'details details';

    @media ($viewport-6) {
      grid-template-areas: 'price price price' 'omnibus omnibus omnibus' 'variants variants variants' 'quantity cart-btn lease-btn' 'details details details';
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
    // color: var(--secondary-color);
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

  &__variants {
    grid-area: variants;
  }
}

.product-price {
  color: var(--secondary-color);

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
</style>
