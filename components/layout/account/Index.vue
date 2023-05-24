<template>
  <BaseContainer>
    <div class="account">
      <div class="account__container">
        <LayoutAccountNav class="account__nav" />
        <div class="account__content-container">
          <div class="account__header">
            <slot name="header"></slot>
          </div>
          <div class="account__text">
            <slot name="text"></slot>
          </div>
          <div class="account__content">
            <slot> </slot>
          </div>
        </div>
        <div class="account__additional">
          <slot name="additional"></slot>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.account {
  @media ($viewport-12) {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  &__container {
    display: grid;
    width: 100%;

    grid-template-areas:
      'content'
      'nav'
      'additional';

    @media ($viewport-12) {
      grid-template-columns: 0.2fr 1fr;
      grid-template-areas:
        'nav content'
        'nav additional';
      gap: 40px;
    }
  }

  &__additional {
    grid-area: additional;
    margin-top: 14px;
  }

  &__content-container {
    grid-area: content;
  }

  &__text {
    margin: 14px 0;
  }

  &__header {
    font-size: 26px;
    font-weight: bold;
    margin: 12px 0;

    @media ($max-viewport-12) {
      font-size: 20px;
    }
  }

  &__nav {
    display: none;

    @media ($viewport-12) {
      display: flex;
      justify-content: flex-end;
      margin-top: 0;
    }
  }
}
</style>
