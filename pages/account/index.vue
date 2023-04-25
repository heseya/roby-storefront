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
            <NuxtLink :to="`/product/${item.slug}`">
              <img :src="item.cover?.url" class="account__img" :alt="item.slug" />
            </NuxtLink>
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

  &__img {
    object-fit: cover;
    height: 75px;
    width: 75px;
    border: 1px solid $gray-color-300;
    padding: 5px;
    cursor: pointer;
  }
}
</style>
