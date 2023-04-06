<template>
  <div class="traditional-payment-notice">
    <p class="traditional-payment-notice__text">{{ t('notice.title') }}</p>
    <p class="traditional-payment-notice__text">
      ROBICAN s.c. R.Jastrzębski i Wspólnicy <br />
      ul. Zakopiańska 190, 60-467 Poznań <br />
      PKO BP XII ODDZIAŁ POZNAŃ <br />
      27 1020 4027 0000 1602 0444 4675
    </p>
    <p class="traditional-payment-notice__text">
      <span class="primary-text"> {{ t('notice.text1') }} </span>
      <br />
      {{ t('notice.text2') }}
    </p>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "notice": {
      "title": "Prosimy o wpłatę na nasze konto bankowe.",
      "text1": "Proszę użyć numeru zamówienia jako tytułu płatności.",
      "text2": "Twoje zamówienie zostanie zrealizowane po zaksięgowaniu wpłaty na naszym koncie."
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
</script>

<style lang="scss" scoped>
.traditional-payment-notice {
  display: block;

  &__text {
    margin-top: 8px;
  }
}
</style>
