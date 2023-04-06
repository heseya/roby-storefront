<template>
  <LayoutModal v-model:open="isModalVisible" :closeable="false" :box="true">
    <div class="login-block">
      <AuthLogin class="login-content__login" :is-form-in-modal="true" />
      <div class="spacer" />

      <div class="login-block__guest">
        <div class="login-block__continue">
          <h2 class="login-block__header">{{ t('block.continueWithoutLogin') }}</h2>
          <div class="login-block__descrpition">{{ t('block.description') }}</div>
          <NuxtLink to="/checkout">
            <LayoutButton class="login-block__btn" :label="t('block.continueAsGuest')" />
          </NuxtLink>
        </div>

        <div class="login-block__register">
          <div class="spacer" />
          <div>
            <h2 class="login-block__header">{{ t('block.noAccount') }}</h2>
            <NuxtLink to="/register">
              <LayoutButton class="login-block__register-btn" :label="t('block.register')" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </LayoutModal>
</template>

<i18n lang="json">
{
  "pl": {
    "block": {
      "continueWithoutLogin": "Kontynuuj bez logowania",
      "continueAsGuest": "Kontynuuj jako gość",
      "description": "Możesz zrobić zakupy jako gość. Wymagane są tylko dane niezbędne do realizacji zamówienia.",
      "noAccount": "Nie masz konta?",
      "register": "Zarejestruj się"
    }
  }
}
</i18n>

<script setup lang="ts">
definePageMeta({ layout: 'empty' })

const t = useLocalI18n()

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  },
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/spacer';
.login-block {
  display: grid;
  gap: 15px;
  padding: 25px 17px 15px 17px;

  @media ($viewport-7) {
    grid-template-columns: 1fr 0.1fr 1fr;
    gap: 40px;
    background-color: $gray-color-100;
  }

  &__guest {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    font-size: 20px;
    font-weight: 700;
  }

  &__btn,
  &__register-btn {
    padding: 11px 0px;
    width: 100%;
  }

  &__register-btn {
    background-color: $gray-color-300;
    color: black;
    font-weight: 500;
    margin-top: 10px;
  }

  &__continue,
  &__register {
    display: grid;
    gap: 25px;
  }
}
</style>
