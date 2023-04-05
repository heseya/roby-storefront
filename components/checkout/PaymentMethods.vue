<template>
  <div class="checkout-payment-methods">
    <FormRadioGroup v-model="selectedMethod" :options="METHODS" name="payment-method">
      <template #traditional>
        <CheckoutTraditionalPaymentNotice class="checkout-payment-methods__notice" />
      </template>

      <template #bluemedia-label>
        <div class="checkout-payment-methods__label">
          {{ t('paymentMethods.bluemedia') }}
          <img
            src="@/assets/images/payu.png"
            role="presentation"
            class="checkout-payment-methods__label-img"
          />
        </div>
      </template>
    </FormRadioGroup>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "paymentMethods": {
      "traditional": "Przelew bankowy",
      "bluemedia": "Przelew natychmiastowy"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const METHODS = [
  { key: 'traditional', value: 'traditional', label: t('paymentMethods.traditional') },
  { key: 'bluemedia', value: 'bluemedia', label: '' },
]

const selectedMethod = ref('1')
</script>

<style lang="scss" scoped>
.checkout-payment-methods {
  &__label {
    display: flex;
    align-items: center;
  }

  &__label-img {
    height: 16px;
    margin-left: 16px;
    transform: scale(2);
  }

  &__notice {
    font-size: rem(12);
  }
}
</style>
