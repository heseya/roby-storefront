<template>
  <NuxtLayout>
    <BaseContainer>
      <div class="reset-password" @submit.prevent="onSubmit">
        <form class="reset-password__form">
          <div class="reset-password__header">{{ t('title') }}</div>
          <div class="reset-password__inputs">
            <FormInputPassword
              v-model="form.values.password"
              :label="t('password')"
              name="password"
            />
            <FormInputPassword
              v-model="form.values.confirmPassword"
              :label="t('confirmPassword')"
              rules="confirmedPassword:@password"
              name="confirmPassword"
            />
          </div>

          <LayoutButton class="reset-password__btn" :label="t('send')" html-type="submit" />
        </form>
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Resetowanie hasła",
    "password": "Hasło",
    "confirmPassword": "Powtórz hasło",
    "send": "Wyślij"
  }
}
</i18n>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()
const route = useRoute()

const query = computed(() => ({
  token: route.query.token as string,
  email: route.query.email as string,
}))

useAsyncData(`reset-password`, async () => {
  try {
    await heseya.Auth.verifyResetPasswordToken(query.value.token, query.value.email)
  } catch {
    navigateTo('/')
  }
})

const form = useForm({
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await heseya.Auth.resetPassword({
      token: query.value.token,
      email: query.value.email,
      password: values.password,
    })
  } finally {
    navigateTo('/')
  }
})
</script>

<style lang="scss" scoped>
.reset-password {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &__form {
    margin-top: 50px;
    display: grid;
    justify-items: center;
    gap: 10px;

    @media ($viewport-11) {
      width: 25%;
    }
  }

  &__btn {
    justify-self: center;
    margin-top: 20px;
    width: 100%;
  }

  &__inputs {
    display: grid;
    gap: 10px;
    width: 100%;
  }

  &__header {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
