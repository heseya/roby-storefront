<template>
  <BaseContainer>
    <div class="reset-password" @submit.prevent="onSubmit">
      <LayoutBreadcrumpsProvider :breadcrumbs="[]" />
      <form class="reset-password__form">
        <h2 class="reset-password__header">{{ t('title') }}</h2>
        <FormInputPassword v-model="form.values.password" :label="t('password')" name="password" />
        <FormInputPassword
          v-model="form.values.confirmPassword"
          :label="t('confirmPassword')"
          rules="confirmedPassword:@password"
          name="confirmPassword"
        />
        <LayoutButton class="reset-password__btn" :label="t('send')" html-type="submit" />
      </form>
    </div>
  </BaseContainer>
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
const router = useRouter()

const query = ref({
  token: route.query.token as string,
  email: route.query.email as string,
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
    router.push('/')
  }
})

onBeforeMount(async () => {
  try {
    await heseya.Auth.verifyResetPasswordToken(query.value.token, query.value.email)
  } catch {
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.reset-password {
  display: flex;
  justify-content: center;
  align-items: center;

  &__form {
    margin-top: 50px;
    display: grid;
    height: 100%;
    width: 50%;
    gap: 10px;
  }

  &__btn {
    justify-self: center;
    margin-top: 20px;
    width: 50%;
  }
}
</style>
