<template>
  <nav class="nav-bar">
    <div v-show="isOpenNotification" class="nav-bar__notification">
      <span class="notification__title">{{ notification }}</span>
      <LayoutIconButton
        class="notification__button"
        :icon="Close"
        @click="isOpenNotification = false"
      />
    </div>
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
      <div v-show="isOpenCategories" class="nav-bar__mobile-menu">
        <div class="mobile-menu__title">
          <IconButton
            class="mobile-menu__close-btn"
            :icon="Close"
            @click="isOpenCategories = false"
          />
          <span>{{ t('menu') }}</span>
        </div>
        <LayoutNavCategoryMobileButton
          v-for="category in categories"
          :key="category.name"
          :label="category.name"
          :special="category.isSpecial"
          :link="category.link"
          :subcategories="category.subcategories"
        />
      </div>
      <form
        v-show="isOpenSearch"
        class="nav-bar__mobile-search"
        v-on:submit.prevent="searchCallback"
      >
        <IconButton
          class="mobile-search__btn"
          type="button"
          :icon="ArrowBack"
          @click="isOpenSearch = false"
        />
        <input class="mobile-search__input" type="text" :placeholder="t('search')" name="search" />
        <IconButton class="mobile-search__btn" type="submit" :icon="Search" />
      </form>
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
    "menu": "Menu",
    "search": "Czego szukasz?"
  }
}
</i18n>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
import Search from '@/assets/icons/search.svg?component'
import Profile from '@/assets/icons/profile.svg?component'
import Favorite from '@/assets/icons/favorite.svg?component'
import Shopping from '@/assets/icons/shopping.svg?component'
import Menu from '@/assets/icons/menu.svg?component'
import ArrowBack from '@/assets/icons/arrow-back.svg?component'
import { SearchValues, SelectOption } from '~/components/layout/nav/Search.vue'
import IconButton from '~/components/layout/IconButton.vue'

interface Category {
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
const isOpenNotification = ref(true)
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

  &__notification {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    color: $white-color;
    background-color: $primary-color;
  }

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

  &__mobile-menu,
  &__mobile-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $white-color;
    overflow: hidden;
    @include flex-column;

    @media ($viewport-12) {
      display: none;
    }
  }

  &__mobile-search {
    height: 60px;

    @include flex-row;
    align-items: center;

    @media ($viewport-12) {
      display: none;
    }
  }
}

.notification {
  &__title {
    flex: 1;
  }

  &__button {
    height: 40px;
    width: 40px;
    color: $white-color;
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

.mobile-menu {
  &__title {
    @include flex-row;
    align-items: center;
    height: 60px;
    font-weight: bold;

    border-bottom: 1px solid $gray-color-300;
  }

  &__close-btn {
    width: 44px;
    height: 44px;
  }
}

.mobile-search {
  &__btn {
    width: 44px;
    height: 44px;
    color: $gray-color-600;
  }

  &__input {
    height: 100%;
    flex: 1;
    padding: 0px;
    outline: none;
    border: none;
    background: transparent;

    font-size: rem(14);
  }
}
</style>
