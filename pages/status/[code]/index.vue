<template>
  <NuxtLayout name="checkout">
    <div class="status-page">
      <h1 class="status-page__title">{{ t('title') }}</h1>

      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.number') }}:</span>
        <span class="status-page__field-value blue-text">{{ orderCode }}</span>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.status') }}:</span>
        <span class="status-page__field-value" :style="{ color: `#${order?.status.color}` }">
          {{ order?.status.name }}
        </span>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.payment') }}:</span>
        <b v-if="order?.paid" class="status-page__field-value green-text">
          {{ t('payment.paid') }}
        </b>
        <b v-else class="status-page__field-value error-text"> {{ t('payment.notPaid') }} </b>
      </div>
      <div class="status-page__field">
        <span class="status-page__field-label">{{ t('fields.value') }}:</span>
        <b class="status-page__field-value">
          {{ formatAmount(order?.summary || 0) }}
        </b>
      </div>

      <NuxtLink v-if="isPayable" class="status-page__link" :to="`/pay/${orderCode}`">
        <LayoutButton class="status-page__btn">
          {{ t('payBtn') }}
        </LayoutButton>
      </NuxtLink>

      <NuxtLink class="status-page__link" to="/">
        <LayoutButton class="status-page__btn" :variant="isPayable ? 'gray' : 'primary'">
          {{ t('cancelBtn') }}
        </LayoutButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Status zamówienia",
    "notFoundError": "Zamówienie o tym numerze nie istnieje",
    "fields": {
      "number": "Numer",
      "status": "Status",
      "payment": "Płatność",
      "value": "Wartość"
    },
    "payment": {
      "paid": "Opłacono",
      "notPaid": "Nieopłacono"
    },
    "payBtn": "Opłać zamówienie",
    "cancelBtn": "Przejdź na stronę główną"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const route = useRoute()

const orderCode = computed(() => route.params.code as string)

const { data: order } = useAsyncData(`order-summary-${orderCode}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(orderCode.value)
    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: t('notFoundError'), statusCode: code })
  }
})

const isPayable = computed(() => order.value?.payable || false)

useSeoMeta({
  title: () => t('title'),
})
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
