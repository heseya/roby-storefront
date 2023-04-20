<template>
  <div class="checkout-payment-methods">
    <FormRadioGroup
      v-model:value="checkout.paymentMethodId"
      :options="optionGroups"
      name="payment-method"
    >
      <template #traditional>
        <CheckoutTraditionalPaymentNotice class="checkout-payment-methods__notice" />
      </template>

      <template #payu-label>
        <div class="checkout-payment-methods__label">
          {{ t('paymentMethods.quick') }}
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
      "quick": "Przelew natychmiastowy"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'
import { RadioGroupOption } from '@/components/form/RadioGroup.vue'
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const config = useConfigStore()
const heseya = useHeseya()

const { data: paymentMethods, refresh } = useAsyncData('payment-methods', async () => {
  const { data } = await heseya.PaymentMethods.get({
    shipping_method_id: checkout.shippingMethod?.id,
  })
  return data
})

watch(
  () => checkout.shippingMethod?.id,
  () => refresh(),
)

const TRADITIONAL_TRANSFER: RadioGroupOption = {
  key: 'traditional',
  value: 'traditional',
  label: t('paymentMethods.traditional'),
}

const isTraditionalTransfer = computed(() => config.env.allow_traditional_transfer === '1')

const optionGroups = computed<RadioGroupOption[]>(() => [
  ...(isTraditionalTransfer.value ? [TRADITIONAL_TRANSFER] : []),
  ...(paymentMethods.value?.map((method) => ({
    key: method.alias,
    value: method.id,
    label: method.name,
  })) || []),
])
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
