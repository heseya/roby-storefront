<template>
  <div
    class="address-card"
    :class="{
      'address-card--selected': isSelected,
    }"
    @click="emit('update:default', address)"
  >
    <div class="address-card__select" />
    <div>
      <p :class="{ 'address-card__header': !address.address.vat }">
        {{ address.name }}
      </p>
      <p>{{ address.address.name }}</p>
      <p v-if="address.address.vat">{{ t('vatNumber') }} {{ address.address.vat }}</p>
      <p>{{ address.address.phone }}</p>
    </div>
    <div>
      <p>{{ address.address.address }}</p>
      <p>{{ address.address.zip }} {{ address.address.city }}</p>
    </div>
    <div class="address-card__actions">
      <LayoutIcon
        class="address-card__icon"
        :size="14"
        :icon="Trash"
        @click.stop="isDeleteAddressModalVisible = true"
      />
      <LayoutIcon
        class="address-card__icon"
        :size="14"
        :icon="PencilLine"
        @click.stop="isEditAddressModalVisible = true"
      />
    </div>
  </div>
  <AddressModal
    v-if="isEditAddressModalVisible"
    v-model:open="isEditAddressModalVisible"
    :address="address"
    type="edit"
    :address-type="type"
  />
  <AddressModal
    v-if="isDeleteAddressModalVisible"
    v-model:open="isDeleteAddressModalVisible"
    :address="address"
    type="delete"
    :address-type="type"
  />
</template>

<i18n lang="json">
{
  "pl": {
    "vatNumber": "NIP"
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()

defineProps<{
  isSelected: boolean
  address: UserSavedAddress
  type: 'billing' | 'shipping'
}>()

const emit = defineEmits<{
  (e: 'update:default', value: UserSavedAddress): void
}>()

const isEditAddressModalVisible = ref(false)
const isDeleteAddressModalVisible = ref(false)
</script>

<style lang="scss" scoped>
.address-card {
  display: grid;
  position: relative;
  align-content: space-between;
  gap: 26px;
  padding: 10px 0px 10px 46px;
  border: 1px solid $gray-color-300;
  max-width: 660px;

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
