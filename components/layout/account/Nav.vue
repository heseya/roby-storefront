<template>
  <div class="account-nav" :class="{ 'account-nav--mobile': mobile }">
    <div>
      <ul class="account-nav__list">
        <li
          v-for="(target, index) in navList"
          :key="index"
          class="account-nav__list-item"
          :class="{ 'account-nav__list-item--active': '' }"
        >
          <NuxtLink :to="`/account/${target}`" class="account-nav__text">{{ t(target) }} </NuxtLink>
          <LayoutIcon :icon="GoNextIcon" :size="12" class="account-nav__icon" />
        </li>
      </ul>
      <div class="account-nav__logout" @click="logout">{{ t('logout') }}</div>
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
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
import { useAuthStore } from '@/store/auth'

defineProps<{
  mobile?: Boolean
}>()

const t = useLocalI18n()
const auth = useAuthStore()
const router = useRouter()
const { notify } = useNotify()

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
  grid-area: nav;
  display: none;

  &--mobile {
    display: block;
  }

  @media ($viewport-12) {
    display: flex;
    justify-content: flex-end;
    margin-top: 0;
  }

  &__list {
    list-style-type: none;
    padding: 0px;
    grid-area: nav;
  }

  &__list-item {
    height: 49px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid $gray-color-300;
    }

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

.router-link-active {
  color: var(--primary-color);
  font-weight: bold;
}
</style>
