<template>
  <div class="banner">
    <div class="banner__gray-filter">
      <BaseContainer class="banner__content">
        <LayoutHeader tag="h2" class="banner__title"> Rozwijaj z nami Twój biznes! </LayoutHeader>
        <span class="banner__text">
          Traktujemy rozwój biznesu naszych klientów, jak osobisty sukces. Działamy tak, aby
          współpraca przynosiła realne efekty w postaci większej sprawności, optymalizacji kosztów,
          czy rozwiniętej funkcjonalności. SKLEP INTERNETOWY
        </span>
      </BaseContainer>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banner {
  margin-top: 70px;
  background-image: url('@/assets/images/banner-bgr.png');
  @include background-image-basic;

  &__gray-filter {
    background-color: $gray-filter;
  }

  &__content {
    padding: 20px $container-padding;
    color: $white-color;

    @media ($viewport-9) {
      padding: 32px $container-padding;
    }
  }

  &__title {
    text-align: left;
    margin-bottom: 16px;

    font-size: rem(22);
    @media ($viewport-9) {
      margin-bottom: 21px;
      width: 50%;
      font-size: rem(45);
    }
  }

  &__text {
    display: inline-block;
    @media ($viewport-9) {
      width: 50%;
      font-size: rem(18);
    }
  }
}
</style>
