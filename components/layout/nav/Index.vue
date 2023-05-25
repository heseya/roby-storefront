<template>
  <nav class="nav-bar">
    <LayoutNavNotification class="nav-bar__notification" />

    <div class="nav-items" :class="{ 'nav-items--small': scrollY > 100 }">
      <div class="nav-items__left">
        <LayoutIconButton
          class="nav-items__menu-btn"
          :icon="Menu"
          :title="$t('nav.showCategories')"
          @click="isOpenCategories = true"
        />
        <NuxtLink to="/" class="nav-items__logo-link">
          <img class="nav-items__logo" :src="config.storeLogoUrl" :alt="config.storeName" />
        </NuxtLink>
        <LayoutNavSearch
          class="nav-items__search--wide"
          :categories="categoriesStore.navCategories"
          @search="handleSearch"
        />
      </div>

      <div class="nav-items__buttons">
        <LayoutIconButton
          icon-size="sm"
          class="nav-items__search--narrow"
          :icon="Search"
          :title="$t('search.open')"
          @click="isOpenSearch = true"
        />
        <div class="nav-items__button-wrapper">
          <NuxtLink
            class="nav-link-button"
            :to="auth.isLogged ? localePath('/account') : localePath('/login')"
          >
            <LayoutIconButton
              class="nav-link-button__button"
              :icon="Profile"
              :label="auth.isLogged ? $t('breadcrumbs.account') : $t('account.login')"
              is-resize
            />
          </NuxtLink>
          <div v-if="auth.isLogged" class="nav-link-button__list">
            <NuxtLink class="nav-link-button__list-item" :to="localePath('/account/orders')">
              {{ $t('orders.title') }}
            </NuxtLink>
            <NuxtLink class="nav-link-button__list-item" :to="localePath('/account/settings')">
              {{ $t('account.settings') }}
            </NuxtLink>
            <NuxtLink class="nav-link-button__list-item" :to="localePath('/account/addresses')">
              {{ $t('account.addresses') }}
            </NuxtLink>
            <NuxtLink class="nav-link-button__list-item" :to="localePath('/account/wishlist')">
              {{ $t('wishlist.title') }}
            </NuxtLink>
            <button
              class="nav-link-button__list-item nav-link-button__list-item--logout"
              @click="onLogout"
            >
              {{ $t('account.logout') }}
            </button>
          </div>
        </div>
        <NuxtLink
          class="nav-link-button"
          :to="localePath(auth.isLogged ? '/account/wishlist' : '/wishlist')"
        >
          <LayoutIconButton
            class="nav-link-button__button"
            :icon="Favorite"
            :label="$t('wishlist.title')"
            :count="wishlist.quantity"
            is-resize
          />
        </NuxtLink>
        <div class="nav-items__button-wrapper">
          <NuxtLink class="nav-link-button" :to="localePath('/cart')">
            <LayoutIconButton
              class="nav-link-button__button"
              :icon="Shopping"
              :label="$t('cart.title')"
              :count="cart.length"
              is-resize
            />
          </NuxtLink>
          <ClientOnly>
            <LayoutNavCartPreview class="nav-items__cart-preview" />
          </ClientOnly>
        </div>
      </div>
      <LayoutNavMobileMenu
        v-show="isOpenCategories"
        :links="navLinks || []"
        @close="isOpenCategories = false"
      />
      <LayoutNavMobileSearch
        v-show="isOpenSearch"
        @close="isOpenSearch = false"
        @search="handleSearch"
      />
    </div>

    <div class="nav-bar__categories">
      <div class="nav-bar__categories-scroll">
        <LayoutNavCategoryButton
          v-for="category in categoriesStore.navCategories"
          :key="category.id"
          :category="category"
        />
        <LayoutNavButton v-for="link in navLinks" :key="link.path" :link="link" />
      </div>
    </div>
  </nav>
</template>

<i18n lang="json">
{
  "pl": {
    "message": {
      "logout": "Wylogowano pomyślnie"
    }
  }
}
</i18n>

<script lang="ts" setup>
import Search from '@/assets/icons/search.svg?component'
import Profile from '@/assets/icons/profile.svg?component'
import Favorite from '@/assets/icons/favorite.svg?component'
import Shopping from '@/assets/icons/shopping.svg?component'
import Menu from '@/assets/icons/menu.svg?component'

import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { useConfigStore } from '@/store/config'
import { useAuthStore } from '@/store/auth'
import { useCategoriesStore } from '@/store/categories'
import { NavLink } from '@/interfaces/NavLink'
import { SearchValues } from '@/components/layout/nav/Search.vue'
import { useSearchHistoryStore } from '@/store/searchHistory'

const t = useLocalI18n()
const $t = useGlobalI18n()
const localePath = useLocalePath()
const heseya = useHeseya()
const router = useRouter()
const { notify } = useNotify()

const auth = useAuthStore()
const config = useConfigStore()
const wishlist = useWishlistStore()
const cart = useCartStore()
const categoriesStore = useCategoriesStore()
const searchHistory = useSearchHistoryStore()

const isOpenCategories = ref(false)
const isOpenSearch = ref(false)

const { y: scrollY } = useWindowScroll()

const handleSearch = ({ query, category }: SearchValues) => {
  if (query !== '') {
    searchHistory.addNewQuery(query)
    const pathQuery = `/search/${query}`
    const pathCategory = ['', 'all'].includes(category) ? '' : `?set=${category}`
    router.push(pathQuery + pathCategory)
  }
}
const onLogout = async () => {
  await auth.logout()
  notify({
    title: t('message.logout'),
    type: 'success',
  })
}

const { data: navLinks } = useAsyncData<NavLink[]>('nav-pages', async () => {
  const { data } = await heseya.Pages.get({ metadata: { nav: true } })
  return data.map((p) => ({ text: p.name, path: `/${p.slug}` }))
})
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
    max-width: 100%;

    @media ($max-viewport-12) {
      display: none;
    }
  }

  &__categories-scroll {
    white-space: nowrap;
    overflow-x: auto;
    @include flex-row;

    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: $gray-color-400;
    }

    &::-webkit-scrollbar-button:end:increment {
      width: 12px;
      display: block;
      background: transparent;
    }
  }
}

.nav-items {
  @include flex-row;

  position: relative;
  padding: 42px 42px;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  transition: padding 0.2s;

  &--small {
    padding: 12px 42px;
  }

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

  &__logo-link {
    display: flex;
    align-items: center;
  }

  &__logo {
    display: block;
    height: 38px;
    width: 175px;
    object-fit: contain;

    @media ($max-viewport-12) {
      height: 20px;
      width: 125px;
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
  padding: 0;

  &__button {
    color: #8d8d8d;
  }

  &:hover {
    color: var(--secondary-color);
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
        color: var(--secondary-color);
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
