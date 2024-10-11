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
        <NuxtLink v-if="order.payable" :to="localePath(`/pay/${order.code}`)">
          <LayoutButton class="account-order-view__payment-button" :label="t('goToPayment')" />
        </NuxtLink>
      </div>

      <AccountOrderDetailsContainer :header="t('documents')">
        <div v-if="order.documents.length > 0">
          <button
            v-for="document in order.documents"
            :key="document.id"
            class="account-order-view__document-link"
            @click="downloadFile(order.id, document.id, document.name)"
          >
            {{ document.name }}
          </button>
        </div>
        <div v-else>{{ t('noDocuments') }}</div>
      </AccountOrderDetailsContainer>
    </div>

    <AccountOrderViewProducts v-if="order" :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "goToPayment": "Przejdź do płatności",
    "documents": "Dokumenty",
    "noDocuments": "Brak dokumentów"
  },
  "en": {
    "goToPayment": "Go to payment",
    "documents": "Documents",
    "noDocuments": "No documents available"
  }
}
</i18n>

<script setup lang="ts">
import { PaymentMethodType, PaymentStatus } from '@heseya/store-core'
import type { Order } from '@heseya/store-core'

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
  const { paid, payment_method_type: paymentMethodType } = props.order

  if (paid)
    return {
      icon: Successful,
      class: 'account-order-view__payment-status--successful',
      status: {
        text: $t('payments.paid'),
        value: PaymentStatus.Successful,
      },
    }

  if (paymentMethodType === PaymentMethodType.Postpaid)
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
const downloadFile = async (orderId: string, documentId: string, documentName: string | null) => {
  const url = await heseya.Orders.Documents.download(orderId, documentId).then((response) =>
    URL.createObjectURL(response),
  )

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', url)
  linkElement.setAttribute('target', '_blank')
  linkElement.setAttribute('download', documentName ?? '')
  linkElement.click()
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

  &__document-link {
    background-color: unset;
    border: unset;
    color: $blue-color-500;
    cursor: pointer;

    &:hover {
      color: $blue-color-700;
    }
  }

  &__icon {
    margin-right: 4px;
  }
}
</style>
