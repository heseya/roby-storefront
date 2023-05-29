<template>
  <CheckoutPageArea :title="$t('account.myData')">
    {{ form.values.email }}
    x
    {{ checkout.email }}
    x
    <div class="checkout-personal-data__myData">
      <FormInput
        v-if="!isLogged"
        v-model="form.values.email"
        :label="$t('form.email')"
        name="email"
        rules="email|required"
      />
      <div v-else class="checkout-personal-data__text">
        <span>{{ user?.name }}</span>
        <span>{{ user?.email }}</span>
      </div>
    </div>
    <FormCheckbox
      v-if="!user"
      v-model="createAccount"
      class="checkout-personal-data__checkbox"
      name="createAccount"
      :label="t('account.createQuestion')"
    />
  </CheckoutPageArea>
  <CheckoutPageArea v-if="!user && createAccount">
    <form class="checkout-personal-data__form">
      <FormInput
        v-model="form.values.name"
        :label="$t('form.name')"
        autocomplete="name"
        name="name"
        rules="alpha|required"
      />
      <FormInput
        v-model="form.values.surname"
        :label="$t('form.surname')"
        autocomplete="surname"
        name="surname"
        rules="alpha|required"
      />
      <FormInputPassword
        v-model="form.values.password"
        :label="$t('form.password')"
        autocomplete="new-password"
        name="password"
      />
      <FormInputPassword
        v-model="form.values.confirmPassword"
        :label="$t('form.confirmPassword')"
        autocomplete="confirmPassword"
        name="confirmPassword"
        rules="confirmedPassword:@password|required"
      />
      <AccountConsentsList v-model:value="form.values.consents" />
    </form>
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "account": {
      "createQuestion": "Chce założyć konto",
      "create": "Załóż konto",
      "description": "Wystarczy, że wypełnisz poniższe pola, aby utworzyć konto w naszym sklepie."
    }
  }
}
</i18n>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'
import { useCheckoutStore } from '@/store/checkout'
import { useAuthStore } from '~/store/auth'

const props = defineProps<{
  submit: boolean
}>()

const emit = defineEmits<{
  (e: 'update:submit', value: boolean): void
  (e: 'createOrder'): void
}>()

const submit = computed({
  get: () => props.submit,
  set: (value) => emit('update:submit', value),
})

const $t = useGlobalI18n()
const t = useLocalI18n()
const checkout = useCheckoutStore()

const heseya = useHeseya()
const auth = useAuthStore()
const createAccount = ref<boolean>(false)

const isLogged = useIsLogged()
const user = useUser()

const form = useForm({
  initialValues: {
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    consents: {} as UserConsentDto,
  },
})

const createAccountAndLoggin = async () => {
  emit('createOrder')
}

// Autofill email if user is logged in
watch(
  () => user,
  () => {
    if (user.value?.email) form.values.email = user.value.email
  },
  { immediate: true },
)

watch(
  () => form.values.email,
  () => {
    if (form.values.email) {
      checkout.email = form.values.email
    }
  },
)

watch(
  () => props.submit,
  async () => {
    if (props.submit) {
      const { valid } = await form.validate()
      if (valid) {
        await createAccountAndLoggin()
      }
    }

    submit.value = false
  },
)
</script>

<style lang="scss" scoped>
.checkout-personal-data {
  &__myData {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__checkbox {
    margin-top: 30px;
  }

  &__form {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
