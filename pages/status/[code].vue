<template>
  <div class="status-page">
    <h1 class="status-page__title">{{ t('title') }} {{ orderCode }}</h1>

    {{ order }}

    <LayoutButton v-if="isPayable" class="status-page__btn">Opłać zamówienie</LayoutButton>

    <NuxtLink class="status-page__link" to="/">
      <LayoutButton class="status-page__btn" :variant="isPayable ? 'gray' : 'primary'">
        Przejdź na stronę główną
      </LayoutButton>
    </NuxtLink>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Status zamówienia",
    "notFoundError": "Zamówienie o tym numerze nie istnieje"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const route = useRoute()

const orderCode = computed(() => route.params.code as string)

const { data: order } = useAsyncData(`order-summary-${orderCode}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(orderCode.value)
    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: t('notFoundError'), statusCode: code })
  }
})

const isPayable = computed(() => order.value?.payable || false)

definePageMeta({
  layout: 'checkout',
})
useHead({
  title: t('title'),
})
</script>

<style lang="scss" scoped>
.status-page {
  max-width: 400px;
  width: 100%;
  padding: 24px;
  background-color: #fff;
  margin-top: 40px;

  &__title {
    font-size: rem(20);
  }

  &__link {
    display: block;
    width: 100%;
  }

  &__btn {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
