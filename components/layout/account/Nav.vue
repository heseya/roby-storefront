<template>
  <div>
    <div class="account-nav">
      <div class="account-nav__container">
        <div class="account-nav__nav">
          <div>
            <ul class="account-nav__list">
              <li v-for="(target, index) in navList" :key="index" class="account-nav__list-item">
                <NuxtLink :to="target" class="account-nav__text">{{ t(target) }}</NuxtLink>
                <LayoutIcon :icon="GoNextIcon" :size="12" class="account-nav__icon" />
              </li>
            </ul>
            <div class="account-nav__logout" @click="logout">{{ t('logout') }}</div>
          </div>
        </div>
        <div class="account-nav__header">
          <slot name="header"></slot>
        </div>
        <div class="account-nav__content">
          <slot></slot>
        </div>
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
    "wishlist": "Lista życzeń",
    "logout": "Wyloguj się",
    "logoutText": "Zostałeś wylogowany."
  }
}
</i18n>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { useAuthStore } from '@/store/auth'
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
const t = useLocalI18n()
const auth = useAuthStore()
const router = useRouter()

const navList = ref<string[]>(['orders', 'settings', 'addresses', 'wishlist'])

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
.account-nav {
  padding: 0px 16px;

  @media ($viewport-12) {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  &__container {
    display: grid;
    gap: 20px;
    grid-template-areas:
      'header'
      'nav'
      'content';

    @media ($viewport-12) {
      grid-template-columns: 0.2fr 0.8fr;
      grid-template-areas:
        'nav header'
        'nav content';
      width: 66%;
    }
  }

  &__nav {
    margin-top: 14px;
    grid-area: nav;

    @media ($viewport-12) {
      display: flex;
      justify-content: flex-end;
      margin-top: 0;
    }
  }

  &__content {
    grid-area: content;

    @media ($viewport-12) {
      margin-top: 20px;
    }
  }

  &__header {
    grid-area: header;
  }

  &__list {
    list-style-type: none;
    padding: 0px;
    grid-area: nav;
  }

  &__list-item {
    height: 50px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $gray-color-300;

    @media ($viewport-12) {
      width: 250px;
    }
  }

  &__text {
    padding-left: 15px;
    text-decoration: none;
    color: $text-color;
  }

  &__logout {
    text-decoration: underline;
    cursor: pointer;

    margin: 35px 0px;
  }

  &__icon {
    margin-right: 18.5px;

    @media ($viewport-12) {
      color: $white-color;
    }
  }
}
</style>
