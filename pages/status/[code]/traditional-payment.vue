<template>
  <div class="checkout-container">
    <CheckoutTraditionalPaymentDetails :code="orderCode" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "alreadyPaid": "Zamówienie zostało już opłacone",
    "notFoundError": "Nie znaleziono zamówienia o podanym kodzie"
  }
}
</i18n>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})

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

useHead({
  title: t('container.header'),
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
