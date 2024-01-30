<template>
  <div
    v-if="isCookiesBarVisible"
    class="cookies-bar"
    :class="{ 'cookies-bar--hidden': !isCookiesBarVisible }"
  >
    <div class="cookies-bar__content">
      <p class="cookies-bar__text">
        {{ t('content_line1') }} <br />
        {{ t('content_line2') }}
      </p>

      <div class="cookies-bar__checkboxes">
        <FormCheckbox name="cookies-required" model-value disabled>
          {{ t('consents.required') }}
        </FormCheckbox>
        <FormCheckbox v-model="optInForm.functional" name="cookies-functional">
          {{ t('consents.functional') }}
        </FormCheckbox>
        <FormCheckbox v-model="optInForm.ads" name="cookies-ads">
          {{ t('consents.ads') }}
        </FormCheckbox>
        <FormCheckbox v-model="optInForm.analytics" name="cookies-analytics">
          {{ t('consents.analytics') }}
        </FormCheckbox>
      </div>
    </div>

    <LayoutButton class="cookies-bar__btn" type="white" @click="acceptCookies">
      {{ t('accept') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "content_line1": "Klikając „OK”, wyrażasz zgodę na przechowywanie plików cookie na Twoim urządzeniu w celu poprawy działania serwisu,",
    "content_line2": "analizowania korzystania z witryny oraz lepszego dopasowania treści marketingowych",
    "consents": {
      "required": "Wymagane",
      "functional": "Funkcjonalne",
      "ads": "Marketing",
      "analytics": "Analityczne"
    },
    "accept": "OK"
  },
  "en": {
    "content_line1": "By clicking „OK”, you agree to store cookies on your device to improve the performance of the website,",
    "content_line2": "analyze site usage and better tailor marketing content",
    "consents": {
      "required": "Required",
      "functional": "Functional",
      "ads": "Marketing",
      "analytics": "Analytics"
    },
    "accept": "OK"
  }
}
</i18n>

<script setup lang="ts">
import {
  COOKIE_REQUIRED_ACCEPTED_KEY,
  COOKIE_ANALYTICS_ACCEPTED_KEY,
  COOKIE_ADS_ACCEPTED_KEY,
  COOKIE_FUNCTIONAL_ACCEPTED_KEY,
  COOKIES_CONFIG,
} from '@/consts/cookiesKeys'

const t = useLocalI18n()

const optInForm = reactive({
  functional: true,
  analytics: true,
  ads: true,
})

const requiredCookie = useStatefulCookie<number>(COOKIE_REQUIRED_ACCEPTED_KEY, COOKIES_CONFIG)
const functionalCookie = useStatefulCookie<number>(COOKIE_FUNCTIONAL_ACCEPTED_KEY, COOKIES_CONFIG)
const analyticsCookie = useStatefulCookie<number>(COOKIE_ANALYTICS_ACCEPTED_KEY, COOKIES_CONFIG)
const adsCookie = useStatefulCookie<number>(COOKIE_ADS_ACCEPTED_KEY, COOKIES_CONFIG)

const isCookiesBarVisible = computed(() => requiredCookie.value !== 1)

const acceptCookies = () => {
  requiredCookie.value = 1
  functionalCookie.value = optInForm.functional ? 1 : 0
  analyticsCookie.value = optInForm.analytics ? 1 : 0
  adsCookie.value = optInForm.ads ? 1 : 0
}
</script>

<style lang="scss" scoped>
.cookies-bar {
  width: 90vw;
  max-width: $container-width;
  position: fixed;
  z-index: 2147483647;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 22px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  transition: 0.3s;

  @media ($viewport-5) {
    flex-direction: row;
  }

  &--hidden {
    transform: translate(-50%, 200%);
  }

  &__text {
    color: #fff;
    font-size: rem(13);
    line-height: rem(16);

    @media ($viewport-5) {
      margin-right: 12px;
    }
  }

  &__checkboxes {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;

    :deep(.checkbox) {
      margin: 0;
    }

    @media ($viewport-6) {
      gap: 32px;
      flex-direction: row;
    }
  }

  &__btn {
    margin-left: auto;

    @media ($max-viewport-5) {
      margin-top: 12px;
    }
  }
}
</style>
