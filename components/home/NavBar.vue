<template>
  <div class="bar">
    <div v-show="isOpenNotification" class="bar__notification">
      <span class="notification__title">{{ notification }}</span>
      <LayoutIconButton
        class="notification__button"
        :icon="Close"
        @click="handleCloseNotification"
      />
    </div>
    <div class="bar__main">
      <div class="main__left">
        <img class="main__logo" src="@/assets/images/logo.svg?url" alt="***REMOVED***" />
        <LayoutSearch :categories="categories" />
      </div>
      <div class="main__buttons">
        <LayoutIconButton
          class="main__button"
          :icon="Profile"
          :label="isLogin ? t('myAccount') : t('signIn')"
          @click="handleAccountBtn"
        />
        <LayoutIconButton
          class="main__button"
          :icon="Favorite"
          :label="t('wishList')"
          :notificationNumber="2"
          @click="() => router.push('list')"
        />
        <LayoutIconButton
          class="main__button"
          :icon="Shopping"
          :label="t('shopping')"
          @click="() => router.push('shopping')"
        />
      </div>
    </div>
    <div class="bar__categories">
      <LayoutCategoryButton label="Promocja" special link="promotion" />
      <LayoutCategoryButton label="Papier" :subcategories="categories" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "myAccount": "Moje konto",
    "signIn": "Zaloguj się",
    "wishList": "Lista życzeń",
    "shopping": "Koszyk"
  }
}
</i18n>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
import Profile from '@/assets/icons/profile.svg?component'
import Favorite from '@/assets/icons/favorite.svg?component'
import Shopping from '@/assets/icons/shopping.svg?component'
import { SelectOption } from '~/components/layout/Search.vue'

const categories: SelectOption[] = [
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
const notification = 'Złóż zamówienie do 19.12, 18:00, aby prezenty trafiły pod choinkę na czas!'

const router = useRouter()
const t = useLocalI18n()

const isLogin = true
const isOpenNotification = ref(true)

const handleCloseNotification = () => (isOpenNotification.value = false)

const handleAccountBtn = () => {
  const path = isLogin ? 'account' : 'login'
  router.push(path)
}
</script>

<style lang="scss" scoped>
.bar {
  @include flex-column;

  &__notification {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    color: $white-color;
    background-color: $primary-color;
  }

  &__main {
    padding: 54px 42px;

    @include flex-row;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }

  &__categories {
    @include flex-row;
    justify-content: center;

    background-color: $gray-color-300;
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

.main {
  &__left {
    @include flex-row;
    align-items: center;
    gap: 40px;
  }

  &__logo {
    height: 38px;
  }

  &__buttons {
    @include flex-row;
    gap: 50px;
  }
}
</style>
