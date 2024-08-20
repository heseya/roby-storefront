<template>
  <div class="register-form">
    <div class="register-form__header">
      <div class="register-form__content">
        <h1 class="register-form__title">{{ t('title') }}</h1>
        <span class="register-form__subtitle">{{ t('subtitle') }}</span>

        <div class="register-form__steps">
          <div
            v-for="(step, i) in steps"
            :key="step"
            class="register-step"
            :class="{ 'register-step--active': currentStep === step }"
          >
            <span class="register-step__number">{{ i + 1 }}</span>
            <span class="register-step__title">{{ t(`steps.${step}`) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="register-form__content">
      <OrganizationRegisterUserForm
        v-if="currentStep === 'user'"
        :initial-value="organizationForm"
        @submit="handleUserStepSubmit"
      >
        <LayoutInfoBox v-show="errorMessage" type="danger" class="register-form__error">
          {{ errorMessage }}
        </LayoutInfoBox>
      </OrganizationRegisterUserForm>
      <OrganizationRegisterBillingForm
        v-else-if="currentStep === 'company'"
        :initial-value="organizationForm"
        @submit="handleBillingStepSubmit"
        @back="currentStep = 'user'"
      >
        <LayoutInfoBox v-show="errorMessage" type="danger" class="register-form__error">
          {{ errorMessage }}
        </LayoutInfoBox>
      </OrganizationRegisterBillingForm>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Utwórz nowe konto",
    "subtitle": "w 2 prostych krokach",
    "steps": {
      "user": "Twoje dane",
      "company": "Dane firmy",
      "addresses": "Adresy"
    },
    "registeredMessage": "Zarejestrowano pomyślnie"
  },
  "en": {
    "title": "Create new account",
    "subtitle": "in 2 simple steps",
    "steps": {
      "user": "Your data",
      "company": "Company data",
      "addresses": "Addresses"
    },
    "registeredMessage": "Registered successfully"
  }
}
</i18n>

<script setup lang="ts">
import type { Organization, OrganizationRegisterDto, UserRegisterDto } from '@heseya/store-core'
const $t = useGlobalI18n()
const t = useLocalI18n()

type RegisterSteps = 'user' | 'company'

const heseya = useHeseya()
const { recaptchaPublic } = usePublicRuntimeConfig()
const formatError = useErrorMessage()
const { notify } = useNotify()

const emit = defineEmits<{
  (event: 'registered', value: Organization): void
}>()

const steps = ['user', 'company'] as RegisterSteps[]
const currentStep = ref<RegisterSteps>('user')
const isLoading = ref(false)
const errorMessage = ref('')

// TODO: remove default data, leave empty strings
const organizationForm = ref<OrganizationRegisterDto>({
  billing_email: 'test@example.com',
  billing_address: {
    name: 'Testowa firma',
    company_name: 'Testowa firma',
    address: 'ul. Sienkiewicza 1',
    city: 'Warszawa',
    country: 'PL',
    country_name: 'Poland',
    phone: '222 333 444',
    zip: '00-222',
    vat: '1112223331',
  },
  shipping_addresses: [],
  consents: {},
  creator_email: `test-${Math.random()}@example.com`,
  creator_password: 'blablaalesuperprojekt',
  creator_name: 'Janusz Mikoszewski',
})

const handleUserStepSubmit = (data: UserRegisterDto) => {
  organizationForm.value.creator_email = data.email
  organizationForm.value.creator_password = data.password
  organizationForm.value.creator_name = data.name
  organizationForm.value.consents = data.consents
  currentStep.value = 'company'
}

const handleBillingStepSubmit = (
  data: Pick<OrganizationRegisterDto, 'billing_address' | 'billing_email'>,
) => {
  organizationForm.value.billing_address = data.billing_address
  organizationForm.value.shipping_addresses = [
    { default: true, name: $t('common.default').toString(), address: { ...data.billing_address } },
  ]
  organizationForm.value.billing_email = data.billing_email
  registerOrganization()
}

const registerOrganization = async () => {
  // const ev = useHeseyaEventBus()

  isLoading.value = true

  try {
    const recaptchaToken = await getRecaptchaToken(recaptchaPublic, 'register')
    const organization = await heseya.Organizations.register({
      ...organizationForm.value,
      // @ts-expect-error token is not used yet
      captcha_token: recaptchaToken,
    })

    // TODO: this event does not exist yet in sdk
    // ev.emit(HeseyaEvent.RegisterOrganization, organization)
    emit('registered', organization)
    notify({
      title: t('registeredMessage'),
      type: 'success',
    })
  } catch (e: any) {
    notify({
      title: formatError(e),
      type: 'error',
    })
    errorMessage.value = formatError(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: rem(31);
    font-weight: 700;
    margin-bottom: 6px;
  }

  &__subtitle {
    font-size: rem(20);
    color: $gray-color-600;
    margin-top: 10px;
  }

  &__steps {
    display: flex;
    justify-content: space-between;
    margin: 24px 0;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: solid 1px $gray-color-300;
    margin-bottom: 40px;
  }

  &__content {
    width: 100%;
    max-width: 500px;
  }

  &__error {
    color: var(--error-color);
    font-weight: bold;
    text-align: center;
  }
}

.register-step {
  display: flex;
  align-items: center;
  margin-right: 20px;

  &__number {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray-color-300;
    color: $gray-color-600;
    margin-right: 8px;
    border-radius: 50%;
  }

  &__title {
    font-size: rem(14);
    color: $gray-color-600;
  }

  &--active &__number {
    color: #fff;
    background-color: var(--primary-color);
  }
}
</style>
