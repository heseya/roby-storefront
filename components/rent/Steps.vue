<template>
  <div class="steps">
    <div class="steps__content">
      <div class="steps__element">
        <div class="steps__number">1</div>
        <LayoutHeader class="steps__title" variant="black">
          Powiedz nam, czego potrzebujesz</LayoutHeader
        >
      </div>
      <div class="steps__element">
        <div class="steps__line-container">
          <div class="steps__line" />
        </div>
        <div class="steps__content">
          <span
            >Wypełnij formularz wynajmu i napisz, jakich urządzeń potrzebujesz. Wypełnienie
            formularza zajmie tylko chwilę, a dzięki temu otrzymasz od nas wsparcie w wyborze
            urządzenia i ofertę dopasowaną do Twoich potrzeb.</span
          >
          <LayoutButton class="steps__button" label="Wypelnij formularz" />
        </div>
      </div>
      <div class="steps__element">
        <div class="steps__number">2</div>
        <LayoutHeader class="steps__title" variant="black">Przedstawimy Ci ofertę</LayoutHeader>
      </div>
      <div class="steps__element">
        <div class="steps__line-container">
          <div class="steps__line" />
        </div>
        <span
          >Skontaktujemy się z Tobą najszybciej jak to możliwe. Przedstawimy Ci najatrakcyjniejsze
          rozwiązania. Chętnie odpowiemy na Twoje pytania i pomożemy podjąć decyzję.</span
        >
      </div>
      <div class="steps__element">
        <div class="steps__number">3</div>
        <LayoutHeader class="steps__title" variant="black"
          >Zrealizujemy Twoje zamówienie</LayoutHeader
        >
      </div>
    </div>
    <div class="steps__image-container">
      <img class="steps__image" src="@/assets/images/rent.png" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.steps {
  @include flex-row;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 30px;
  }

  &__content {
    flex: 1;

    @include flex-column;
    gap: 12px;
    font-size: rem(16);

    @media ($max-viewport-9) {
      font-size: rem(14);
    }
  }

  &__element {
    @include flex-row;
    gap: 22px;
    align-items: center;
  }

  &__number {
    height: 30px;
    width: 30px;

    flex-shrink: 0;
    @include flex-column;
    justify-content: center;
    align-items: center;
    color: var(--secondary-color-alt);
    font-weight: $font-weight-bold;

    background-color: var(--secondary-color-alt-semi-transparent);
    border: 1px solid var(--secondary-color-alt);
    border-radius: 50%;
  }

  &__title {
    font-size: rem(20);
    text-align: left;

    @media ($max-viewport-9) {
      font-size: rem(18);
    }
  }

  &__line-container {
    height: 100%;
    width: 30px;

    flex-shrink: 0;
    @include flex-column;
    align-items: center;
  }

  &__line {
    height: 100%;
    border-left: 1px dashed var(--secondary-color-alt);
  }

  &__button {
    max-width: 200px;
  }

  &__image-container {
    flex: 1;
    position: relative;
    min-height: 200px;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>