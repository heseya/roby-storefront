<template>
  <div class="inpost-select">
    <div v-if="checkout.paczkomat">
      <div class="inpost-select__row">
        <div class="inpost-select__selected">
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
          :title="t('change')"
          @click="isPaczkomatModalOpen = true"
        />
      </div>
      <FormInput
        v-model:model-value="checkout.shippingAddress.phone"
        name="phone"
        html-type="phone"
        rules="required|phone"
        class="inpost-select__phone-input"
        :label="t('phone')"
      />
    </div>

    <LayoutButton v-else variant="gray" :label="t('button')" @click="isPaczkomatModalOpen = true" />

    <LayoutModal v-model:open="isPaczkomatModalOpen">
      <CheckoutInpostMap v-if="isPaczkomatModalOpen" @select="selectPaczkomat" />
    </LayoutModal>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "button": "Wybierz paczkomat",
    "phone": "Numer telefonu odbiorcy",
    "change": "Wybierz paczkomat"
  },
  "en": {
    "button": "Choose parcel locker",
    "phone": "Recipient's phone number",
    "change": "Choose parcel locker"
  }
}
</i18n>

<script setup lang="ts">
import type { Paczkomat } from '~/interfaces/Paczkomat'
import { useCheckoutStore } from '~/store/checkout'
import EditIcon from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const isPaczkomatModalOpen = ref(false)
const user = useUser()

const selectPaczkomat = (machine: Paczkomat) => {
  isPaczkomatModalOpen.value = false
  checkout.paczkomat = machine

  if (user.value && user.value.phone) {
    checkout.shippingAddress.phone = user.value.phone || ''
  }
}
</script>

<style lang="scss" scoped>
.inpost-select {
  padding-top: 16px;

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
    background-color: $blue-color-100;
  }

  &__phone-input {
    max-width: 300px;
  }

  &__edit {
    color: $blue-color-500;
  }
}
</style>
