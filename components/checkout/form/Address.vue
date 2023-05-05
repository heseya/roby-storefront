<template>
  <div class="address-form">
    <FormInput
      :model-value="address.name"
      name="name"
      :label="invoice ? t('companyName') : t('name')"
      rules="required"
      @update:model-value="update('name', $event as string)"
    />
    <FormInput
      v-if="invoice"
      :model-value="address.vat"
      name="vat"
      rules="required"
      :label="t('vatNumber')"
      @update:model-value="update('vat', $event as string)"
    />

    <div class="address-form__row">
      <FormSelect
        :model-value="address.country"
        name="country"
        rules="required"
        :label="t('country')"
        @update:model-value="update('country', $event as string)"
      >
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </FormSelect>
      <FormInput
        :model-value="address.address"
        name="address"
        rules="required"
        :label="t('address')"
        @update:model-value="update('address', $event as string)"
      />
    </div>
    <div class="address-form__row">
      <FormInput
        :model-value="address.zip"
        name="postalCode"
        rules="required"
        :label="t('postalCode')"
        @update:model-value="update('zip', $event as string)"
      />
      <FormInput
        :model-value="address.city"
        name="city"
        rules="required"
        :label="t('city')"
        @update:model-value="update('city', $event as string)"
      />
    </div>
    <FormInput
      :model-value="address.phone"
      name="phone"
      html-type="phone"
      rules="required"
      :label="t('phone')"
      @update:model-value="update('phone', $event as string)"
    />

    <div class="address-form__info">
      <span class="address-form__info-star">*</span>
      - {{ t('info') }}
    </div>
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
    "country": "Kraj",
    "info": "Dane obowiązkowe do wypełnienia"
  }
}
</i18n>

<script setup lang="ts">
import { AddressDto } from '@heseya/store-core'
import { EMPTY_ADDRESS } from '~/consts/address'

const t = useLocalI18n()
const heseya = useHeseya()

const props = withDefaults(
  defineProps<{
    address?: AddressDto
    invoice?: boolean
  }>(),
  {
    address: () => ({ ...EMPTY_ADDRESS }),
    invoice: false,
  },
)

const emit = defineEmits<{
  (event: 'update:address', value: AddressDto): void
}>()

const { data: countries } = useLazyAsyncData('countries', () =>
  heseya.ShippingMethods.getCountries(),
)

const update = (key: keyof AddressDto, value: string) => {
  emit('update:address', { ...props.address, [key]: value })
}
</script>

<style lang="scss" scoped>
.address-form {
  &__row {
    display: flex;
    gap: 1rem;
    flex-direction: column;

    @media ($viewport-6) {
      flex-direction: row;
    }
  }

  > *:not(:last-child) {
    margin-bottom: 1em;
  }

  &__info {
    font-size: rem(12);
  }
  &__info-star {
    color: var(--primary-color);
  }
}
</style>
