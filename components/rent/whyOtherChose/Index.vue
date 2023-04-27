<template>
  <div class="why-other-chose">
    <div class="why-other-chose__reason">
      <LayoutHeader tag="h2" variant="black" class="why-other-chose__title">
        Dlaczego firmy decydują się na wynajem?
      </LayoutHeader>
      <span class="why-other-chose__text">
        Nowoczesny biznes wymaga nowoczesnych rozwiązań, także w zakresie sposobu eksploatacji
        urządzeń biurowych. Wynajem drukarek i kserokopiarek to odpowiedź na potrzebę nowoczesnego
        sprzętu, bez konieczności ponoszenia kosztownych inwestycji.
      </span>
    </div>
    <div class="why-other-chose__attributes">
      <RentWhyOtherChoseAttribute text="Dopasowane urządzenia o szerokiej funkcjonalności." />
      <RentWhyOtherChoseAttribute text="Niskie koszty nabycia sprzętu do biura." />
      <RentWhyOtherChoseAttribute text="Gwarantowana płynność pracy urządzeń." />
      <RentWhyOtherChoseAttribute text="Gwarancja jakości wydruku." />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.why-other-chose {
  @include flex-row;
  align-items: stretch;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 16px;
  }

  &__reason {
    flex: 1;
    @include flex-column;
    gap: 32px;

    @media ($max-viewport-9) {
      gap: 16px;
    }
  }

  &__attributes {
    flex: 1;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid $gray-color-300;

    @include flex-column;
    justify-content: space-between;
    gap: 12px;

    @media ($max-viewport-9) {
      padding: 16px;
    }
  }

  &__title {
    text-align: left;
    font-size: rem(22);

    @media ($viewport-9) {
      font-size: rem(45);
    }
  }

  &__text {
    @media ($viewport-9) {
      font-size: rem(18);
    }
  }
}
</style>
