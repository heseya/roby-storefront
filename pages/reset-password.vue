<template>
  <NuxtLayout>
    <BaseContainer>
      <div class="reset-password">
        <div v-if="!isSubmitted" class="reset-password__container" @submit.prevent="onSubmit">
          <form class="reset-password__form">
            <div class="reset-password__header">{{ t('title') }}</div>
            <div class="reset-password__inputs">
              <FormInputPassword
                v-model="form.values.password"
                :label="$t('form.password')"
                name="password"
              />
              <FormInputPassword
                v-model="form.values.confirmPassword"
                :label="$t('form.confirmPassword')"
                rules="confirmedPassword:@password"
                name="confirmPassword"
              />
              <LayoutInfoBox v-if="errorMessage" type="danger">
                {{ errorMessage }}
              </LayoutInfoBox>
            </div>

            <LayoutButton class="reset-password__btn" :label="$t('form.send')" html-type="submit" />
          </form>
        </div>
        <div v-else class="reset-password__subbmited">
          <p>{{ t('message') }}</p>
          <NuxtLink :to="'/login'" class="reset-password__nav">
            &lt; {{ $t('form.backToLogin') }}
          </NuxtLink>
        </div>
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Resetowanie hasła",
    "message": "Twoje hasło zostało pomyślnie zmienione"
  }
}
</i18n>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
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

const errorMessage = ref<string>()

const isSubmitted = ref<boolean>(false)

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
    isSubmitted.value = true
  } catch (error: any) {
    errorMessage.value = formatError(error)
  }
})
</script>

<style lang="scss" scoped>
.reset-password {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &__subbmited {
    margin-top: 50px;
    display: grid;
    justify-content: center;
  }

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

  &__nav {
    text-align: center;
    text-decoration: none;
    color: $text-color;
    font-weight: 500;
    margin-top: 30px;
  }
}
</style>
