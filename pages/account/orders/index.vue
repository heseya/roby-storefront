<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount v-if="orders" class="account-orders">
      <template #header>
        {{ t('title') }}
      </template>
      <LayoutEmpty v-if="orders.data.length === 0" class="account-order-card__empty">
        {{ t('empty') }}
      </LayoutEmpty>

      <div v-else class="account-orders__content">
        <AccountOrderSimpleView v-for="order in orders.data" :key="order.id" :code="order.code" />
      </div>
      <Pagination
        v-if="orders.data.length > 0"
        :current="page"
        :total="lastPage"
        @go="changePage"
      />
    </LayoutAccount>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Zamówienia",
    "empty": "Nie masz żadnego zamówienia"
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

definePageMeta({
  middleware: 'auth',
})

const limit = 3
const page = computed(() => Number(route.query.page ?? 1))
const lastPage = computed(() => Math.ceil((orders.value?.pagination.total ?? 1) / limit))

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/account/orders' },
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
