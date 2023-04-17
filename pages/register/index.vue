<template>
  <div class="register-content">
    <AuthRegisterForm @registered="(user) => user && $router.push('/login')" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Rejestracja",
    "form": {
      "email": "Adres e-mail",
      "header": "Rejestracja",
      "register": "Zarejestruj się",
      "name": "Imię",
      "surname": "Nazwisko",
      "password": "Hasło",
      "confirmPassword": "Powtórz hasło",
      "private-policy": "Polityką prywatności",
      "private-policy-description": "Wyrażam zgodę na przetwarzanie moich danych osobowych podanych przeze mnie w formularzu rejestracyjnym, przez ROBICAN S.C. R. JASTRZĘBSKI I WSPÓLNICY UL. ZAKOPIAŃSKA 190, 60-467POZNAŃ, w celu złożenia i prowadzenia konta klienta. Zapoznałem się z",
      "private-policy-agreement": "na temat zasad przetwarzania danych osobowych i ją akceptuję."
    }
  }
}
</i18n>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.register-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }
}
</style>
