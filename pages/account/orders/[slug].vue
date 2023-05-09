<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <LayoutAccount v-if="order" class="account-order">
      <template #header>
        {{ t('title') }}
      </template>
      <template #text>
        <AccountOrderDetailsHeader
          :code="order.code"
          :color="order.status.color"
          :created-at="order.created_at"
          :name="order.status.name"
        />
      </template>
      <AccountOrderFullDetailsCard class="account-order__content" :order="order" />
    </LayoutAccount>
    <LayoutInfoBox v-else type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </NuxtLayout>
</template>
<i18n lang="json">
{
  "pl": {
    "title": "Szczegóły Zamówienia",
    "orders": "Zamówienia",
    "route": "Zamówienie nr ",
    "orderNumber": "Numer Zamówienia:",
    "orderCreatingDate": "Data złożenia"
  }
}
</i18n>
<script setup lang="ts">
const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })
const heseya = useHeseya()
const formatError = useErrorMessage()
const route = useRoute()

const orderNumber = ref<string>(route.params.slug as string)

useSeoMeta({
  title: () => t('title'),
})

const errorMessage = ref('')

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('orders'), link: '/account/orders' },
  { label: `${t('route')}${orderNumber.value}`, link: `/account/orders/${orderNumber.value}` },
])

const { data: order } = useAsyncData(`account/orders/${orderNumber}`, async () => {
  try {
    return await heseya.UserProfile.Orders.getOneByCode(orderNumber.value)
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>
