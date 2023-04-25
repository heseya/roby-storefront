<template>
  <div class="account">
    <div class="account__content">
      <div class="account__header">
        <h1>{{ t('welcome') }}{{ user?.name }}</h1>
        <p>{{ t('message') }}</p>
      </div>
      <AccountItemsList :header="t('lastOrder')" :link="`todo`"> todo </AccountItemsList>

      <AccountItemsList :header="t('wishList')" :link="`wishlist`">
        <div class="account__wishlist">
          <div v-for="item in wishlist.localWishlist" :key="item.id">
            <div class="account__container">
              <NuxtLink :to="`/product/${item.slug}`">
                <Media object-fit="cover" width="63" height="63" :media="item.cover" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </AccountItemsList>
    </div>
  </div>
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

useHead({
  title: t('title'),
})

const user = useUser()
const wishlist = useWishlistStore()
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  justify-content: center;

  &__content {
    padding: 20px;
    width: 50%;
    height: 100%;
  }

  &__header {
    display: grid;
    gap: 15px;
  }

  &__wishlist {
    display: flex;
    gap: 10px;
  }

  &__container {
    border: 1px solid $gray-color-300;
    height: 100%;
    padding: 5px;
  }
}
</style>
