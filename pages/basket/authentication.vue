<template>
  <div class="basket-authentication-container">
    <div class="basket-authentication-container__authorized">
      <h2>Zaloguj się</h2>
      <div>
        Adres e-mail
        <FormInput name="email" />
      </div>
      <div>
        Hasło
        <FormInput name="password" />
      </div>
      <div>Nie pamiętasz hasła ?</div>
      <button>Zaloguj się</button>
    </div>
    <div class="basket-authentication-container__not-authorized">
      <h2>Kontynuuj bez logowania</h2>
      <div>
        Możesz zrobić zakupy jako gość. Wymagane są tylko dane niezbędne do realizacji zamówienia.
      </div>
      <button>Kontynuuj jako gość</button>
      <h2>Nie masz konta?</h2>
      <button>Zarejestruj się</button>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'empty' })
</script>
<style lang="scss" scoped>
.basket-authentication-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background-color: #f7f7f7;
  width: 40%;
  padding: 25px;
}
</style>
