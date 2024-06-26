<template>
  <div class="address-list">
    <div class="address-list__container">
      <AddressCard
        v-for="userAddress in addresses"
        :key="userAddress.id"
        :value="userAddress"
        :selected="userAddress?.id === value?.id"
        :type="type"
        :disabled="!allowedAddresses.includes(userAddress.id)"
        @update:selected="(v) => (selectedAddress = v)"
      />
    </div>
    <LayoutButton
      class="address-list__button"
      :label="t(`${type}.button`)"
      @click="isAddAddressModalVisible = true"
    />
    <LazyAddressFormModal
      v-model:open="isAddAddressModalVisible"
      :type="type"
      :success-update-message="t(`${type}.sucessUpdate`)"
      :header="t(`${type}.header`)"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "billing": {
      "header": "Dodawanie danych rachunku",
      "button": "+ Dodaj dane",
      "sucessUpdate": "Pomyślnie dodano rachunek"
    },
    "shipping": {
      "header": "Dodawanie adresu dostawy",
      "button": "+ Dodaj adres",
      "sucessUpdate": "Pomyślnie dodano adres"
    }
  },
  "en": {
    "billing": {
      "header": "Adding billing address",
      "button": "+ Add data",
      "sucessUpdate": "Sucessfully added billing data"
    },
    "shipping": {
      "header": "Adding shipping address",
      "button": "+ Add address",
      "sucessUpdate": "Sucessfully added shipping address"
    }
  }
}
</i18n>

<script setup lang="ts">
import type { UserSavedAddress } from '@heseya/store-core'
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()

const props = defineProps<{
  value: UserSavedAddress | null
  type: 'billing' | 'shipping'
}>()

const checkout = useCheckoutStore()

const emit = defineEmits<{
  (e: 'update:value', value: UserSavedAddress | null): void
}>()

const { addresses } = useUserAddreses(props.type)

const allowedAddresses = computed(() => {
  return (
    addresses.value?.filter((c) => checkout.isCountryCodeAllowedInShipping(c.address.country)) ?? []
  ).map((a) => a.id)
})

const isAddAddressModalVisible = ref(false)

const selectedAddress = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value),
})
</script>

<style lang="scss" scoped>
.address-list {
  &__container {
    display: grid;
    gap: 10px;
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
    max-width: 660px;

    &:hover {
      background-color: $gray-color-400 !important;
    }
  }
}
</style>
