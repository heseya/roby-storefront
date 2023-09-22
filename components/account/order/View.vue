<template>
  <div class="account-order-view">
    <div class="account-order-view__section">
      <AccountOrderDetailsContainer :header="$t('orders.delivery')">
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
        <NuxtLink :to="localePath(`/pay/${order.code}`)">
          <LayoutButton
            v-if="order.payable"
            class="account-order-view__payment-button"
            :label="t('goToPayment')"
          />
        </NuxtLink>
      </div>

      <AccountOrderDetailsContainer :header="$t('orders.documents')">
        <div v-if="order.documents.length > 0">
          <a
            v-for="document in order.documents"
            :key="document.id"
            :href="downloadUrl(order.id, document.id)"
          >
            {{ document.name }}
          </a>
        </div>
        <div v-else>{{ $t('orders.no_documents') }}</div>
      </AccountOrderDetailsContainer>
    </div>

    <AccountOrderViewProducts v-if="order" :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "goToPayment": "Przejdź do płatności"
  },
  "en": {
    "goToPayment": "Go to payment"
  }
}
</i18n>

<script setup lang="ts">
import { Order, PaymentStatus } from '@heseya/store-core'
import Successful from '@/assets/icons/mark-circle.svg?component'
import Failed from '@/assets/icons/x-mark-circle.svg?component'
import Pending from '@/assets/icons/pending.svg?component'
const t = useLocalI18n()
const $t = useGlobalI18n()
const localePath = useLocalePath()
const heseya = useHeseya()

const props = defineProps<{
  order: Order
}>()

const paymentStatus = computed(() => {
  const { paid, shipping_method: shippingMethod } = props.order

  if (paid)
    return {
      icon: Successful,
      class: 'account-order-view__payment-status--successful',
      status: {
        text: $t('payments.paid'),
        value: PaymentStatus.Successful,
      },
    }

  if (shippingMethod?.payment_on_delivery)
    return {
      icon: Pending,
      class: 'account-order-view__payment-status--pending',
      status: {
        text: t('payments.paymentOnDelivery'),
        value: PaymentStatus.Pending,
      },
    }

  return {
    icon: Failed,
    class: 'account-order-view__payment-status--failed',
    status: {
      text: $t('payments.unpaid'),
      value: PaymentStatus.Failed,
    },
  }
})

const downloadUrl = async (orderId: string, documentId: string): Promise<string> => {
  return await heseya.Orders.Documents.download(orderId, documentId).then((response) => {
    return URL.createObjectURL(response)
  })
}
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
      color: $green-color-500;
    }

    &--pending {
      color: var(--warning-color);
    }

    &--failed {
      color: var(--error-color);
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
    color: #fff !important;
  }

  &__icon {
    margin-right: 4px;
  }
}
</style>
