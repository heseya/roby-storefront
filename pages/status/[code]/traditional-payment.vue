<template>
  <NuxtLayout name="checkout">
    <div class="checkout-container">
      <CheckoutTraditionalPaymentDetails :code="orderCode" />
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Przelew tradycyjny",
    "alreadyPaid": "Zamówienie zostało już opłacone",
    "notFoundError": "Nie znaleziono zamówienia o podanym kodzie"
  }
}
</i18n>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { notify } = useNotify()

const t = useLocalI18n()

const orderCode = computed(() => route.params.code as string)

useAsyncData(`order-summary-${orderCode}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(orderCode.value)

    if (order.paid) {
      notify({ type: 'success', text: t('alreadyPaid') })
      router.push(`/status/${orderCode.value}`)
    }

    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: t('notFoundError'), statusCode: code })
  }
})

useSeoMeta({
  title: () => t('title'),
})
</script>

<style lang="scss" scoped>
.checkout-container {
  display: grid;
  align-content: center;
  gap: 30px;
  padding: 10px;
  background-color: $white-color;
  width: 95%;

  @media ($viewport-7) {
    width: 50%;
    gap: 20px;
    align-content: flex-start;
  }

  @media ($viewport-13) {
    width: 41%;
  }
}
</style>
