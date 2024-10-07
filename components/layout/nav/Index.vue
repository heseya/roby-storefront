<template>
  <nav class="nav-bar">
    <LazyLayoutNavNotification class="nav-bar__notification" />
    <LayoutNavTopBar v-if="isTopBarVisible" />
    <div class="nav-items" :class="{ 'nav-items--small': scrollY > 20 }">
      <div class="nav-items__left">
        <LazyLayoutIconButton
          class="nav-items__menu-btn"
          :icon="Menu"
          :title="$t('nav.showCategories')"
          @click="isOpenCategories = true"
        />
        <NuxtLink :to="localePath('/')" class="nav-items__logo-link">
          <img
            class="nav-items__logo"
            :src="config.storeLogoUrl"
            :alt="config.storeName"
            loading="eager"
          />
        </NuxtLink>
        <LazyLayoutNavSearch
          class="nav-items__search--wide"
          :categories="categoriesStore.navCategories"
          @search="handleSearch"
        />
      </div>

      <div class="nav-items__buttons">
        <LazyLayoutIconButton
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
            <LazyLayoutIconButton
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
          <LazyLayoutIconButton
            class="nav-link-button__button"
            :icon="Favorite"
            :label="$t('wishlist.title')"
            :count="wishlist.quantity"
            is-resize
          />
        </NuxtLink>
        <div v-if="isVisibleShoppingButton" class="nav-items__button-wrapper">
          <NuxtLink class="nav-link-button" :to="localePath('/cart')">
            <LazyLayoutIconButton
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
      <LazyLayoutNavMobileMenu
        v-show="isOpenCategories"
        :links="navLinks || []"
        @close="isOpenCategories = false"
      />
      <LazyLayoutNavMobileSearch
        v-show="isOpenSearch"
        @close="isOpenSearch = false"
        @search="handleSearch"
      />
    </div>

    <div class="nav-bar__categories">
      <div class="nav-bar__categories-scroll">
        <LazyLayoutNavCategoryButton
          v-for="category in categoriesStore.navCategories"
          :key="category.id"
          :category="category"
        />
        <LazyLayoutNavButton v-for="link in navLinks" :key="link.path" :link="link" />
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
  },
  "en": {
    "message": {
      "logout": "You have been logged out."
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
import type { NavLink } from '@/interfaces/NavLink'
import type { SearchValues } from '@/components/layout/nav/Search.vue'
import { useSearchHistoryStore } from '@/store/searchHistory'
import { useChannelsStore } from '@/store/channels'

const t = useLocalI18n()
const $t = useGlobalI18n()
const localePath = useLocalePath()
const heseya = useHeseya()
const { notify } = useNotify()
const { isModeB2B } = useSiteMode()

const auth = useAuthStore()
const config = useConfigStore()
const channels = useChannelsStore()
const wishlist = useWishlistStore()
const cart = useCartStore()
const categoriesStore = useCategoriesStore()
const searchHistory = useSearchHistoryStore()

const isOpenCategories = ref(false)
const isOpenSearch = ref(false)

const { locales } = useI18n()

const isTopBarVisible = computed(
  () => locales.value.length > 1 || !!config.customRedirect || channels.channels.length > 1,
)

const isVisibleShoppingButton = computed(() => (auth.isLogged ? true : !isModeB2B.value))

const { y: scrollY } = useWindowScroll()

const handleSearch = ({ query, category }: SearchValues) => {
  if (query !== '') {
    searchHistory.addNewQuery(query)
    const searchPath = localePath(`/search/${encodeURIComponent(query)}`)
    const pathQuery = ['', 'all'].includes(category) ? {} : { set: category }

    navigateTo({
      path: searchPath,
      query: pathQuery,
    })
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

/**
 * https://stackoverflow.com/questions/75204169/the-data-from-pinia-store-is-not-reactive-in-nuxt-3-when-switching-language
 * Needs to be manually invoked because of the pinia bug
 */
onBeforeMount(async () => {
  await Promise.all([channels.fetchChannels(), categoriesStore.fetchRootCategories()])
  categoriesStore.subcategoriesMap = {}
})
</script>

<style lang="scss" scoped>
.nav-bar {
  z-index: 2000;
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
    @include styled-scrollbar;
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
        display: none !important;
      }
    }

    &--narrow {
      color: $gray-color-600;
      @media ($viewport-12) {
        display: none !important;
      }
    }
  }

  &__menu-btn {
    @media ($viewport-12) {
      display: none !important;
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
