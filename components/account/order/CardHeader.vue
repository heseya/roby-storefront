<template>
  <div class="account-order-card-header">
    <div class="account-order-card-header__content">
      <div class="account-order-card-header__box">
        <b>{{ t('orderNumber') }}: </b>
        <NuxtLink
          :to="localePath(`/account/orders/${code}`)"
          class="account-order-card-header__link"
        >
          {{ code }}
        </NuxtLink>
      </div>
      <div class="account-order-card-header__box">
        <b>{{ t('orderCreatingDate') }}:</b>
        {{ formatDate(createdAt, DAY_MONTH_YEAR_HOUR_MINUTE_PATTERN) }}
      </div>
    </div>
    <div class="account-order-card-header__status">
      <b> {{ $t('orders.status') }}:</b>

      <div
        class="account-order-card-header__status-btn"
        :class="`account-order-card-header__status-btn--${statusTagTheme}`"
        :style="{ 'background-color': `#${color}` }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "orderNumber": "Numer zamówienia",
    "orderCreatingDate": "Data złożenia"
  },
  "en": {
    "orderNumber": "Order number",
    "orderCreatingDate": "Creating Date"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const $t = useGlobalI18n()

const props = defineProps<{
  code: string
  createdAt: string
  color: string
  name: string
}>()

const localePath = useLocalePath()

const statusTagTheme = useContrastColor(props.color)
</script>

<style lang="scss" scoped>
.account-order-card-header {
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
    color: $blue-color-500;
  }

  &__status {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  &__status-btn {
    padding: 4px 6px;
    margin-top: 5px;
    color: $white-color;
    border-radius: 5px;

    &--dark {
      color: $text-color;
    }

    @media ($viewport-12) {
      margin-top: 0px;
    }
  }
}
</style>
