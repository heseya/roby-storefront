<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount>
      <LayoutAccountNav class="account-page__nav" />
      <template v-if="!errorMessage" #header> {{ t('welcome') }}{{ user?.name }} </template>
      <template #text>
        {{ t('message') }}
      </template>
      <template #additional>
        <div v-if="recentOrder" class="account-page__container">
          <AccountOrderSimpleView
            :code="recentOrder.code"
            link="/account/orders"
            :header="t('lastOrder')"
          />
        </div>
        <LayoutInfoBox v-else-if="errorMessage" type="danger">
          {{ errorMessage }}
        </LayoutInfoBox>

        <LayoutAccountSection
          :header="$t('wishlist.title')"
          :link="`/account/wishlist`"
          class="account-page__wishlist"
        >
          <ClientOnly>
            <div v-if="wishlist.products.length" class="account-page__items-list">
              <div v-for="product in wishlist.products" :key="product.id">
                <AccountProductCard :product="product" />
              </div>
            </div>

            <LayoutEmpty v-else class="account-page__empty">
              {{ $t('wishlist.empty') }}
            </LayoutEmpty>

            <template #fallback>
              <p class="account-page__loading">{{ t('wishlist.loading') }}</p>
            </template>
          </ClientOnly>
        </LayoutAccountSection>
      </template>
    </LayoutAccount>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "welcome": "Witaj, ",
    "message": "Tutaj możesz zarządzać swoimi zamówieniami oraz ustawieniami konta.",
    "lastOrder": "Ostatnie zamówienie",
    "wishlist": {
      "loading": "Ładowanie listy życzeń..."
    }
  }
}
</i18n>

<script setup lang="ts">
import { useWishlistStore } from '@/store/wishlist'

const t = useLocalI18n()
const $t = useGlobalI18n()

useSeoMeta({
  title: () => $t('breadcrumbs.account'),
})

definePageMeta({
  middleware: 'auth',
})

const user = useUser()
const heseya = useHeseya()
const wishlist = useWishlistStore()

const formatError = useErrorMessage()

const errorMessage = ref('')

const breadcrumbs = computed(() => [{ label: $t('breadcrumbs.account'), link: '/account' }])

const { data: recentOrder } = useAsyncData(`recent-order`, async () => {
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
    flex-wrap: wrap;
    gap: 10px;
  }

  &__nav {
    @media ($viewport-12) {
      display: none;
    }
  }

  &__container {
    display: grid;
    gap: 15px;
  }

  &__wishlist {
    margin-top: 40px;
  }

  &__empty {
    font-size: 13px;
  }

  &__loading {
    text-align: center;
  }
}
</style>
