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
  }
}
</i18n>
<script setup lang="ts">
const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const route = useRoute()

const orderNumber = ref<string>(route.params.slug as string)

definePageMeta({
  middleware: 'auth',
})

useSeoMeta({
  title: () => $t('orders.details'),
})

const errorMessage = ref('')

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('orders.title'), link: '/account/orders' },
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
