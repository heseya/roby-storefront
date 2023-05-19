<template>
  <div class="account-order-view">
    <div class="account-order-view__section">
      <AccountOrderDetailsContainer :header="$t('custom.delivery')">
        {{ order.shipping_method?.name }}
      </AccountOrderDetailsContainer>

      <AccountOrderDetailsContainer :header="$t('payments.deliveryAddress')">
        <AccountOrderDeliveryAddress :order="order" />
      </AccountOrderDetailsContainer>

      <AccountOrderDetailsContainer :header="$t('payments.billingAddress')">
        <div>{{ order.billing_address.name }}</div>
        <div>{{ order.billing_address.vat }}</div>
        <div>{{ order.billing_address.phone }}</div>
        <div>{{ order.billing_address.address }}</div>
        <div>{{ order.billing_address.zip }} {{ order.billing_address.city }}</div>
      </AccountOrderDetailsContainer>

      <div>
        <div class="account-order-view__payment-status-box">
          <div class="account-order-view__header">
            {{ $t('payments.payment') }}
          </div>

          <div class="account-order-view__payment-status" :class="paymentStatus.class">
            <LayoutIcon :icon="paymentStatus.icon" :size="12" class="account-order-view__icon" />
            <div>{{ paymentStatus.status.text }}</div>
          </div>
        </div>
        <div class="account-order-view__text">
          {{
            paymentStatus?.method === 'offline'
              ? $t('payments.traditionalTransfer')
              : paymentStatus?.method
          }}
        </div>
        <NuxtLink :to="`/pay/${order.code}`">
          <LayoutButton
            v-if="order.payable"
            class="account-order-view__payment-button"
            :label="t('goToPayment')"
          />
        </NuxtLink>
      </div>
    </div>

    <AccountOrderViewProducts v-if="order" :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "pending": "W trakcie",
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
const { t: $t } = useI18n({ useScope: 'global' })

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
        class: 'account-order-view__payment-status--successful',
        status: {
          text: $t('csutom.paid'),
          value: PaymentStatus.Successful,
        },
        method: payment.method,
      }
    case PaymentStatus.Pending:
      return {
        icon: Pending,
        class: 'account-order-view__payment-status--pending',
        status: {
          text: t('pending'),
          value: PaymentStatus.Pending,
        },
        method: payment.method,
      }
    default:
      return {
        icon: Failed,
        class: 'account-order-view__payment-status--failed',
        status: {
          text: $t('payments.notPaid'),
          value: PaymentStatus.Failed,
        },
        method: payment?.method || '',
      }
  }
})
</script>

<style lang="scss" scoped>
.account-order-view {
  width: 100%;
  border: 1px solid $gray-color-300;
  display: grid;
  align-items: flex-start;
  padding: 21px 20px;
  gap: 20px;

  @media ($viewport-12) {
    grid-template-columns: 0.4fr 1fr;
  }

  &__section {
    border-bottom: 1px solid $gray-color-300;
    display: grid;
    gap: 20px;

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
      color: $primary-color-alt;
    }

    &--failed {
      color: $secondary-color;
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
