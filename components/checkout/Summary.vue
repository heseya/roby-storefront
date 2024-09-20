<template>
  <CheckoutPageArea
    class="checkout-summary-wrapper"
    :title="$t('orders.summary')"
    :placeholder-height="300"
  >
    <div class="checkout-summary" :class="{ 'checkout-summary--disabled': disabled }">
      <LayoutLoading :active="cart.isProcessing" />

      <div v-for="item in cart.items" :key="item.id" class="checkout-summary-item">
        <span class="checkout-summary-item__text">
          <span class="primary-text">{{ item.totalQty }}x</span> {{ item.name }}
        </span>
        <span class="checkout-summary-item__text">{{
          formatAmount(getDisplayedPrice(item.totalPrice).value, currency)
        }}</span>
      </div>

      <div v-if="cart.totalDiscountValue.net !== 0" class="checkout-summary-item">
        <span class="checkout-summary-item__text checkout-summary-item__text--green">
          {{ $t('payments.discount') }}
        </span>
        <span class="checkout-summary-item__text checkout-summary-item__text--green">
          {{ formatAmount(-getDisplayedPrice(cart.totalDiscountValue).value, currency) }}
        </span>
      </div>

      <div class="checkout-summary-item">
        <span class="checkout-summary-item__text">{{ $t('orders.delivery') }}</span>
        <span class="checkout-summary-item__text">
          {{ formatAmount(getDisplayedPrice(cart.shippingPrice).value, currency) }}
        </span>
      </div>

      <hr class="checkout-summary__hr hr" />

      <div
        class="checkout-summary-item"
        :class="{ 'checkout-summary-item--with-second-price': getSecondPrice(cart.summary).value }"
      >
        <span class="checkout-summary-item__text">{{ $t('orders.totalAmount') }}</span>
        <span class="checkout-summary-item__value-wrapper">
          <span class="checkout-summary-item__text checkout-summary-item__text--big">
            {{ formatAmount(getDisplayedPrice(cart.summary).value, currency) }}
          </span>
          <span
            v-if="getSecondPrice(cart.summary).value"
            class="checkout-summary-item__text checkout-summary-item__text--second-price"
          >
            {{
              `${formatAmount(getSecondPrice(cart.summary).value ?? 0, currency)} ${$t('priceType.gross')} (${vatRate}% VAT)`
            }}
          </span>
        </span>
      </div>

      <hr class="checkout-summary__hr hr" />

      <div class="checkout-summary-item">
        <CheckoutConsents :disabled="disabled" />
      </div>

      <LayoutInfoBox v-if="!isValid && isErrorVisible" type="danger" class="checkout-summary-item">
        {{ shownError }}
      </LayoutInfoBox>

      <LayoutButton
        variant="primary"
        class="cart-summary__button"
        :disabled="disabled"
        @click="handleClick"
      >
        {{ $t('payments.confirmAndPay') }}
      </LayoutButton>
    </div>
  </CheckoutPageArea>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { useCheckoutStore } from '~/store/checkout'

const props = defineProps<{
  disabled?: boolean
  isValidationError: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const vatRate = useVatRate()
const $t = useGlobalI18n()
const cart = useCartStore()
const checkout = useCheckoutStore()
const currency = useCurrency()
const { getDisplayedPrice, getSecondPrice } = useGetDisplayedPrice()

const isErrorVisible = ref(false)

const isValid = computed(() => checkout.isValid && !props.isValidationError)

const shownError = computed(() => {
  if (props.isValidationError) return $t('errors.checkout.validationError')
  if (checkout.validationError) return $t(checkout.validationError)
  return ''
})

const handleClick = () => {
  if (!isValid.value) isErrorVisible.value = true
  else {
    isErrorVisible.value = false
    emit('submit')
  }
}
</script>

<style lang="scss" scoped>
.checkout-summary-wrapper {
  position: relative;
}

.checkout-summary {
  display: flex;
  flex-direction: column;

  &--disabled {
    color: $gray-color-600;
  }

  &__hr {
    margin-top: 12px;
  }
}

.checkout-summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;

  &--with-second-price {
    margin-bottom: 30px;
    position: relative;
  }

  &__text {
    &--big {
      font-size: rem(20);
      font-weight: 600;
      color: var(--secondary-color);
    }

    &--green {
      color: $green-color-500;
      font-weight: 500;
    }

    &--second-price {
      display: block;
      position: absolute;
      right: 0;
      font-weight: 500;
      font-size: rem(12);
      color: $gray-color-600;
    }
  }
}
</style>
