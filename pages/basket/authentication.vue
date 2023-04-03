<template>
  <div class="basket-authentication">
    <div class="basket-authentication__authorized">
      <h2 class="basket-authentication__header">Zaloguj się</h2>
      <div class="basket-authentication__form">
        <div>
          <span> Adres e-mail</span>
          <FormInput name="email" />
        </div>
        <div>
          <span>Hasło</span>
          <FormInput name="password" />
        </div>
      </div>
      <div class="basket-authentication__forgot">Nie pamiętasz hasła ?</div>
      <LayoutButton class="basket-authentication__btn">Zaloguj się</LayoutButton>
    </div>
    <div class="basket-authentication__spacer">
      <div class="basket-authentication__line"></div>
    </div>
    <div class="basket-authentication__not-authorized">
      <div class="basket-authentication__guest">
        <h2 class="basket-authentication__header">Kontynuuj bez logowania</h2>
        <div class="basket-authentication__descrpition">
          Możesz zrobić zakupy jako gość. Wymagane są tylko dane niezbędne do realizacji zamówienia.
        </div>
        <LayoutButton class="basket-authentication__btn">Kontynuuj jako gość</LayoutButton>
      </div>
      <div class="basket-authentication__guest">
        <h2 class="basket-authentication__header">Nie masz konta?</h2>
        <LayoutButton class="basket-authentication__register-btn">Zarejestruj się</LayoutButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'empty' })
</script>
<style lang="scss" scoped>
.basket-authentication {
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  gap: 40px;
  background-color: $gray-color-100;
  width: 42%;
  padding: 30px;

  &__authorized {
    display: grid;

    span {
      font-size: 12px;
      font-weight: 600;
    }
  }

  &__not-authorized {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__forgot {
    font-size: 12px;
    text-align: right;
    margin: 12px 0px;
  }

  &__form {
    display: grid;
    gap: 15px;
    margin-top: 15px;
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
    font-weight: 00;
  }

  &__spacer {
    display: flex;
    justify-content: center;
  }

  &__line {
    width: 1px;
    background-color: $gray-color-400;
  }

  &__guest {
    display: grid;
    gap: 15px;
  }

  &__descrpition {
    font-size: 14px;
  }
}
</style>
