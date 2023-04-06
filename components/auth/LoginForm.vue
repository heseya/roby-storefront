<template>
  <form class="login-form" :class="{ 'modal-form': isFormInModal }" @submit.prevent="onSubmit">
    <h2 class="login-form__header">{{ t('form.login') }}</h2>
    <div class="login-form__form">
      <FormInput
        v-model="form.values.email"
        name="email"
        :label="t('form.email')"
        rules="required|email"
      />
      <FormInputPassword v-model="form.values.password" />
    </div>
    <div class="login-form__options">
      <FormCheckbox v-model="rememberPassword" :text="t('form.remember')" name="remember" />
      <NuxtLink class="login-form__options--forgot" to="/forgot-password">
        {{ t('form.forgot-password') }}
      </NuxtLink>
    </div>
    <LayoutButton class="login-form__btn" :label="t('form.login')" />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "login": "Zaloguj się",
      "email": "Adres e-mail",
      "forgot-password": "Nie pamiętasz hasła?",
      "remember": "Zapamiętaj mnie"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'

defineProps<{
  isFormInModal?: boolean
}>()

interface LoginForm {
  email: string
  password: string
}

const t = useLocalI18n()

const rememberPassword = ref<boolean>(false)

const form = useForm<LoginForm>({
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = form.handleSubmit((values) => {
  // TODO: send this form somewhere
  console.log(values)
  // TODO: redirect it to checkout
})
</script>
<style lang="scss" scoped>
.login-form {
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

.modal-form > h2 {
  font-size: 20px;
}
</style>
