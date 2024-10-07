<template>
  <div
    class="product-purchase-panel"
    :class="{ 'product-purchase-panel--no-schemas': !product.has_schemas }"
  >
    <div v-if="priceVisibility && !isUnavailableIfPriceZero" class="product-purchase-panel__price">
      <LazyLayoutLoading :active="pending" />
      <span
        class="product-price"
        :class="{ 'product-price--discounted': displayedPriceDetails.hasDiscount }"
      >
        {{ hasSchemasMarkup }}
        {{ formatAmount(displayedPriceDetails.mainPrice, currency) }}
      </span>
      <span v-if="displayedPriceDetails.hasDiscount" class="product-price product-price--original">
        {{ formatAmount(displayedPriceDetails.originalMainPrice, currency) }}
      </span>

      <div v-if="displayedPriceDetails.secondPrice !== null">
        <span class="product-price product-price--second">
          {{
            `${formatAmount(displayedPriceDetails.secondPrice, currency)} ${$t('priceType.gross')} (${displayedPriceDetails.vatRate}% VAT)`
          }}
        </span>
      </div>
    </div>

    <LazyProductPageOmnibus
      v-if="showOmnibus"
      :product="product"
      class="product-purchase-panel__omnibus"
    />

    <LazyProductPageSchemas
      v-if="hasSchemas"
      v-model:value="schemaValue"
      class="product-purchase-panel__schemas"
      :product-schemas="product.schemas"
    />
    <LazyProductPageVariants class="product-purchase-panel__variants" :product="product" />

    <ProductQuantityInput v-model:quantity="quantity" class="product-purchase-panel__quantity" />

    <LayoutButton
      v-if="!loginToBuy"
      :disabled="!product.available || isProductPurchaseLimitReached || isUnavailableIfPriceZero"
      class="product-purchase-panel__cart-btn"
      @click="handleAddToCart"
    >
      {{ purchaseButtonText }}
    </LayoutButton>
    <LayoutButton
      v-if="loginToBuy"
      class="product-purchase-panel__cart-btn"
      @click="redirectToRoute('/login', $event)"
    >
      {{ t('loginToBuy') }}
    </LayoutButton>

    <a
      v-if="isLeaseable && leaselinkEnabled"
      class="product-purchase-panel__lease-btn"
      :href="getLeasingUrl(product.name, priceGross, false, displayedPriceDetails.vatRate)"
    >
      <LayoutButton variant="gray" :style="{ width: '100%' }">
        {{ t('offers.lease') }}
      </LayoutButton>
    </a>
    <div v-if="isUnavailableIfPriceZero" :disabled="true" class="product-purchase-panel__unregion">
      {{ t('availability.unavailableInRegion') }}
    </div>
    <div class="product-purchase-panel__detail"><DeliveryIcon /> {{ availability }}</div>
  </div>
  <LazyProductPageUpsellModal
    v-model:open="upsellVisible"
    :product="product"
    :price="displayedPriceDetails.mainPrice"
    :currency="currency"
  />
</template>

<i18n lang="json">
{
  "pl": {
    "availability": {
      "available": "Produkt dostępny",
      "availableOnRequest": "Produkt dostępny na zamówienie",
      "unavailableInRegion": "Niedostępny w regionie",
      "unavailable": "Niedostępny",
      "reachedLimit": "Osiągnięto limit",
      "shippingDigital": "Dostawa natychmiastowa",
      "shippingDate": "Gotowy do wysłania od {date}",
      "shippingTime": "Gotowy do wysłania w {time}",
      "days": "dni"
    },
    "loginToBuy": "Zaloguj by kupić"
  },
  "en": {
    "availability": {
      "available": "Product available",
      "availableOnRequest": "Product available on request",
      "unavailableInRegion": "Unavailable in the region",
      "unavailable": "Unavailable",
      "reachedLimit": "Limit reached",
      "shippingDigital": "Shipping digital",
      "shippingDate": "Ready to ship from {date}",
      "shippingTime": "Ready to ship in {time}",
      "days": "days"
    },
    "loginToBuy": "Login to buy"
  }
}
</i18n>

