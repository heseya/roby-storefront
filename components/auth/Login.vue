<template>
  <div class="login">
    <h2 class="login__header">{{ t('form.login') }}</h2>
    <div class="login__form">
      <FormInput v-model="loginForm.email" name="email" label="Adres e-mail" />
      <FormInput
        v-model="loginForm.password"
        name="password"
        :label="t('form.password')"
        :html-type="showPassword ? 'text' : 'password'"
      >
        <span class="login__form--icon" @click="tooglePassword">
          <Visibility v-if="showPassword" />
          <VisibilityOff v-else />
        </span>
      </FormInput>
    </div>
    <div class="login__options">
      <FormCheckbox v-model="rememberPassword" :text="t('form.remember')" name="remember" />
      <NuxtLink class="login__options--forgot" to="/forgot-password">
        {{ t('form.forgot-password') }}
      </NuxtLink>
    </div>
    <NuxtLink to="/checkout">
      <LayoutButton class="login__btn" :label="t('form.login')" />
    </NuxtLink>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "login": "Zaloguj się",
      "email": "Adres e-mail",
      "password": "Hasło",
      "forgot-password": "Nie pamiętasz hasła?",
      "remember": "Zapamiętaj mnie"
    }
  }
}
</i18n>

<script setup lang="ts">
import Visibility from '@/assets/icons/visibility.svg?component'
import VisibilityOff from '@/assets/icons/visibility-off.svg?component'

interface LoginForm {
  email: string
  password: string
}

const t = useLocalI18n()

const rememberPassword = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const loginForm = reactive<LoginForm>({
  email: '',
  password: '',
})

const tooglePassword = () => (showPassword.value = !showPassword.value)
</script>
<style lang="scss" scoped>
.login {
  display: grid;
  &__options {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 1rem 0;

    &--forgot {
      color: $blue-color;
      cursor: pointer;
      font-size: 12px;
      text-decoration: none;
    }
  }

  &__form {
    display: grid;
    gap: 15px;
    margin-top: 15px;

    &--icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  &__header {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;

    @media ($viewport-7) {
      font-size: 26px;
    }
  }

  &__btn {
    padding: 11px 0px;
    width: 100%;
  }
}
</style>
