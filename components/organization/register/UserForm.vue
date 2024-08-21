<template>
  <form class="register-user-form" @submit.prevent="onSubmit">
    <FormInput
      v-model="form.values.email"
      name="email"
      :label="$t('form.email')"
      rules="required|email"
      autocomplete="username"
      :disabled="isFormDisabled"
    />

    <FormInput
      v-model="form.values.name"
      name="name"
      :label="$t('form.name')"
      rules="required|alpha"
      :disabled="isFormDisabled"
    />
    <FormInput
      v-model="form.values.surname"
      name="surname"
      :label="$t('form.surname')"
      rules="required|alpha"
      :disabled="isFormDisabled"
    />

    <h2 class="register-user-form__subtitle">Utwórz hasło</h2>

    <FormInputPassword
      v-model="form.values.password"
      :label="$t('form.password')"
      name="password"
      autocomplete="new-password"
      :disabled="isFormDisabled"
    />
    <FormInputPassword
      v-model="form.values.confirmPassword"
      :label="$t('form.confirmPassword')"
      rules="confirmedPassword:@password|required"
      name="confirmPassword"
      autocomplete="new-password"
      :disabled="isFormDisabled"
    />

    <AccountConsentsList
      v-model:value="form.values.consents"
      :type="ConsentType.Organization"
      @error="(e) => (consentsListError = formatError(e))"
    />

    <LayoutInfoBox
      v-show="errorMessage || consentsListError"
      type="danger"
      class="register-user-form__error"
    >
      {{ errorMessage || consentsListError }}
    </LayoutInfoBox>

    <LayoutRecaptchaBadge />
    <slot></slot>

    <LayoutButton
      :disabled="isFormDisabled"
      html-type="submit"
      class="register-user-form__btn"
      :label="$t('common.continue')"
    />
  </form>
</template>

<script setup lang="ts">
import { ConsentType } from '@heseya/store-core'
import type { OrganizationRegisterDto, UserConsentDto, UserRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

export interface CreateUserForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  surname: string
  consents: UserConsentDto
}

const props = withDefaults(
  defineProps<{
    initialValue?: OrganizationRegisterDto
  }>(),
  {
    initialValue: undefined,
  },
)

const $t = useGlobalI18n()
const formatError = useErrorMessage()

const errorMessage = ref('')
const consentsListError = ref<string>('')

const emit = defineEmits<{
  (event: 'submit', value: UserRegisterDto): void
}>()

const form = useForm<CreateUserForm>({
  initialValues: {
    email: props.initialValue?.creator_email || '',
    password: props.initialValue?.creator_password || '',
    confirmPassword: props.initialValue?.creator_password || '',
    name: props.initialValue?.creator_name.split(' ')[0] || '',
    surname: props.initialValue?.creator_name.split(' ')[1] || '',
    consents: props.initialValue?.consents || {},
  },
})

const registerFormDto = computed<UserRegisterDto>(() => ({
  name: `${form.values.name} ${form.values.surname}`,
  email: form.values.email,
  password: form.values.password,
  consents: form.values.consents,
}))

const isFormDisabled = computed(() => !!consentsListError.value)

const onSubmit = form.handleSubmit(() => {
  emit('submit', registerFormDto.value)
})
</script>

<style lang="scss" scoped>
.register-user-form {
  width: 100%;
  display: grid;
  position: relative;
  gap: 15px;

  &__subtitle {
    font-size: rem(16);
    color: $gray-color-600;
    margin-top: 10px;
    font-weight: 400;
  }

  &__btn {
    width: 100%;
  }

  &__error {
    color: var(--error-color);
    font-weight: bold;
    text-align: center;
  }
}
</style>
