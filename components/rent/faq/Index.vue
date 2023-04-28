<template>
  <div class="faq">
    <div class="faq__content">
      <LayoutHeader variant="black" class="faq__title">Obsługa wynajmu urządzeń</LayoutHeader>
      <RentFaqItem
        v-for="({ question, answer }, index) in technicalFaq"
        :key="index"
        :question="question"
        :answer="answer"
      />
    </div>
    <div class="faq__content">
      <LayoutHeader variant="black" class="faq__title">Umowa i formalności</LayoutHeader>
      <RentFaqItem
        v-for="({ question, answer }, index) in formalFaq"
        :key="index"
        :question="question"
        :answer="answer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const technicalFaq = [
  {
    question: 'Czy wynajem drukarek obejmuje dostawy tonerów?',
    answer:
      'Tak. W ramach wynajmu urządzeń dostarczamy wszystkie niezbędne materiały eksploatacyjne, łącznie z tonerami.',
  },
  {
    question: 'Czy serwis urządzenia jest dodatkowo płatny?',
    answer:
      'Nie. W ramach wynajmu, usługi serwisowe oraz dojazd serwisantów do miejsca instalacji urządzenia są bezpłatne.',
  },
  {
    question: 'Kto zajmuje się konfiguracją urządzenia?',
    answer:
      'Serwisant przywozi urządzenie oraz konfiguruje je, umożliwiając prawidłowe działanie. Dodatkowo przeprowadzi szkolenie z obsługi urządzenia.',
  },
  {
    question: 'Ile trwa dostawa tonerów?',
    answer:
      'Tonery dostarczane są w ciągu 1 dnia od ich zamówienia lub od wystąpienia komunikatu o braku tonera, jeżeli urządzenie jest połączone z aplikacją do monitoringu.\n' +
      '\n' +
      'Zawsze staramy się, aby w Twoim biurze znajdował się zapas.',
  },
]
const formalFaq = [
  {
    question: 'Jaki jest czas trwania umowy wynajmu?',
    answer:
      'W zależności od wybranego modelu urządzenia umowy zawieramy na okres od 12 do 48 miesięcy. Istnieje też możliwość indywidualnej kalkulacji uwzględniającej szczególne warunki wynajmu.',
  },
  {
    question: 'Ile kosztuje wynajem urządzenia?',
    answer:
      'Końcowy koszt wynajmu jest zależny od wybranego modelu i konfiguracji urządzenia. Najlepiej wybrać urządzenie, które będzie dopasowane zarówno pod względem wydajności, jak i funkcjonalności.\n' +
      '\n' +
      'Bez wiedzy o potrzebach w firmie można określić zakres od 30 do nawet 600 zł miesięcznie za wynajem urządzenia.',
  },
  {
    question: 'Kiedy dostanę fakturę za wynajem?',
    answer:
      'Faktury za wynajem drukarek wystawiane są na koniec każdego miesiąca kalendarzowego i wysyłane mailem lub pocztą.',
  },
]
</script>

<style lang="scss" scoped>
.faq {
  @include flex-row;
  justify-content: center;
  gap: 50px;

  @media ($max-viewport-9) {
    flex-direction: column;
  }

  &__content {
    flex: 1;
  }

  &__title {
    @media ($max-viewport-9) {
      font-size: rem(22);
    }
  }
}
</style>
