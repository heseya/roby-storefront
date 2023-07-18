<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <LayoutLoading :active="isLoading" />

      <section class="checkout-page__section">
        <form>
          <CheckoutPersonalData v-model:email="registerForm.values.email">
            <FormCheckbox
              v-show="!isLogged"
              v-model="wantCreateAccount"
              class="checkout-page__checkbox"
              name="wantCreateAccount"
              :label="t('question')"
            />
          </CheckoutPersonalData>

          <!--@TODO Check why form data is cleared when this element is not available-->
          <KeepAlive>
            <CheckoutRegisterForm
              v-if="!isLogged && wantCreateAccount"
              v-model:consents="registerForm.values.consents"
              :name="registerForm.values.name"
              :surname="registerForm.values.surname"
              :password="registerForm.values.password"
              :confirm-password="registerForm.values.confirmPassword"
              @update="updateRegisterForm"
            >
              <LayoutInfoBox v-if="errorMessage" type="danger">
                {{ errorMessage }}
              </LayoutInfoBox>
            </CheckoutRegisterForm>
          </KeepAlive>
        </form>

        <CheckoutShippingMethods />

        <CheckoutFormLoggedBillingAddress v-if="defaultBillingAddress" />
        <CheckoutBillingAddress v-else />

        <CheckoutPaymentMethods />
        <CheckoutComment />
      </section>
      <section class="checkout-page__section">
        <CheckoutSummary
          :disabled="(wantCreateAccount && !isRegisterFormValid) || isLoading"
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
    "question": "Chce założyć konto"
  },
  "en": {
    "title": "Order summary",
    "question": "I want to create account"
  }
}
</i18n>

<script setup lang="ts">
import { CartItem, HeseyaEvent, ShippingType } from '@heseya/store-core'
import clone from 'lodash/clone'
import { useForm } from 'vee-validate'

import { CreateUserForm } from '~/components/auth/RegisterForm.vue'

import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'

import { useCartStore } from '~/store/cart'
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
const localePath = useLocalePath()

const { defaultAddress: defaultBillingAddress } = useUserBillingAddresses()

const wantCreateAccount = ref<boolean>(false)
const isLoading = ref(false)

const errorMessage = ref('')

const registerForm = useForm({
  initialValues: {
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    consents: {},
  },
})

const isRegisterFormValid = computed(() => {
  const { name, surname, password, confirmPassword } = registerForm.values

  if (
    !name ||
    !surname ||
    !password ||
    !confirmPassword ||
    Object.keys(registerForm.errors.value).length
  )
    return false

  return true
})

const updateRegisterForm = (e: { key: keyof Omit<CreateUserForm, 'consents'>; value: string }) => {
  registerForm.values[e.key] = e.value
}

const saveUserAddresses = async () => {
  const { addresses: shipping, add: addShipping } = useUserShippingAddresses()
  const { addresses: billing, add: addBilling } = useUserBillingAddresses()

  if (
    checkout.shippingMethod?.shipping_type === ShippingType.Address &&
    shipping.value.length === 0
  ) {
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
      navigateTo(
        localePath(`/checkout/thank-you?code=${order.code}&payment=${TRADITIONAL_PAYMENT_KEY}`),
      )
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
  const { name, surname, email, consents, password } = registerForm.values
  await heseya.Auth.register({
    name: name + ' ' + surname,
    email,
    password,
    consents,
  })
  await auth.login({ email, password })
}

const processOrder = async () => {
  isLoading.value = true
  try {
    if (wantCreateAccount.value) await createAccountAndLogin()
    await createOrder()
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
  isLoading.value = false
}

// Autofill billing address if user is logged in
watch(
  () => defaultBillingAddress,
  () => {
    if (defaultBillingAddress.value)
      checkout.billingAddress = clone(defaultBillingAddress.value.address)
  },
  { immediate: true },
)

// Autofill email if user is logged in
watch(
  () => user,
  () => {
    if (user.value) checkout.email = user.value.email
  },
  { immediate: true },
)

onMounted(() => {
  const ev = useHeseyaEventBus()
  const cart = useCartStore()
  ev.emit(HeseyaEvent.InitiateCheckout, cart.items as CartItem[])
})

watch(
  () => registerForm.values.email,
  () => {
    if (!isLogged.value) {
      checkout.email = registerForm.values.email
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
  position: relative;

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
