<template>
  <LayoutSplitContent class="login-content">
    <template #firstComponent>
      <AuthLogin class="login-content__login" />
    </template>
    <template #secondComponent>
      <div class="login-content__register">
        <div>
          <div class="login-content__header">{{ t('form.no-account') }}</div>
          <div>
            <div>{{ t('form.benefits-header') }}</div>
            <ul class="login-content__list">
              <li v-for="(item, index) in benefits" :key="index" class="login-content__list--item">
                <Check class="login-content__list--icon" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <LayoutButton class="login-content__btn" :label="t('form.register')" />
      </div>
    </template>
  </LayoutSplitContent>
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
  margin-bottom: 20px;

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

    &--item {
      margin-top: 15px;
      display: flex;
      position: relative;

      @media ($viewport-11) {
        margin-top: 12px;
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
    height: 100%;
  }

  &__btn {
    margin-top: 30px;
    height: 41px;
  }
}
</style>
