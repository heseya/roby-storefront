<template>
  <NuxtLayout>
    <div class="error-page">
      <span class="error-page__title">{{ useGlobalI18n('common.error') }}</span>
      <h1 class="error-page__code">{{ error?.statusCode || 500 }}</h1>
      <p class="error-page__text">
        {{ error?.message || error?.statusMessage || t('error.text') }}
      </p>

      <LayoutButton class="error-page__button" @click="handleError">
        {{ t('error.button') }}
      </LayoutButton>
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "error": {
      "text": "Coś poszło nie tak.",
      "button": "Wróć do strony głównej"
    }
  }
}
</i18n>

<script setup>
const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object,
})
const t = useLocalI18n()

const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: `${t('error.title')} ${props.error?.statusCode || 500}`,
})
</script>

<style lang="scss">
.error-page {
  width: calc(100vw - 32px);
  margin: 0 auto;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: rem(14);

  @media ($viewport-10) {
    font-size: rem(20);
    width: calc(100vw - 64px);
  }

  &__code {
    font-size: rem(80);
    line-height: rem(160);
    margin: 24px 0;
    color: var(--secondary-color);

    &::first-letter {
      margin-left: 0;
    }

    @media ($viewport-6) {
      font-size: rem(200);
    }
  }

  &__button {
    margin-top: 24px;
  }
}
</style>
