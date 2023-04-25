<template>
  <div>
    <div>
      <ul>
        <li>{{ t('orders') }}</li>
        <li>{{ t('settings') }}</li>
        <li>{{ t('addresses') }}</li>
        <li>{{ t('wishList') }}</li>
      </ul>
    </div>
    <div>{{ t('logout') }}</div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "orders": "Zamówienia",
    "settings": "Ustawienia konta",
    "addresses": "Adresy",
    "wishList": "Lista życzeń",
    "logout": "Wyloguj się"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
</script>
