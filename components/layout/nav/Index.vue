<template>
  <nav class="nav-bar">
    <LayoutNavNotification :notification="notification" />
    <div class="nav-bar__items">
      <div class="items__left">
        <LayoutIconButton class="items__menu-btn" :icon="Menu" @click="isOpenCategories = true" />
        <img class="items__logo" src="@/assets/images/logo.svg?url" alt="***REMOVED***" />
        <LayoutNavSearch
          class="items__search--wide"
          :categories="subcategories"
          @search="searchCallback"
        />
      </div>
      <div class="items__buttons">
        <LayoutIconButton
          class="items__search--narrow"
          :icon="Search"
          @click="isOpenSearch = true"
        />
        <NuxtLink class="items__button" :to="isLogin ? 'account' : 'login'">
          <LayoutIconButton
            :icon="Profile"
            :label="isLogin ? t('myAccount') : t('signIn')"
            isResize
          />
        </NuxtLink>
        <NuxtLink class="items__button" to="list">
          <LayoutIconButton
            :icon="Favorite"
            :label="t('wishList')"
            :notificationNumber="2"
            isResize
          />
        </NuxtLink>
        <NuxtLink class="items__button" to="shopping">
          <LayoutIconButton :icon="Shopping" :label="t('shopping')" isResize />
        </NuxtLink>
      </div>
      <LayoutNavMobileMenu
        v-show="isOpenCategories"
        @close="isOpenCategories = false"
        :categories="categories"
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
    "shopping": "Koszyk",
    "search": "Czego szukasz?"
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
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: $white-color;
  @include flex-column;

  &__items {
    position: relative;
    height: 130px;
    padding: 0 42px;

    @include flex-row;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    @media ($max-viewport-12) {
      height: 60px;
      padding: 20px 18px;
      gap: 18px;
    }
  }

  &__categories {
    @include flex-row;
    justify-content: center;

    background-color: $gray-color-300;

    @media ($max-viewport-12) {
      display: none;
    }
  }
}

.items {
  &__left {
    @include flex-row;
    align-items: center;

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

  &__button {
    text-decoration: none;
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
</style>
