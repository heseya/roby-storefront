<template>
  <div class="checkout-personal-data">
    <FormInput
      v-if="!isLogged"
      v-model="checkout.email"
      :label="t('email.label')"
      name="email"
      rules="email|required"
    />
    <div v-else class="checkout-personal-data__text">
      <span>{{ user?.name }}</span>
      <span>{{ user?.email }}</span>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "email": {
      "label": "Adres e-mail"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()

const isLogged = useIsLogged()
const user = useUser()

watch(
  () => user,
  () => {
    if (user) checkout.email = user.value?.email ?? ''
  },
  { immediate: true },
)

watch(
  () => user,
  () => {
    if (user) {
      // TODO: remove debug logs
      console.info('[Checkout] User is logged')
      console.info(`[Checkout] User has ${user.value?.billing_addresses?.length} billing addresses`)
      console.info(
        `[Checkout] User has ${user.value?.shipping_addresses?.length} shipping addresses`,
      )
    } else {
      console.info('[Checkout] User is not logged')
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.checkout-personal-data {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  @media ($viewport-6) {
    grid-template-columns: 1fr 1fr;
  }

  &__text {
    display: flex;
    flex-direction: column;
  }
}
</style>
