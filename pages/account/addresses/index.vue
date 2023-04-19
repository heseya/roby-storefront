import { Address } from "@heseya/store-core"

<template>
  <div class="addresses-content">
    <div class="addresses-content__container">
      <h1 class="addresses-content__header">{{ t('header') }}</h1>
      <div>
        <div class="addresses-content__box">
          <div class="addresses-content__description">
            <h3>{{ t('deliveryAddresses.title') }}</h3>
            <p>{{ t('deliveryAddresses.description') }}</p>
          </div>

          <div
            v-for="address in deliveryAddresses"
            :key="address.id"
            @click="selectedDeliveryAddresses = address"
          >
            <CartAddress :address="address" :is-selected="selectedDeliveryAddresses === address" />
          </div>
        </div>
        <LayoutButton class="addresses-content__button">{{
          t('deliveryAddresses.addAddress')
        }}</LayoutButton>
      </div>
      <div>
        <div class="addresses-content__box">
          <div>
            <h4>{{ t('billingAddresses.title') }}</h4>
            <p>{{ t('billingAddresses.description') }}</p>
          </div>

          <div
            v-for="address in billingAddresses"
            :key="address.id"
            @click="selectedBillingAddresses = address"
          >
            <CartAddress :address="address" :is-selected="address === selectedBillingAddresses" />
          </div>
        </div>
        <LayoutButton class="addresses-content__button">{{
          t('billingAddresses.addData')
        }}</LayoutButton>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Moje Adresy",
    "header": "Adresy",
    "deliveryAddresses": {
      "title": "Adresy dostawy",
      "description": "Zaznaczony adres jest domyślnym adresem dostawy.",
      "addAddress": "+ Dodaj adres"
    },
    "billingAddresses": {
      "title": "Dane do rachunku",
      "description": "Zaznaczone dane są domyślnymi danymi do rachunku.",
      "addData": "+ Dodaj dane"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

useBreadcrumbs([
  { label: 'Moje konto', link: '/account' },
  { label: 'Adresy', link: '/addresses' },
])

// TODO: add logic and real interfaces

const selectedDeliveryAddresses = ref({})
const selectedBillingAddresses = ref({})

const deliveryAddresses = ref([
  {
    id: 1,
    name: 'Jan Kowalski',
    phone: '+48622790907',
    street: 'ul. Wrocławska 160/12',
    postCode: '00-002',
    city: 'Warszawa',
  },
  {
    id: 2,
    name: 'Jan Kowalski',
    phone: '+48622790907',
    street: 'ul. Polna 10',
    postCode: '31-923',
    city: 'Kraków',
  },
])

const billingAddresses = ref([
  {
    id: 1,
    name: 'Przykładowa Firma',
    nip: 2293774000,
    phone: '+48228960722',
    street: 'ul. Wrocławska 160/12',
    postCode: '00-002',
    city: 'Warszawa',
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

  &__description {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 5px;
  }

  &__container {
    display: grid;
    gap: 5px;

    @media ($viewport-11) {
      width: 35%;
      gap: 20px;
    }
  }

  &__box {
    display: grid;
    gap: 10px;
    margin-top: 5px;

    @media ($viewport-11) {
      margin-top: 15px;
    }
  }

  &__button {
    border: none;
    background-color: $gray-color-300;
    color: $text-color;
    margin-top: 10px;
    height: 32px;
    width: 100%;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      background-color: $gray-color-400 !important;
    }
  }
}
</style>
