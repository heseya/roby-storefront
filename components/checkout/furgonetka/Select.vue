<template>
  <div class="pickup-select">
    <div v-if="checkout.furgonetka">
      <div class="pickup-select__row">
        <div class="pickup-select__selected">
          <b>{{ checkout.furgonetka.code }} </b>
          <span>{{ checkout.furgonetka.name }}</span>
        </div>

        <LayoutIconButton
          class="pickup-select__edit"
          :icon="EditIcon"
          :icon-size="14"
          :title="t('change', { provider: provider.toUpperCase() })"
          @click="isFurgonetkaModalOpen = true"
        />
      </div>
      <FormInput
        v-model:model-value="checkout.shippingAddress.phone"
        name="phone"
        html-type="phone"
        rules="required|phone"
        class="pickup-select__phone-input"
        :label="t('phone')"
      />
    </div>

    <LayoutButton
      v-else
      variant="gray"
      :label="t('button', { provider: provider.toUpperCase() })"
      @click="isFurgonetkaModalOpen = true"
    />

    <CheckoutFurgonetkaMap
      v-if="isFurgonetkaModalOpen"
      :provider="provider"
      @select="selectPickup"
      @close="closeMap"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "button": "Wybierz punkt {provider} Pickup",
    "phone": "Numer telefonu odbiorcy",
    "change": "Wybierz punkt {provider} Pickup"
  },
  "en": {
    "button": "Choose point {provider} Pickup",
    "phone": "Recipient's phone number",
    "change": "Choose point {provider} Pickup"
  }
}
</i18n>

<script setup lang="ts">
import type { Furgonetka } from '~/interfaces/Furgonetka'
import { useCheckoutStore } from '~/store/checkout'
import EditIcon from '@/assets/icons/pencil-line-filled.svg?component'

defineProps<{
  provider: 'dhl' | 'dpd'
}>()

const t = useLocalI18n()
const checkout = useCheckoutStore()
const isFurgonetkaModalOpen = ref(false)
const user = useUser()

const selectPickup = (point: Furgonetka) => {
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
.pickup-select {
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
