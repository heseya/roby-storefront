<template>
  <NuxtLayout name="checkout">
    <BaseContainer class="checkout-page">
      <LayoutLoading :active="isLoading" additional-blur />

      <section v-if="!areItemsInCart" class="checkout-page__section">
        <CheckoutPageArea :title="$t('cart.title')">
          <LazyCartEmpty />
        </CheckoutPageArea>
      </section>
      <section v-else class="checkout-page__section">
        <CheckoutPageArea v-if="channels.channels.length > 1" :title="t('salesChannel')">
          <p class="checkout-page__channel-info">{{ t('salesChannelText') }}</p>
          <LayoutNavChannelSwitch mode="select" />
        </CheckoutPageArea>

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

          <CheckoutRegisterForm
            v-if="!isLogged && wantCreateAccount"
            v-model:consents="registerForm.values.consents"
            :name="registerForm.values.name"
            :surname="registerForm.values.surname"
            :password="registerForm.values.password"
            :confirm-password="registerForm.values.confirmPassword"
            @update="updateRegisterForm"
          >
            <LayoutInfoBox v-if="registerErrorMessage" type="danger">
              {{ registerErrorMessage }}
            </LayoutInfoBox>
          </CheckoutRegisterForm>
        </form>

        <CheckoutShippingMethods />

        <CheckoutFormLoggedBillingAddress v-if="defaultBillingAddress" />
        <CheckoutBillingAddress v-else />

        <CheckoutPaymentMethods />
        <CheckoutComment />
      </section>
      <section class="checkout-page__section">
        <CheckoutSummary
          :disabled="isLoading || !areItemsInCart"
          :is-validation-error="isFormValidatonError"
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
    "question": "Chcę założyć konto",
    "salesChannel": "Kanał sprzedaży",
    "salesChannelText": "Upewnij się, że wybrałeś prawidłowy kanał sprzedaży. Z niektórych kanałów sprzedaży nie będziesz wstanie wysłać zamówienia na wybrany przez siebie adres."
  },
  "en": {
    "title": "Order summary",
    "question": "I want to create account",
    "salesChannel": "Sales channel",
    "salesChannelText": "Make sure you have selected the correct sales channel. From some sales channels you will not be able to send the order to the address you have chosen."
  }
}
</i18n>

<script setup lang="ts">
import { CartItem, HeseyaEvent, ShippingType } from '@heseya/store-core'
import type { Order } from '@heseya/store-core'
import clone from 'lodash/clone'
import { useForm } from 'vee-validate'

import type { CreateUserForm } from '~/components/auth/RegisterForm.vue'

import { TRADITIONAL_PAYMENT_KEY } from '~/consts/traditionalPayment'

import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useCheckoutStore } from '@/store/checkout'
import { useChannelsStore } from '@/store/channels'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()

const checkout = useCheckoutStore()
const channels = useChannelsStore()
const user = useUser()
const isLogged = useIsLogged()
const heseya = useHeseya()
const auth = useAuthStore()
const localePath = useLocalePath()

const { defaultAddress: defaultBillingAddress } = useUserBillingAddresses()

const wantCreateAccount = ref<boolean>(false)
const isLoading = ref(false)
const { subscribe: newsletterSubscribe } = useNewsletter()

const registerErrorMessage = ref('')

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

const areItemsInCart = computed(() => (checkout.orderDto?.items.length ?? 0) > 0)

/**
 * This is a hack unfortunately.
 * registerForm handles all of the form fields in this page, including that used in purposes others than register
 * Thanks to this, we can determine if there is a validation error in address form
 */
const isFormValidatonError = computed(() => {
  const record = Object.values(registerForm.errors.value).filter(Boolean)
  return record.length > 0
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
  const paymentId = checkout.paymentMethodId
  let order: Order
  try {
    order = await checkout.createOrder()

    if (checkout.consents.newsletter) newsletterSubscribe(checkout.email)
  } catch (e: any) {
    const error = formatError(e)
    notify({
      title: error,
      type: 'error',
    })
    isLoading.value = false
    return
  }

  try {
    // save user addresses if they don't exist
    await saveUserAddresses()

    if (paymentId === TRADITIONAL_PAYMENT_KEY) {
      checkout.reset()
      return navigateTo(
        localePath(`/checkout/thank-you?code=${order.code}&payment=${TRADITIONAL_PAYMENT_KEY}`),
      )
    } else if (paymentId) {
      const paymentUrl = await checkout.createOrderPayment(order.code, paymentId)
      checkout.reset()
      window.location.href = paymentUrl
    }
  } catch (e: any) {
    const error = formatError(e)
    notify({
      title: error,
      type: 'error',
    })
    isLoading.value = false
  } finally {
    checkout.reset()
    navigateTo(localePath(`/checkout/thank-you?code=${order.code}`))
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

const processOrder = registerForm.handleSubmit(async () => {
  isLoading.value = true
  try {
    if (wantCreateAccount.value) await createAccountAndLogin()
    await createOrder()
  } catch (e: any) {
    registerErrorMessage.value = formatError(e)
    isLoading.value = false
  }
})

// Autofill billing address if user is logged in
watch(
  () => defaultBillingAddress,
  () => {
    if (defaultBillingAddress.value) {
      checkout.billingAddress = clone(defaultBillingAddress.value.address)
      checkout.invoiceRequested = !!defaultBillingAddress.value.address.vat
    }
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

delayedOnMounted(() => {
  const ev = useHeseyaEventBus()
  const cart = useCartStore()

  ev.emit(HeseyaEvent.InitiateCheckout, cart.items as CartItem[])

  registerForm.values.email = checkout.email
})

watch(
  () => registerForm.values.email,
  () => {
    if (!isLogged.value) {
      checkout.email = registerForm.values.email
    }
  },
)

useSeoTitle(t('title'))

onMountedDocumentLoad(() => {
  useHead({
    // Import of Inpost & Furgonetka map widget
    link: [{ rel: 'stylesheet', href: 'https://geowidget.easypack24.net/css/easypack.css' }],
    script: [
      { src: 'https://geowidget.easypack24.net/js/sdk-for-javascript.js', async: true },
      { src: 'https://furgonetka.pl/js/dist/map/map.js', async: true },
    ],
  })
}, 500)
</script>

<style lang="scss" scoped>
.checkout-form {
  width: 100%;
}

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

  &__channel-info {
    margin-bottom: 16px;
    padding: 4px;
    border: solid 1px var(--warning-color);
    color: var(--warning-color);
  }
}
</style>
