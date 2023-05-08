<template>
  <div class="account-order-details-header">
    <div class="account-order-details-header__content">
      <div class="account-order-details-header__box">
        <b>{{ t('orderNumber') }}: </b>
        <NuxtLink :to="`/account/orders/${code}`" class="account-order-details-header__link">
          {{ code }}
        </NuxtLink>
      </div>
      <div class="account-order-details-header__box">
        <b>{{ t('orderCreatingDate') }}:</b>
        {{ formatDate(createdAt, 'dd.MM.yyyy HH:MM') }}
      </div>
    </div>
    <div class="account-order-details-header__status">
      <b v-if="statusLabel"> {{ t('status') }}:</b>
      <LayoutButton
        class="account-order-details-header__status-btn"
        :style="{ 'background-color': `#${color}` }"
        :label="name"
      />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "orderNumber": "Numer zamówienia",
    "orderCreatingDate": "Data złożenia",
    "status": "Status"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
defineProps<{
  code: string
  createdAt: string
  color: string
  name: string
  statusLabel?: boolean
}>()
</script>

<style lang="scss" scoped>
.account-order-details-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  @media ($viewport-12) {
    flex-direction: row;
    justify-content: space-between;
  }

  &__content {
    display: grid;
    gap: 5px;

    @media ($viewport-12) {
      display: flex;
      gap: 55px;
    }
  }

  &__box {
    @media ($viewport-12) {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  &__link {
    text-decoration: none;
    color: $blue-color;
  }

  &__status-btn {
    margin-left: 10px;
    padding: 4px 6px;
    margin-top: 5px;

    @media ($viewport-12) {
      margin-top: 0px;
    }
  }
}
</style>
