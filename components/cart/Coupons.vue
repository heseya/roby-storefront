<template>
  <LayoutSimpleDropdown :title="t('coupons.title')">
    <form class="cart-coupons-form" @submit.prevent="addCoupon">
      <LayoutLoading :active="isLoading" />

      <FormInput
        v-model="form.values.coupon"
        name="coupon"
        rules="required"
        :error-message="errorMessage"
      />
      <LayoutButton class="cart-coupons-form__btn" variant="gray" html-type="submit">
        {{ t('coupons.add') }}
      </LayoutButton>
    </form>

    <div class="cart-coupons-list">
      <div v-for="coupon in cart.coupons" :key="coupon.id" class="cart-coupons-list__item">
        {{ coupon.code }}
        <LayoutIconButton
          class="cart-coupons-list__item-btn"
          :icon="CrossIcon"
          :icon-size="12"
          :title="t('coupons.remove')"
          @click="removeCoupon(coupon.id)"
        />
      </div>
    </div>
  </LayoutSimpleDropdown>
</template>

<i18n lang="json">
{
  "pl": {
    "coupons": {
      "title": "Masz kod rabatowy?",
      "add": "Zastosuj",
      "remove": "Usuń kod rabatowy",
      "errors": {
        "notFound": "Nie znaleziono kuponu",
        "alreadyAdded": "Ten kupon został już dodany"
      }
    }
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useCartStore } from '~/store/cart'

import CrossIcon from '@/assets/icons/cross.svg?component'

const t = useLocalI18n()

const heseya = useHeseya()
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
  if (cart.coupons.find((coupon) => coupon.code === form.values.coupon)) {
    errorMessage.value = t('coupons.errors.alreadyAdded')
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    const coupon = await heseya.Coupons.getOneBySlug(form.values.coupon)
    cart.addCoupon(coupon)

    form.resetForm()

    // Hack for clearing error messages
    setTimeout(() => {
      form.setErrors({
        coupon: '',
      })
    }, 0)
  } catch {
    errorMessage.value = t('coupons.errors.notFound')
  }
  isLoading.value = false
})

const removeCoupon = (id: string) => {
  cart.removeCoupon(id)
}
</script>

<style lang="scss" scoped>
.cart-coupons-form {
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

.cart-coupons-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: $white-color;
    border-radius: 4px;
  }
}
</style>
