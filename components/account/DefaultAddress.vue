<template>
  <div class="account-default-address">
    <div>
      <div class="account-default-address__title">{{ t(`${type}.title`) }}</div>
      <div>{{ t(`${type}.description`) }}</div>
    </div>

    <AddressList :value="defaultAddress" :type="type" @update:value="updateDefaultAddress" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "shipping": {
      "title": "Adresy dostawy",
      "description": "Zaznaczony adres jest domyślnym adresem dostawy.",
      "sucessUpdate": "Zmieniono domyślny adres dostawy"
    },
    "billing": {
      "title": "Dane do rachunku",
      "description": "Zaznaczone dane są domyślnymi danymi do rachunku.",
      "sucessUpdate": "Zmieniono domyślne dane do rachunku"
    }
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'

const t = useLocalI18n()
const { notify } = useNotify()
const props = defineProps<{
  type: 'billing' | 'shipping'
}>()

const { defaultAddress, edit } = computed(() => {
  return props.type === 'billing' ? useUserBillingAddresses() : useUserShippingAddresses()
}).value

const updateDefaultAddress = (value: UserSavedAddress | null) => {
  if (value && value !== defaultAddress.value) {
    value.default = true
    edit(value.id, value)

    notify({
      title: t(`${props.type}.sucessUpdate`),
      type: 'success',
    })
  }
}
</script>

<style lang="scss" scoped>
.account-default-address {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;

  &__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }
}
</style>
