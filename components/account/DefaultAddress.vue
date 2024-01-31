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
      "sucessUpdate": "Zmieniono domyślny adres dostawy",
      "failedUpdate": "Nie udało się zmienić domyślnego adresu"
    },
    "billing": {
      "title": "Dane do rachunku",
      "description": "Zaznaczone dane są domyślnymi danymi do rachunku.",
      "sucessUpdate": "Zmieniono domyślne dane do rachunku",
      "failedUpdate": "Nie udało się zmienić domyślnego rachunku"
    }
  },
  "en": {
    "shipping": {
      "title": "Delivery address",
      "description": "The selected address is the default delivery address.",
      "sucessUpdate": "The default delivery address has been changed",
      "failedUpdate": "Failed to change the default delivery address"
    },
    "billing": {
      "title": "Billing data",
      "description": "The selected data are the default billing data.",
      "sucessUpdate": "The default billing data have been changed",
      "failedUpdate": "Failed to change default billing data"
    }
  }
}
</i18n>

<script setup lang="ts">
import type { UserSavedAddress } from '@heseya/store-core'

const t = useLocalI18n()
const { notify } = useNotify()
const props = defineProps<{
  type: 'billing' | 'shipping'
}>()

const { defaultAddress, edit } = useUserAddreses(props.type)

const updateDefaultAddress = async (value: UserSavedAddress | null) => {
  if (value && value !== defaultAddress.value) {
    const { success } = await edit(value.id, { ...value, default: true })

    notify({
      title: success ? t(`${props.type}.sucessUpdate`) : t(`${props.type}.failedUpdate`),
      type: success ? 'success' : 'failed',
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
