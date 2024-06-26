<template>
  <NuxtLayout name="checkout">
    <div class="checkout-container">
      <div class="checkout-container__icon">
        <ShoppingBag />
      </div>
      <div class="checkout-container__header">{{ t('container.header') }}</div>
      <div class="checkout-container__text">
        <span>{{ t('container.text') }}&nbsp;</span>
        <span v-if="auth.isLogged">
          {{ t('container.text2') }}
          <b>
            <NuxtLink :to="localePath(`/account`)" class="checkout-container__link">
              {{ $t('breadcrumbs.account') }}
            </NuxtLink>
          </b>
        </span>
      </div>
      <div v-if="route.query.code" class="checkout-container__nav">
        <NuxtLink :to="localePath(`/status/${orderCode}`)">
          <LayoutButton class="checkout-container__btn"> {{ t('container.btn') }}</LayoutButton>
        </NuxtLink>
      </div>

      <CheckoutTraditionalPaymentDetails v-if="isTraditionalPayment" :code="orderCode" />
    </div>

    <IntegrationEkomiSurvey :order-code="orderCode" />
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "container": {
      "header": "Dziękujemy za zakupy!",
      "text": "Na Twojego maila zostanie wysłane potwierdzenie zakupu.",
      "text2": "Szczegóły zamówienia znajdziesz również w",
      "btn": "Sprawdź szczegóły zamówienia"
    }
  },
  "en": {
    "container": {
      "header": "Thank you for shopping!",
      "text": "A purchase confirmation will be sent to your email.",
      "text2": "Order details can also be found in",
      "btn": "Check your order details"
    }
  }
}
</i18n>

<script setup lang="ts">
import ShoppingBag from '@/assets/icons/shopping-bag.svg?component'
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'
import { useAuthStore } from '~/store/auth'
definePageMeta({
  layout: 'checkout',
})

const route = useRoute()
const auth = useAuthStore()
const localePath = useLocalePath()

const t = useLocalI18n()
const $t = useGlobalI18n()

const orderCode = computed(() => route.query.code as string)

const isTraditionalPayment = computed(() => route.query.payment === TRADITIONAL_PAYMENT_KEY)

useSeoTitle(t('container.header'))
</script>

<style lang="scss" scoped>
.checkout-container {
  display: grid;
  align-content: center;
  gap: 30px;
  padding: 10px;
  background-color: $white-color;
  width: 90%;

  @media ($viewport-7) {
    width: 80%;
    gap: 20px;
    align-content: flex-start;
  }

  @media ($viewport-13) {
    width: 41%;
  }

  &__icon {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__header,
  &__text {
    text-align: center;
  }

  &__header {
    font-weight: 700;
    font-size: 25px;
    line-height: 2rem;
  }

  &__text {
    font-size: 12px;
  }

  &__nav {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  &__btn {
    padding: 10px 55px;
  }

  &__link {
    color: $text-color;
  }
}
</style>
