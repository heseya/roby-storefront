<template>
  <div class="addresses-content">
    <div class="addresses-content__container">
      <h1 class="addresses-content__header">{{ t('header') }}</h1>
      <AccountAddressList :address-list="deliveryAddresses" />
      <AccountAddressList :address-list="billingAddresses" :is-billing-address="true" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Moje Adresy",
    "header": "Adresy"
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'
const t = useLocalI18n()

useBreadcrumbs([
  { label: 'Moje konto', link: '/account' },
  { label: 'Adresy', link: '/addresses' },
])

const deliveryAddresses = ref<UserSavedAddress[]>([
  {
    id: '1',
    default: true,
    name: 'Pierwszy adres',
    address: {
      address: 'ul. Wrocławska 160/12',
      city: 'Warszawa',
      country: 'PL',
      country_name: 'Poland',
      name: 'Jan Kowalski',
      phone: '+48622790907',
      zip: '00-002',
    },
  },
  {
    id: '2',
    default: false,
    name: 'Drugi adres',
    address: {
      address: 'ul. Polna 10',
      city: 'Kraków',
      country: 'PL',
      country_name: 'Poland',
      name: 'Jan Kowalski',
      phone: '+48622790907',
      zip: '31-923',
    },
  },
])

const billingAddresses = ref<UserSavedAddress[]>([
  {
    id: '1',
    default: false,
    name: 'Pierwszy Adres',
    address: {
      address: 'ul. Wrocławska 160/12',
      city: 'Warszawa',
      country: 'PL',
      country_name: 'Poland',
      name: 'Przykładowa Firma',
      vat: '2293774000',
      phone: '+48228960722',
      zip: '00-002',
    },
  },
])
</script>

<style lang="scss" scoped>
.addresses-content {
  display: flex;
  justify-content: center;

  &__header {
    @media ($max-viewport-11) {
      font-size: 22px;
    }
  }

  &__container {
    display: grid;
    gap: 5px;

    @media ($viewport-11) {
      width: 35%;
      gap: 20px;
    }
  }
}
</style>
