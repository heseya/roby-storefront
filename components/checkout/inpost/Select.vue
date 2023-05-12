<template>
  <div class="inpost-select">
    <div class="inpost-select__row">
      <div v-if="checkout.paczkomat" class="inpost-select__selected">
        <b>{{ checkout.paczkomat.name }} </b>
        <span>{{ checkout.paczkomat.address.line1 }}</span>
        <span>{{ checkout.paczkomat.address.line2 }}</span>
        <i v-if="checkout.paczkomat.location_description">
          {{ checkout.paczkomat.location_description }}
        </i>
      </div>

      <LayoutIconButton
        class="inpost-select__edit"
        :icon="EditIcon"
        :icon-size="14"
        @click="isPaczkomatModalOpen = true"
      />
    </div>

    <FormInput
      v-model:model-value="checkout.shippingAddress.phone"
      name="phone"
      html-type="phone"
      rules="required"
      class="inpost-select__phone-input"
      :label="t('phone')"
    />

    <LayoutModal v-model:open="isPaczkomatModalOpen">
      <CheckoutInpostMap v-if="isPaczkomatModalOpen" @select="selectPaczkomat" />
    </LayoutModal>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "button": "Wybierz paczkomat",
    "phone": "Number telefonu odbiorcy"
  }
}
</i18n>

<script setup lang="ts">
import { Paczkomat } from '~/interfaces/Paczkomat'
import { useCheckoutStore } from '~/store/checkout'
import EditIcon from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const isPaczkomatModalOpen = ref(false)

const selectPaczkomat = (machine: Paczkomat) => {
  isPaczkomatModalOpen.value = false
  checkout.paczkomat = machine
}
</script>

<style lang="scss" scoped>
.inpost-select {
  padding: 16px 0;

  &__selected {
    display: flex;
    flex-direction: column;
    font-size: rem(12);
  }

  &__row {
    max-width: 300px;
    margin-bottom: 12px;
    padding: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    border-radius: 4px;
    background-color: $unnamed-color-f4f8fc;
  }

  &__phone-input {
    max-width: 300px;
  }

  &__edit {
    color: $blue-color;
  }
}
</style>
