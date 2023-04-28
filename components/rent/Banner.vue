<template>
  <div class="banner">
    <div class="banner__gray-filter">
      <div class="banner__content">
        <LayoutHeader tag="h2" class="banner__title">
          Dostarczamy urządzenia, które rozwijają Twój biznes.
        </LayoutHeader>
        <LayoutHeader class="banner__subtitle"
          >ROBICAN - PROFESJONALIZM I DOŚWIADCZENIE</LayoutHeader
        >
        <span class="banner__text">
          Dostarczamy urządzenia, które nie tylko pełnią podstawową rolę drukarki firmowej, ale
          stanowią ważny punkt na ścieżce procesów firmowych. Nowoczesny sprzęt to nie tylko dobrze
          wykonane zadania, ale również wsparcie i optymalizacja codziennych czynności w biurze.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  background-image: url('@/assets/images/banner-bgr.png');
  @include background-image-basic;

  &__gray-filter {
    background-color: $gray-filter;
  }

  &__content {
    max-width: $container-width;
    margin: 0 auto;
    padding: 20px $container-padding;

    color: $white-color;
    @include flex-column;
    gap: 12px;

    @media ($viewport-9) {
      padding: 32px $container-padding 64px $container-padding;
    }

    @media ($viewport-13) {
      padding: 32px 0 64px 0;
    }
  }

  &__title {
    text-align: left;

    font-size: rem(22);
    @media ($viewport-9) {
      margin-bottom: 18px;
      width: 50%;
      font-size: rem(45);
    }
  }

  &__subtitle {
    text-align: left;
    font-weight: $font-weight-bold;
    font-size: rem(14);

    @media ($viewport-9) {
      width: 50%;
      font-size: rem(20);
    }
  }

  &__text {
    @media ($viewport-9) {
      width: 50%;
      font-size: rem(18);
    }
  }
}
</style>
