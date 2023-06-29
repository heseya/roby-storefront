<template>
  <CheckoutPageArea :title="$t('account.myData')">
    <div class="checkout-personal-data__my-data">
      <FormInput
        v-if="!isLogged"
        v-model="email"
        :label="$t('form.email')"
        name="email"
        rules="email|required"
      />
      <div v-else class="checkout-personal-data__text">
        <span>{{ user?.name }}</span>
        <span>{{ user?.email }}</span>
      </div>
    </div>
    <slot></slot>
  </CheckoutPageArea>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()

const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  (event: 'update:email', value: string): void
}>()

const email = computed({
  get: () => props.email,
  set: (value) => emit('update:email', value),
})

const isLogged = useIsLogged()
const user = useUser()
</script>

<style lang="scss" scoped>
.checkout-personal-data {
  &__my-data {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__form {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
