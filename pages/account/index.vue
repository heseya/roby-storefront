<template>
  <LayoutAccountNav class="account-page">
    <template v-if="!errorMessage" #header>
      <div class="account-page__header">
        <h1 class="account-page__header-text">{{ t('welcome') }}{{ user?.name }}</h1>
        <p>{{ t('message') }}</p>
      </div>
    </template>
    <div v-if="!errorMessage" class="account-page__container">
      <AccountProductsList :header="t('lastOrder')" :link="`/account/orders`">
        <div v-if="userLastOrder" class="account-page__info">
          <div class="account-page__details">
            <div class="account-page__details-box">
              <b>{{ t('orderNumber') }}: </b>
              <NuxtLink :to="`/order/${userLastOrder.code}`" class="account-page__link"
                >{{ userLastOrder.code }}
              </NuxtLink>
            </div>
            <div class="account-page__details-box">
              <b>{{ t('orderCreatingDate') }}:</b>
              {{ formatDate(userLastOrder.created_at, 'dd.MM.yyyy HH:MM') }}
            </div>
          </div>
          <div>
            <b> {{ t('status') }}:</b>
            <LayoutButton
              class="account-page__status-btn"
              :style="{ 'background-color': `#${userLastOrder.status.color}` }"
            >
              {{ userLastOrder.status.name }}
            </LayoutButton>
          </div>
        </div>
        <div v-if="userLastOrder?.products" class="account-page__items">
          <div class="account-page__items-list">
            <div v-for="{ product } in userLastOrder.products" :key="product.id">
              <AccountListItem :product="product" />
            </div>
          </div>
          <div class="account-page__actions">
            <NuxtLink :to="`/order/${userLastOrder.code}`">
              <LayoutButton class="account-page__details-btn">
                {{ t('orderDetails') }}
                <LayoutIcon :icon="GoNextIcon" :size="8" />
              </LayoutButton>
            </NuxtLink>
          </div>
        </div>
      </AccountProductsList>

      <AccountProductsList :header="t('wishList')" :link="`/account/wishlist`">
        <div v-if="wishlist?.userWishlist" class="account-page__items-list">
          <div v-for="{ product } in wishlist.userWishlist" :key="product.id">
            <AccountListItem :product="product" />
          </div>
        </div>
      </AccountProductsList>
    </div>
    <LayoutInfoBox v-else type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </LayoutAccountNav>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Moje konto",
    "welcome": "Witaj, ",
    "message": "Tutaj możesz zarządzać swoimi zamówieniami oraz ustawieniami konta.",
    "lastOrder": "Ostatnie zamówienie",
    "wishList": "Lista życzeń",
    "orderNumber": "Numer zamówienia",
    "orderCreatingDate": "Data złożenia",
    "status": "Status",
    "orderDetails": "Szczegóły Zamówienia"
  }
}
</i18n>

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'

const t = useLocalI18n()

useHead({
  title: t('title'),
})

const user = useUser()
const heseya = useHeseya()
const wishlist = useWishlistStore()

const formatError = useErrorMessage()

const errorMessage = ref('')

const { data: userLastOrder } = useAsyncData(`userOrders`, async () => {
  try {
    const { data } = await heseya.UserProfile.Orders.get()
    if (data.length) {
      return await heseya.UserProfile.Orders.getOneByCode(data[0].code)
    }
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>

<style lang="scss" scoped>
.account-page {
  &__container {
    padding: 16px;
    display: grid;
    gap: 30px;

    @media ($viewport-11) {
      padding: 0px;
    }
  }

  &__header {
    display: grid;
    gap: 12px;

    @media ($max-viewport-12) {
      gap: 8px;
    }
  }

  &-text {
    font-size: 26px;

    @media ($max-viewport-12) {
      font-size: 20px;
    }
  }

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

  &__items-list {
    display: flex;
    gap: 10px;
  }

  &__link {
    text-decoration: none;
    color: $blue-color;
  }

  &__icon {
    margin-left: 4px;
  }
}
</style>
