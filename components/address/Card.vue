<template>
  <div
    class="address-card"
    :class="{
      'address-card--selected': isSelected,
    }"
  >
    <div class="address-card__select" />
    <div>
      <p :class="{ 'address-card__header': !address.vat }">
        {{ address.name }}
      </p>
      <p v-if="address.vat">{{ t('vatNumber') }} {{ address.vat }}</p>
      <p>{{ address.phone }}</p>
    </div>
    <div>
      <p>{{ address.address }}</p>
      <p>{{ address.zip }} {{ address.city }}</p>
    </div>
    <div class="address-card__actions">
      <LayoutIcon class="address-card__icon" :size="14" :icon="Trash" @click="editAddress" />
      <LayoutIcon class="address-card__icon" :size="14" :icon="PencilLine" @click="deleteAddress" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "vatNumber": "NIP"
  }
}
</i18n>

<script setup lang="ts">
import { Address } from '@heseya/store-core'
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()

const props = defineProps<{
  isSelected: boolean
  address: Address
}>()

const editAddress = () => {
  // TODO add logic
  console.log(props.address)
}
const deleteAddress = () => {
  // TODO add logic
  console.log(props.address)
}
</script>

<style lang="scss" scoped>
.address-card {
  display: grid;
  position: relative;
  align-content: space-between;
  gap: 20px;
  padding: 10px 0px 10px 46px;
  border: 1px solid $gray-color-300;
  max-width: 660px;
  background-color: $white-color;
  transition: 0.3s;

  &__header {
    font-weight: 600;
  }

  &:hover {
    background-color: $gray-color-050;
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
    border: 1px solid $primary-color-alt;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: $primary-color-alt;
    }
  }
}
</style>
