<template>
  <div
    class="address-card"
    :class="{
      'address-card--selected': selected,
      'address-card--disabled': disabled,
    }"
    @click="!disabled && emit('update:selected', value)"
  >
    <div class="address-card__select" />
    <div>
      <b :class="{ 'address-card__header': !value.address.vat }">{{ value.name }}</b>
      <p>{{ value.address.name }}</p>
      <p v-if="value.address.vat">{{ $t('form.vat') }} {{ value.address.vat }}</p>
      <p>{{ value.address.phone }}</p>
    </div>
    <div>
      <p>{{ value.address.address }}</p>
      <p>{{ value.address.zip }} {{ value.address.city }}</p>
      <p>{{ value.address.country_name }}</p>
    </div>
    <div class="address-card__actions">
      <LayoutIcon
        class="address-card__icon"
        :size="14"
        :icon="Trash"
        @click.stop="openDeleteAddressModal"
      />
      <LayoutIcon
        class="address-card__icon"
        :size="14"
        :icon="PencilLine"
        @click.stop="isEditAddressModalVisible = true"
      />
    </div>
  </div>
  <LazyAddressFormModal
    v-model:open="isEditAddressModalVisible"
    :address="value"
    :type="type"
    :success-update-message="t(`${type}.sucessUpdate`)"
    :header="t(`${type}.header`)"
  />
  <LazyAddressDeleteModal
    v-model:open="isDeleteAddressModalVisible"
    :address="value"
    :type="type"
  />
</template>

<i18n lang="json">
{
  "pl": {
    "billing": {
      "header": "Edytowanie danych rachunku",
      "sucessUpdate": "Pomyślnie edytowano dane rachunku",
      "default": "Nie można usunąć domyślnego rachunku"
    },
    "shipping": {
      "header": "Edytowanie adresu",
      "sucessUpdate": "Pomyślnie edytowano adres",
      "default": "Nie można usunąć domyślnego adresu"
    }
  },
  "en": {
    "billing": {
      "header": "Edit billing data",
      "sucessUpdate": "You have successfully edited your billing data",
      "default": "The default billing data cannot be deleted"
    },
    "shipping": {
      "header": "Edit shipping address",
      "sucessUpdate": "You have successfully edited your shipping address",
      "default": "The default shipping address cannot be deleted"
    }
  }
}
</i18n>

<script setup lang="ts">
import type { UserSavedAddress } from '@heseya/store-core'
import Trash from '@/assets/icons/trash.svg?component'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const { notify } = useNotify()
const t = useLocalI18n()

const props = defineProps<{
  selected: boolean
  value: UserSavedAddress
  type: 'billing' | 'shipping'
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: UserSavedAddress): void
}>()

const isEditAddressModalVisible = ref(false)
const isDeleteAddressModalVisible = ref(false)

const openDeleteAddressModal = () => {
  if (props.value.default) {
    notify({
      title: t(`${props.type}.default`),
      type: 'error',
    })
  } else {
    isDeleteAddressModalVisible.value = true
  }
}
</script>

<style lang="scss" scoped>
.address-card {
  display: grid;
  position: relative;
  align-content: space-between;
  gap: 8px;
  padding: 10px 0px 10px 46px;
  border: 1px solid $gray-color-300;
  max-width: 660px;
  background-color: $white-color;
  transition: 0.3s;
  cursor: pointer;

  &--disabled {
    background-color: $gray-color-300;
    cursor: not-allowed;

    &:hover {
      background-color: $gray-color-300;
    }
  }

  &__header {
    font-weight: 600;
  }

  &:hover {
    background-color: $gray-color-050;
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
    color: $blue-color-500;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &--selected > &__select {
    border: 1px solid var(--primary-color-alt);

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--primary-color-alt);
    }
  }
}
</style>