<script setup lang="ts">
import { parseSchemasToCartItemSchemas } from '@heseya/store-core'
import type { CartItemSchema, Product } from '@heseya/store-core'

import DeliveryIcon from '@/assets/icons/delivery.svg?component'
import { useConfigStore } from '~/store/config'
import { useSiteMode } from '~/composables/useSiteMode'

const props = withDefaults(
  defineProps<{
    product: Product
  }>(),
  {},
)
const config = useConfigStore()
const t = useLocalI18n()
const $t = useGlobalI18n()
const currency = useCurrency()
const upsellVisible = ref(false)
const { isModeB2B } = useSiteMode()

const { enabled: leaselinkEnabled, getUrl: getLeasingUrl } = useLeaselink()

const { quantity, isProductPurchaseLimitReached, addToCart } = useAddToCart(props.product)

const schemaValue = ref<CartItemSchema[]>(parseSchemasToCartItemSchemas(props.product.schemas))

const { priceGross, priceNet, originalPriceGross, originalPriceNet, pending } = useProductPrice(
  props.product,
  schemaValue,
)

const { priceVisibility, loginToBuy } = usePriceVisibility(props.product)
const { redirectToRoute } = useRedirect()

const displayedPriceDetails = ref({
  mainPrice: 0,
  secondPrice: 0,
  originalMainPrice: 0,
  hasDiscount: false,
  vatRate: 0,
  initialPrice: true,
})

const updateDisplayedPrices = (initialPrice: boolean) => {
  const { mainPrice, secondPrice, originalMainPrice, hasDiscount, vatRate } =
    useDisplayedPriceDetails({
      price: {
        net: priceNet.value,
        gross: priceGross.value,
      },
      priceInitial: {
        net: originalPriceNet.value,
        gross: originalPriceGross.value,
      },
    })

  // Update the ref with the new values
  displayedPriceDetails.value = {
    mainPrice: Number(mainPrice.value),
    secondPrice: Number(secondPrice.value),
    originalMainPrice: Number(originalMainPrice.value),
    hasDiscount: Boolean(hasDiscount.value),
    vatRate: Number(vatRate.value),
    initialPrice,
  }
}

updateDisplayedPrices(true)

// Watch for changes in the prices and update the displayed price details
watch([priceGross, priceNet, originalPriceGross, originalPriceNet], () => {
  // Update the displayed prices whenever these change
  updateDisplayedPrices(false)
})

const hasSchemas = computed(() => priceVisibility.value && props.product.has_schemas)

const hasSchemasMarkup = computed(() =>
  hasSchemas.value && displayedPriceDetails.value.initialPrice ? t('offers.from') : '',
)

const purchaseButtonText = computed((): string => {
  if (isProductPurchaseLimitReached.value) return t('availability.reachedLimit')

  if (props.product.available) return $t('offers.addToCart')

  return t('availability.unavailable')
})

const isUnavailableIfPriceZero = computed(() => {
  return priceGross.value === 0 && config.unavailableIfPriceZero
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

const showOmnibus = computed(
  () => priceVisibility.value && useShowOmnibus(props.product) && !isModeB2B.value,
)

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
  grid-template-columns: 80px 1fr;
  grid-gap: 16px;
  grid-template-areas: 'schemas schemas' 'variants variants' 'quantity price' 'omnibus omnibus' 'cart-btn cart-btn' 'lease-btn lease-btn' 'details details';

  @media ($viewport-6) {
    grid-template-columns: 80px 1fr 1fr;
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

  &__unregion {
    grid-area: unregion;
    color: $gray-color-600;
    font-size: 0.8em;
    font-weight: 500;
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

  &--second {
    color: $text-color;
    font-size: 0.615em; // 16px
    font-weight: 500;
  }
}
</style>
