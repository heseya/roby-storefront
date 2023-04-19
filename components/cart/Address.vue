<template>
  <div
    class="address-cart"
    :class="{
      'address-cart--selected': isSelected,
    }"
  >
    <div class="address-cart__select" />
    <div>
      <p :class="{ 'address-cart__header': !address.nip }">{{ address.name }}</p>
      <p v-if="address.nip">NIP {{ address.nip }}</p>
      <p>{{ address.phone }}</p>
    </div>
    <div>
      <p>{{ address.street }}</p>
      <p>{{ address.postCode }} {{ address.city }}</p>
    </div>
    <div class="address-cart__actions">
      <LayoutIcon class="address-cart__icon" :icon="Trash" />
      <LayoutIcon class="address-cart__icon" :icon="PencilLine" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

interface Address {
  id: number
  name: string
  phone: string
  street: string
  postCode: string
  city: string
  nip?: number
}

defineProps<{
  address: Address
  isSelected: boolean
}>()
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

  &--selected > .address-cart__select {
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
