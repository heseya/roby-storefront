<template>
  <LayoutSimpleDropdown title="Masz kod rabatowy?">
    <form class="cart-coupons" @submit.prevent="addCoupon">
      <LayoutLoading :active="isLoading" />

      <FormInput
        v-model="form.values.coupon"
        name="coupon"
        rules="required"
        :error-message="errorMessage"
      />
      <LayoutButton class="cart-coupons__btn" variant="gray" html-type="submit">
        Zastosuj
      </LayoutButton>
    </form>

    {{ cart.coupons }}
  </LayoutSimpleDropdown>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useCartStore } from '~/store/cart'

const heseya = useHeseya()
const formatError = useErrorMessage()
const cart = useCartStore()

const form = useForm({
  initialValues: {
    coupon: '',
  },
})

// Clear error message when user changes coupon
watch(
  () => form.values.coupon,
  () => {
    errorMessage.value = ''
  },
)

const errorMessage = ref('')
const isLoading = ref(false)

const addCoupon = form.handleSubmit(async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const coupon = await heseya.Coupons.getOneBySlug(form.values.coupon)
    cart.addCoupon(coupon)
    form.resetForm()
  } catch (e) {
    errorMessage.value = formatError(e)
  }
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.cart-coupons {
  padding-top: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  position: relative;

  &__btn {
    height: 43px;
  }
}
</style>
