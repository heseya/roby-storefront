<template>
  <div class="payment-methods-select">
    <FormRadioGroup v-model:value="value" :options="optionGroups" name="payment-method">
      <template #traditional>
        <CheckoutTraditionalPaymentNotice class="payment-methods-select__notice" />
      </template>

      <template v-for="method in paymentMethods" :key="method.id" #[`${method.id}-label`]>
        <div class="payment-methods-select__label">
          {{ t('paymentMethods.quick') }} {{ method.name }}
          <img
            v-if="method.icon"
            :src="method.icon"
            role="presentation"
            class="payment-methods-select__label-img"
            loading="lazy"
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
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const config = useConfigStore()
const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    value: string | null
  }>(),
  {
    value: null,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
}>()

const value = computed<string | null>({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  },
})

const { data: paymentMethods, refresh } = useLazyAsyncData('payment-methods-select', async () => {
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
  key: TRADITIONAL_PAYMENT_KEY,
  value: TRADITIONAL_PAYMENT_KEY,
  label: t('paymentMethods.traditional'),
}

const optionGroups = computed<RadioGroupOption[]>(() => [
  ...(paymentMethods.value?.map((method) => ({
    key: method.id,
    value: method.id,
    label: method.name,
  })) || []),
  ...(config.isTraditionalTransfer ? [TRADITIONAL_TRANSFER] : []),
])
</script>

<style lang="scss" scoped>
.payment-methods-select {
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
