<template>
  <AccountProductsList v-if="order" :header="t(header)" :link="link" class="account-order-card">
    <div v-if="order" class="account-order-card__info">
      <div class="account-order-card__details">
        <div class="account-order-card__details-box">
          <b>{{ t('orderNumber') }}: </b>
          <NuxtLink :to="`/order/${order.code}`" class="account-order-card__link"
            >{{ order.code }}
          </NuxtLink>
        </div>
        <div class="account-order-card__details-box">
          <b>{{ t('orderCreatingDate') }}:</b>
          {{ formatDate(order.created_at, 'dd.MM.yyyy HH:MM') }}
        </div>
      </div>
      <div>
        <b> {{ t('status') }}:</b>
        <LayoutButton
          class="account-order-card__status-btn"
          :style="{ 'background-color': `#${order.status.color}` }"
        >
          {{ order.status.name }}
        </LayoutButton>
      </div>
    </div>
    <div v-if="order?.products" class="account-order-card__items">
      <div class="account-order-card__items-list">
        <div v-for="{ product } in order.products" :key="product.id">
          <AccountListItem :product="product" />
        </div>
      </div>
      <div class="account-order-card__actions">
        <NuxtLink :to="`/order/${order.code}`">
          <LayoutButton class="account-order-card__details-btn">
            {{ t('orderDetails') }}
            <LayoutIcon :icon="GoNextIcon" :size="8" />
          </LayoutButton>
        </NuxtLink>
      </div>
    </div>
  </AccountProductsList>
</template>

<i18n lang="json">
{
  "pl": {
    "orderNumber": "Numer zamówienia",
    "orderCreatingDate": "Data złożenia",
    "status": "Status",
    "orderDetails": "Szczegóły Zamówienia"
  }
}
</i18n>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'

const t = useLocalI18n()

const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    code: string
    link?: string
    header?: string
  }>(),
  {
    link: '',
    header: '',
  },
)

const { data: order } = useAsyncData(`account/order/${props.code}`, async () => {
  try {
    return await heseya.UserProfile.Orders.getOneByCode(props.code)
  } catch {}
})
</script>

<style lang="scss" scoped>
.account-order-card {
  &__info,
  &__items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ($viewport-12) {
      flex-direction: row;
    }
  }

  &__info {
    margin-bottom: 15px;

    @media ($viewport-12) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__status-btn {
    margin-left: 10px;
    padding: 4px 6px;
    margin-top: 5px;

    @media ($viewport-12) {
      margin-top: 0px;
    }
  }

  &__details-btn {
    height: fit-content;
    padding: 8px 18px;
    margin-right: 5px;
    margin-top: 20px;
    background-color: $gray-color-300;
    color: $text-color;
    border-radius: 5px;

    &:hover {
      background-color: $gray-color-400 !important;
    }

    @media ($viewport-12) {
      margin-top: 0;
      padding: 6px 18px;
    }
  }

  &__details {
    display: grid;
    gap: 5px;

    @media ($viewport-12) {
      display: flex;
      gap: 55px;
    }
  }

  &__details-box {
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

  &__items-list {
    display: flex;
    gap: 10px;
  }
}
</style>
