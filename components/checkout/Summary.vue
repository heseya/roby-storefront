<template>
  <div class="checkout-summary">
    <div v-for="item in cart.items" :key="item.id" class="checkout-summary-item">
      <span class="checkout-summary-item__text">
        <span class="primary-text">{{ item.qty }}x</span> {{ item.name }}
      </span>
      <span class="checkout-summary-item__text">{{ formatAmount(item.totalPrice) }}</span>
    </div>

    <div v-if="cart.totalDiscountValue !== 0" class="checkout-summary-item">
      <span class="checkout-summary-item__text checkout-summary-item__text--green">
        {{ t('summary.discount') }}
      </span>
      <span class="checkout-summary-item__text checkout-summary-item__text--green">
        {{ formatAmount(-cart.totalDiscountValue) }}
      </span>
    </div>

    <div class="checkout-summary-item">
      <span class="checkout-summary-item__text">{{ t('summary.shipping') }}</span>
      <span class="checkout-summary-item__text"> {{ formatAmount(cart.shippingPrice) }} </span>
    </div>

    <hr class="checkout-summary__hr hr" />

    <div class="checkout-summary-item">
      <span class="checkout-summary-item__text">{{ t('summary.total') }}</span>
      <span class="checkout-summary-item__text checkout-summary-item__text--big">
        {{ formatAmount(cart.summary) }}
      </span>
    </div>

    <LayoutButton
      variant="primary"
      class="cart-summary__button"
      :disabled="!checkout.isValid"
      @click="createOrder"
    >
      {{ t('summary.submit') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "summary": {
      "discount": "Oszczędzasz",
      "shipping": "Dostawa",
      "total": "Łączna kwota",
      "submit": "Potwierdzam i płacę"
    },
    "defaultAddress": "Adres domyślny"
  }
}
</i18n>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const cart = useCartStore()
const checkout = useCheckoutStore()
const formatError = useErrorMessage()
const { notify } = useNotify()
const router = useRouter()

const saveUserAddresses = async () => {
  const { addresses: shipping, add: addShipping } = useUserShippingAddresses()
  const { addresses: billing, add: addBilling } = useUserBillingAddresses()

  if (shipping.value.length === 0) {
    await addShipping({
      name: t('defaultAddress'),
      default: true,
      address: checkout.shippingAddress,
    })
  }
  if (billing.value.length === 0) {
    await addBilling({
      name: t('defaultAddress'),
      default: true,
      address: checkout.billingAddress,
    })
  }
}

const createOrder = async () => {
  try {
    // paymentMethodId must exist at this point, it is validated before
    const paymentId = checkout.paymentMethodId!
    const order = await checkout.createOrder()

    // save user addresses if they don't exist
    await saveUserAddresses()

    checkout.reset()

    if (paymentId === TRADITIONAL_PAYMENT_KEY) {
      router.push(`/checkout/thank-you?code=${order.code}&payment=${TRADITIONAL_PAYMENT_KEY}`)
      return
    }

    const paymentUrl = await checkout.createOrderPayment(order.code, paymentId)
    window.location.href = paymentUrl
  } catch (error) {
    notify({
      title: formatError(error),
      type: 'error',
    })
  }
}
</script>

<style lang="scss" scoped>
.checkout-summary {
  display: flex;
  flex-direction: column;

  &__hr {
    border-top-width: 2px;
    margin-top: 8px;
  }
}

.checkout-summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;

  &__text {
    &--big {
      font-size: rem(20);
      font-weight: 600;
      color: var(--secondary-color);
    }

    &--green {
      color: $green-color;
      font-weight: 500;
    }
  }
}
</style>
