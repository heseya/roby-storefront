<template>
  <nav class="nav-bar">
    <LayoutNavNotification :notification="notification" />
    <div class="nav-items">
      <div class="nav-items__left">
        <LayoutIconButton
          class="nav-items__menu-btn"
          :icon="Menu"
          @click="isOpenCategories = true"
        />
        <img class="nav-items__logo" src="@/assets/images/logo.svg?url" alt="***REMOVED***" />
        <LayoutNavSearch
          class="nav-items__search--wide"
          :categories="subcategories"
          @search="searchCallback"
        />
      </div>
      <div class="nav-items__buttons">
        <LayoutIconButton
          icon-size="sm"
          class="nav-items__search--narrow"
          :icon="Search"
          @click="isOpenSearch = true"
        />
        <div class="nav-items__button-wrapper">
          <NuxtLink class="nav-link-button" :to="isLogin ? '/account' : '/login'">
            <LayoutIconButton
              class="nav-link-button__button"
              :icon="Profile"
              :label="isLogin ? t('myAccount') : t('signIn')"
              is-resize
            />
          </NuxtLink>
          <div v-show="isLogin" class="nav-link-button__list">
            <NuxtLink
              v-for="link in accountLinks"
              :key="link.label"
              class="nav-link-button__list-item"
              :to="link.link"
              >{{ t(link.label) }}
            </NuxtLink>
            <button
              class="nav-link-button__list-item nav-link-button__list-item--logout"
              @click="logoutCallback"
            >
              {{ t('logout') }}
            </button>
          </div>
        </div>
        <NuxtLink class="nav-link-button" to="/list">
          <LayoutIconButton
            class="nav-link-button__button"
            :icon="Favorite"
            :label="t('wishList')"
            :notification-number="2"
            is-resize
          />
        </NuxtLink>
        <div class="nav-items__button-wrapper">
          <NuxtLink class="nav-link-button" to="/cart">
            <LayoutIconButton
              class="nav-link-button__button"
              :icon="Shopping"
              :label="t('cart')"
              is-resize
            />
          </NuxtLink>
          <LayoutNavCartPreview class="nav-items__cart-preview" />
        </div>
      </div>
      <LayoutNavMobileMenu
        v-show="isOpenCategories"
        :categories="categories"
        @close="isOpenCategories = false"
      />
      <LayoutNavMobileSearch
        v-show="isOpenSearch"
        @search="searchCallback"
        @close="isOpenSearch = false"
      />
    </div>
    <div class="nav-bar__categories">
      <LayoutNavCategoryButton
        v-for="category in categories"
        :key="category.name"
        :label="category.name"
        :special="category.isSpecial"
        :link="category.link"
        :subcategories="category.subcategories"
      />
    </div>
  </nav>
</template>

<i18n lang="json">
{
  "pl": {
    "myAccount": "Moje konto",
    "signIn": "Zaloguj się",
    "wishList": "Lista życzeń",
    "cart": "Koszyk",
    "search": "Czego szukasz?",
    "orders": "Zamówienia",
    "accountSettings": "Ustawienia konta",
    "address": "Adresy",
    "logout": "Wyloguj się"
  }
}
</i18n>

<script lang="ts" setup>
import Search from '@/assets/icons/search.svg?component'
import Profile from '@/assets/icons/profile.svg?component'
import Favorite from '@/assets/icons/favorite.svg?component'
import Shopping from '@/assets/icons/shopping.svg?component'
import Menu from '@/assets/icons/menu.svg?component'
import { SearchValues, SelectOption } from '~/components/layout/nav/Search.vue'

export interface Category {
  name: string
  link?: string
  subcategories?: SelectOption[]
  isSpecial?: boolean
}

interface Link {
  link: string
  label: string
}

const accountLinks: Link[] = [
  {
    link: 'orders',
    label: 'orders',
  },
  {
    link: 'settings',
    label: 'accountSettings',
  },
  {
    link: 'address',
    label: 'address',
  },
  {
    link: 'wish-list',
    label: 'wishList',
  },
]

// temporary, in the future from the backend
const subcategories: SelectOption[] = [
  {
    label: 'Papier',
    value: 'papier',
  },
  {
    label: 'Papier1',
    value: 'papier1',
  },
  {
    label: 'Papier2',
    value: 'papier2',
  },
  {
    label: 'Papier3',
    value: 'papier3',
  },
]

const categories: Category[] = [
  {
    name: 'Promocja',
    isSpecial: true,
    link: 'promotion',
  },
  {
    name: 'Nowości',
    link: 'news',
  },
  {
    name: 'Papier',
    link: 'papers',
    subcategories,
  },
  {
    name: 'Drukarki',
    isSpecial: true,
    link: 'printers',
    subcategories,
  },
]

const notification = 'Złóż zamówienie do 19.12, 18:00, aby prezenty trafiły pod choinkę na czas!'
// end temporary

const t = useLocalI18n()

const isLogin = true
const isOpenCategories = ref(false)
const isOpenSearch = ref(false)

const searchCallback = (data: SearchValues) => {
  console.log(data)
}

const logoutCallback = () => {
  console.log('logout')
}
</script>

<style lang="scss" scoped>
.nav-bar {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $white-color;
  @include flex-column;

  &__categories {
    @include flex-row;
    justify-content: center;
    background-color: $gray-color-300;

    @media ($max-viewport-12) {
      display: none;
    }
  }
}

.nav-items {
  position: relative;
  height: 130px;
  padding: 0 42px;

  @include flex-row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  @media ($max-viewport-12) {
    height: 60px;
    padding: 0 18px;
    gap: 18px;
  }

  &__left {
    @include flex-row;
    align-items: center;
    flex: 1;

    @media ($max-viewport-12) {
      gap: 18px;
    }
    gap: 40px;
  }

  &__logo {
    height: 38px;
    @media ($max-viewport-12) {
      height: 20px;
    }

    @media ($max-viewport-3) {
      display: none;
    }
  }

  &__buttons {
    @include flex-row;
    gap: 40px;

    @media ($max-viewport-12) {
      gap: 22px;
    }
  }

  &__cart-preview {
    display: none;
  }

  &__button-wrapper {
    position: relative;

    &:hover {
      .nav-link-button__list {
        display: flex !important;

        @media ($max-viewport-12) {
          display: none !important;
        }
      }

      .nav-items__cart-preview {
        display: flex !important;

        @media ($max-viewport-12) {
          display: none !important;
        }
      }
    }
  }

  &__search {
    &--wide {
      @media ($max-viewport-12) {
        display: none;
      }
    }

    &--narrow {
      color: $gray-color-600;
      @media ($viewport-12) {
        display: none;
      }
    }
  }

  &__menu-btn {
    @media ($viewport-12) {
      display: none;
    }
  }
}

.nav-link-button {
  display: inline-block;
  text-decoration: none;
  padding: 20px 0;

  &__button {
    color: #8d8d8d;
  }

  &__list {
    position: absolute;
    left: 0;
    z-index: 1001;
    padding: 10px 0;

    @include flex-column;
    border: 1px solid $gray-color-300;
    background-color: $white-color;

    &-item {
      padding: 10px 20px;

      text-align: left;
      white-space: nowrap;
      text-decoration: none;
      color: $gray-color-900;
      transition: color 200ms ease-in-out;

      &:hover {
        color: var(--primary-color);
        cursor: pointer;
      }

      &--logout {
        outline: none;
        border: none;
        background-color: $white-color;
      }

      &:last-child {
        padding: 10px 0px;
        margin: 0 20px;
        border-top: 1px solid $gray-color-300;
      }
    }

    display: none;
  }
}
</style>
