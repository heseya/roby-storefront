<template>
  <div class="basket-authentication-container">
    <div class="basket-authentication-container__authorized">
      <h2>Zaloguj się</h2>
      <div>
        Adres e-mail
        <FormInput />
      </div>
      <div>
        Hasło
        <FormInput />
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
<script lang="ts" setup>
definePageMeta({ layout: false })
</script>
<style lang="scss" scoped></style>
