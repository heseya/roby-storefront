<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <LayoutAccount v-if="order" class="account-order">
      <template #header>
        {{ $t('orders.details') }}
      </template>
      <template #text>
        <AccountOrderCardHeader
          :code="order.code"
          :color="order.status.color"
          :created-at="order.created_at"
          :name="order.status.name"
        />
      </template>
      <AccountOrderView class="account-order__content" :order="order" />
    </LayoutAccount>
    <LayoutInfoBox v-else type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </NuxtLayout>
</template>
<i18n lang="json">
{
  "pl": {
    "route": "Zamówienie nr "
  },
  "en": {
    "route": "Order number "
  }
}
</i18n>
<script setup lang="ts">
const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const route = useRoute()

const orderCode = ref<string>(route.params.code as string)

definePageMeta({
  middleware: 'auth',
})

useSeoTitle(`${$t('orders.details')} ${route.params.code}`)

const errorMessage = ref('')
const { isModeB2B } = useSiteMode()
const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('orders.title'), link: '/account/orders' },
  { label: `${t('route')}${orderCode.value}`, link: `/account/orders/${orderCode.value}` },
])

const { data: order } = useAsyncData(`account/orders/${orderCode.value}`, async () => {
  try {
    return isModeB2B.value
      ? await heseya.UserProfile.My.Organization.Orders.getOneByCode(orderCode.value)
      : await heseya.UserProfile.My.Orders.getOneByCode(orderCode.value)
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>
