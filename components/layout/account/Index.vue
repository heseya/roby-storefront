<template>
  <div class="account">
    <div class="account__container">
      <LayoutAccountNav :mobile="mobile" />
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
</template>

<script setup lang="ts">
defineProps<{
  mobile?: Boolean
}>()
</script>

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

    grid-template-areas:
      'header'
      'nav'
      'content';

    @media ($viewport-12) {
      grid-template-columns: 0.2fr 0.8fr;
      grid-template-areas:
        'nav header'
        'nav content';
      width: 66%;
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
}
</style>
