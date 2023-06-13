<template>
  <p class="recaptcha-badge">
    {{ t('recaptcha.message') }} -
    <a href="https://policies.google.com/privacy" target="_blank" rel="nofollow noopener">
      {{ t('recaptcha.privacy') }}
    </a>
    |
    <a href="https://policies.google.com/terms" target="_blank" rel="nofollow noopener">
      {{ t('recaptcha.conditions') }}
    </a>
  </p>
</template>

<i18n lang="json">
{
  "pl": {
    "recaptcha": {
      "message": "Ta strona korzysta z zabezpieczenia Google reCAPTCHa",
      "conditions": "Warunki",
      "privacy": "Prywatność"
    }
  },
  "en": {
    "recaptcha": {
      "message": "This website uses Google reCAPTCHA protection",
      "conditions": "Conditions",
      "privacy": "Privacy"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const { recaptchaPublic } = usePublicRuntimeConfig()

useHead({
  script: [
    {
      src: `https://www.google.com/recaptcha/api.js?render=${recaptchaPublic}`,
    },
  ],
})
</script>

<style lang="scss" scoped>
.recaptcha-badge {
  display: block;
  width: 100%;
  text-align: right;
  font-size: rem(10);
  margin-bottom: 4px;
  color: $gray-color-600;

  a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: var(--primary-color-alt);
    }
  }
}
</style>
