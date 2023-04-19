<template>
  <div class="paczkomat-select">
    <div v-if="checkout.paczkomat" class="paczkomat-select__selected">
      <b>{{ checkout.paczkomat.name }} </b>
      <span>{{ checkout.paczkomat.address.line1 }}</span>
      <span>{{ checkout.paczkomat.address.line2 }}</span>
      <i v-if="checkout.paczkomat.location_description">
        {{ checkout.paczkomat.location_description }}
      </i>
    </div>

    <LayoutButton variant="gray" @click="isPaczkomatModalOpen = true">
      Wybierz paczkomat
    </LayoutButton>

    <LayoutModal v-model:open="isPaczkomatModalOpen">
      <CheckoutInpostMap v-if="isPaczkomatModalOpen" @select="selectPaczkomat" />
    </LayoutModal>
  </div>
</template>

<script setup lang="ts">
import { Paczkomat } from '~/interfaces/Paczkomat'
import { useCheckoutStore } from '~/store/checkout'

const checkout = useCheckoutStore()
const isPaczkomatModalOpen = ref(false)

const selectPaczkomat = (machine: Paczkomat) => {
  isPaczkomatModalOpen.value = false
  checkout.paczkomat = machine
}
</script>

<style lang="scss" scoped>
.paczkomat-select {
  padding: 16px 0;
  display: flex;
  align-items: center;

  &__selected {
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    font-size: rem(12);
  }
}
</style>
