<template>
  <div class="account-order-details-card">
    <div class="account-order-details-card__details-box">
      <AccountOrderDetailsBox :header="t('delivery')">
        {{ order.shipping_method?.name }}
      </AccountOrderDetailsBox>

      <AccountOrderDetailsBox
        v-if="typeof order.shipping_place === 'string'"
        :header="t('deliveryAddress')"
      >
        {{ order.shipping_method?.name }}
      </AccountOrderDetailsBox>

      <AccountOrderDetailsBox v-else :header="t('deliveryAddress')">
        <div>{{ order.shipping_place?.name }}</div>
        <div>{{ order.shipping_place?.phone }}</div>
        <div>{{ order.shipping_place?.address }}</div>
        <div>{{ order.shipping_place?.zip }} {{ order.shipping_place?.city }}</div>
      </AccountOrderDetailsBox>

      <AccountOrderDetailsBox :header="t('billing')">
        <div>{{ order.billing_address.name }}</div>
        <div>{{ order.billing_address.vat }}</div>
        <div>{{ order.billing_address.phone }}</div>
        <div>{{ order.billing_address.address }}</div>
        <div>{{ order.billing_address.zip }} {{ order.billing_address.city }}</div>
      </AccountOrderDetailsBox>

      <div v-if="paymentStatus">
        <div class="account-order-details-card__payment-status-box">
          <div class="account-order-details-card__header">
            {{ t('payment') }}
          </div>

          <div class="account-order-details-card__payment-status" :class="paymentStatus.class">
            <LayoutIcon
              :icon="paymentStatus.icon"
              :size="12"
              class="account-order-details-card__icon"
            />
            <div>{{ paymentStatus.status }}</div>
          </div>
        </div>
        <div class="account-order-details-card__text">
          {{ paymentStatus?.method }}
        </div>
      </div>
      <NuxtLink :to="`/pay/${order.code}`">
        <LayoutButton
          v-if="paymentStatus.status === t('failed')"
          class="account-order-details-card__payment-button"
          :label="t('goToPayment')"
        />
      </NuxtLink>
    </div>

    <AccountOrderProductsAndSummary v-if="order" :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "delivery": "Dostawa",
    "deliveryAddress": "Adres dostawy",
    "billing": "Dane do rachunku",
    "payment": "Płatność",
    "paid": "Opłacono",
    "pending": "W trakcie",
    "failed": "Nie opłacono",
    "goToPayment": "Przejdź do płatności"
  }
}
</i18n>

<script setup lang="ts">
import { Order, PaymentStatus } from '@heseya/store-core'
import Successful from '@/assets/icons/mark-circle.svg?component'
import Failed from '@/assets/icons/x-mark-circle.svg?component'
import Pending from '@/assets/icons/pending.svg?component'
const t = useLocalI18n()

const props = defineProps<{
  order: Order
}>()

const paymentStatus = computed(() => {
  const { payments } = props.order

  const successfulPayment = payments.find((p) => p.status === PaymentStatus.Successful)
  const pendingPayment = payments.find((p) => p.status === PaymentStatus.Pending)
  const failedPayment = payments.find((p) => p.status === PaymentStatus.Failed)

  const payment = successfulPayment || pendingPayment || failedPayment

  switch (payment?.status) {
    case PaymentStatus.Successful:
      return {
        icon: Successful,
        class: 'account-order-details-card__payment-status--successful',
        status: t('paid'),
        method: payment.method,
      }
    case PaymentStatus.Pending:
      return {
        icon: Pending,
        class: 'account-order-details-card__payment-status--pending',
        status: t('pending'),
        method: payment.method,
      }
    default:
      return {
        icon: Failed,
        class: 'account-order-details-card__payment-status--failed',
        status: t('failed'),
        method: payment?.method || '',
      }
  }
})
</script>

<style lang="scss" scoped>
.account-order-details-card {
  width: 100%;
  border: 1px solid $gray-color-300;
  display: grid;
  padding: 21px 20px;
  gap: 20px;

  @media ($viewport-12) {
    grid-template-columns: 0.4fr 1fr;
  }

  &__details-box {
    border-bottom: 1px solid $gray-color-300;
    padding-bottom: 26px;
    display: grid;
    align-items: space-between;

    @media ($viewport-12) {
      border-right: 1px solid $gray-color-300;
      padding-right: 16px;
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  &__header {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  &__payment-status {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--successful {
      color: $green-color;
    }

    &--pending {
      color: $secondary-color-alt;
    }

    &--failed {
      color: $primary-color;
      font-weight: bold;
    }
  }

  &__payment-status-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__text,
  &__payment-status {
    font-size: 12px;
  }

  &__payment-button {
    margin-top: 10px;
    width: 100%;
    background-color: $gray-color-900;
  }

  &__icon {
    margin-right: 4px;
  }
}
</style>
