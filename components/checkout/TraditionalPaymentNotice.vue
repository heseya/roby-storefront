<template>
  <div class="traditional-payment-notice">
    <p class="traditional-payment-notice__text">{{ t('notice.title') }}</p>
    <p class="traditional-payment-notice__text">
      {{ config.env.bank_transfer_name }} <br />
      {{ config.env.bank_transfer_address }} <br />
      {{ config.env.bank_transfer_bank_name }} <br />
      {{ config.env.bank_transfer_account }}
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
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()
const config = useConfigStore()
</script>

<style lang="scss" scoped>
.traditional-payment-notice {
  display: block;

  &__text {
    margin-top: 8px;
  }
}
</style>
