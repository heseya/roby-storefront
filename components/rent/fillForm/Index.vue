<template>
  <div v-if="rentForm" class="fill-form">
    <div class="fill-form__header">
      <LayoutHeader tag="h2" variant="black" class="fill-form__title">
        {{ rentForm.text_1 }}
        <span class="fill-form__title--color"> {{ rentForm.text_2 }}</span>
      </LayoutHeader>
      <div class="fill-form__icon-container">
        <LayoutIcon class="fill-form__icon" :icon="DoubleIcon" :size="28" />
      </div>
    </div>
    <ProductPageContactForm
      :description="rentForm.description"
      class="fill-form__contact-form"
      type="renting"
      :action-text="$t('form.send')"
    />
  </div>
</template>

<script lang="ts" setup>
import DoubleIcon from '@/assets/icons/double-chevron.svg?component'
import type { TranslatedRentPageForm } from '~/interfaces/rentPage'

const $t = useGlobalI18n()

const { data: rentForm } = useAsyncData('rent-page-form', async () => {
  const directus = useDirectus()
  const data = await directus.items('RentPageForm').readOne(1, {
    // @ts-ignore directus typing is wrong
    fields: ['translations.text_1', 'translations.text_2', 'translations.description'],
  })
  return data && (getTranslated(data.translations, 'pl-PL') as TranslatedRentPageForm)
})
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
      margin: 0;
      border-radius: 4px 4px 0 0;
    }
  }

  &__title {
    @include flex-column;
    text-align: left;

    @media ($viewport-9) {
      padding-right: 64px;
      font-size: rem(38);
    }

    &--color {
      color: var(--primary-color-alt);
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

  &__contact-form {
    max-width: 500px;
    padding: 25px;
    border-radius: 4px;

    background-color: $gray-color-100;

    @media ($max-viewport-9) {
      max-width: 100%;
      border-radius: 0 0 4px 4px;
    }
  }
}
</style>
