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
      />
      <OrganizationRegisterBillingForm
        v-else-if="currentStep === 'company'"
        :initial-value="organizationForm"
        @submit="handleBillingStepSubmit"
        @back="currentStep = 'user'"
      />
      <div
        v-else-if="currentStep === 'addresses'"
        :initial-value="organizationForm"
        @back="currentStep = 'company'"
        @submit="handleAddressesStepSubmit"
      >
        TODO: addresses
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Utwórz nowe konto",
    "subtitle": "w 3 prostych krokach",
    "steps": {
      "user": "Twoje dane",
      "company": "Dane firmy",
      "addresses": "Adresy"
    }
  },
  "en": {
    "title": "Create new account",
    "subtitle": "in 3 simple steps",
    "steps": {
      "user": "Your data",
      "company": "Company data",
      "addresses": "Addresses"
    }
  }
}
</i18n>

<script setup lang="ts">
import type {
  OrganizationRegisterDto,
  UserRegisterDto,
  OrganizationSavedAddressCreateDto,
} from '@heseya/store-core'
const t = useLocalI18n()

type RegisterSteps = 'user' | 'company' | 'addresses'
const steps = ['user', 'company', 'addresses'] as RegisterSteps[]

const currentStep = ref<RegisterSteps>('user')

const organizationForm = ref<OrganizationRegisterDto>({
  billing_email: '',
  billing_address: {
    name: '',
    company_name: '',
    address: '',
    city: '',
    country: '',
    country_name: '',
    phone: '',
    zip: '',
    vat: '',
  },
  shipping_adresses: [],
  consents: {},
  creator_email: '',
  creator_password: '',
  creator_name: '',
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
  organizationForm.value.billing_email = data.billing_email
  currentStep.value = 'addresses'
}

const handleAddressesStepSubmit = (data: OrganizationSavedAddressCreateDto[]) => {
  organizationForm.value.shipping_adresses = data
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
