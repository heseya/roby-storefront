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

      <LayoutButton variant="gray" @click="isPaczkomatModalOpen = true">
        {{ t('button') }}
      </LayoutButton>
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
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    font-size: rem(12);
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__phone-input {
    max-width: 300px;
  }
}
</style>
