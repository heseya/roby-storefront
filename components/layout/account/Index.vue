<template>
  <BaseContainer>
    <div class="account">
      <div class="account__container">
        <LayoutAccountNav class="account__nav" />
        <div class="account__header-container">
          <div class="account__header">
            <slot name="header"></slot>
          </div>

          <slot name="text"></slot>
        </div>
        <div class="account__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.account {
  padding: 0px 16px;

  @media ($viewport-12) {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  &__container {
    display: grid;
    gap: 10px;
    width: 100%;

    grid-template-areas:
      'header'
      'nav'
      'content';

    @media ($viewport-12) {
      grid-template-columns: 0.2fr 0.8fr;
      grid-template-areas:
        'nav header'
        'nav content';
      gap: 25px;
    }
  }

  &__content {
    grid-area: content;
  }

  &__header-container {
    grid-area: header;
  }

  &__header {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 12px;

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
