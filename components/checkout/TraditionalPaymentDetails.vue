<template>
  <div class="payment-details">
    <span class="payment-details__title">{{ t('notice.title') }}</span>
    <div class="payment-details__content">
      <div class="payment-details__row">
        <span class="payment-details__label"> {{ t('notice.recipient') }}: </span>
        <span class="payment-details__value">
          ROBICAN s.c. R.Jastrzębski i Wspólnicy <br />
          ul. Zakopiańska 190, 60-467 Poznań
        </span>
      </div>

      <div class="payment-details__row">
        <span class="payment-details__label"> {{ t('notice.bank') }}: </span>
        <span class="payment-details__value"> PKO BP XII ODDZIAŁ POZNAŃ </span>
      </div>
      <div class="payment-details__row">
        <span class="payment-details__label"> {{ t('notice.bankAccount') }}: </span>
        <span class="payment-details__value"> 27 1020 4027 0000 1602 0444 4675 </span>
      </div>
      <div class="payment-details__row">
        <span class="payment-details__label"> {{ t('notice.transferTitle') }}: </span>
        <span class="payment-details__value"> Zamówienie {{ code }} </span>
      </div>
    </div>
    <p class="payment-details__text">
      {{ t('notice.text') }}
    </p>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "notice": {
      "title": "Dane do przelewu:",
      "recipient": "Dane odbiorcy",
      "bank": "Bank",
      "bankAccount": "Numer rachunku",
      "transferTitle": "Tytuł przelewu",
      "text": "Twoje zamówienie zostanie zrealizowane po zaksięgowaniu wpłaty na naszym koncie."
    }
  }
}
</i18n>

<script setup lang="ts">
// TODO: get company details from API
const t = useLocalI18n()
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.payment-details {
  display: block;
  font-size: rem(12);
  background-color: $blue-color-100;
  padding: 16px;

  &__title {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__text {
    margin-top: 8px;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
    margin-bottom: 8px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 4fr;
      gap: 8px;
    }
  }

  &__label {
    color: $gray-color-600;

    @media ($viewport-6) {
      text-align: right;
    }
  }
}
</style>
