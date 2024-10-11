<template>
  <NuxtLayout name="checkout">
    <div class="status-page">
      <StatusPaymentMethods :code="orderCode" class="status-page__payment" />

      <NuxtLink class="status-page__link" :to="localePath('/')">
        <LayoutButton class="status-page__btn" variant="gray">
          {{ $t('nav.goToMainPage') }}
        </LayoutButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()
const route = useRoute()
const localePath = useLocalePath()

const orderCode = computed(() => route.params.code as string)

useAsyncData(`order-summary-${orderCode}`, async () => {
  try {
    const heseya = useHeseya()
    const order = await heseya.Orders.getOneByCode(orderCode.value)

    if (order.paid || !order.payable)
      navigateTo(localePath(`/status/${orderCode.value}`), { replace: true })

    return order
  } catch (e: any) {
    const code = e?.response?.status
    showError({ message: $t('errors.ORDER_WITH_THIS_NUMBER_DOESNT_EXIST'), statusCode: code })
  }
})

useSeoTitle($t('payments.payForOrder'))
</script>

<style lang="scss" scoped>
.status-page {
  max-width: 400px;
  width: 100%;
  padding: 24px;
  margin: 0 8px;
  background-color: #fff;
  margin-top: 40px;

  &__field {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

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

  &__payment {
    margin-top: 16px;
  }

  &__payment-methods {
    margin: 8px 0;
  }
}
</style>
