<template>
  <BaseContainer>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <LayoutAccount>
      <LayoutAccountNav class="account-page__nav" />
      <template v-if="!errorMessage" #header> {{ t('welcome') }}{{ user?.name }} </template>
      <template #text>
        {{ t('message') }}
      </template>
      <div v-if="!errorMessage" class="account-page__container">
        <AccountOrderCard
          v-if="userLastOrder"
          :code="userLastOrder.code"
          link="/account/orders"
          :header="t('lastOrder')"
        />
        <LayoutAccountOrder :header="t('wishList')" :link="`/account/wishlist`">
          <div v-if="wishlist?.userWishlist" class="account-page__items-list">
            <div v-for="product in wishlist.products" :key="product.id">
              <AccountProductCard :product="product" />
            </div>
          </div>
        </LayoutAccountOrder>
      </div>
      <LayoutInfoBox v-else type="danger">
        {{ errorMessage }}
      </LayoutInfoBox>
    </LayoutAccount>
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Moje konto",
    "welcome": "Witaj, ",
    "message": "Tutaj możesz zarządzać swoimi zamówieniami oraz ustawieniami konta.",
    "lastOrder": "Ostatnie zamówienie",
    "wishList": "Lista życzeń"
  }
}
</i18n>

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'

const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: () => t('title'),
})

const user = useUser()
const heseya = useHeseya()
const wishlist = useWishlistStore()

const formatError = useErrorMessage()

const errorMessage = ref('')

const breadcrumbs = computed(() => [{ label: $t('breadcrumbs.account'), link: '/account' }])

const { data: userLastOrder } = useAsyncData(`userLastOrder`, async () => {
  try {
    const { data } = await heseya.UserProfile.Orders.get()
    return data[0]
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>

<style lang="scss" scoped>
.account-page {
  &__items-list {
    display: flex;
    gap: 10px;
  }

  &__nav {
    @media ($viewport-12) {
      display: none;
    }
  }
}
</style>
