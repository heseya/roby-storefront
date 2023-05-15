<template>
  <div class="address-list">
    <div class="address-list__container">
      <AddressCard
        v-for="userAddress in addresses"
        :key="userAddress.id"
        :address="userAddress"
        :selected="userAddress?.id === value?.id"
        :type="type"
        @update:selected="(v) => (selectedAddress = v)"
      />
    </div>
    <LayoutButton
      class="address-list__button"
      :label="t(`${type}`)"
      @click="isAddAddressModalVisible = true"
    />
    <AddressCreateAndEditModal
      v-model:open="isAddAddressModalVisible"
      type="create"
      :address-type="type"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "billing": "+ Dodaj dane",
    "shipping": "+ Dodaj adres"
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'

const t = useLocalI18n()

const props = defineProps<{
  value: UserSavedAddress | null
  type: 'billing' | 'shipping'
}>()

const isAddAddressModalVisible = ref(false)

const emit = defineEmits<{
  (e: 'update:value', value: UserSavedAddress | null): void
}>()

const { addresses } = useUserAddreses(props.type)

const selectedAddress = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  },
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
