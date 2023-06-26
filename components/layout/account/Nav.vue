<template>
  <div class="layout-account-nav">
    <div>
      <ul class="layout-account-nav__list">
        <li v-for="(target, index) in navList" :key="index" class="layout-account-nav__list-item">
          <NuxtLink :to="localePath(`/account/${target.to}`)" class="layout-account-nav__link">
            <span class="layout-account-nav__text">
              {{ $t(`${target.title}`) }}
            </span>
            <LayoutIcon :icon="GoNextIcon" :size="12" class="layout-account-nav__icon" />
          </NuxtLink>
        </li>
      </ul>
      <div class="layout-account-nav__logout-btn" @click="logout">{{ $t('account.logout') }}</div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "logoutText": "Zostałeś wylogowany."
  },
  "en": {
    "logoutText": "You have been logged out."
  }
}
</i18n>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
import { useAuthStore } from '@/store/auth'

const $t = useGlobalI18n()
const t = useLocalI18n()
const auth = useAuthStore()
const localePath = useLocalePath()

const { notify } = useNotify()

const navList = ref<{ to: string; title: string }[]>([
  { to: 'orders', title: 'orders.title' },
  { to: 'settings', title: 'account.settings' },
  { to: 'addresses', title: 'account.addresses' },
  { to: 'wishlist', title: 'wishlist.title' },
])

const logout = async () => {
  await auth.logout()
  notify({
    title: t('logoutText'),
    type: 'success',
  })
}
</script>

<style lang="scss">
.layout-account-nav {
  grid-area: nav;

  &__list {
    list-style-type: none;
    padding: 0px;
    grid-area: nav;
  }

  &__list-item {
    &:not(:last-child) {
      border-bottom: 1px solid $gray-color-300;
    }
  }

  &__link {
    height: 49px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ($viewport-12) {
      width: 250px;
    }

    & > .router-link-active {
      color: var(--secondary-color);
      font-weight: bold;
    }

    &:hover {
      .layout-account-nav__text {
        color: var(--secondary-color);
      }
    }
  }

  &__text {
    padding-left: 15px;
    text-decoration: none;
    color: $text-color;
    transition: color 300ms ease-in-out;
  }

  &__logout-btn {
    text-decoration: underline;
    cursor: pointer;
    margin: 22px 0px;
    transition: color 300ms ease-in-out;

    &:hover {
      color: var(--secondary-color);
    }
  }

  &__icon {
    margin-right: 18.5px;

    @media ($viewport-12) {
      color: $white-color;
    }
  }
}
</style>
