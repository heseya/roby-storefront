<template>
  <div class="account-order-details-card">
    <div>
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

      <div>
        <div class="account-order-details-card__payment-status-box">
          <div class="account-order-details-card__header">
            {{ t('payment') }}
          </div>

          <div class="account-order-details-card__payment-status">
            <LayoutIcon :icon="MarkCircle" :size="12" class="account-order-details-card__icon" />
            {{ order.payments[0].status }}
          </div>
        </div>
        <div class="account-order-details-card__text">
          {{ order.payments[order.payments.length - 1]?.method }}
        </div>
      </div>
    </div>
    <div class="account-order-details-card__spacer" />
    <AccountOrderProductsAndSummary v-if="order" :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "delivery": "Dostawa",
    "deliveryAddress": "Adres dostawy",
    "billing": "Dane do rachunku",
    "payment": "Płatność"
  }
}
</i18n>

<script setup lang="ts">
import { Order } from '@heseya/store-core'
import MarkCircle from '@/assets/icons/mark-circle.svg?component'
import XmarkCircle from '@/assets/icons/x-mark-circle.svg?component'
const t = useLocalI18n()

defineProps<{
  order: Order
}>()
</script>

<style lang="scss" scoped>
.account-order-details-card {
  border: 1px solid $gray-color-300;
  display: grid;
  grid-template-columns: 0.3fr 0.01fr 0.69fr;
  padding: 21px 20px;
  gap: 30px;

  &__spacer {
    border-right: 1px solid $gray-color-300;
  }

  &__header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &__payment-status {
    margin-right: 10px;
  }

  &__first-section-box {
    margin-bottom: 20px;
  }

  &__payment-status-box {
    display: flex;
    justify-content: space-between;
  }

  &__icon {
    padding-top: 2px;
  }

  &__text,
  &__payment-status {
    font-size: 12px;
  }
}
</style>
