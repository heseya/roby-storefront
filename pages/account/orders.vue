<template>
  <div v-if="orders">
    <LayoutAccountNav class="account-orders">
      {{ orders.pagination }}
      <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
      <template #header>
        <h1 class="account-orders__header">{{ t('title') }}</h1>
        <div class="account-orders__content">
          <AccountOrderCard v-for="order in orders.data" :key="order.id" :code="order.code" />
        </div>
      </template>
    </LayoutAccountNav>
    <Pagination
      v-if="orders.data.length > 0"
      :current="orders.pagination.currentPage"
      :total="orders.pagination.total"
      @go="changePage"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Zamówienia"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const formatError = useErrorMessage()
const heseya = useHeseya()
const { t: $t } = useI18n({ useScope: 'global' })

useHead({
  title: t('title'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/orders' },
])

const errorMessage = ref('')

const { data: orders } = useAsyncData(`userOrders`, async () => {
  try {
    const { data, pagination } = await heseya.UserProfile.Orders.get()
    return { data, pagination }
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>

<style lang="scss" scoped>
.account-orders {
  &__header {
    font-size: 26px;
    margin-top: 15px;
    margin-bottom: 12px;
  }

  &__content {
    display: grid;
    gap: 12px;
  }
}
</style>
