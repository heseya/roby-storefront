<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-addresses">
      <template #header>
        {{ t('title') }}
      </template>
      <div class="account-addresses__container">
        <div class="account-addresses__list">
          <div class="account-addresses__header">{{ t('shippingAddress.title') }}</div>
          <div>{{ t('shippingAddress.description') }}</div>
          <AddressList
            v-model:value="defaultShippingAddress"
            type="shipping"
            @update:value="(value) => updateDefaultAddress(value, 'shipping')"
          />
        </div>
        <div class="account-addresses__list">
          <div class="account-addresses__header">{{ t('billingAddress.title') }}</div>
          <div>{{ t('billingAddress.description') }}</div>
          <AddressList
            type="billing"
            :value="defaultBillingAddress"
            @update:value="(value) => updateDefaultAddress(value, 'billing')"
          />
        </div>
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adresy",
    "shippingAddress": {
      "title": "Adresy dostawy",
      "description": "Zaznaczony adres jest domyślnym adresem dostawy."
    },
    "billingAddress": {
      "title": "Dane do rachunku",
      "description": "Zaznaczone dane są domyślnymi danymi do rachunku."
    }
  }
}
</i18n>

<script setup lang="ts">
import { UserSavedAddress } from '@heseya/store-core'
import { useAuthMiddleware } from '~/composables/useAuthMiddleware'

useAuthMiddleware()
const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: () => t('title'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/account/addresses' },
])

const { defaultAddress: defaultShippingAddress, edit: editShippingAddress } =
  useUserShippingAddresses()
const { defaultAddress: defaultBillingAddress, edit: editBillingAddress } =
  useUserBillingAddresses()

const updateDefaultAddress = (value: UserSavedAddress | null, type: 'billing' | 'shipping') => {
  if (value) {
    value.default = true
    type === 'billing' ? editBillingAddress(value.id, value) : editShippingAddress(value.id, value)
  }
}
</script>

<style lang="scss" scoped>
.account-addresses {
  &__container {
    display: grid;
    gap: 30px;
    margin-top: 18px;
  }

  &__list {
    display: grid;
    gap: 4px;
  }

  &__header {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
