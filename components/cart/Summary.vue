<template>
  <div class="cart-summary" :class="{ 'cart-summary--disabled': disabled }">
    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ $t('orders.productsPrice') }}</div>
      <div class="cart-summary__value">{{ formatAmount(cart.totalValueInitial) }}</div>
    </div>

    <div v-if="cart.totalDiscountValue > 0" class="cart-summary__item cart-summary__item--green">
      <div class="cart-summary__label">{{ $t('payments.discount') }}</div>
      <div class="cart-summary__value">{{ formatAmount(cart.totalDiscountValue) }}</div>
    </div>

    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ $t('orders.delivery') }}</div>
      <div class="cart-summary__value">
        {{ t('summary.from') }} {{ formatAmount(cheapestShippingMethodPrice || 0) }}
      </div>
    </div>

    <hr class="hr cart-summary__line" />

    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ $t('orders.totalAmount') }}</div>
      <div class="cart-summary__value cart-summary__value--big">
        {{ formatAmount(cart.totalValue) }}
      </div>
    </div>

    <LayoutButton
      variant="primary"
      class="cart-summary__button"
      :disabled="disabled"
      @click="processCheckout"
    >
      {{ t('summary.submit') }}
    </LayoutButton>

    <NuxtLink :to="localePath('/')">
      <LayoutButton variant="gray" class="cart-summary__button">
        {{ t('summary.returnToStore') }}
      </LayoutButton>
    </NuxtLink>

    <span class="cart-summary__text">{{ t('summary.paymentMethods') }}</span>
    <div class="cart-summary__payment-methods">
      <b v-if="config.isTraditionalTransfer">{{ $t('payments.traditionalTransfer') }}</b>
      <template v-for="method in paymentMethods" :key="method.id">
        <img v-if="method.icon" :src="method.icon" :alt="method.name" loading="lazy" />
        <b v-else>{{ method.name }}</b>
      </template>
    </div>
    <CartLoginBlockModal v-model:open="isAuthenticationModalVisible" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "summary": {
      "from": "już od",
      "submit": "Przejdź do finalizacji zamówienia",
      "returnToStore": "Kontynuuj zakupy",
      "paymentMethods": "Dostępne metody płatności:"
    }
  },
  "en": {
    "summary": {
      "from": "from",
      "submit": "Checkout",
      "returnToStore": "Return to store",
      "paymentMethods": "Payment methods available:"
    }
  }
}
</i18n>

<script setup lang="ts">
import { ShippingType } from '@heseya/store-core'

import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '@/store/config'

withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const cart = useCartStore()
const t = useLocalI18n()
const $t = useGlobalI18n()
const config = useConfigStore()
const auth = useAuthStore()
const heseya = useHeseya()
const localePath = useLocalePath()

const { data: cheapestShippingMethodPrice, refresh: refreshCheapestShippingMethodPrice } =
  useLazyAsyncData(`shippingMethodPrice`, async () => {
    const { data } = await heseya.ShippingMethods.get({ cart_value: cart.totalValue })

    const filteredData = data.filter((m) => !m.metadata?.paczkomat || cart.allowPaczkomatDelivery)

    // TODO: ShippingType.Point can also have own price? Maybe ignore free shipping?
    const prices = filteredData
      .filter((m) => m.shipping_type !== ShippingType.Point)
      .map((m) => m.price || 0)
    return prices.length ? Math.min(...prices) : 0
  })

const { data: paymentMethods } = useLazyAsyncData('all-payment-methods', async () => {
  const { data } = await heseya.PaymentMethods.get()
  return data.map((method) => ({
    ...method,
  }))
})

const isAuthenticationModalVisible = ref<boolean>(false)

const processCheckout = () => {
  if (!auth.isLogged) {
    isAuthenticationModalVisible.value = true
  } else {
    navigateTo(localePath('/checkout'))
  }
}
watch(
  () => cart.items,
  () => refreshCheapestShippingMethodPrice(),
  { deep: true },
)
</script>

<style lang="scss" scoped>
.cart-summary {
  display: flex;
  flex-direction: column;
  padding: 16px;

  font-size: rem(14);
  line-height: rem(19);

  &--disabled {
    color: $gray-color-600;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &--green {
      color: $green-color-500;
    }
  }

  &__value--big {
    font-weight: 600;
    font-size: rem(20);
    line-height: rem(26);
  }

  &__line {
    margin: 10px 0;
    border: none;
    border-top: solid 1px $gray-color-300;
  }

  &__button {
    margin-top: 16px;
    width: 100%;
  }

  &__text {
    margin-top: 16px;
    color: $text-color;
  }

  &__payment-methods {
    display: flex;
    gap: 4px;
    align-items: center;
    color: $text-color;

    > img {
      height: 1.6em;
    }
  }
}
</style>
