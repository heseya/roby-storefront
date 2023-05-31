<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <section class="checkout-page__section">
        {{ form.values }}
        <form>
          <CheckoutPersonalData v-model:value="form.values.email">
            <FormCheckbox
              v-if="!isLogged"
              v-model="wantCreateAccount"
              class="checkout-page__checkbox"
              name="wantCreateAccount"
              :label="t('account.question')"
            />
          </CheckoutPersonalData>

          <!--@TODO Check why form data is cleared when this element is not available-->
          <keep-alive>
            <CheckoutRegisterForm
              v-if="!isLogged && wantCreateAccount"
              :name="form.values.name"
              :surname="form.values.surname"
              :password="form.values.password"
              :confirm-password="form.values.confirmPassword"
              :consents="form.values.consents"
              @update:value="updateForm($event)"
              @update:consents="form.values.consents = { ...$event }"
            >
              <LayoutInfoBox v-if="errorMessage" type="danger">
                {{ errorMessage }}
              </LayoutInfoBox>
            </CheckoutRegisterForm>
          </keep-alive>
        </form>

        <CheckoutShippingMethods />

        <CheckoutFormLoggedBillingAddress v-if="defaultBillingAddress" />
        <CheckoutBillingAddress v-else />

        <CheckoutPaymentMethods />
        <CheckoutComment />
      </section>
      <section class="checkout-page__section">
        <CheckoutSummary
          :enable-confirm-button="!wantCreateAccount || IsFormValid"
          @submit="processOrder()"
        />
      </section>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Podsumowanie zamówienia",
    "payment": "Metoda płatności",
    "account": {
      "question": "Chce założyć konto",
      "create": "Załóż konto",
      "description": "Wystarczy, że wypełnisz poniższe pola, aby utworzyć konto w naszym sklepie."
    },
    "defaultAddress": "Adres domyślny"
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useForm } from 'vee-validate'
import { CreateUserForm } from '~/components/auth/RegisterForm.vue'
import { EMPTY_ADDRESS } from '~/consts/address'
import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'
import { useAuthStore } from '~/store/auth'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()

const checkout = useCheckoutStore()
const user = useUser()
const isLogged = useIsLogged()
const heseya = useHeseya()
const auth = useAuthStore()

const { defaultAddress: defaultBillingAddress } = useUserBillingAddresses()

const wantCreateAccount = ref<boolean>(false)

const errorMessage = ref('')

const form = useForm({
  initialValues: {
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    consents: {},
  },
})

const IsFormValid = computed(() => {
  const { name, surname, password, confirmPassword } = form.values

  if (!name || !surname || !password || !confirmPassword || Object.keys(form.errors.value).length)
    return false

  return true
})

const updateForm = (e: { key: keyof Omit<CreateUserForm, 'consents'>; value: string }) => {
  form.values[e.key] = e.value
}

const saveUserAddresses = async () => {
  const { addresses: shipping, add: addShipping } = useUserShippingAddresses()
  const { addresses: billing, add: addBilling } = useUserBillingAddresses()

  if (shipping.value.length === 0) {
    await addShipping({
      name: t('defaultAddress'),
      default: true,
      address: checkout.shippingAddress,
    })
  }
  if (billing.value.length === 0) {
    await addBilling({
      name: t('defaultAddress'),
      default: true,
      address: checkout.billingAddress,
    })
  }
}

const createOrder = async () => {
  try {
    // paymentMethodId must exist at this point, it is validated before
    const paymentId = checkout.paymentMethodId!

    const order = await checkout.createOrder()

    // save user addresses if they don't exist
    await saveUserAddresses()

    checkout.reset()

    if (paymentId === TRADITIONAL_PAYMENT_KEY) {
      navigateTo(`/checkout/thank-you?code=${order.code}&payment=${TRADITIONAL_PAYMENT_KEY}`)
      return
    }

    const paymentUrl = await checkout.createOrderPayment(order.code, paymentId)
    window.location.href = paymentUrl
  } catch (e: any) {
    const error = formatError(e)
    notify({
      title: $t(error),
      type: 'error',
    })
  }
}

const createAccountAndLogin = async () => {
  const { name, surname, email, consents, password } = form.values
  await heseya.Auth.register({
    name: name + ' ' + surname,
    email,
    password,
    consents,
  })
  await auth.login({ email, password })
}

const processOrder = async () => {
  try {
    if (wantCreateAccount.value) await createAccountAndLogin()
    await createOrder()
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
}

// Autofill billing address if user is logged in
watch(
  () => defaultBillingAddress,
  () => {
    if (defaultBillingAddress.value)
      checkout.billingAddress = clone(defaultBillingAddress.value.address)
    else checkout.billingAddress = clone(EMPTY_ADDRESS)
  },
  { immediate: true },
)

// Autofill email if user is logged in
watch(
  () => user,
  () => {
    if (user.value) checkout.email = user.value.email
    else checkout.email = ''
  },
  { immediate: true },
)

watch(
  () => form.values.email,
  () => {
    if (!isLogged.value) {
      checkout.email = form.values.email
    }
  },
)

useSeoMeta({
  title: () => t('title'),
})

useHead({
  // Import of Inpost map widget
  link: [{ rel: 'stylesheet', href: 'https://geowidget.easypack24.net/css/easypack.css' }],
  script: [{ src: 'https://geowidget.easypack24.net/js/sdk-for-javascript.js', async: true }],
})
</script>

<style lang="scss" scoped>
.checkout-page {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media ($viewport-10) {
    grid-template-columns: 1fr 360px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__checkbox {
    margin-top: 30px;
  }
}
</style>
