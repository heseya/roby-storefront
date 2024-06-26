<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <LazyClientOnly>
      <LayoutInfoBox v-if="showAccountMigrationInfo" class="login-form__info" type="info">
        {{ t('accountMigrationInfo') }}
      </LayoutInfoBox>
    </LazyClientOnly>

    <div class="login-form__form">
      <FormInput
        v-model="form.values.email"
        name="login_email"
        :label="$t('form.email')"
        autocomplete="username"
        rules="required|email"
      />
      <FormInputPassword
        v-model="form.values.password"
        :label="$t('form.password')"
        name="login_password"
        autocomplete="current-password"
        rules="required"
      />
    </div>
    <div class="login-form__options">
      <NuxtLink class="login-form__forgot-password" :to="localePath('/forgot-password')">
        {{ t('form.forgot-password') }}
      </NuxtLink>
    </div>
    <LayoutInfoBox v-if="errorMessage" type="danger" class="login-form__error">
      {{ errorMessage }}
    </LayoutInfoBox>
    <LayoutButton class="login-form__btn" :label="$t('account.login')" html-type="submit" />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "form": {
      "forgot-password": "Nie pamiętasz hasła?"
    },
    "message": {
      "success": "Zalogowano pomyślnie"
    },
    "accountMigrationInfo": "W związku z aktualizacją bezpieczeństwa, przed pierwszym logowaniem, skorzystaj z opcji \"Nie pamiętasz hasła?\"."
  },
  "en": {
    "form": {
      "forgot-password": "Forgot password?"
    },
    "message": {
      "success": "Successfully logged "
    },
    "accountMigrationInfo": "Due to the security update, please use the \"Forgot password?\" option before logging in for the first time."
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '~/store/config'
import { LOGGED_IN_THE_PAST_KEY } from '@/consts/localstorageKeys'

const t = useLocalI18n()
const $t = useGlobalI18n()

const getErrorMessage = useErrorMessage()
const auth = useAuthStore()
const config = useConfigStore()
const { notify } = useNotify()
const localePath = useLocalePath()

const wasLoggedInPast = useLocalStorage(LOGGED_IN_THE_PAST_KEY, false)

const showAccountMigrationInfo = computed(() => {
  return config.env.show_account_migration_info === '1' && !wasLoggedInPast.value
})

const emit = defineEmits<{
  (event: 'login'): void
}>()

const errorMessage = ref<string | null>(null)

const form = useForm({
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  errorMessage.value = null
  const { success, error } = await auth.login({ email, password })
  if (!success) {
    errorMessage.value = getErrorMessage(error)
  } else {
    notify({
      title: t('message.success'),
      type: 'success',
    })
    emit('login')
  }
})
</script>
<style lang="scss" scoped>
.login-form {
  &__options {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    margin: 1rem 0;
  }

  &__info {
    font-size: rem(12);
    line-height: rem(16);
  }

  &__forgot-password {
    color: $blue-color-500;
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
  }

  &__form {
    display: grid;
    gap: 15px;
    margin-top: 15px;
  }

  &__btn {
    padding: 11px 0px;
    width: 100%;
  }
}
</style>
