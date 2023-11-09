<template>
  <div class="order-status-payment">
    <h2 class="order-status-payment__title">{{ t('title') }}</h2>
    <CheckoutPaymentMethodsSelect
      v-model:value="selectedPaymentMethodId"
      :shipping-method-id="order?.shipping_method?.id"
      class="order-status-payment__payment-methods"
    />
    <LayoutButton
      class="order-status-payment__btn"
      :disabled="!selectedPaymentMethodId"
      @click="pay"
    >
      {{ $t('payments.confirmAndPay') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wybierz metodę płatności"
  },
  "en": {
    "title": "Choose payment method"
  }
}
</i18n>

<script setup lang="ts">
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'
import { useCheckoutStore } from '~/store/checkout'

const props = withDefaults(
  defineProps<{
    code: string
  }>(),
  {},
)

const t = useLocalI18n()
const $t = useGlobalI18n()
const { notify } = useNotify()
const localePath = useLocalePath()
const formatError = useErrorMessage()
const selectedPaymentMethodId = ref<string | null>(null)
const checkout = useCheckoutStore()

const { data: order } = useAsyncData(`order-summary-${props.code}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(props.code)

    if (!order.payable) navigateTo(localePath(`/status/${props.code}`), { replace: true })

    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: $t('errors.ORDER_WITH_THIS_NUMBER_DOESNT_EXIST'), statusCode: code })
  }
})

const pay = async () => {
  try {
    if (!selectedPaymentMethodId.value) return

    if (selectedPaymentMethodId.value === TRADITIONAL_PAYMENT_KEY) {
      navigateTo(localePath(`/status/${props.code}/traditional-payment`))
      return
    }

    const paymentUrl = await checkout.createOrderPayment(props.code, selectedPaymentMethodId.value)
    window.location.href = paymentUrl
  } catch (e) {
    notify({ type: 'error', text: formatError(e) })
  }
}
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
    margin: 24px 0;
  }
}
</style>
