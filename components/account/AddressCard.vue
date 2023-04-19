<template>
  <div
    class="address-cart"
    :class="{
      'address-cart--selected': isSelected,
    }"
  >
    <div class="address-cart__select" />
    <div>
      <p :class="{ 'address-cart__header': !userAddress.address.vat }">
        {{ userAddress.address.name }}
      </p>
      <p v-if="userAddress.address.vat">{{ t('companyTaxId') }} {{ userAddress.address.vat }}</p>
      <p>{{ userAddress.address.phone }}</p>
    </div>
    <div>
      <p>{{ userAddress.address.address }}</p>
      <p>{{ userAddress.address.zip }} {{ userAddress.address.city }}</p>
    </div>
    <div class="address-cart__actions">
      <LayoutIcon class="address-cart__icon" :icon="Trash" @click="editAddress" />
      <LayoutIcon class="address-cart__icon" :icon="PencilLine" @click="deleteAddress" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "companyTaxId": "NIP"
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()

const props = defineProps<{
  userAddress: UserSavedAddress
  isSelected: boolean
}>()

const editAddress = () => {
  // TODO add logic
  console.log(props.userAddress)
}
const deleteAddress = () => {
  // TODO add logic
  console.log(props.userAddress)
}
</script>

<style lang="scss" scoped>
.address-cart {
  display: grid;
  position: relative;
  align-content: space-between;
  gap: 15px;
  padding: 10px 10px 10px 36px;
  border: 1px solid $gray-color-300;

  &__header {
    font-weight: 600;
  }

  &:hover {
    background-color: $gray-color-100;
    cursor: pointer;
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

  &__actions {
    display: flex;
    gap: 5px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__icon {
    color: $blue-color;

    &:hover {
      opacity: 0.7;
    }
  }

  &--selected > &__select {
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
</style>
