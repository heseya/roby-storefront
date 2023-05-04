<template>
  <div class="order-status-payment">
    <h2 class="order-status-payment__title">{{ t('title') }}</h2>
    <CheckoutPaymentMethodsSelect
      v-model:value="selectedPaymentMethodId"
      class="order-status-payment__payment-methods"
    />
    <LayoutButton class="order-status-payment__btn" :disabled="!selectedPaymentMethodId">
      {{ t('btn') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wybierz metodę płatności",
    "btn": "Potwierdzam i płacę"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const selectedPaymentMethodId = ref<string | null>(null)
</script>

<style lang="scss" scoped>
.order-status-payment {
  &__title {
    font-size: rem(20);
    font-weight: 600;
  }

  &__btn {
    width: 100%;
    margin-top: 8px;
  }

  &__payment-methods {
    margin: 8px 0;
  }
}
</style>
