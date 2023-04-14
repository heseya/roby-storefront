<template>
  <div class="address-form">
    <FormInput
      :model-value="value.name"
      name="name"
      :label="invoice ? t('companyName') : t('name')"
      rules="required"
      @update:model-value="update('name')"
    />
    <FormInput
      v-if="invoice"
      :model-value="value.vat"
      name="vat"
      rules="required"
      :label="t('vatNumber')"
      @update:model-value="update('vat')"
    />

    <div class="address-form__row">
      <FormSelect
        :model-value="value.country"
        name="country"
        rules="required"
        :label="t('country')"
        @update:model-value="update('country')"
      >
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </FormSelect>
      <FormInput
        :model-value="value.address"
        name="address"
        rules="required"
        :label="t('address')"
        @update:model-value="update('address')"
      />
    </div>
    <div class="address-form__row">
      <FormInput
        :model-value="value.zip"
        name="postalCode"
        rules="required"
        :label="t('postalCode')"
        @update:model-value="update('zip')"
      />
      <FormInput
        :model-value="value.city"
        name="city"
        rules="required"
        :label="t('city')"
        @update:model-value="update('city')"
      />
    </div>
    <FormInput
      :model-value="value.phone"
      name="phone"
      html-type="phone"
      rules="required"
      :label="t('phone')"
      @update:model-value="update('phone')"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "name": "Imię i nazwisko",
    "companyName": "Nazwa firmy",
    "vatNumber": "NIP",
    "address": "Adres",
    "city": "Miasto",
    "postalCode": "Kod pocztowy",
    "phone": "Telefon",
    "country": "Kraj"
  }
}
</i18n>

<script setup lang="ts">
import { AddressDto } from '@heseya/store-core'

const t = useLocalI18n()
const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    value?: AddressDto
    invoice?: boolean
  }>(),
  {
    value: () => ({
      name: '',
      address: '',
      postal_code: '',
      city: '',
      phone: '',
      zip: '',
      country: 'PL',
      country_name: '',
    }),
    invoice: false,
  },
)

const emit = defineEmits<{
  (event: 'update:value', value: AddressDto): void
}>()

const { data: countries } = useAsyncData(() => heseya.ShippingMethods.getCountries())

const update = (key: keyof AddressDto) => (value: string) => {
  emit('update:value', { ...props.value, [key]: value })
}
</script>

<style lang="scss" scoped>
.address-form {
  &__row {
    display: flex;
    gap: 1rem;
  }

  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}
</style>
