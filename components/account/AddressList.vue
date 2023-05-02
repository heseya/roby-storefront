<template>
  <div>
    <div class="address-list">
      <div class="address-list__description">
        <h3>{{ isBillingAddress ? t('billingAddress.title') : t('deliveryAddress.title') }}</h3>
        <p>
          {{
            isBillingAddress ? t('billingAddress.description') : t('deliveryAddress.description')
          }}
        </p>
      </div>

      <div v-for="address in addressList" :key="address.id" @click="selectedAddress = address">
        <AccountAddressCard :user-address="address" :is-selected="selectedAddress === address" />
      </div>
    </div>
    <LayoutButton class="address-list__button">{{
      isBillingAddress ? t('billingAddress.addData') : t('deliveryAddress.addAddress')
    }}</LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "deliveryAddress": {
      "title": "Adresy dostawy",
      "description": "Zaznaczony adres jest domyślnym adresem dostawy.",
      "addAddress": "+ Dodaj adres"
    },
    "billingAddress": {
      "title": "Dane do rachunku",
      "description": "Zaznaczone dane są domyślnymi danymi do rachunku.",
      "addData": "+ Dodaj dane"
    }
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'

const t = useLocalI18n()

defineProps<{
  isBillingAddress?: boolean
  addressList: UserSavedAddress[]
}>()

const selectedAddress = ref({})
</script>

<style lang="scss" scoped>
.address-list {
  display: grid;
  gap: 10px;

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

  &__description {
    display: grid;
    gap: 5px;
  }
}
</style>
