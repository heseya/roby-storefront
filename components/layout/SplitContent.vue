<template>
  <div class="split-content">
    <div class="split-content__container">
      <div class="split-content__first-component">
        <slot name="firstComponent"></slot>
      </div>
      <div class="split-content__spacer" />
      <div class="split-content__second-component">
        <slot name="secondComponent"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.split-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }

  &__container {
    display: grid;
    gap: 30px;

    @media ($viewport-11) {
      grid-template-columns: 1fr 0.3fr 1fr;
      width: 60%;
    }

    @media ($viewport-16) {
      width: 40%;
    }
  }

  &__spacer {
    width: 100%;
    border-bottom: 2px solid $gray-color-300;
    display: flex;
    justify-content: center;

    @media ($viewport-11) {
      border-bottom: none;
      height: 100%;
      width: 2px;
      background-color: $gray-color-300;
      margin-left: 50%;
    }
  }
}
</style>
