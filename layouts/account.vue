<template>
  <div class="account">
    <div class="account__container">
      <div>
        <div>
          <ul class="account__nav">
            <li class="account__nav-item">
              <NuxtLink to="orders" class="account__text">{{ t('orders') }}</NuxtLink>
            </li>
            <li class="account__nav-item">
              <NuxtLink to="settings" class="account__text"> {{ t('settings') }}</NuxtLink>
            </li>
            <li class="account__nav-item">
              <NuxtLink to="addresses" class="account__text"> {{ t('addresses') }}</NuxtLink>
            </li>
            <li class="account__nav-item">
              <NuxtLink to="wishlist" class="account__text"> {{ t('wishList') }}</NuxtLink>
            </li>
          </ul>
          <div class="account__logout" @click="logout">{{ t('logout') }}</div>
        </div>
      </div>
      <div class="account__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "orders": "Zamówienia",
    "settings": "Ustawienia konta",
    "addresses": "Adresy",
    "wishList": "Lista życzeń",
    "logout": "Wyloguj się",
    "logoutText": "Zostałeś wylogowany."
  }
}
</i18n>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { useAuthStore } from '@/store/auth'
const t = useLocalI18n()
const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  notify({
    title: t('logoutText'),
    type: 'success',
  })
  router.push('/')
}
</script>

<style lang="scss">
.account {
  display: flex;
  justify-content: center;

  &__container {
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    gap: 15px;
    width: 66%;
  }

  &__nav {
    list-style-type: none;
    padding: 0px;
  }

  &__nav-item {
    width: 250px;
    height: 50px;
    cursor: pointer;
    text-decoration: none;

    &::after {
      content: '';
      display: block;
      margin-top: 15px;
      border-bottom: 1px solid $gray-color-300;
    }

    &:last-child::after {
      border-bottom: none;
    }
  }

  &__logout {
    text-decoration: underline;
    cursor: pointer;
  }

  &__text {
    padding-left: 15px;
    text-decoration: none;
    color: $text-color;
  }
}
</style>
