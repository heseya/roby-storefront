<template>
  <div class="addresses-content">
    <div class="addresses-content__container">
      <h1 ckass->{{ t('header') }}</h1>
      <div>
        <div class="addresses-content__address">
          <div>
            <h4>{{ t('deliveryAddresses.title') }}</h4>
            <p>{{ t('deliveryAddresses.description') }}</p>
          </div>

          <div
            v-for="address in deliveryAddresses"
            :key="address.id"
            class="addresses-content__box"
            :class="{
              'addresses-content__box--selected': selectedDeliveryAddresses === address,
            }"
            @click="selectedDeliveryAddresses = address"
          >
            <div class="addresses-content__select"></div>
            <div>
              <h4>{{ address.name }}</h4>
              <p>{{ address.phone }}</p>
            </div>
            <div>
              <p>{{ address.street }}</p>
              <p>{{ address.postCode }} {{ address.city }}</p>
            </div>
            <div class="addresses-content__icons">
              <Trash class="addresses-content__icons--icon" />
              <PencilLine class="addresses-content__icons--icon" />
            </div>
          </div>
        </div>
        <LayoutButton class="addresses-content__button">{{
          t('deliveryAddresses.addAddress')
        }}</LayoutButton>
      </div>
      <div>
        <div class="addresses-content__address">
          <div>
            <h4>{{ t('billingAddresses.title') }}</h4>
            <p>{{ t('billingAddresses.description') }}</p>
          </div>

          <div
            v-for="address in billingAddresses"
            :key="address.id"
            class="addresses-content__box"
            :class="{
              'addresses-content__box--selected': selectedBillingAddresses === address,
            }"
            @click="selectedBillingAddresses = address"
          >
            <div class="addresses-content__select"></div>
            <div>
              <h4>{{ address.name }}</h4>
              <p>{{ address.phone }}</p>
            </div>
            <div>
              <p>{{ address.street }}</p>
              <p>{{ address.postCode }} {{ address.city }}</p>
            </div>
            <div class="addresses-content__icons">
              <Trash class="addresses-content__icons--icon" />
              <PencilLine class="addresses-content__icons--icon" />
            </div>
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
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()

useBreadcrumbs([
  { label: 'Moje konto', link: '/account' },
  { label: 'Adresy', link: '/addresses' },
])

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
    nip: '2293774000',
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

  &__container {
    display: grid;
    gap: 20px;
    width: 35%;
  }

  &__address {
    display: grid;
    gap: 10px;
    margin-top: 15px;
  }

  &__box {
    display: grid;
    position: relative;
    align-content: space-between;
    gap: 15px;
    padding: 10px 10px 10px 36px;
    border: 1px solid $gray-color-300;

    &:hover {
      background-color: $gray-color-100;
      cursor: pointer;
    }

    &--selected > .addresses-content__select {
      border: 1px solid $secondary-color-alt;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: $secondary-color-alt;
      }
    }
  }

  &__select {
    position: absolute;
    top: 15px;
    left: 12px;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
    border: 1px solid $gray-color-400;
    border-radius: 50%;
    background-color: $white-color;
  }

  &__icons {
    display: flex;
    gap: 5px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    &--icon {
      height: 16px;
      width: 16px;
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
