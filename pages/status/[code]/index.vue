<template>
  <NuxtLayout name="checkout">
    <div class="status-page">
      <h1 class="status-page__title">{{ $t('orders.details') }}</h1>

      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.number') }}:</span>
        <span class="status-page__field-value blue-text">{{ orderCode }}</span>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ $t('orders.status') }}:</span>
        <span class="status-page__field-value" :style="{ color: `#${order?.status.color}` }">
          {{ order?.status.name }}
        </span>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ $t('payments.payment') }}:</span>
        <b v-if="order?.paid" class="status-page__field-value green-text">
          {{ $t('payments.paid') }}
        </b>
        <b
          v-else-if="order?.shipping_method?.payment_on_delivery"
          class="status-page__field-value warning-text"
        >
          {{ $t('payments.paymentOnDelivery') }}
        </b>
        <b v-else class="status-page__field-value error-text"> {{ $t('payments.unpaid') }} </b>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.value') }}:</span>
        <b class="status-page__field-value">
          {{ formatAmount(order?.summary || 0, currency) }}
        </b>
      </div>

      <NuxtLink v-if="isPayable" class="status-page__link" :to="localePath(`/pay/${orderCode}`)">
        <LayoutButton class="status-page__btn">
          {{ $t('payments.payForOrder') }}
        </LayoutButton>
      </NuxtLink>

      <NuxtLink class="status-page__link" :to="localePath('/')">
        <LayoutButton class="status-page__btn" :variant="isPayable ? 'gray' : 'primary'">
          {{ $t('nav.goToMainPage') }}
        </LayoutButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "fields": {
      "number": "Numer",
      "value": "Wartość"
    }
  },
  "en": {
    "fields": {
      "number": "Number",
      "value": "Value"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const $t = useGlobalI18n()
const route = useRoute()
const localePath = useLocalePath()
const currency = useCurrency()

const orderCode = computed(() => route.params.code as string)

const { data: order } = useAsyncData(`order-summary-${orderCode}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(orderCode.value)
    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: $t('errors.ORDER_WITH_THIS_NUMBER_DOESNT_EXIST'), statusCode: code })
  }
})

const isPayable = computed(() => order.value?.payable || false)

useSeoTitle(t('orders.details'))
</script>

<style lang="scss" scoped>
.status-page {
  max-width: 400px;
  width: 100%;
  padding: 24px;
  margin: 0 8px;
  background-color: #fff;
  margin-top: 40px;

  &__field {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  &__title {
    font-size: rem(20);
  }

  &__link {
    display: block;
    width: 100%;
  }

  &__btn {
    width: 100%;
    margin-top: 8px;
  }

  &__payment {
    margin-top: 16px;
  }

  &__payment-methods {
    margin: 8px 0;
  }
}
</style>
