<template>
  <LayoutModal v-model:open="isModalVisible" :closeable="false" :box="true">
    <div class="basket-authentication">
      <AuthLogin class="login-content__login" />
      <div class="basket-authentication__spacer" />

      <div class="basket-authentication__not-authorized">
        <div class="basket-authentication__guest">
          <h2 class="basket-authentication__header">Kontynuuj bez logowania</h2>
          <div class="basket-authentication__descrpition">
            Możesz zrobić zakupy jako gość. Wymagane są tylko dane niezbędne do realizacji
            zamówienia.
          </div>
          <NuxtLink to="/checkout">
            <LayoutButton class="basket-authentication__btn"> Kontynuuj jako gość </LayoutButton>
          </NuxtLink>
        </div>

        <div class="basket-authentication__guest">
          <div class="basket-authentication__spacer" />
          <div>
            <h2 class="basket-authentication__header">Nie masz konta?</h2>
            <NuxtLink to="/register">
              <LayoutButton class="basket-authentication__register-btn"
                >Zarejestruj się
              </LayoutButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </LayoutModal>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'empty' })
const props = defineProps<{
  modal: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modal', isModalVisible: boolean): void
}>()

const isModalVisible = computed({
  get() {
    return props.modal
  },
  set(value) {
    emit('update:modal', value)
  },
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/spacer';
.basket-authentication {
  display: grid;
  gap: 15px;
  padding: 25px 17px 25px 17px;

  @media ($viewport-7) {
    grid-template-columns: 1fr 0.1fr 1fr;
    gap: 40px;
    background-color: $gray-color-100;
  }

  &__authorized {
    display: grid;
  }

  &__not-authorized {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__options {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    font-size: 12px;

    &--checkbox {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    &--forgot {
      color: $blue-color;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__form {
    display: grid;
    gap: 15px;
    margin-top: 15px;

    &--text {
      font-size: 12px;
      font-weight: 600;
    }
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

  &__guest {
    display: grid;
    gap: 25px;
  }

  &__descrpition {
    font-size: 14px;
  }
}
</style>

function emit(arg0: string, arg1: boolean) { throw new Error("Function not implemented.") }
