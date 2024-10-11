<template>
  <div class="payment-methods-select">
    <FormRadioGroup v-model:value="value" :options="optionGroups" name="payment-method">
      <template #traditional>
        <CheckoutTraditionalPaymentNotice class="payment-methods-select__notice" />
      </template>

      <template v-for="method in paymentMethods" :key="method.id" #[`${method.id}-label`]>
        <div class="payment-methods-select__label">
          {{ method.name }}
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

<script setup lang="ts">
import type { PaymentMethodListed } from '@heseya/store-core'
import type { RadioGroupOption } from '@/components/form/RadioGroup.vue'

import { useChannelsStore } from '@/store/channels'
import { isTraditionalTransferPayment } from '~/utils/paymentMethods'
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'

const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    value: string | null
    shippingMethodId?: string
    orderCode?: string
  }>(),
  {
    value: null,
    shippingMethodId: undefined,
    orderCode: undefined,
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
  const channel = useChannelsStore()

  const { data } = await heseya.PaymentMethods.get({
    shipping_method_id: props.shippingMethodId,
    sales_channel_id: channel.selected?.id,
    order_code: props.orderCode,
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

const optionGroups = computed<RadioGroupOption[]>(() => [
  ...(paymentMethods.value?.map((method) => ({
    key: isTraditionalTransferPayment(method) ? TRADITIONAL_PAYMENT_KEY : method.id,
    value: method.id,
    label: method.name,
  })) || []),
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
