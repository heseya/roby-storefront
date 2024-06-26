<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="login-content">
      <div class="login-content__container">
        <div>
          <h2 class="login-content__header">{{ $t('account.login') }}</h2>
          <AuthLoginForm @login="handleLogin" />
        </div>

        <LayoutSpacer />
        <div class="login-content__register">
          <div>
            <div class="login-content__header">{{ $t('account.noAccount') }}</div>
            <div>
              <div>{{ t('form.benefits-header') }}</div>
              <ul class="login-content__list">
                <li v-for="(item, index) in benefits" :key="index" class="login-content__list-item">
                  <Check class="login-content__list-icon" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <NuxtLink :to="localePath('/register')">
            <LayoutButton
              variant="gray"
              class="login-content__btn"
              :label="$t('account.register')"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "benefits": {
      "faster": "Szybciej i wygodniej składać zamówienia",
      "track": "Śledzić status swojej przesyłki",
      "wishlist": "Dodawać produkty do listy życzeń"
    },
    "form": {
      "benefits-header": "Mając konto w sklepie możesz:"
    }
  },
  "en": {
    "benefits": {
      "faster": "Place orders faster and more conveniently",
      "track": "Track the status of your shipment",
      "wishlist": "Add products to your wish list"
    },
    "form": {
      "benefits-header": "With an account in the store, you can:"
    }
  }
}
</i18n>

<script setup lang="ts">
import Check from '@/assets/icons/check-2.svg?component'
import { useAuthStore } from '@/store/auth'

const t = useLocalI18n()
const $t = useGlobalI18n()
const route = useRoute()
const auth = useAuthStore()
const localePath = useLocalePath()

const benefits = ref<string[]>([t('benefits.faster'), t('benefits.track'), t('benefits.wishlist')])

const handleLogin = () => {
  const redirectUrl = (route.query.redirect as string | undefined) || '/'
  navigateTo(localePath(redirectUrl))
}

onBeforeMount(() => {
  if (auth.isLogged) navigateTo(localePath('/'))
})

useSeoTitle($t('account.login'))

const breadcrumbs = computed(() => [{ label: $t('account.login'), link: '/login' }])
</script>

<style lang="scss" scoped>
.login-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }

  &__container {
    display: grid;
    gap: 30px;

    @media ($viewport-11) {
      grid-template-columns: 1fr 0.3fr 1fr;
      width: 60%;
    }

    @media ($viewport-16) {
      width: 40%;
    }
  }

  &__header {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 10px;

    @media ($viewport-11) {
      margin-bottom: 40px;
      margin-top: 0px;
    }
  }

  &__list {
    @media ($viewport-11) {
      padding-left: 25px;
    }
  }

  &__list-item {
    margin-top: 15px;
    display: flex;
    position: relative;

    @media ($viewport-11) {
      margin-top: 12px;
    }
  }

  &__list-icon {
    position: absolute;
    left: -22px;
    top: 5px;
    color: $blue-color-500;
  }

  &__register {
    display: grid;
    align-content: space-between;
    height: 100%;
  }

  &__btn {
    margin-top: 30px;
    margin-bottom: 15px;
    width: 100%;
    height: 41px;
    font-weight: 500;

    @media ($viewport-11) {
      margin-bottom: 0px;
    }
  }
}
</style>
