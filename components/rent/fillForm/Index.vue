<template>
  <div class="fill-form">
    <div class="fill-form__header">
      <LayoutHeader tag="h2" variant="black" class="fill-form__title">
        Wypełnij formularz i
      </LayoutHeader>
      <LayoutHeader tag="h2" variant="black" class="fill-form__title fill-form__title--color">
        zapytaj o wynajem
      </LayoutHeader>
      <div class="fill-form__icon-container">
        <LayoutIcon class="fill-form__icon" :icon="DoubleIcon" :size="28" />
      </div>
    </div>
    <RentFillFormBoxForm />
  </div>
</template>

<script lang="ts" setup>
import DoubleIcon from '@/assets/icons/double-chevron.svg?component'
</script>

<style lang="scss" scoped>
.fill-form {
  @include flex-row;
  justify-content: center;

  @media ($max-viewport-9) {
    flex-direction: column;
  }

  &__header {
    margin: 60px 0;
    padding: 55px 30px 30px 36px;
    border-radius: 4px 0 0 4px;
    @include flex-column;
    background: transparent linear-gradient(90deg, $gray-color-100 0%, $gray-color-300 100%)
      padding-box;

    @media ($max-viewport-9) {
      min-height: 200px;
      margin-bottom: 0;
      border-radius: 4px 4px 0 0;
    }
  }

  &__title {
    text-align: left;

    @media ($viewport-9) {
      padding-right: 64px;
      font-size: rem(38);
    }

    &--color {
      color: var(--secondary-color-alt);
    }
  }
  &__icon-container {
    flex: 1;
    @include flex-row;
    align-items: flex-end;
    justify-content: flex-end;
  }

  &__icon {
    color: $gray-color-600;
    @media ($max-viewport-9) {
      width: 21px;
    }
  }
}
</style>
