<template>
  <div v-if="orders">
    <LayoutAccount class="account-orders">
      <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
      <template #header>
        {{ t('title') }}
      </template>
      <div class="account-orders__content">
        <AccountOrderCard v-for="order in orders.data" :key="order.id" :code="order.code" />
      </div>
      <Pagination
        v-if="orders.data.length > 0"
        :current="page"
        :total="lastPage"
        @go="changePage"
      />
    </LayoutAccount>
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
const router = useRouter()
const route = useRoute()
const heseya = useHeseya()
const { t: $t } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: () => t('title'),
})

const limit = 3
const page = computed(() => Number(route.query.page ?? 1))
const lastPage = computed(() => Math.ceil((orders.value?.pagination.total ?? 1) / limit))

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/orders' },
])

const errorMessage = ref('')

const { data: orders, refresh } = useAsyncData(`user-orders-${route.query.page || 1}`, async () => {
  try {
    const { data, pagination } = await heseya.UserProfile.Orders.get({
      limit,
      page: page.value,
    })
    return { data, pagination }
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})

const changePage = (page: number | string) => {
  router.push({
    name: route.name!,
    params: route.params,
    query: {
      ...route.query,
      page,
    },
  })
}

watch(
  () => route.query,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.account-orders {
  &__content {
    display: grid;
    gap: 12px;
    margin-bottom: 20px;
  }
}
</style>
