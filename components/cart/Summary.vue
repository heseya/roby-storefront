<template>
  <div class="cart-summary" :class="{ 'cart-summary--disabled': disabled }">
    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ t('summary.productsPrice') }}</div>
      <div class="cart-summary__value">{{ formatAmount(cart.totalValueInitial) }}</div>
    </div>

    <div v-if="cart.totalDiscountValue > 0" class="cart-summary__item cart-summary__item--green">
      <div class="cart-summary__label">{{ t('summary.discount') }}</div>
      <div class="cart-summary__value">{{ formatAmount(cart.totalDiscountValue) }}</div>
    </div>

    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ t('summary.shipping') }}</div>
      <div class="cart-summary__value">
        {{ t('summary.from') }} {{ formatAmount(cheapestShippingMethodPrice) }}
      </div>
    </div>

    <hr class="hr cart-summary__line" />

    <div class="cart-summary__item">
      <div class="cart-summary__label">{{ t('summary.total') }}</div>
      <div class="cart-summary__value cart-summary__value--big">
        {{ formatAmount(cart.totalValue) }}
      </div>
    </div>

    <LayoutButton
      variant="primary"
      class="cart-summary__button"
      :disabled="disabled"
      @click="isAuthenticationModalVisible = true"
    >
      {{ t('summary.submit') }}
    </LayoutButton>

    <span class="cart-summary__text">{{ t('summary.paymentMethods') }}</span>
    <div class="cart-summary__payment-methods">
      <b v-if="isTraditionalTransfer">{{ t('summary.tratidionalTransfer') }}</b>
      <img
        v-for="method in paymentMethods"
        :key="method.id"
        :src="method.icon"
        :alt="method.name"
      />
    </div>
    <CartLoginBlockModal v-model:open="isAuthenticationModalVisible" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "summary": {
      "productsPrice": "Cena produktów",
      "discount": "Oszczędzasz",
      "shipping": "Dostawa",
      "from": "już od",
      "total": "Łączna kwota",
      "submit": "Przejdź do finalizacji zamówienia",
      "paymentMethods": "Dostępne metody płatności:",
      "tratidionalTransfer": "Przelew tradycyjny"
    }
  }
}
</i18n>

<script setup lang="ts">
import { PaymentMethod } from '@heseya/store-core'
import { useCartStore } from '@/store/cart'
import PayuIcon from '@/assets/images/payu.png'

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

// TODO: get from API
const cheapestShippingMethodPrice = 7.99

// TODO: get from API
const paymentMethods: PaymentMethod[] = [
  {
    id: 'payu',
    url: '/',
    alias: 'payu',
    public: true,
    app: null,
    name: 'Przelew bankowy',
    icon: PayuIcon,
  },
]

// TODO: get from API
const isTraditionalTransfer = true
const isAuthenticationModalVisible = ref<boolean>(false)
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
      color: $green-color;
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
      height: 2em;
    }
  }
}
</style>
