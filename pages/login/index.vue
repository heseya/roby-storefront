<template>
  <div class="login-content">
    <div class="login-content__container">
      <AuthLogin class="login-content__login" />
      <div class="login-content__spacer" />
      <div class="login-content__register">
        <div>
          <div class="login-content__header">{{ t('form.no-account') }}</div>
          <div>
            <div>{{ t('form.benefits-header') }}</div>
            <ul class="login-content__list">
              <li
                class="login-content__list--item"
                v-for="(item, index) in benefits"
                v-bind:key="index"
              >
                <Check class="login-content__list--icon" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <LayoutButton class="login-content__btn" :label="t('form.register')" />
      </div>
    </div>
  </div>
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
      "register": "Zarejestruj się",
      "benefits-header": "Mając konto w sklepie ***REMOVED*** możesz:",
      "no-account": "Nie masz konta?"
    }
  }
}
</i18n>

<script setup lang="ts">
import Check from '@/assets/icons/check-2.svg?component'
useBreadcrumbs([{ label: 'Logowanie', link: '/login' }])

const t = useLocalI18n()

const benefits = ref<string[]>([t('benefits.faster'), t('benefits.track'), t('benefits.wishlist')])
</script>

<style lang="scss" scoped>
.login-content {
  padding: 16px;

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
    margin-top: 12px;

    &--item {
      margin-top: 15px;
      display: flex;
      position: relative;

      @media ($viewport-11) {
        margin-top: 20px;
      }
    }

    &--icon {
      position: absolute;
      left: -22px;
      top: 5px;
      color: $blue-color;
    }
  }

  &__login,
  &__register {
    width: 100%;
  }

  &__register {
    display: grid;
    align-content: space-between;
    margin-bottom: 20px;

    @media ($viewport-11) {
      margin-bottom: 0px;
    }
  }

  &__btn {
    margin-top: 30px;
    height: 41px;
  }

  &__spacer {
    width: 100%;
    border-bottom: 2px solid $gray-color-300;
    display: flex;
    justify-content: center;

    @media ($viewport-11) {
      border-bottom: none;
      height: 100%;
      width: 2px;
      background-color: $gray-color-300;
      margin-left: 50%;
    }
  }
}
</style>
