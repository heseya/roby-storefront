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
  },
  "en": {
    "paymentMethods": {
      "traditional": "Bank transfer",
      "quick": "Instant transfer"
    }
  }
}
</i18n>

<script setup lang="ts">
import type { PaymentMethodListed } from '@heseya/store-core'
import type { RadioGroupOption } from '@/components/form/RadioGroup.vue'

import { useConfigStore } from '~/store/config'
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'

const t = useLocalI18n()
const config = useConfigStore()
const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    value: string | null
    shippingMethodId?: string
  }>(),
  {
    value: null,
    shippingMethodId: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
  (e: 'select', value: PaymentMethodListed | null): void
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
    shipping_method_id: props.shippingMethodId,
  })
  return data
})

watch(
  () => props.shippingMethodId,
  () => refresh(),
)

watch(
  () => value.value,
  () => emit('select', paymentMethods.value?.find((method) => method.id === value.value) ?? null),
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
    transform: scale(1.4);
  }

  &__notice {
    font-size: rem(12);
  }
}
</style>
