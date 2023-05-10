<template>
  <div class="banner">
    <BaseContainer class="banner__text-container">
      <LayoutHeader tag="h2" class="banner__text">
        Naszą największą siłą jest
        <span class="banner__text banner__text--color"> doświadczony i zgrany zespół </span>
        który realizuje zadania z pasją i profesjonalizmem.
      </LayoutHeader>
    </BaseContainer>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  background-color: $gray-color-900;

  &__text-container {
    padding: 36px 0;
    @include flex-row;
    justify-content: center;
  }

  &__text {
    width: 80%;
    font-size: rem(30);

    @media ($max-viewport-9) {
      font-size: rem(20);
    }

    &--color {
      color: var(--secondary-color-alt);
    }
  }
}
</style>
