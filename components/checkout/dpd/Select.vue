<template>
  <div class="dpd-select">
    <div v-if="checkout.furgonetka">
      <div class="dpd-select__row">
        <div class="dpd-select__selected">
          <b>{{ checkout.furgonetka.code }} </b>
          <span>{{ checkout.furgonetka.name }}</span>
        </div>

        <LayoutIconButton
          class="dpd-select__edit"
          :icon="EditIcon"
          :icon-size="14"
          :title="t('change')"
          @click="isFurgonetkaModalOpen = true"
        />
      </div>
      <FormInput
        v-model:model-value="checkout.shippingAddress.phone"
        name="phone"
        html-type="phone"
        rules="required|phone"
        class="dpd-select__phone-input"
        :label="t('phone')"
      />
    </div>

    <LayoutButton
      v-else
      variant="gray"
      :label="t('button')"
      @click="isFurgonetkaModalOpen = true"
    />

    <CheckoutDpdMap v-if="isFurgonetkaModalOpen" @select="selectDpdPickup" @close="closeMap" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "button": "Wybierz punkt DPD Pickup",
    "phone": "Numer telefonu odbiorcy",
    "change": "Wybierz punkt DPD Pickup"
  },
  "en": {
    "button": "Choose point DPD Pickup",
    "phone": "Recipient's phone number",
    "change": "Choose point DPD Pickup"
  }
}
</i18n>

<script setup lang="ts">
import { Furgonetka } from '~/interfaces/Furgonetka'
import { useCheckoutStore } from '~/store/checkout'
import EditIcon from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const isFurgonetkaModalOpen = ref(false)
const user = useUser()

const selectDpdPickup = (point: Furgonetka) => {
  isFurgonetkaModalOpen.value = false
  checkout.furgonetka = point

  if (user.value && user.value.phone) {
    checkout.shippingAddress.phone = user.value.phone || ''
  }
}

const closeMap = () => {
  isFurgonetkaModalOpen.value = false
}
</script>

<style lang="scss" scoped>
.dpd-select {
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
