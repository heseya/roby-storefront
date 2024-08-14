<template>
  <div class="address-form" :class="{ 'address-form--vertical': vertical }">
    <FormInput
      :model-value="address.name"
      :name="`${namePrefix}_name`"
      :label="invoice ? t('companyName') : $t('form.nameAndSurname')"
      :autocomplete="invoice ? 'organization' : 'name'"
      rules="required"
      :disabled="disabled"
      @update:model-value="update('name', $event as string)"
    />
    <FormInput
      v-if="invoice"
      :key="vatNumberRules"
      :model-value="address.vat"
      :name="`${namePrefix}_vat`"
      autocomplete="vat"
      :rules="vatNumberRules"
      :label="$t('form.vat')"
      :disabled="disabled"
      @update:model-value="update('vat', $event as string)"
    />

    <div class="address-form__row">
      <FormSelect
        :model-value="address.country"
        :name="`${namePrefix}_country`"
        rules="required"
        :label="t('country')"
        :disabled="disabled"
        @update:model-value="update('country', $event as string)"
      >
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ $te(`countries.${country.code}`) ? $t(`countries.${country.code}`) : country.name }}
        </option>
      </FormSelect>
      <FormInput
        :model-value="address.address"
        :name="`${namePrefix}_address`"
        rules="required"
        autocomplete="address-line1"
        :label="t('address')"
        :disabled="disabled"
        @update:model-value="update('address', $event as string)"
      />
    </div>
    <div class="address-form__row">
      <FormInput
        :key="zipCodeRules"
        :model-value="address.zip"
        :name="`${namePrefix}_postal_code`"
        autocomplete="postal_code"
        :rules="zipCodeRules"
        :label="t('postalCode')"
        :disabled="disabled"
        @update:model-value="update('zip', $event as string)"
      />
      <FormInput
        :model-value="address.city"
        :name="`${namePrefix}_city`"
        autocomplete="home city"
        rules="required"
        :label="address.country !== 'US' ? t('city') : t('cityAndState')"
        :disabled="disabled"
        @update:model-value="update('city', $event as string)"
      />
    </div>
    <FormInput
      :model-value="address.phone"
      :name="`${namePrefix}_phone`"
      autocomplete="phone"
      html-type="phone"
      rules="required|phone"
      :label="t('phone')"
      :disabled="disabled"
      @update:model-value="update('phone', $event as string)"
    />

    <div v-if="!disabled" class="address-form__info">
      <span class="address-form__info-star">*</span>
      - {{ t('info') }}
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "companyName": "Nazwa firmy",
    "address": "Ulica wraz z numerem domu/mieszkania",
    "city": "Miasto",
    "cityAndState": "Miasto i stan",
    "postalCode": "Kod pocztowy",
    "phone": "Telefon",
    "country": "Kraj",
    "info": "Dane obowiązkowe do wypełnienia"
  },
  "en": {
    "companyName": "Company name",
    "address": "Street with house/apartment number",
    "city": "City",
    "cityAndState": "City and state",
    "postalCode": "Postal Code",
    "phone": "Phone",
    "country": "Country",
    "info": "Mandatory data to be completed"
  }
}
</i18n>

<script setup lang="ts">
import type { AddressDto } from '@heseya/store-core'

import { useCheckoutStore } from '@/store/checkout'
import { EMPTY_ADDRESS } from '@/consts/address'

const t = useLocalI18n()
const heseya = useHeseya()
const checkout = useCheckoutStore()

const props = withDefaults(
  defineProps<{
    address?: AddressDto
    invoice?: boolean
    disabled?: boolean
    namePrefix?: string
    excludeCountries?: false | 'shipping-method'
    vertical?: boolean
  }>(),
  {
    address: () => ({ ...EMPTY_ADDRESS }),
    invoice: false,
    disabled: false,
    namePrefix: 'address',
    excludeCountries: false,
    vertical: false,
  },
)

const emit = defineEmits<{
  (event: 'update:address', value: AddressDto): void
}>()

const { data: allCountries } = useLazyAsyncData('countries', () =>
  heseya.ShippingMethods.getCountries(),
)

const countries = computed(() => {
  // Limits countries to those available in selected shipping method
  if (props.excludeCountries === 'shipping-method')
    return allCountries.value?.filter((c) => checkout.isCountryCodeAllowedInShipping(c.code)) ?? []

  // Returns all countries
  return allCountries.value ?? []
})

const zipCodeRules = computed(() => {
  const rules = ['required']
  if (props.address.country === 'PL') rules.push('plZip')
  return rules.join('|')
})

const vatNumberRules = computed(() => {
  const rules = ['required']
  if (props.address.country === 'PL') rules.push('plVatNumber')
  else rules.push('vatNumber')
  return rules.join('|')
})

watch(
  [() => props.address.country, countries],
  () => {
    /**
     * Change country to first available if current is not available in selected sales channel
     */
    if (countries.value.length && !countries.value.find((c) => c.code === props.address.country)) {
      emit('update:address', { ...props.address, country: countries.value[0].code })
    }
  },
  { immediate: true },
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

  &--vertical &__row {
    flex-direction: column;
  }

  > *:not(:last-child) {
    margin-bottom: 1em;
  }

  &__info {
    font-size: rem(12);
  }
  &__info-star {
    color: var(--error-color);
  }
}
</style>
