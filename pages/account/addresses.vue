<template>
  <LayoutAccount class="account-addresses">
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <template #header>
      {{ t('title') }}
    </template>
    <div class="account-addresses__container">
      <AccountAddressList :address-list="deliveryAddresses" />
      <AccountAddressList :address-list="billingAddresses" :is-billing-address="true" />
    </div>
  </LayoutAccount>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adresy"
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'
const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })

useHead({
  title: t('title'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/addresses' },
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
.account-addresses {
  &__container {
    display: grid;
    gap: 30px;
  }
}
</style>
