<template>
  <div class="checkout-personal-data">
    <FormInput
      v-if="!isLogged"
      v-model="checkout.email"
      :label="$t('form.email')"
      name="email"
      rules="email|required"
    />
    <div v-else class="checkout-personal-data__text">
      <span>{{ user?.name }}</span>
      <span>{{ user?.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const { t: $t } = useI18n({ useScope: 'global' })
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
